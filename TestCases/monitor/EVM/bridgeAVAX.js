const validateSchemaCommand = require("../../../schemas/validateSchemaCommand");
const backendApischemas = require("../../../schemas/backendApi_schemas");
const { BackendApi } = require('../../../lib/Incognito/BackendApi')
const { ENV } = require('../../../global');
const { wait } = require('../../../lib/Utils/Timer');
const { makeSlackAlert } = require('../../../lib/Utils/InstantAlert')
const { getLogger } = require("../../../lib/Utils/LoggingManager");
const logger = getLogger("AVAX_EVM")

let Web3 = require('web3');
let chai = require('chai');
const { ACCOUNTS, NODES } = require('../../TestBase');

const networkBridgeInfo = ENV.Testbed.AvaxFullnode.networkDetail
const gasFee = ENV.Testbed.AvaxFullnode.configGasTx
const configBackendToken = ENV.Testbed.AvaxFullnode.configIncBE
const MIN_BAL_FEE_MASTER_WALLET = ENV.Testbed.AvaxFullnode.configIncBE.minimumFeeTheshold

describe(`[ ======  AVAX BRIDGE - SHIELD ======  ]`,() => {
    describe('SHIELDING AVAX', async () => {
        const accountInfoBefore = {
            incTokenBal: 0,
            extTokenBal: 0
        }
        const accountInfoAfter = {
            incTokenBal: 0,
            extTokenBal: 0
        }

        const shieldInfo = {
            shieldAmt: 0.03,
            shieldBackendId: null,
            shieldPrvFee: 0,
            shieldTokenFee: 0,
            tmpWalletAddress: null,
            timeout: 600,
            txDeposit: null,
            blockTime: 20,
            pTokenDecimal: 9
        }

        let tokenID, web3, account, backendApi, extAccount, slack;

        it('Init data', async () => {
            tokenID = ENV.Testbed.Tokens.AVAX_AVAX
            web3 = await new Web3(new Web3.providers.HttpProvider(ENV.Testbed.AvaxFullnode.url))
            account = ACCOUNTS.Incognito.get(0)
            backendApi = new BackendApi()
            extAccount = ACCOUNTS.Evm.get(4).setProvider(ENV.Testbed.AvaxFullnode.url)
            slack = makeSlackAlert("AVAX_Shielding")
            logger.info(`Token ID: ${tokenID}`)
            accountInfoBefore.incTokenBal = await account.useCli.getBalance(tokenID)
            logger.info(`Ptoken balance init :  ${accountInfoBefore.incTokenBal}`)
        }).timeout(60000);

        it('STEP_1 get shielding address and estimate shield fee', async () => {
            let res = await backendApi.avaxGenerate({
                walletAddress: account.paymentK,
                tokenId: tokenID
            })
            await validateSchemaCommand.validateSchema(backendApischemas.generateShieldAddressSchemas, res.data)
            shieldInfo.tmpWalletAddress = res.data.Result.Address
            shieldInfo.shieldTokenFee = (res.data.Result.TokenFee == 0) ? res.data.Result.EstimateFee : res.data.Result.TokenFee
            logger.info(`BE estimate shield res :   ${JSON.stringify(res.data)}`)

        }).timeout(60000);

        it(`STEP_2.1 Get balance before deposit`, async () => {
            accountInfoBefore.extTokenBal = await extAccount.getBalance()
            logger.info(`Balance sender account: ${accountInfoBefore.extTokenBal}`)
            let tmpWalletBal1 = await web3.eth.getBalance(shieldInfo.tmpWalletAddress)
            logger.info(`BE Wallet balance :  ${tmpWalletBal1}`)
        }).timeout(60000);

        it(`STEP_2.1 Deposit token`, async () => {
            let tmpWalletBal1 = await web3.eth.getBalance(shieldInfo.tmpWalletAddress)
            logger.info(`sender ${extAccount.address} -- receiver ${shieldInfo.tmpWalletAddress}`)

            let resDeposit = await extAccount.sendNativeToken({
                to: shieldInfo.tmpWalletAddress,
                amount: web3.utils.toWei((shieldInfo.shieldAmt).toString(), 'ether'),
                gas: gasFee.gasPrice,
                gasLimit: gasFee.gasLimit,
                chainName: networkBridgeInfo.chain,
                chainDetail: networkBridgeInfo.chainParams,
                hardfork: networkBridgeInfo.hardfork
            })
            await wait(15)

            shieldInfo.txDeposit = resDeposit.transactionHash
            logger.info(`Deposit transaction hash : ${resDeposit.transactionHash}`)
            let resReceipt = await web3.eth.getTransactionReceipt(shieldInfo.txDeposit)
            chai.assert.isTrue(resReceipt.status)

            accountInfoAfter.extTokenBal = await extAccount.getBalance()
            logger.info(`Balance sender account after deposit: ${accountInfoAfter.extTokenBal}`)
            let tmpWalletBal2 = await web3.eth.getBalance(shieldInfo.tmpWalletAddress)
            logger.info(`BE Wallet balance : ${tmpWalletBal2}`)
            chai.assert.isTrue(tmpWalletBal2 > tmpWalletBal1)
        }).timeout(60000);

        it('STEP_3.1 Check balance Shield Fee Master Wallet', async () => {
            let balFeeMaster = await web3.eth.getBalance(configBackendToken.shieldFeeWallet)

            if (balFeeMaster < MIN_BAL_FEE_MASTER_WALLET) {
                slack.setInfo(`Need send more fee to Mater Shield Fee Wallet  ${configBackendToken.shieldFeeWallet}`).send()
            }
            await chai.assert.isTrue(balFeeMaster > MIN_BAL_FEE_MASTER_WALLET)
        }).timeout(60000);

        it('STEP_3.2 Call API backend to get new shielding ', async () => {
            let resBefore = await backendApi.historyByTokenAccount({
                WalletAddress: account.paymentK,
                PrivacyTokenAddress: tokenID
            })
            await validateSchemaCommand.validateSchema(backendApischemas.historyTokenAccountSchemas, resBefore.data)

            shieldInfo.shieldBackendId = await account.waitForNewShieldRecord({
                tokenId: tokenID,
                interval: shieldInfo.blockTime * 4,
                timedOut: shieldInfo.timeout
            })
            logger.info(`New ShieldID : ${shieldInfo.shieldBackendId}`)

            if (shieldInfo.shieldBackendId === 0) {
                slack.setInfo(`Seem to be stuck in the backend -- not listened to tx deposit yet`).send()
            }
            await chai.assert.notEqual(shieldInfo.shieldBackendId, 0, 'Backend seems to be not creating new shield')
        }).timeout(900000);

        it('STEP_3.3 Verify shielding detail', async () => {
            let resDetail = await backendApi.historyDetail({
                historyID: shieldInfo.shieldBackendId,
                CurrencyType: configBackendToken.currencyType,  // native token
                Decentralized: configBackendToken.decentralized
            })
            await validateSchemaCommand.validateSchema(backendApischemas.historyTokenAccountDetailSchemas, resDetail.data)

            let timeOut = shieldInfo.timeout
            while (resDetail.data.Result.Status != 12) {
                let tmp = await backendApi.historyDetail({
                    historyID: shieldInfo.shieldBackendId,
                    CurrencyType: configBackendToken.currencyType, // native token
                    Decentralized: configBackendToken.decentralized
                })
                logger.info(`Shield status =  ${tmp.data.Result.Status}  ----  ${tmp.data.Result.StatusMessage}  ---  ${tmp.data.Result.StatusDetail}`)
                resDetail.data.Result.Status = tmp.data.Result.Status
                if (resDetail.data.Result.Status === 12) {
                    shieldInfo.shieldTokenFee = Number(resDetail.data.Result.TokenFee / 1e18).toFixed(9)
                    logger.info(`Shielding successfull`)
                    break
                }
                else if (timeOut <= 0) {
                    slack.setInfo(`Shielding over 10 minutes but not mint tokens yet -- shield Id = ${shieldInfo.shieldBackendId}  in status = ${resDetail.data.Result.Status}  ---  ${tmp.data.Result.StatusDetail}`).send()
                    break
                }
                else if (resDetail.data.Result.Status === 16 || resDetail.data.Result.Status === 13 || resDetail.data.Result.Status === 14 || resDetail.data.Result.Status === 15 || resDetail.data.Result.Status === 5 || resDetail.data.Result.Status === 8) {
                    slack.setInfo(`Shield seem to be stuck in the backend -- shield Id = ${shieldInfo.shieldBackendId}  in status = ${resDetail.data.Result.Status}  ---  ${tmp.data.Result.StatusDetail}`).send()
                    break
                }
                // slack.setInfo(`In processing -- shield Id = ${shieldInfo.shieldBackendId}  in status = ${resDetail.data.Result.Status}  ---  ${tmp.data.Result.StatusDetail}`).send()
                await wait(shieldInfo.blockTime * 5)
                timeOut -= (shieldInfo.blockTime * 5)
            }
            await chai.assert.equal(resDetail.data.Result.Status, 12)
        }).timeout(1200000);

        it('STEP_4 Verify pToken balance affter shield', async () => {
            await wait(shieldInfo.blockTime * 3)
            accountInfoAfter.incTokenBal = await account.useCli.getBalance(tokenID)
            logger.info(`Token balance after shield: ${accountInfoAfter.incTokenBal}`)
            chai.assert.equal(accountInfoAfter.incTokenBal, accountInfoBefore.incTokenBal + Number((shieldInfo.shieldAmt - shieldInfo.shieldTokenFee) * Number('1e' + shieldInfo.pTokenDecimal)), 'mint token unsuceessfull')
        }).timeout(100000);
    })
})


describe(`[======  AVAX BRIDGE -- UNSHIELDING ====== ]`, () => {
    describe('UNSHIELDING AVAX', async () => {
        const accountInfoBefore = {
            incTokenBal: 0,
            extTokenBal: 0
        }
        const accountInfoAfter = {
            incTokenBal: 0,
            extTokenBal: 0
        }
        const unshieldInfo = {
            unshieldAmt: 0,
            unshieldPrvFee: 0,
            unshieldTokenFee: 0,
            backendId: null,
            feeAccount: null,
            unshieldExtTx: null,
            unshieldIncTx: null,
            timeout: 900,
            blockTime: 20,
            pTokenDecimal: 9,
            burningType: 356
        }
        let tokenID, web3, account, backendApi, extAccount, slack;

        it('Init data', async () => {
            tokenID = ENV.Testbed.Tokens.AVAX_AVAX
            web3 = await new Web3(new Web3.providers.HttpProvider(ENV.Testbed.AvaxFullnode.url))
            account = ACCOUNTS.Incognito.get(0)
            extAccount = ACCOUNTS.Evm.get(4).setProvider(ENV.Testbed.AvaxFullnode.url)
            backendApi = new BackendApi()
            slack = makeSlackAlert("AVAX_UnShielding")
            logger.info(`Token ID: ${tokenID}`)
            accountInfoBefore.incTokenBal = await account.useCli.getBalance(tokenID)
            logger.info(`token balance on INC: ${accountInfoBefore.incTokenBal}`)
            accountInfoBefore.extTokenBal = await extAccount.getBalance()
            logger.info(`token balance on external network :  ${accountInfoBefore.extTokenBal}`)
        }).timeout(60000);

        it('STEP_1 Estimate Unshield Fee and backend UnshielId', async () => {
            resEst = await backendApi.avaxUnshieldEstFee({
                unshieldAmount: Number(accountInfoBefore.incTokenBal / Number('1e' + unshieldInfo.pTokenDecimal)),
                extRemoteAddr: extAccount.address,
                tokenId: tokenID,
                unifiedTokenId: '',
                IncPaymentAddr: account.paymentK,
                decimalPToken: unshieldInfo.pTokenDecimal
            })
            unshieldInfo.backendId = resEst.data.Result.ID
            unshieldInfo.unshieldTokenFee = resEst.data.Result.TokenFees.Level1
            logger.info(`Fee token unshield:  ${unshieldInfo.unshieldTokenFee}`)
            unshieldInfo.feeAccount = resEst.data.Result.FeeAddress
            unshieldInfo.unshieldAmt = accountInfoBefore.incTokenBal - unshieldInfo.unshieldTokenFee

            logger.info(`ResEstimate: ${JSON.stringify(resEst.data)}`)
        }).timeout(60000);

        it(`STEP_2.1 Create unshield transaction by SDK `, async () => {
            await account.initSdkInstance();

            unshieldInfo.unshieldIncTx = await account.useSdk.unshieldEvm({
                unshieldBackendId: unshieldInfo.backendId,
                tokenId: tokenID,
                receiver: unshieldInfo.feeAccount,
                amount: unshieldInfo.unshieldAmt,
                amountFee: unshieldInfo.unshieldTokenFee,
                decimalPtoken: unshieldInfo.pTokenDecimal,
                remoteAddress: extAccount.address,
                burningType: unshieldInfo.burningType
            })
            logger.info(`Unshield INC tx :  ${unshieldInfo.unshieldIncTx}`)
            await wait(unshieldInfo.blockTime)
            let resTx = await NODES.Incognito.getTransactionByHashRpc(unshieldInfo.unshieldIncTx)
        }).timeout(100000);

        it(`STEP_2.2 Submit unshield tx to backend`, async () => {
            let resSubmitTx = await backendApi.submutTxAvaxUnshield({
                currencyType: configBackendToken.currencyType,  // native token
                unshieldAmount: unshieldInfo.unshieldAmt,
                decimalPToken: unshieldInfo.pTokenDecimal,
                extRemoteAddr: extAccount.address,
                tokenID: tokenID,
                rawTxId: unshieldInfo.unshieldIncTx,
                IncPaymentAddr: account.paymentK,
                id: unshieldInfo.backendId,
                userFeeSelection: 1,
                userFeeLevel: 1
            })
            logger.info(`Res submit tx to backend : ${JSON.stringify(resSubmitTx.data)}`)
            await chai.assert.isTrue(resSubmitTx.data.Result, 'submit tx not success')
        }).timeout(60000);

        it('STEP_3.1 Check balance Unhield Fee Master Wallet', async () => {
            let balFeeMaster = await web3.eth.getBalance(configBackendToken.unshieldFeeWallet)
            if (balFeeMaster < MIN_BAL_FEE_MASTER_WALLET) {
                slack.setInfo(`Need send more fee to Mater Unshield Fee Wallet  ${configBackendToken.unshieldFeeWallet}`).send()
            }
            await chai.assert.isTrue(balFeeMaster > MIN_BAL_FEE_MASTER_WALLET)
        }).timeout(60000);

        it('STEP_3.2 Verify unshielding detail', async () => {
            let resDetail = await backendApi.historyDetail({
                historyID: unshieldInfo.backendId,
                CurrencyType: configBackendToken.currencyType,  // native token
                Decentralized: configBackendToken.decentralized
            })
            logger.info(`BE unshielding detail : ${JSON.stringify(resDetail.data)}`)

            await validateSchemaCommand.validateSchema(backendApischemas.historyTokenAccountDetailSchemas, resDetail.data)
            let timeOut = unshieldInfo.timeout
            while (resDetail.data.Result.Status != 25) {
                let tmp = await backendApi.historyDetail({
                    historyID: unshieldInfo.backendId,
                    CurrencyType: configBackendToken.currencyType, //native token
                    Decentralized: configBackendToken.decentralized
                })
                logger.info(`Unshield status = ${tmp.data.Result.Status} ---- ${tmp.data.Result.StatusMessage}  --- ${tmp.data.Result.StatusDetail}`)
                resDetail.data.Result.Status = tmp.data.Result.Status
                if (resDetail.data.Result.Status === 25) {
                    logger.info(`Unshielding successfull`)
                    unshieldInfo.unshieldExtTx = tmp.data.Result.OutChainTx.substring(tmp.data.Result.OutChainTx.indexOf(`0x`))
                    break
                }
                else if (timeOut <= 0) {
                    slack.setInfo(`Unshield over 10 minutes but not completed yet -- unshield Id = ${unshieldInfo.backendId}  in status = ${resDetail.data.Result.Status} --- ${tmp.data.Result.StatusDetail}`).send()
                    break
                }
                else if (resDetail.data.Result.Status === 23 || resDetail.data.Result.Status === 26 || resDetail.data.Result.Status === 27 || resDetail.data.Result.Status === 28 || resDetail.data.Result.Status === 29 || resDetail.data.Result.Status === 33) {
                    slack.setInfo(`Unshield seem to be stuck in the backend -- unshield Id = ${unshieldInfo.backendId}  in status = ${resDetail.data.Result.Status} --- ${tmp.data.Result.StatusDetail}`).send()
                    break
                } else if (resDetail.data.Result.Status === 34) {
                    slack.setInfo(`NotEnoughVaultPleaseWait -- unshield Id = ${unshieldInfo.backendId}  in status = ${resDetail.data.Result.Status} --- ${tmp.data.Result.StatusDetail}`).send()
                    break
                }
                else if (resDetail.data.Result.Status === 20) {
                    slack.setInfo(`Submit tx backend failed -- unshield Id = ${unshieldInfo.backendId}  in status = ${resDetail.data.Result.Status} --- ${tmp.data.Result.StatusDetail}`).send()
                    break
                }
                unshieldInfo.unshieldExtTx = tmp.data.Result.OutChainTx.substring(tmp.data.Result.OutChainTx.indexOf(`0x`))
                // slack.setInfo(`In Processing -- unshield Id = ${unshieldInfo.backendId}  in status = ${resDetail.data.Result.Status} --- ${tmp.data.Result.StatusDetail}`).send()
                await wait(unshieldInfo.blockTime * 5)
                timeOut -= (unshieldInfo.blockTime * 5)
            }
            await chai.assert.equal(resDetail.data.Result.Status, 25)
        }).timeout(1200000);

        it('STEP_4 Verify balance in Incognito', async () => {
            await wait(unshieldInfo.blockTime * 2)
            accountInfoAfter.incTokenBal = await account.useCli.getBalance(tokenID)
            logger.info(`accountInfoAfter: ${accountInfoAfter.incTokenBal}`)
            chai.assert.notEqual(accountInfoBefore.incTokenBal, accountInfoAfter.incTokenBal, 'burn token unsuceessfull')
        }).timeout(120000);

        it('STEP_5.1 Verify data on AVAX - Verify transaction', async () => {
            logger.info(`tx unshield on AVAX :  ${unshieldInfo.unshieldExtTx}`)
            let res = await web3.eth.getTransactionReceipt(unshieldInfo.unshieldExtTx)
            chai.assert.isTrue(res.status)
        }).timeout(60000);
        it('STEP_5.2 Verify update balance', async () => {
            accountInfoAfter.extTokenBal = await web3.eth.getBalance(extAccount.address)
            logger.info(`receiver balance : ${accountInfoAfter.extTokenBal}`)
            chai.assert.equal(accountInfoAfter.extTokenBal, Number(accountInfoBefore.extTokenBal) + Number(unshieldInfo.unshieldAmt * 1e9), `the receiver has not received yet`)
        }).timeout(60000);
    })
})


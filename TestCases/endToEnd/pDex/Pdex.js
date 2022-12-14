const { TOKEN, POOL } = require('../../../lib/Incognito/Constants')
const { CoinServiceApi } = require("../../../lib/Incognito/CoinServiceApi");
const GenAction = require("../../../lib/Utils/GenAction");
const addDebug = require('../../../lib/Utils/AddingContent').addDebug;
const config = require("../../../config.json");
let chai = require("chai");
let assert = require("chai").assert;
const { getLogger } = require("../../../lib/Utils/LoggingManager");
const { ACCOUNTS, NODES } = require('../../TestBase');
const { addCodeArg } = require('ajv/dist/compile/codegen/code');
const logger = getLogger("Pdex")

let coinServiceApi = new CoinServiceApi();
let sender = ACCOUNTS.Incognito.get(2)

describe("[Class] Pdex", () => {
    describe("TC001_TradePRVToToken", async () => {
        let amountTrade = 0
        let estimateTradeObject
        let tx
        let tokenSell = TOKEN.PRV
        let tokenBuy = TOKEN.ZIL

        it("STEP_InitData", async () => {
            await sender.initSdkInstance();
            let balanceAll = await sender.useCli.getBalanceAll()
            sender.balanceAllBefore = balanceAll
            addDebug("sender.balanceAllBefore", sender.balanceAllBefore)

            amountTrade = await GenAction.randomNumber(1000)
        }).timeout(config.timeoutApi);

        it("STEP_CoinServiceEstimateTrade", async () => {
            let estimateTrade = await coinServiceApi.estimateTrade({
                tokenSell: tokenSell,
                tokenBuy: tokenBuy,
                sellAmount: amountTrade
            })
            estimateTradeObject = estimateTrade.data

        });

        it("STEP_Trade", async () => {
            tx = await sender.useSdk.swap({
                tokenSell: TOKEN.PRV,
                tokenBuy: TOKEN.ZIL,
                amount: amountTrade,
                tradePath: estimateTradeObject.Result.FeePRV.Route,
                tradingFee: estimateTradeObject.Result.FeePRV.Fee,
                feeToken: TOKEN.PRV,
                minAcceptableAmount: estimateTradeObject.Result.FeePRV.MaxGet,
            })

            addDebug(tx)
            await NODES.Incognito.getTransactionByHashRpc(tx)
            await sender.useSdk.waitForUtxoChange({
                tokenID: tokenBuy,
                countNumber: 15,
            })
        }).timeout(config.timeoutTx);

        it("STEP_CheckTradeSuccess", async () => {
            let response = await NODES.Incognito.rpc.pdexv3_getTradeStatus(tx)
            logger.info({ response })

            chai.expect(response.data.Result.Status).to.equal(1)
            chai.expect(response.data.Result.BuyAmount).to.above(1)
            chai.expect(response.data.Result.TokenToBuy).to.equal(tokenBuy)

        }).timeout(config.timeoutTx);

        it("STEP_VerifyBalance", async () => {
            let balanceAll = await sender.useCli.getBalanceAll()
            sender.balanceAllAfter = balanceAll
            addDebug("sender.balanceAllAfter", sender.balanceAllAfter)

            chai.expect(sender.balanceAllAfter[tokenSell]).to.equal(sender.balanceAllBefore[tokenSell] - amountTrade - 100 - estimateTradeObject.Result.FeePRV.Fee);
            chai.expect(sender.balanceAllAfter[tokenBuy]).to.be.least(sender.balanceAllBefore[tokenBuy] + estimateTradeObject.Result.FeePRV.MaxGet);

        }).timeout(config.timeoutApi);
    });

    describe("TC002_TradeTokenToPRV", async () => {
        let amountTrade = 0
        let estimateTradeObject
        let tx
        let tokenSell = TOKEN.ZIL
        let tokenBuy = TOKEN.PRV

        it("STEP_InitData", async () => {
            await sender.initSdkInstance();
            let balanceAll = await sender.useCli.getBalanceAll()
            sender.balanceAllBefore = balanceAll
            addDebug("sender.balanceAllBefore", sender.balanceAllBefore)

            amountTrade = await GenAction.randomNumber(1000)
        }).timeout(config.timeoutApi);

        it("STEP_CoinServiceEstimateTrade", async () => {
            let estimateTrade = await coinServiceApi.estimateTrade({
                tokenSell: TOKEN.ZIL,
                tokenBuy: TOKEN.PRV,
                sellAmount: amountTrade
            })
            estimateTradeObject = estimateTrade.data

        });

        it("STEP_Trade", async () => {

            tx = await sender.useSdk.swap({
                tokenSell: tokenSell,
                tokenBuy: tokenBuy,
                amount: amountTrade,
                tradePath: estimateTradeObject.Result.FeeToken.Route,
                tradingFee: estimateTradeObject.Result.FeeToken.Fee,
                feeToken: tokenSell,
                minAcceptableAmount: estimateTradeObject.Result.FeeToken.MaxGet,
            })
            addDebug(tx)
            await NODES.Incognito.getTransactionByHashRpc(tx)
            await sender.useSdk.waitForUtxoChange({
                tokenID: tokenBuy,
                countNumber: 15,
            })
        }).timeout(config.timeoutTx);

        it("STEP_CheckTradeSuccess", async () => {
            let response = await NODES.Incognito.rpc.pdexv3_getTradeStatus(tx)
            logger.info({ response })

            chai.expect(response.data.Result.Status).to.equal(1)
            chai.expect(response.data.Result.BuyAmount).to.above(1)
            chai.expect(response.data.Result.TokenToBuy).to.equal(tokenBuy)

        }).timeout(config.timeoutTx);

        it("STEP_VerifyBalance", async () => {
            let balanceAll = await sender.useCli.getBalanceAll()
            sender.balanceAllAfter = balanceAll
            addDebug("sender.balanceAllAfter", sender.balanceAllAfter)

            chai.expect(sender.balanceAllAfter[tokenBuy]).to.least(sender.balanceAllBefore[tokenBuy] - 100 + estimateTradeObject.Result.FeePRV.MaxGet);
            chai.expect(sender.balanceAllAfter[tokenSell]).to.be.equal(sender.balanceAllBefore[tokenSell] - amountTrade - estimateTradeObject.Result.FeeToken.Fee);

        }).timeout(config.timeoutApi);
    });

    describe("TC003_TradeWithInvalidRoute", async () => {
        let sellTokenID = TOKEN.USDT_UT
        let buyTokenID = TOKEN.PRV
        let poolID = POOL.MATIC_USDT
        let amountTrade = 0
        let estimateTradeObject
        let tx

        it("STEP_InitData", async () => {

            await sender.initSdkInstance();

            amountTrade = await GenAction.randomNumber(1000)
        }).timeout(config.timeoutApi);

        it("STEP_CoinServiceEstimateTrade", async () => {
            let response = await coinServiceApi.estimateTrade({
                tokenSell: sellTokenID,
                tokenBuy: buyTokenID,
                sellAmount: amountTrade
            })
            estimateTradeObject = response.data
        });

        it("STEP_TradeWithRouteNotArray", async () => {

            tx = await sender.useSdk.swap({
                tokenSell: sellTokenID,
                tokenBuy: buyTokenID,
                amount: amountTrade,
                tradePath: poolID,
                tradingFee: estimateTradeObject.Result.FeeToken.Fee,
                feeToken: sellTokenID,
                minAcceptableAmount: estimateTradeObject.Result.FeeToken.MaxGet,
            })
            addDebug(tx)
            chai.expect(tx).to.contain(`Validating "createAndSendOrderRequestTx-tradePath" failed: Required. Found undefined (type of undefined)`)

        }).timeout(config.timeoutTx);

        it("STEP_TradeWithRouteInvalidData", async () => {

            tx = await sender.useSdk.swap({
                tokenSell: sellTokenID,
                tokenBuy: buyTokenID,
                amount: amountTrade,
                tradePath: [123],
                tradingFee: estimateTradeObject.Result.FeeToken.Fee,
                feeToken: sellTokenID,
                minAcceptableAmount: estimateTradeObject.Result.FeeToken.MaxGet,
            })
            addDebug(tx)
            chai.expect(tx).to.contain(`create-tx error - error parsing parameters - error parsing metadata`)
            chai.expect(tx).to.contain(`cannot unmarshal number into Go struct field .TradePath of type string`)

        }).timeout(config.timeoutTx);

        it("STEP_TradeWithRouteNull", async () => {

            tx = await sender.useSdk.swap({
                tokenSell: sellTokenID,
                tokenBuy: buyTokenID,
                amount: amountTrade,
                tradePath: [],
                tradingFee: estimateTradeObject.Result.FeeToken.Fee,
                feeToken: sellTokenID,
                minAcceptableAmount: estimateTradeObject.Result.FeeToken.MaxGet,
            })

            addDebug(tx)
            let response = await coinServiceApi.gettxstatus({ tx })
            chai.expect(response.data.ErrMsg).to.contain(`Reject not sansity tx transaction's sansity ${tx} is error -3000: Invalid sanity data for privacy Token Invalid trade request - path empty`)

        }).timeout(config.timeoutTx);

        it("STEP_TradeWithRouteInCorrect", async () => {

            tx = await sender.useSdk.swap({
                tokenSell: sellTokenID,
                tokenBuy: buyTokenID,
                amount: amountTrade,
                tradePath: [poolID],
                tradingFee: estimateTradeObject.Result.FeeToken.Fee,
                feeToken: sellTokenID,
                minAcceptableAmount: estimateTradeObject.Result.FeeToken.MaxGet,
            })
            addDebug(tx)
            let response = await coinServiceApi.gettxstatus({ tx })
            chai.expect(response.data.ErrMsg).to.contain(`Reject invalid metadata with blockchain validate metadata of tx ${tx} with blockchain error Not found poolPairID`)


        }).timeout(config.timeoutTx);
    });

    describe("TC004_TradeWithInvalidSellAmount", async () => {
        let sellTokenID = TOKEN.USDT_UT
        let buyTokenID = TOKEN.PRV
        let amountTrade = 0
        let estimateTradeObject
        let tx

        it("STEP_InitData", async () => {
            await sender.initSdkInstance();

            amountTrade = await GenAction.randomNumber(1000)
        }).timeout(config.timeoutApi);

        it("STEP_CoinServiceEstimateTrade", async () => {
            let response = await coinServiceApi.estimateTrade({
                tokenSell: sellTokenID,
                tokenBuy: buyTokenID,
                sellAmount: amountTrade
            })
            estimateTradeObject = response.data
        });

        it("STEP_TradeAmountIsString", async () => {
            tx = await sender.useSdk.swap({
                tokenSell: sellTokenID,
                tokenBuy: buyTokenID,
                amount: "abc",
                tradePath: estimateTradeObject.Result.FeeToken.Route,
                tradingFee: estimateTradeObject.Result.FeeToken.Fee,
                feeToken: sellTokenID,
                minAcceptableAmount: estimateTradeObject.Result.FeeToken.MaxGet,
            })
            addDebug(tx)
            chai.expect(tx).to.contain(`strconv.ParseUint: parsing "abc": invalid syntax`)

        }).timeout(config.timeoutTx);

        it("STEP_TradeAmountAboveBalance", async () => {
            let balanceAll = await sender.useSdk.getBalanceAll()
            let balanceTokenSell = balanceAll[sellTokenID]
            let amountTrade = balanceTokenSell + 1000

            tx = await sender.useSdk.swap({
                tokenSell: sellTokenID,
                tokenBuy: buyTokenID,
                amount: amountTrade,
                tradePath: estimateTradeObject.Result.FeeToken.Route,
                tradingFee: estimateTradeObject.Result.FeeToken.Fee,
                feeToken: sellTokenID,
                minAcceptableAmount: estimateTradeObject.Result.FeeToken.MaxGet,
            })
            addDebug(tx)
            chai.expect(tx).to.contain(`Error while preparing inputs Not enough coin to spend ${amountTrade + estimateTradeObject.Result.FeeToken.Fee}`)

        }).timeout(config.timeoutTx);
    });

    describe("TC005_TradeWithInvalidMinAcceptableAmount", async () => {
        let sellTokenID = TOKEN.USDT_UT
        let buyTokenID = TOKEN.PRV
        let amountTrade = 0
        let estimateTradeObject
        let tx

        it("STEP_InitData", async () => {
            await sender.initSdkInstance();

            amountTrade = await GenAction.randomNumber(1000)
        }).timeout(config.timeoutApi);

        it("STEP_CoinServiceEstimateTrade", async () => {
            let response = await coinServiceApi.estimateTrade({
                tokenSell: sellTokenID,
                tokenBuy: buyTokenID,
                sellAmount: amountTrade
            })
            estimateTradeObject = response.data
        });

        it("STEP_TradeWithMinAcceptableAmountIsTring", async () => {

            tx = await sender.useSdk.swap({
                tokenSell: sellTokenID,
                tokenBuy: buyTokenID,
                amount: amountTrade,
                tradePath: estimateTradeObject.Result.FeeToken.Route,
                tradingFee: estimateTradeObject.Result.FeeToken.Fee,
                feeToken: sellTokenID,
                minAcceptableAmount: "abc",
            })
            chai.expect(tx).to.contain(`strconv.ParseUint: parsing "abc": invalid syntax`)

        }).timeout(config.timeoutTx);

        it("STEP_TradeOverMinAcceptableAmount", async () => {

            tx = await sender.useSdk.swap({
                tokenSell: sellTokenID,
                tokenBuy: buyTokenID,
                amount: amountTrade,
                tradePath: estimateTradeObject.Result.FeeToken.Route,
                tradingFee: estimateTradeObject.Result.FeeToken.Fee,
                feeToken: sellTokenID,
                minAcceptableAmount: estimateTradeObject.Result.FeeToken.MaxGet + 100000,
            })
            addDebug(tx)
            await NODES.Incognito.getTransactionByHashRpc(tx)
            await NODES.Incognito.rpc.waitForTxSwapHaveStatus(tx)

        }).timeout(config.timeoutTx);

        it("STEP_CheckTradeFail", async () => {
            let response = await NODES.Incognito.rpc.pdexv3_getTradeStatus(tx)

            chai.expect(response.data.Result.Status).to.equal(0)
            chai.expect(response.data.Result.BuyAmount).to.equal(0)
            chai.expect(response.data.Result.TokenToBuy).to.equal('0000000000000000000000000000000000000000000000000000000000000000')

        }).timeout(config.timeoutTx);
    });

    describe("TC006_TradeWithInvalidTradingFee", async () => {
        let sellTokenID = TOKEN.USDT_UT
        let buyTokenID = TOKEN.PRV
        let amountTrade = 0
        let estimateTradeObject
        let tx

        it("STEP_InitData", async () => {
            await sender.initSdkInstance();

            amountTrade = await GenAction.randomNumber(1000)
        }).timeout(config.timeoutApi);

        it("STEP_CoinServiceEstimateTrade", async () => {
            let response = await coinServiceApi.estimateTrade({
                tokenSell: sellTokenID,
                tokenBuy: buyTokenID,
                sellAmount: amountTrade
            })
            estimateTradeObject = response.data

        });

        it("STEP_TradeWithFeeIsTring", async () => {
            tx = await sender.useSdk.swap({
                tokenSell: sellTokenID,
                tokenBuy: buyTokenID,
                amount: amountTrade,
                tradePath: estimateTradeObject.Result.FeeToken.Route,
                tradingFee: "abc",
                feeToken: sellTokenID,
                minAcceptableAmount: estimateTradeObject.Result.FeeToken.MaxGet,
            })
            addDebug(tx)
            chai.expect(tx).to.contain(`strconv.ParseUint: parsing "abc": invalid syntax`)
        }).timeout(config.timeoutTx);

        it("STEP_TradeWithFeeEqual0", async () => {
            tx = await sender.useSdk.swap({
                tokenSell: sellTokenID,
                tokenBuy: buyTokenID,
                amount: amountTrade,
                tradePath: estimateTradeObject.Result.FeeToken.Route,
                tradingFee: 0,
                feeToken: sellTokenID,
                minAcceptableAmount: estimateTradeObject.Result.FeeToken.MaxGet,
            })
            addDebug(tx)
            await NODES.Incognito.getTransactionByHashRpc(tx)
            await NODES.Incognito.rpc.waitForTxSwapHaveStatus(tx)

        }).timeout(config.timeoutTx);

        it("STEP_CheckTradeFail", async () => {
            let response = await NODES.Incognito.rpc.pdexv3_getTradeStatus(tx)

            chai.expect(response.data.Result.Status).to.equal(0)
            chai.expect(response.data.Result.BuyAmount).to.equal(0)
            chai.expect(response.data.Result.TokenToBuy).to.equal('0000000000000000000000000000000000000000000000000000000000000000')

        }).timeout(config.timeoutTx);
    });

    describe("TC007_TradeWithInvalidTokenSell", async () => {
        let sellTokenID = TOKEN.USDT_UT
        let buyTokenID = TOKEN.PRV
        let amountTrade = 0
        let estimateTradeObject
        let tx

        it("STEP_InitData", async () => {
            await sender.initSdkInstance();

            amountTrade = await GenAction.randomNumber(1000)
        }).timeout(config.timeoutApi);

        it("STEP_CoinServiceEstimateTrade", async () => {
            let response = await coinServiceApi.estimateTrade({
                tokenSell: sellTokenID,
                tokenBuy: buyTokenID,
                sellAmount: amountTrade
            })
            estimateTradeObject = response.data

        });

        it("STEP_TradeWithSellTokenAbc", async () => {
            tx = await sender.useSdk.swap({
                tokenSell: "abc",
                tokenBuy: buyTokenID,
                amount: amountTrade,
                tradePath: estimateTradeObject.Result.FeeToken.Route,
                tradingFee: estimateTradeObject.Result.FeeToken.Fee,
                feeToken: sellTokenID,
                minAcceptableAmount: estimateTradeObject.Result.FeeToken.MaxGet,
            })
            addDebug(tx)

            //TODO
        }).timeout(config.timeoutTx);
    });

    describe("TC008_TradeWithInvalidTokenBuy", async () => {
        let sellTokenID = TOKEN.USDT_UT
        let buyTokenID = TOKEN.PRV
        let amountTrade = 0
        let estimateTradeObject
        let tx

        it("STEP_InitData", async () => {
            await sender.initSdkInstance();

            amountTrade = await GenAction.randomNumber(1000)
        }).timeout(config.timeoutApi);

        it("STEP_CoinServiceEstimateTrade", async () => {
            let response = await coinServiceApi.estimateTrade({
                tokenSell: sellTokenID,
                tokenBuy: buyTokenID,
                sellAmount: amountTrade
            })
            estimateTradeObject = response.data

        });

        it("STEP_TradeWithBuyTokenNotValid", async () => {

            tx = await sender.useSdk.swap({
                tokenSell: sellTokenID,
                tokenBuy: "abc",
                amount: amountTrade,
                tradePath: estimateTradeObject.Result.FeeToken.Route,
                tradingFee: estimateTradeObject.Result.FeeToken.Fee,
                feeToken: sellTokenID,
                minAcceptableAmount: estimateTradeObject.Result.FeeToken.MaxGet,
            })
            addDebug(tx)
            await NODES.Incognito.getTransactionByHashRpc(tx)
            await NODES.Incognito.rpc.waitForTxSwapHaveStatus(tx)

        }).timeout(config.timeoutTx);

        it("STEP_CheckTradeFail", async () => {
            let response = await NODES.Incognito.rpc.pdexv3_getTradeStatus(tx)

            chai.expect(response.data.Result.Status).to.equal(0)
            chai.expect(response.data.Result.BuyAmount).to.equal(0)
            chai.expect(response.data.Result.TokenToBuy).to.equal('0000000000000000000000000000000000000000000000000000000000000000')

        }).timeout(config.timeoutTx);
    });

    describe("TC009_TradeWithInvalidTokenFee", async () => {
        let sellTokenID = TOKEN.USDT_UT
        let buyTokenID = TOKEN.PRV
        let amountTrade = 0
        let estimateTradeObject
        let tx

        it("STEP_InitData", async () => {
            await sender.initSdkInstance();

            amountTrade = await GenAction.randomNumber(1000)
        }).timeout(config.timeoutApi);

        it("STEP_CoinServiceEstimateTrade", async () => {
            let response = await coinServiceApi.estimateTrade({
                tokenSell: sellTokenID,
                tokenBuy: buyTokenID,
                sellAmount: amountTrade
            })
            estimateTradeObject = response.data

        });

        it("STEP_TradeWithTokenFeeIsNumber", async () => {

            tx = await sender.useSdk.swap({
                tokenSell: sellTokenID,
                tokenBuy: buyTokenID,
                amount: amountTrade,
                tradePath: estimateTradeObject.Result.FeeToken.Route,
                tradingFee: estimateTradeObject.Result.FeeToken.Fee,
                feeToken: 123,
                minAcceptableAmount: estimateTradeObject.Result.FeeToken.MaxGet,
            })
            addDebug(tx)
            chai.expect(tx).to.contain(`Validating "createAndSendOrderRequestTx-feetoken" failed: Must be string. Found 123 (type of number)`)


        }).timeout(config.timeoutTx);

        it("STEP_TradeWithTokenFeeNull", async () => {
            tx = await sender.useSdk.swap({
                tokenSell: sellTokenID,
                tokenBuy: buyTokenID,
                amount: amountTrade,
                tradePath: estimateTradeObject.Result.FeeToken.Route,
                tradingFee: estimateTradeObject.Result.FeeToken.Fee,
                feeToken: null,
                minAcceptableAmount: estimateTradeObject.Result.FeeToken.MaxGet,
            })
            addDebug(tx)

            assert.include(tx, `Validating "createAndSendOrderRequestTx-feetoken" failed: Required. Found null (type of object)`)
        }).timeout(config.timeoutTx);

        it("STEP_TradeWithTokenFeeNotBelongSellToken", async () => {
            tx = await sender.useSdk.swap({
                tokenSell: sellTokenID,
                tokenBuy: buyTokenID,
                amount: amountTrade,
                tradePath: estimateTradeObject.Result.FeeToken.Route,
                tradingFee: estimateTradeObject.Result.FeeToken.Fee,
                feeToken: TOKEN.BTC,
                minAcceptableAmount: estimateTradeObject.Result.FeeToken.MaxGet,
            })
            addDebug(tx)

            assert.include(tx, `Validating "createAndSendOrderRequestTx-feetoken" failed: Required. Found null (type of object)`)
        }).timeout(config.timeoutTx);


    });


});
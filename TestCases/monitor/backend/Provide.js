const config = require('../../../constant/config');
const chainCommonFunction = require('../../../constant/chainCommonFunction');
const commonFunction = require('../../../constant/commonFunction');
const validateSchemaCommand = require('../../../schemas/validateSchemaCommand');
const coinServiceApi_schemas = require('../../../schemas/coinServiceApi_schemas');
const addingContent = require('../../../lib/Utils/AddingContent');
let chai = require('chai');
const { IncAccount } = require('../../../lib/Incognito/Account/Account');
const { IncNode } = require('../../../lib/Incognito/IncNode');
const { CoinServiceApi } = require('../../../lib/Incognito/CoinService/CoinServiceApi');
const { BackendApi } = require('../../../lib/Incognito/BackendApi');
const { ENV } = require('../../../global');

//init
let listAccount = {
    "main7": "112t8rniy8xiBEew6XBHHHv45SoSHyGyFKZ1MktSYvVS9phVseJJJA3qgLhD9QwbSvamoeTMca1rT4ih1VCFvy3bbfHXxjJe4q9t3hzvfaDr",
    "2": "112t8rnY86q7sNHHZo9XEJMWgVds7kM913hc6pxqVrqzSA7LdMVZX6vgttLzGqNeHAjPofB5wHfNeKBGs6NZF7ZPfE5cge8ZC6TgtJPbuLru",
    "3": "112t8rnaoYv9FppLCA7u84ay2K6ybXcCwykzCLoLT1bD9jXiSpbh8DpTKuaJD8t9Myvk2yR1hHxAu7Ac9gmox1NpKqX5ooTefprXjE1s1nd3",
    "cjn": "112t8rnXMVKgMhGkU7NdjpgTqekHmdczd7XsMHckZH9xiqm2bVtC7JmyJdnvMAERWtQsq6NrXn7Pw8fyTLW3DBdi56M9tCq737gtji5f1CJN",
    "smb": "112t8rnX2kQQbYdwiDm8eTWiac4xq6ioNgmJk17Z8ft4X5id2HmYe8iPqNtZrj87aKD3bE1UqgP11G1q7AVY3FFMEArkfbUwCr7CR2eDgSmb",
    "zxv": "112t8rnXVMJJZzfF1naXvfE9nkTKwUwFWFeh8cfEyViG1vpA8A9khJk3mhyB1hDuJ4RbreDTsZpgJK4YcSxdEpXJKMEd8Vmp5UqKWwBcYzxv"
}
let node = new IncNode(ENV.urlFullNode);
let sender = new IncAccount(listAccount['zxv']).attachTo(node);
let receiver = new IncAccount(listAccount['cjn']).attachTo(node);
let account = {
    privateKey: null,
    otaKey: null
};
let coinServiceApi = new CoinServiceApi();
var backendApi = new BackendApi(ENV.Backend);

describe('[Class] Provide', () => {
    describe('Before_InitData', async () => {
        it('InitData', async () => {
            account.otaKey = sender.otaPrivateK;
            account.privateKey = sender.privateK;
        });
    });

    describe('TC001_GetKeyInfo', async () => {
        it('CallAPI', async () => {
            let response = await coinServiceApi.getKeyInfo({
                otaKey: account.otaKey
            });

            await validateSchemaCommand.validateSchema(coinServiceApi_schemas.getGetKeyInfoSchemas, response.data);
        });
    });

    describe('TC006_SubmitOtaKey', async () => {
        it('CallAPI', async () => {
            let response = await coinServiceApi.submitOtaKey(account.otaKey);
        });
        it.skip('Call RPC Authorize Submit Key', async () => {
            // let responseRPC = await
            await sender.useRpc.submitKeyEnhanced();
        });
    });

    describe('TC007_ProvidePRV', async () => {
        let amountProvide = 0;
        const PRV = '0000000000000000000000000000000000000000000000000000000000000004';

        it('STEP_InitData', async () => {
            amountProvide = await commonFunction.randomNumberInRange(1234000123, 10234000567);
            await sender.initSdkInstance();
            await receiver.initSdkInstance();
        });

        it.skip('STEP_CheckBalanceCli', async () => {
            sender.balanceCLI = await sender.useCli.getBalanceAll();
            await addingContent.addContent('sender.getBalanceAll', sender.balanceCLI);
            sender.oldBalance = sender.balanceCLI;
        }).timeout(180000);

        it.skip('STEP_CheckBalanceSdk', async () => {
            sender.balanceSdk = await sender.useSdk.getBalanceAll();
            await addingContent.addContent('sender.balanceSdk', sender.balanceSdk);
        }).timeout(100000);

        it('STEP_Send Provide', async () => {
            var proof = await sender.useRpc.makeRawTx(receiver, amountProvide);

            // proof = JSON.stringify(proof)
            console.log(`Send PROOF: ${proof.Base58CheckData}`);
            let tx = proof['TxID'];
            let provideResponse = await backendApi.provideSubmitRawData({
                PStakeAddress: sender.paymentK,
                transactionID: proof.TxID,
                base58Proof: proof.Base58CheckData,
                amount: amountProvide
            });
            console.log(`provide response: ${JSON.stringify(provideResponse)}`);

            //"SignPublicKeyEncode": "8a59a648a9cf47168e72e348b98d7bb296c67f7dd2d50cc9e043d2feb40b9cc8", zxv

            // await addingContent.addContent('tx', tx);
            // await chainCommonFunction.waitForTxInBlock(tx);
        }).timeout(50000);

        it.skip('STEP_CompareBalance', async () => {
            await commonFunction.sleep(20000);

            sender.balanceCLI = await sender.useCli.getBalanceAll();
            await addingContent.addContent('sender.balanceCLI', sender.balanceCLI);
            sender.newBalance = sender.balanceCLI;

            receiver.balanceCLI = await receiver.useCli.getBalanceAll();
            await addingContent.addContent('receiver.balanceCLI', receiver.balanceCLI);
            receiver.newBalance = receiver.balanceCLI;

            sender.balanceSdk = await sender.useSdk.getBalanceAll();
            await addingContent.addContent('sender.balanceSdk', sender.balanceSdk);

            receiver.balanceSdk = await receiver.useSdk.getBalanceAll();
            await addingContent.addContent('receiver.balanceSdk', receiver.balanceSdk);

            chai.expect(sender.balanceCLI[PRV]).to.equal(sender.balanceSdk[PRV]);
            chai.expect(receiver.balanceCLI[PRV]).to.equal(receiver.balanceSdk[PRV]);

            chai.expect(sender.newBalance[PRV]).to.equal(sender.oldBalance[PRV] - amountTransfer - 100);
            chai.expect(receiver.newBalance[PRV]).to.equal(receiver.oldBalance[PRV] + amountTransfer);
        }).timeout(100000);
    });
});
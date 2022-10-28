const validateSchemaCommand = require("../../../schemas/validateSchemaCommand");
const coinServiceApi_schemas = require("../../../schemas/coinServiceApi_schemas");
let chai = require("chai");
const { CoinServiceApi } = require("../../../lib/Incognito/CoinServiceApi");
// const { CoinServiceApi } = require("../../../lib/Incognito/CoinService/CoinServiceApi");

describe("[Class] Market", () => {
    const tokenID_ETH_UT = "3ee31eba6376fc16cadb52c8765f20b6ebff92c0b1c5ab5fc78c8c25703bb19e";
    const pool_PRV_USDT =
        "0000000000000000000000000000000000000000000000000000000000000004-076a4423fa20922526bd50b0d7b0dc1c593ce16e15ba141ede5fb5a28aa3f229-33a8ceae6db677d9860a6731de1a01de7e1ca7930404d7ec9ef5028f226f1633";
    let coinServiceApi = new CoinServiceApi();

    //Testcase
    describe("TC001_TokenList", async () => {
        it("TC001_TokenList", async () => {
            let response = await coinServiceApi.tokenList();

            await validateSchemaCommand.validateSchema(coinServiceApi_schemas.getTokenListSchemas, response.data);

            chai.expect(response.data.Result).to.have.lengthOf.above(1);

            for (const item of response.data.Result) {
                if (item.TokenID == tokenID_ETH_UT) {
                    chai.expect(item.PriceUsd).to.be.above(0);
                    chai.expect(item.PricePrv).to.be.above(0);
                    chai.expect(item.PercentChange24h).to.not.equal("");
                    chai.expect(item.Verified).to.equal(true);
                    chai.expect(item.DefaultPoolPair).to.not.equal("");
                    chai.expect(item.DefaultPairToken).to.not.equal("");
                }
            }
        });
    });

    describe("TC002_ListPool", async () => {
        it("STEP_CallApiAndCheckSchemas", async () => {
            let response = await coinServiceApi.listPools();

            await validateSchemaCommand.validateSchema(coinServiceApi_schemas.getLitsPoolSchemas, response.data);

            chai.expect(response.data.Result).to.have.lengthOf.above(1);

            for (const item of response.data.Result) {
                if (item.PoolID == pool_PRV_USDT) {
                    chai.expect(item.AMP).to.be.equal(22000);
                    chai.expect(item.PriceChange24h).to.not.equal(0);
                    chai.expect(item.IsVerify).to.equal(true);
                    chai.expect(item.Volume).to.be.above(0);
                    chai.expect(item.Price).to.be.above(0);
                }
            }
        });
    });

    describe("TC003_ListPair", async () => {
        it("STEP_CallApiAndCheckSchemas", async () => {
            let response = await coinServiceApi.listPairs();

            await validateSchemaCommand.validateSchema(coinServiceApi_schemas.getLitsPairSchemas, response.data);

            chai.expect(response.data.Result).to.have.lengthOf.above(1);
        });
    });
});

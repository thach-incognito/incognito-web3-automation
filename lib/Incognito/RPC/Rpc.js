const { ENV } = require("../../../global");
const { BaseRpc } = require("../../Base/BaseRpc");
const { TOKEN } = require("../Constants");
const { wait } = require("../../Utils/Timer")

class IncRpc extends BaseRpc {
    constructor(obj = ENV.Testbed.Incognito.FullNode) {
        super();
        super.url = (typeof obj == "object") ? obj.url : obj
    }

    async getBeaconBestStateDetail() {
        return await this.withMethod("getbeaconbeststatedetail").withParams([]).execute()
    }

    async getBeaconBestState() {
        return await this.withMethod("getbeaconbeststate").withParams([]).execute()
    }

    async getTxByHash(txID) {
        const { TxRpcResponse } = require("./ResponseGetTx")
        return new TxRpcResponse(await this.withMethod("gettransactionbyhash").withParams([txID])
            .execute())
    }

    async getBalance(privateKey, tokenId = TOKEN) {
        let res = await this.withMethod("getbalanceprivacycustomtoken").withParams([privateKey, tokenId]).execute()
        return res.result
    }

    async createRawTx(senderPrivateK, recevierPaymentK, amount, fee = 10, privacy = 1) {
        let receive = {}
        receive[recevierPaymentK] = amount
        let res = await this.withMethod("createtransaction").withParams([senderPrivateK, receive, fee, privacy]).execute()
        return res.result
    }

    async getMemPool() {
        return await this.withMethod("getmempoolinfo").execute()
    }

    async getBlockchainInfo() {
        return await this.withMethod("getblockchaininfo").execute()
    }

    async getBeaconBlock(height, level = 2) {
        return await this.withMethod("retrievebeaconblockbyheight").withParams([height, level]).execute()
    }

    async submitKey(key) {
        return await this.withMethod("submitkey").withParams([key]).execute()
    }

    async submitKeyEnhanced({ otaKey, accessToken, fromHeight = 0, reIndex = true }) {
        return await this.withMethod("authorizedsubmitkey")
            .withParams([otaKey, accessToken, fromHeight, reIndex]).execute()
    }

    async getSubmitKeyInfo(otaKey) {
        return await this.withMethod("getkeysubmissioninfo").withParams([otaKey]).execute()
    }

    async generateportalshieldmultisigaddress(paymentAddress, tokenID) {
        return await this.withMethod("generateportalshieldmultisigaddress").withParams(
            [{
                "IncAddressStr": paymentAddress,
                "TokenID": tokenID
            }]
        ).execute()
    }

    async pdexv3_getTradeStatus(tx) {
        return await this.withMethod("pdexv3_getTradeStatus").withParams(
            [tx]
        ).execute()
    }

    async waitForTxSwapHaveStatus(tx, checkInterval = 5, timeout = 90) {

        while (true) {
            let response = await this.pdexv3_getTradeStatus(tx)
            if (response && response.data && response.data.Result && response.data.Result.TokenToBuy) {
                break
            }
            if (timeout <= 0) { break }
            timeout -= checkInterval
            await wait(checkInterval)
        }
    }

    async pdexv3_getState() {
        return await this.withMethod("pdexv3_getState").withParams(
            [{
                "BeaconHeight": 0,
                "Filter": {
                    "Key": "All",
                    "Verbosity": 1,
                    "ID": "1"
                }
            }]
        ).execute()
    }

    async pdexv3_getAddOrderStatus(tx) {
        return await this.withMethod("pdexv3_getAddOrderStatus").withParams(
            [tx]
        ).execute()
    }

    async pdexv3_getWithdrawOrderStatus(tx) {
        return await this.withMethod("pdexv3_getWithdrawOrderStatus").withParams(
            [tx]
        ).execute()
    }

    async pdexv3_getContributionStatus(tx) {
        return await this.withMethod("pdexv3_getContributionStatus").withParams(
            [tx]
        ).execute()
    }

    async pdexv3_getWithdrawLiquidityStatus(tx) {
        return await this.withMethod("pdexv3_getWithdrawLiquidityStatus").withParams(
            [tx]
        ).execute()
    }

    async pdexv3_getWithdrawalLPFeeStatus(tx) {
        return await this.withMethod("pdexv3_getWithdrawalLPFeeStatus").withParams(
            [{ "ReqTxID": tx }]
        ).execute()
    }
}


module.exports = { IncRpc };
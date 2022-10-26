const { BaseApi } = require("../Base/BaseApi");
const addingContent = require("../../testbase/addingContent");

class WebServiceApi extends BaseApi {

    async genShieldAddress({
        addressType,
        network,
        privacyTokenAddress,
        walletAddress
    }) {
        let path = `genshieldaddress`
        let body = {
            "Network": network,
            "AddressType": addressType,
            "WalletAddress": walletAddress,
            "PrivacyTokenAddress": privacyTokenAddress
        }
        return this.post(path, body)
    }

    async genUnshieldAddress({
        network,
        requestedAmount,
        addressType,
        incognitoAmount,
        paymentAddress,
        privacyTokenAddress,
        walletAddress,
        unifiedTokenID
    }) {
        let path = `genunshieldaddress`
        let body = {
            "Network": network,
            "RequestedAmount": requestedAmount,
            "AddressType": addressType,
            "IncognitoAmount": incognitoAmount,
            "PaymentAddress": paymentAddress,
            "PrivacyTokenAddress": privacyTokenAddress,
            "WalletAddress": walletAddress,
            "UnifiedTokenID": unifiedTokenID
        }
        return this.post(path, body)
    }

    async swapStatus({
        listTx
    }) {
        let path = `papps/swapstatus`
        let body = { "TxList": listTx }
        return this.post(path, body)
    }

    async estimateSwapFee({
        amount,
        fromToken,
        network,
        slippage,
        toToken
    }) {
        let path = `papps/estimateswapfee`
        let body = {
            "Network": network,
            "Amount": amount,
            "FromToken": fromToken,
            "ToToken": toToken,
            "Slippage": slippage
        }
        addingContent.addContent(
            'body',
            body
        )
        return this.post(path, body)
    }

    async otaGenShieldAddress({
        network,
        currencyType,
        addressType,
        requestedAmount,
        paymentAddress,
        walletAddress,
        privacyTokenAddress
    }) {
        let path = `genshieldaddress`
        let body = {
            "Network": network,
            "CurrencyType": currencyType,
            "AddressType": addressType,
            "RequestedAmount": requestedAmount,
            "PaymentAddress": paymentAddress,
            "WalletAddress": walletAddress,
            "PrivacyTokenAddress": privacyTokenAddress,
        }
        return this.post(path, body)
    }
}


module.exports = { WebServiceApi }
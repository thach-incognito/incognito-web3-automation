 const getOtaGenerateSchemas = {
     "$id": "otaGenerateSchemas",
     "type": "object",
     "properties": {
         "Result": {
             "type": "object",
             "properties": {
                 "ID": {
                     "type": "integer"
                 },
                 "Address": {
                     "type": "string"
                 },
                 "ExpiredAt": {
                     "type": "string"
                 },
                 "EstimateFee": {
                     "type": "integer"
                 },
                 "TokenFee": {
                     "type": "integer"
                 },
                 "Decentralized": {
                     "type": "integer"
                 }
             },
             "required": [
                 "ID",
                 "Address",
                 "ExpiredAt",
                 "EstimateFee",
                 "TokenFee",
                 "Decentralized"
             ]
         },
         "Error": {
             "type": "null"
         }
     },
     "required": [
         "Result",
         "Error"
     ]
 };

 const authenProfileSchemas = {
     "$id": "authenProfileSchemas",
     "type": "object",
     "$ref": "#/definitions/Welcome10",
     "definitions": {
         "Welcome10": {
             "type": "object",
             "additionalProperties": false,
             "properties": {
                 "Result": {
                     "$ref": "#/definitions/Result"
                 },
                 "Error": {
                     "type": "null"
                 }
             },
             "required": [
                 "Error",
                 "Result"
             ],
             "title": "Welcome10"
         },
         "Result": {
             "type": "object",
             "additionalProperties": false,
             "properties": {
                 "ID": {
                     "type": "integer"
                 },
                 "UserName": {
                     "type": "string"
                 },
                 "FirstName": {
                     "type": "string"
                 },
                 "LastName": {
                     "type": "string"
                 },
                 "Email": {
                     "type": "string"
                 },
                 "PaymentAddress": {
                     "type": "string"
                 },
                 "Bio": {
                     "type": "string"
                 },
                 "Permissions": {
                     "type": "string"
                 },
                 "RoleID": {
                     "type": "integer"
                 }
             },
             "required": [
                 "Bio",
                 "Email",
                 "FirstName",
                 "ID",
                 "LastName",
                 "PaymentAddress",
                 "Permissions",
                 "RoleID",
                 "UserName"
             ],
             "title": "Result"
         }
     }
 };

 const disableFunctionConfigSchemas = {
     "$id": "authenProfileSchemas",
     "type": "object",
     "$ref": "#/definitions/Welcome3",
     "definitions": {
         "Welcome3": {
             "type": "object",
             "additionalProperties": false,
             "properties": {
                 "Result": {
                     "type": "object",
                     "additionalProperties": {
                         "$ref": "#/definitions/Result"
                     }
                 },
                 "Error": {
                     "type": "null"
                 }
             },
             "required": [
                 "Error",
                 "Result"
             ],
             "title": "Welcome3"
         },
         "Result": {
             "type": "object",
             "additionalProperties": false,
             "properties": {
                 "ID": {
                     "type": "integer"
                 },
                 "CreatedAt": {
                     "type": "string",
                 },
                 "UpdatedAt": {
                     "type": "string",
                 },
                 "DeletedAt": {
                     "type": "null"
                 },
                 "Name": {
                     "type": "string"
                 },
                 "Descriptions": {
                     "type": "string"
                 },
                 "Disable": {
                     "type": "boolean"
                 },
                 "Message": {
                     "type": "string"
                 }
             },
             "required": [
                 "CreatedAt",
                 "DeletedAt",
                 "Descriptions",
                 "Disable",
                 "ID",
                 "Message",
                 "Name",
                 "UpdatedAt"
             ],
             "title": "Result"
         }
     }
 };

 const lastVersionSchemas = {
     "$id": "authenProfileSchemas",
     "type": "object",
     "$ref": "#/definitions/Welcome3",
     "definitions": {
         "Welcome3": {
             "type": "object",
             "additionalProperties": false,
             "properties": {
                 "Result": {
                     "$ref": "#/definitions/Result"
                 },
                 "Error": {
                     "type": "null"
                 }
             },
             "required": [
                 "Error",
                 "Result"
             ],
             "title": "Welcome3"
         },
         "Result": {
             "type": "object",
             "additionalProperties": false,
             "properties": {
                 "Description": {
                     "type": "string"
                 },
                 "Version": {
                     "type": "string"
                 },
                 "Link": {
                     "type": "string",
                 },
                 "Platform": {
                     "type": "string"
                 },
                 "CreatedAt": {
                     "type": "string",
                 }
             },
             "required": [
                 "CreatedAt",
                 "Description",
                 "Link",
                 "Platform",
                 "Version"
             ],
             "title": "Result"
         }
     }
 };

 const tradeTokenSchemas = {
     "$id": "tradeTokenSchemas",
     "type": "object",
     "$ref": "#/definitions/Welcome6",
     "definitions": {
         "Welcome6": {
             "type": "object",
             "additionalProperties": false,
             "properties": {
                 "Result": {
                     "type": "array",
                     "items": {
                         "$ref": "#/definitions/Result"
                     }
                 },
                 "Error": {
                     "type": "null"
                 }
             },
             "required": [
                 "Error",
                 "Result"
             ],
             "title": "Welcome6"
         },
         "Result": {
             "type": "object",
             "additionalProperties": false,
             "properties": {
                 "ID": {
                     "type": "string"
                 },
                 "ContractID": {
                     "type": "string"
                 },
                 "ContractIDGetRate": {
                     "type": "string"
                 },
                 "Name": {
                     "type": "string"
                 },
                 "Symbol": {
                     "type": "string"
                 },
                 "Decimals": {
                     "type": "integer"
                 },
                 "PDecimals": {
                     "type": "integer"
                 },
                 "Protocol": {
                     "$ref": "#/definitions/Protocol"
                 },
                 "PricePrv": {
                     "type": "number"
                 },
                 "Verify": {
                     "type": "boolean"
                 },
                 "IsPopular": {
                     "type": "boolean"
                 },
                 "Priority": {
                     "type": "integer"
                 },
                 "DappID": {
                     "type": "integer"
                 },
                 "CurrencyType": {
                     "type": "integer"
                 },
                 "NetworkName": {
                     "type": "string"
                 },
                 "NetworkID": {
                     "type": "integer"
                 },
                 "MovedUnifiedToken": {
                     "type": "boolean"
                 }
             },
             "required": [
                 "ContractID",
                 "ContractIDGetRate",
                 "CurrencyType",
                 "DappID",
                 "Decimals",
                 "ID",
                 "IsPopular",
                 "MovedUnifiedToken",
                 "Name",
                 "NetworkID",
                 "NetworkName",
                 "PDecimals",
                 "PricePrv",
                 "Priority",
                 "Protocol",
                 "Symbol",
                 "Verify"
             ],
             "title": "Result"
         },
         "Protocol": {
             "type": "string",
             "enum": [
                 "pancake"
             ],
             "title": "Protocol"
         }
     }
 };

 const uniSwapTokenSchemas = {
     "$id": "uniSwapTokenSchemas",
     "type": "object",
     "$ref": "#/definitions/Welcome3",
     "definitions": {
         "Welcome3": {
             "type": "object",
             "additionalProperties": false,
             "properties": {
                 "Result": {
                     "type": "array",
                     "items": {
                         "$ref": "#/definitions/Result"
                     }
                 },
                 "Error": {
                     "type": "null"
                 }
             },
             "required": [
                 "Error",
                 "Result"
             ],
             "title": "Welcome3"
         },
         "Result": {
             "type": "object",
             "additionalProperties": false,
             "properties": {
                 "ID": {
                     "type": "string"
                 },
                 "ContractID": {
                     "type": "string"
                 },
                 "ContractIDGetRate": {
                     "type": "string"
                 },
                 "Name": {
                     "type": "string"
                 },
                 "Symbol": {
                     "type": "string"
                 },
                 "Decimals": {
                     "type": "integer"
                 },
                 "PDecimals": {
                     "type": "integer"
                 },
                 "Protocol": {
                     "$ref": "#/definitions/Protocol"
                 },
                 "PricePrv": {
                     "type": "number"
                 },
                 "Verify": {
                     "type": "boolean"
                 },
                 "IsPopular": {
                     "type": "boolean"
                 },
                 "Priority": {
                     "type": "integer"
                 },
                 "DappID": {
                     "type": "integer"
                 },
                 "CurrencyType": {
                     "type": "integer"
                 },
                 "NetworkName": {
                     "type": "string"
                 },
                 "NetworkID": {
                     "type": "integer"
                 },
                 "MovedUnifiedToken": {
                     "type": "boolean"
                 }
             },
             "required": [
                 "ContractID",
                 "ContractIDGetRate",
                 "CurrencyType",
                 "DappID",
                 "Decimals",
                 "ID",
                 "IsPopular",
                 "MovedUnifiedToken",
                 "Name",
                 "NetworkID",
                 "NetworkName",
                 "PDecimals",
                 "PricePrv",
                 "Priority",
                 "Protocol",
                 "Symbol",
                 "Verify"
             ],
             "title": "Result"
         },
         "Protocol": {
             "type": "string",
             "enum": [
                 "uniswap"
             ],
             "title": "Protocol"
         }
     }
 };

 const curveTokenSchemas = {
     "$id": "curveTokenSchemas",
     "type": "object",
     "$ref": "#/definitions/Welcome6",
     "definitions": {
         "Welcome6": {
             "type": "object",
             "additionalProperties": false,
             "properties": {
                 "Result": {
                     "type": "array",
                     "items": {
                         "$ref": "#/definitions/Result"
                     }
                 },
                 "Error": {
                     "type": "null"
                 }
             },
             "required": [
                 "Error",
                 "Result"
             ],
             "title": "Welcome6"
         },
         "Result": {
             "type": "object",
             "additionalProperties": false,
             "properties": {
                 "ID": {
                     "type": "string"
                 },
                 "ContractID": {
                     "type": "string"
                 },
                 "ContractIDGetRate": {
                     "type": "string"
                 },
                 "Name": {
                     "type": "string"
                 },
                 "Symbol": {
                     "type": "string"
                 },
                 "Decimals": {
                     "type": "integer"
                 },
                 "PDecimals": {
                     "type": "integer"
                 },
                 "Protocol": {
                     "type": "string"
                 },
                 "PricePrv": {
                     "type": "number"
                 },
                 "Verify": {
                     "type": "boolean"
                 },
                 "IsPopular": {
                     "type": "boolean"
                 },
                 "Priority": {
                     "type": "integer"
                 },
                 "DappID": {
                     "type": "integer"
                 },
                 "CurrencyType": {
                     "type": "integer"
                 },
                 "NetworkName": {
                     "type": "string"
                 },
                 "NetworkID": {
                     "type": "integer"
                 },
                 "MovedUnifiedToken": {
                     "type": "boolean"
                 }
             },
             "required": [
                 "ContractID",
                 "ContractIDGetRate",
                 "CurrencyType",
                 "DappID",
                 "Decimals",
                 "ID",
                 "IsPopular",
                 "MovedUnifiedToken",
                 "Name",
                 "NetworkID",
                 "NetworkName",
                 "PDecimals",
                 "PricePrv",
                 "Priority",
                 "Protocol",
                 "Symbol",
                 "Verify"
             ],
             "title": "Result"
         }
     }
 };

 const tradeHistorySchemas = {
     "$id": "tradeHistorySchemas",
     "type": "object",
     "$ref": "#/definitions/Welcome8",
     "definitions": {
         "Welcome8": {
             "type": "object",
             "additionalProperties": false,
             "properties": {
                 "Result": {
                     "$ref": "#/definitions/Result"
                 },
                 "Error": {
                     "type": "null"
                 }
             },
             "required": [
                 "Error",
                 "Result"
             ],
             "title": "Welcome8"
         },
         "Result": {
             "type": "object",
             "additionalProperties": false,
             "properties": {
                 "History": {
                     "type": "array",
                     "items": {
                         "$ref": "#/definitions/History"
                     }
                 },
                 "Limit": {
                     "type": "integer"
                 },
                 "Page": {
                     "type": "integer"
                 },
                 "Total": {
                     "type": "integer"
                 }
             },
             "required": [
                 "History",
                 "Limit",
                 "Page",
                 "Total"
             ],
             "title": "Result"
         },
         "History": {
             "type": "object",
             "additionalProperties": false,
             "properties": {
                 "id": {
                     "type": "integer"
                 },
                 "userID": {
                     "type": "integer"
                 },
                 "walletAddress": {
                     "type": "string"
                 },
                 "sellTokenId": {
                     "type": "string"
                 },
                 "buyTokenId": {
                     "type": "string"
                 },
                 "srcSymbol": {
                     "type": "string"
                 },
                 "destSymbol": {
                     "type": "string"
                 },
                 "srcContractAddress": {
                     "type": "string"
                 },
                 "destContractAddress": {
                     "type": "string"
                 },
                 "amount": {
                     "type": "string",
                 },
                 "mintAccept": {
                     "type": "string",
                 },
                 "amountOut": {
                     "type": "string",

                 },
                 "tradingPath": {
                     "type": "array",
                     "items": {
                         "type": "string"
                     }
                 },
                 "statusCode": {
                     "type": "integer"
                 },
                 "status": {
                     "type": "string"
                 },
                 "statusDetail": {
                     "type": "string"
                 },
                 "feeToken": {
                     "type": "string"
                 },
                 "fee": {
                     "type": "string"
                 },
                 "feeLevel": {
                     "type": "integer"
                 },
                 "requestTx": {
                     "type": "string"
                 },
                 "submitProofTx": {
                     "type": "string"
                 },
                 "executeSwapTx": {
                     "type": "string"
                 },
                 "withdrawTx": {
                     "type": "string"
                 },
                 "mintTx": {
                     "type": "string"
                 },
                 "requestime": {
                     "type": "integer"
                 },
                 "respondTxs": {
                     "type": "array",
                     "items": {
                         "type": "string"
                     }
                 },
                 "unifiedReward": {
                     "$ref": "#/definitions/UnifiedReward"
                 },
                 "unifiedStatus": {
                     "$ref": "#/definitions/UnifiedStatus"
                 },
                 "refurnTx": {
                     "type": "string"
                 }
             },
             "required": [
                 "amount",
                 "amountOut",
                 "buyTokenId",
                 "destContractAddress",
                 "destSymbol",
                 "executeSwapTx",
                 "fee",
                 "feeLevel",
                 "feeToken",
                 "id",
                 "mintAccept",
                 "requestTx",
                 "requestime",
                 "respondTxs",
                 "sellTokenId",
                 "srcContractAddress",
                 "srcSymbol",
                 "status",
                 "statusCode",
                 "statusDetail",
                 "submitProofTx",
                 "tradingPath",
                 "userID",
                 "walletAddress",
                 "withdrawTx"
             ],
             "title": "History"
         },
         "UnifiedReward": {
             "type": "object",
             "additionalProperties": false,
             "properties": {
                 "Status": {
                     "type": "integer"
                 },
                 "Amount": {
                     "type": "number"
                 },
                 "Reward": {
                     "type": "number"
                 }
             },
             "required": [
                 "Amount",
                 "Reward",
                 "Status"
             ],
             "title": "UnifiedReward"
         },
         "UnifiedStatus": {
             "type": "object",
             "additionalProperties": false,
             "properties": {
                 "Fee": {
                     "type": "number"
                 },
                 "ReceivedAmount": {
                     "type": "number"
                 },
                 "Status": {
                     "type": "integer"
                 }
             },
             "required": [
                 "Fee",
                 "ReceivedAmount",
                 "Status"
             ],
             "title": "UnifiedStatus"
         }
     }
 };

 const uniswapHistorySchemas = {
     "$id": "tradeHistorySchemas",
     "type": "object",
     "$ref": "#/definitions/Welcome8",
     "definitions": {
         "Welcome8": {
             "type": "object",
             "additionalProperties": true,
             "properties": {
                 "Result": {
                     "$ref": "#/definitions/Result"
                 },
                 "Error": {
                     "type": "null"
                 }
             },
             "required": [
                 "Error",
                 "Result"
             ],
             "title": "Welcome8"
         },
         "Result": {
             "type": "object",
             "additionalProperties": true,
             "properties": {
                 "History": {
                     "type": "array",
                     "items": {
                         "$ref": "#/definitions/History"
                     }
                 },
                 "Limit": {
                     "type": "integer"
                 },
                 "Page": {
                     "type": "integer"
                 },
                 "Total": {
                     "type": "integer"
                 }
             },
             "required": [
                 "History",
                 "Limit",
                 "Page",
                 "Total"
             ],
             "title": "Result"
         },
         "History": {
             "type": "object",
             "additionalProperties": true,
             "properties": {
                 "id": {
                     "type": "integer"
                 },
                 "userID": {
                     "type": "integer"
                 },
                 "walletAddress": {
                     "type": "string"
                 },
                 "sellTokenId": {
                     "type": "string"
                 },
                 "buyTokenId": {
                     "type": "string"
                 },
                 "srcSymbol": {
                     "type": "string"
                 },
                 "destSymbol": {
                     "type": "string"
                 },
                 "srcContractAddress": {
                     "type": "string"
                 },
                 "destContractAddress": {
                     "type": "string"
                 },
                 "amount": {
                     "type": "string",
                 },
                 "mintAccept": {
                     "type": "string",
                 },
                 "amountOut": {
                     "type": "string",

                 },
                 "tradingPath": {
                     "type": "array",
                     "items": {
                         "type": "string"
                     }
                 },
                 "statusCode": {
                     "type": "integer"
                 },
                 "status": {
                     "type": "string"
                 },
                 "statusDetail": {
                     "type": "string"
                 },
                 "feeToken": {
                     "type": "string"
                 },
                 "fee": {
                     "type": "string"
                 },
                 "feeLevel": {
                     "type": "integer"
                 },
                 "requestTx": {
                     "type": "string"
                 },
                 "submitProofTx": {
                     "type": "string"
                 },
                 "executeSwapTx": {
                     "type": "string"
                 },
                 "withdrawTx": {
                     "type": "string"
                 },
                 "mintTx": {
                     "type": "string"
                 },
                 "requestime": {
                     "type": "integer"
                 },
                 "respondTxs": {
                     "type": "array",
                     "items": {
                         "type": "string"
                     }
                 },
                 "unifiedReward": {
                     "$ref": "#/definitions/UnifiedReward"
                 },
                 "unifiedStatus": {
                     "$ref": "#/definitions/UnifiedStatus"
                 },
                 "refurnTx": {
                     "type": "string"
                 }
             },
             "required": [
                 "amount",
                 "amountOut",
                 "buyTokenId",
                 "destContractAddress",
                 "destSymbol",
                 "executeSwapTx",
                 "fee",
                 "feeLevel",
                 "feeToken",
                 "id",
                 "mintAccept",
                 "requestTx",
                 "requestime",
                 "respondTxs",
                 "sellTokenId",
                 "srcContractAddress",
                 "srcSymbol",
                 "status",
                 "statusCode",
                 "statusDetail",
                 "submitProofTx",
                 "tradingPath",
                 "userID",
                 "walletAddress",
                 "withdrawTx"
             ],
             "title": "History"
         },
         "UnifiedReward": {
             "type": "object",
             "additionalProperties": false,
             "properties": {
                 "Status": {
                     "type": "integer"
                 },
                 "Amount": {
                     "type": "number"
                 },
                 "Reward": {
                     "type": "number"
                 }
             },
             "required": [
                 "Amount",
                 "Reward",
                 "Status"
             ],
             "title": "UnifiedReward"
         },
         "UnifiedStatus": {
             "type": "object",
             "additionalProperties": false,
             "properties": {
                 "Fee": {
                     "type": "number"
                 },
                 "ReceivedAmount": {
                     "type": "number"
                 },
                 "Status": {
                     "type": "integer"
                 }
             },
             "required": [
                 "Fee",
                 "ReceivedAmount",
                 "Status"
             ],
             "title": "UnifiedStatus"
         }
     }
 };

 const curveHistorySchemas = {
     "$id": "tradeHistorySchemas",
     "type": "object",
     "$ref": "#/definitions/Welcome8",
     "definitions": {
         "Welcome8": {
             "type": "object",
             "additionalProperties": true,
             "properties": {
                 "Result": {
                     "$ref": "#/definitions/Result"
                 },
                 "Error": {
                     "type": "null"
                 }
             },
             "required": [
                 "Error",
                 "Result"
             ],
             "title": "Welcome8"
         },
         "Result": {
             "type": "object",
             "additionalProperties": true,
             "properties": {
                 "History": {
                     "type": "array",
                     "items": {
                         "$ref": "#/definitions/History"
                     }
                 },
                 "Limit": {
                     "type": "integer"
                 },
                 "Page": {
                     "type": "integer"
                 },
                 "Total": {
                     "type": "integer"
                 }
             },
             "required": [
                 "History",
                 "Limit",
                 "Page",
                 "Total"
             ],
             "title": "Result"
         },
         "History": {
             "type": "object",
             "additionalProperties": true,
             "properties": {
                 "id": {
                     "type": "integer"
                 },
                 "userID": {
                     "type": "integer"
                 },
                 "walletAddress": {
                     "type": "string"
                 },
                 "sellTokenId": {
                     "type": "string"
                 },
                 "buyTokenId": {
                     "type": "string"
                 },
                 "srcSymbol": {
                     "type": "string"
                 },
                 "destSymbol": {
                     "type": "string"
                 },
                 "srcContractAddress": {
                     "type": "string"
                 },
                 "destContractAddress": {
                     "type": "string"
                 },
                 "amount": {
                     "type": "string",
                 },
                 "mintAccept": {
                     "type": "string",
                 },
                 "amountOut": {
                     "type": "string",

                 },
                 "tradingPath": {
                     "type": "array",
                     "items": {
                         "type": "string"
                     }
                 },
                 "statusCode": {
                     "type": "integer"
                 },
                 "status": {
                     "type": "string"
                 },
                 "statusDetail": {
                     "type": "string"
                 },
                 "feeToken": {
                     "type": "string"
                 },
                 "fee": {
                     "type": "string"
                 },
                 "feeLevel": {
                     "type": "integer"
                 },
                 "requestTx": {
                     "type": "string"
                 },
                 "submitProofTx": {
                     "type": "string"
                 },
                 "executeSwapTx": {
                     "type": "string"
                 },
                 "withdrawTx": {
                     "type": "string"
                 },
                 "mintTx": {
                     "type": "string"
                 },
                 "requestime": {
                     "type": "integer"
                 },
                 "respondTxs": {
                     "type": "array",
                     "items": {
                         "type": "string"
                     }
                 },
                 "unifiedReward": {
                     "$ref": "#/definitions/UnifiedReward"
                 },
                 "unifiedStatus": {
                     "$ref": "#/definitions/UnifiedStatus"
                 },
                 "refurnTx": {
                     "type": "string"
                 }
             },
             "required": [
                 "amount",
                 "amountOut",
                 "buyTokenId",
                 "destContractAddress",
                 "destSymbol",
                 "executeSwapTx",
                 "fee",
                 "feeLevel",
                 "feeToken",
                 "id",
                 "mintAccept",
                 "requestTx",
                 "requestime",
                 "respondTxs",
                 "sellTokenId",
                 "srcContractAddress",
                 "srcSymbol",
                 "status",
                 "statusCode",
                 "statusDetail",
                 "submitProofTx",
                 "tradingPath",
                 "userID",
                 "walletAddress",
                 "withdrawTx"
             ],
             "title": "History"
         },
         "UnifiedReward": {
             "type": "object",
             "additionalProperties": false,
             "properties": {
                 "Status": {
                     "type": "integer"
                 },
                 "Amount": {
                     "type": "number"
                 },
                 "Reward": {
                     "type": "number"
                 }
             },
             "required": [
                 "Amount",
                 "Reward",
                 "Status"
             ],
             "title": "UnifiedReward"
         },
         "UnifiedStatus": {
             "type": "object",
             "additionalProperties": false,
             "properties": {
                 "Fee": {
                     "type": "number"
                 },
                 "ReceivedAmount": {
                     "type": "number"
                 },
                 "Status": {
                     "type": "integer"
                 }
             },
             "required": [
                 "Fee",
                 "ReceivedAmount",
                 "Status"
             ],
             "title": "UnifiedStatus"
         }
     }
 };

 const tradeRewardHistorySchemas = {
     "$id": "tradeRewardHistorySchemas",
     "type": "object",
     "$ref": "#/definitions/Welcome9",
     "definitions": {
         "Welcome9": {
             "type": "object",
             "additionalProperties": false,
             "properties": {
                 "Result": {
                     "$ref": "#/definitions/Result"
                 },
                 "Error": {
                     "type": "null"
                 }
             },
             "required": [
                 "Error",
                 "Result"
             ],
             "title": "Welcome9"
         },
         "Result": {
             "type": "object",
             "additionalProperties": false,
             "properties": {
                 "History": {
                     "type": "array",
                     "items": {
                         "$ref": "#/definitions/History"
                     }
                 },
                 "Limit": {
                     "type": "integer"
                 },
                 "Page": {
                     "type": "integer"
                 },
                 "Total": {
                     "type": "integer"
                 }
             },
             "required": [
                 "History",
                 "Limit",
                 "Page",
                 "Total"
             ],
             "title": "Result"
         },
         "History": {
             "type": "object",
             "additionalProperties": false,
             "properties": {
                 "CreatedAt": {
                     "type": "string",

                 },
                 "TradeType": {
                     "type": "integer"
                 },
                 "SumTotalVolume": {
                     "type": "number"
                 },
                 "TotalVolume": {
                     "type": "number"
                 },
                 "RewardAmount": {
                     "type": "integer"
                 },
                 "FromTime": {
                     "type": "string",

                 },
                 "ToTime": {
                     "type": "string",

                 },
                 "Status": {
                     "type": "integer"
                 },
                 "Tx": {
                     "type": "string"
                 }
             },
             "required": [
                 "CreatedAt",
                 "FromTime",
                 "RewardAmount",
                 "Status",
                 "SumTotalVolume",
                 "ToTime",
                 "TotalVolume",
                 "TradeType",
                 "Tx"
             ],
             "title": "History"
         }
     }
 };

 const uniswapRewardHistorySchemas = {
     "$id": "uniswapRewardHistorySchemas",
     "type": "object",
     "$ref": "#/definitions/Welcome9",
     "definitions": {
         "Welcome9": {
             "type": "object",
             "additionalProperties": false,
             "properties": {
                 "Result": {
                     "$ref": "#/definitions/Result"
                 },
                 "Error": {
                     "type": "null"
                 }
             },
             "required": [
                 "Error",
                 "Result"
             ],
             "title": "Welcome9"
         },
         "Result": {
             "type": "object",
             "additionalProperties": false,
             "properties": {
                 "History": {
                     "type": "array",
                     "items": {
                         "$ref": "#/definitions/History"
                     }
                 },
                 "Limit": {
                     "type": "integer"
                 },
                 "Page": {
                     "type": "integer"
                 },
                 "Total": {
                     "type": "integer"
                 }
             },
             "required": [
                 "History",
                 "Limit",
                 "Page",
                 "Total"
             ],
             "title": "Result"
         },
         "History": {
             "type": "object",
             "additionalProperties": false,
             "properties": {
                 "CreatedAt": {
                     "type": "string",

                 },
                 "TradeType": {
                     "type": "integer"
                 },
                 "SumTotalVolume": {
                     "type": "number"
                 },
                 "TotalVolume": {
                     "type": "number"
                 },
                 "RewardAmount": {
                     "type": "integer"
                 },
                 "FromTime": {
                     "type": "string",

                 },
                 "ToTime": {
                     "type": "string",

                 },
                 "Status": {
                     "type": "integer"
                 },
                 "Tx": {
                     "type": "string"
                 }
             },
             "required": [
                 "CreatedAt",
                 "FromTime",
                 "RewardAmount",
                 "Status",
                 "SumTotalVolume",
                 "ToTime",
                 "TotalVolume",
                 "TradeType",
                 "Tx"
             ],
             "title": "History"
         }
     }
 };

 const curveRewardHistorySchemas = {
     "$id": "curveRewardHistorySchemas",
     "type": "object",
     "$ref": "#/definitions/Welcome9",
     "definitions": {
         "Welcome9": {
             "type": "object",
             "additionalProperties": false,
             "properties": {
                 "Result": {
                     "$ref": "#/definitions/Result"
                 },
                 "Error": {
                     "type": "null"
                 }
             },
             "required": [
                 "Error",
                 "Result"
             ],
             "title": "Welcome9"
         },
         "Result": {
             "type": "object",
             "additionalProperties": false,
             "properties": {
                 "History": {
                     "type": "array",
                     "items": {
                         "$ref": "#/definitions/History"
                     }
                 },
                 "Limit": {
                     "type": "integer"
                 },
                 "Page": {
                     "type": "integer"
                 },
                 "Total": {
                     "type": "integer"
                 }
             },
             "required": [
                 "History",
                 "Limit",
                 "Page",
                 "Total"
             ],
             "title": "Result"
         },
         "History": {
             "type": "object",
             "additionalProperties": false,
             "properties": {
                 "CreatedAt": {
                     "type": "string",

                 },
                 "TradeType": {
                     "type": "integer"
                 },
                 "SumTotalVolume": {
                     "type": "number"
                 },
                 "TotalVolume": {
                     "type": "number"
                 },
                 "RewardAmount": {
                     "type": "integer"
                 },
                 "FromTime": {
                     "type": "string",

                 },
                 "ToTime": {
                     "type": "string",

                 },
                 "Status": {
                     "type": "integer"
                 },
                 "Tx": {
                     "type": "string"
                 }
             },
             "required": [
                 "CreatedAt",
                 "FromTime",
                 "RewardAmount",
                 "Status",
                 "SumTotalVolume",
                 "ToTime",
                 "TotalVolume",
                 "TradeType",
                 "Tx"
             ],
             "title": "History"
         }
     }
 };

 const generateShieldAddressSchemas = {
    "$id": "generateShieldAddressSchemas",
    "type": "object",
    "$ref": "#/definitions/Welcome6",
    "definitions": {
        "Welcome6": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "Result": {
                    "$ref": "#/definitions/Result"
                },
                "Error": {
                    "type": "null"
                }
            },
            "required": [
                "Error",
                "Result"
            ],
            "title": "Welcome6"
        },
        "Result": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "ID": {
                    "type": "integer"
                },
                "Address": {
                    "type": "string"
                },
                "ExpiredAt": {
                    "type": "string"
                },
                "EstimateFee": {
                    "type": "number"
                },
                "TokenFee": {
                    "type": "integer"
                },
                "Decentralized": {
                    "type": "integer"
                }
            },
            "required": [
                "Address",
                "Decentralized",
                "EstimateFee",
                "ExpiredAt",
                "ID",
                "TokenFee"
            ],
            "title": "Result"
        }
    }
 };

 const historyTokenAccountSchemas = {
    "$id": "historyTokenAccountSchemas",
    "type": "object",
    "$ref": "#/definitions/Welcome9",
    "definitions": {
        "Welcome9": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "Result": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/Result"
                    }
                },
                "Error": {
                    "type": "null"
                }
            },
            "required": [
                "Error",
                "Result"
            ],
            "title": "Welcome9"
        },
        "Result": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "ID": {
                    "type": "integer"
                },
                "UserID": {
                    "type": "integer"
                },
                "Address": {
                    "$ref": "#/definitions/Address"
                },
                "ExpiredAt": {
                    "type": "string"
                },
                "EstFeeAt": {
                    
                },
                "AddressType": {
                    "type": "integer"
                },
                "Status": {
                    "type": "integer"
                },
                "StatusMessage": {
                    "$ref": "#/definitions/StatusMessage"
                },
                "StatusDetail": {
                    "type": "string"
                },
                "CurrencyType": {
                    "type": "integer"
                },
                "Network": {
                    "$ref": "#/definitions/Network"
                },
                "WalletAddress": {
                    "type": "string"
                },
                "UserPaymentAddress": {
                    "type": "string"
                },
                "RequestedAmount": {
                    "type": "string"
                },
                "ReceivedAmount": {
                    "type": "string"
                },
                "IncognitoAmount": {
                    "type": "string"
                },
                "EthereumTx": {
                    "type": "string"
                },
                "IncognitoTx": {
                    "type": "string"
                },
                "Erc20TokenTx": {
                    "type": "string"
                },
                "PrivacyTokenAddress": {
                    "$ref": "#/definitions/PrivacyTokenAddress"
                },
                "Erc20TokenAddress": {
                    "type": "string"
                },
                "CreatedAt": {
                    "type": "string"
                },
                "UpdatedAt": {
                    "type": "string"
                },
                "Decentralized": {
                    "type": "integer"
                },
                "OutChainTx": {
                    "type": "string"
                },
                "InChainTx": {
                    "type": "string"
                },
                "TokenFee": {
                    "type": "string"
                },
                "PrivacyFee": {
                    "type": "string"
                },
                "OutChainPrivacyFee": {
                    "type": "string"
                },
                "OutChainTokenFee": {
                    "type": "string"
                },
                "BurnTokenFee": {
                    "type": "string"
                },
                "BurnPrivacyFee": {
                    "type": "string"
                },
                "IncognitoTxToPayOutsideChainFee": {
                    "type": "string"
                },
                "Note": {
                    "type": "string"
                },
                "Memo": {
                    "type": "string"
                },
                "TxReceive": {
                    "type": "string"
                },
                "UnifiedStatus": {
                    "anyOf": [
                        {
                            "$ref": "#/definitions/UnifiedStatus"
                        },
                        {
                            "type": "null"
                        }
                    ]
                },
                "UnifiedReward": {
                    "anyOf": [
                        {
                            "$ref": "#/definitions/UnifiedReward"
                        },
                        {
                            "type": "null"
                        }
                    ]
                },
                "Decimals": {
                    "type": "integer"
                },
                "PDecimals": {
                    "type": "integer"
                },
                "Symbol": {
                    "type": "string"
                },
                "TxRefundBlacklist": {
                    "type": "string"
                }
            },
            "required": [
                "Address",
                "AddressType",
                "BurnPrivacyFee",
                "BurnTokenFee",
                "CreatedAt",
                "CurrencyType",
                "Decentralized",
                "Decimals",
                "Erc20TokenAddress",
                "Erc20TokenTx",
                "EstFeeAt",
                "EthereumTx",
                "ExpiredAt",
                "ID",
                "InChainTx",
                "IncognitoAmount",
                "IncognitoTx",
                "IncognitoTxToPayOutsideChainFee",
                "Memo",
                "Network",
                "Note",
                "OutChainPrivacyFee",
                "OutChainTokenFee",
                "OutChainTx",
                "PDecimals",
                "PrivacyFee",
                "PrivacyTokenAddress",
                "ReceivedAmount",
                "RequestedAmount",
                "Status",
                "StatusDetail",
                "StatusMessage",
                "Symbol",
                "TokenFee",
                "TxReceive",
                "TxRefundBlacklist",
                "UnifiedReward",
                "UnifiedStatus",
                "UpdatedAt",
                "UserID",
                "UserPaymentAddress",
                "WalletAddress"
            ],
            "title": "Result"
        },
        "UnifiedReward": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "Status": {
                    "type": "integer"
                },
                "Amount": {
                    "type": "integer"
                },
                "Reward": {
                    "type": "integer"
                }
            },
            "required": [
                "Amount",
                "Reward",
                "Status"
            ],
            "title": "UnifiedReward"
        },
        "UnifiedStatus": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "Fee": {
                    "type": "integer"
                },
                "ReceivedAmount": {
                    "type": "integer"
                },
                "Status": {
                    "type": "integer"
                }
            },
            "required": [
                "Fee",
                "ReceivedAmount",
                "Status"
            ],
            "title": "UnifiedStatus"
        },
        "Address": {
            "type": "string",
            "title": "Address"
        },
        "Network": {
            "type": "string",
            "title": "Network"
        },
        "PrivacyTokenAddress": {
            "type": "string",
            "title": "PrivacyTokenAddress"
        },
        "StatusMessage": {
            "type": "string",
            "title": "StatusMessage"
        }
    }
 };

 const historyTokenAccountDetailSchemas = {
    "$id": "historyTokenAccountDetailSchemas",
    "type": "object", 
    "$ref": "#/definitions/Welcome3",
    "definitions": {
        "Welcome3": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "Result": {
                    "$ref": "#/definitions/Result"
                },
                "Error": {
                    "type": "null"
                }
            },
            "required": [
                "Error",
                "Result"
            ],
            "title": "Welcome3"
        },
        "Result": {
            "type": "object",
            "additionalProperties": false,
            "properties": {
                "ID": {
                    "type": "integer"
                },
                "UserID": {
                    "type": "integer"
                },
                "Address": {
                    "type": "string"
                },
                "ExpiredAt": {
                    "type": "string"
                },
                "EstFeeAt": {
            
                },
                "AddressType": {
                    "type": "integer"
                },
                "Status": {
                    "type": "integer"
                },
                "StatusMessage": {
                    "type": "string"
                },
                "StatusDetail": {
                    "type": "string"
                },
                "CurrencyType": {
                    "type": "integer"
                },
                "Network": {
                    "type": "string"
                },
                "WalletAddress": {
                    "type": "string"
                },
                "UserPaymentAddress": {
                    "type": "string"
                },
                "RequestedAmount": {
                    "type": "string"
                },
                "ReceivedAmount": {
                    "type": "string"
                },
                "IncognitoAmount": {
                    "type": "string"
                },
                "EthereumTx": {
                    "type": "string"
                },
                "IncognitoTx": {
                    "type": "string"
                },
                "Erc20TokenTx": {
                    "type": "string"
                },
                "PrivacyTokenAddress": {
                    "type": "string"
                },
                "Erc20TokenAddress": {
                    "type": "string"
                },
                "CreatedAt": {
                    "type": "string"
                },
                "UpdatedAt": {
                    "type": "string"
                },
                "Decentralized": {
                    "type": "integer"
                },
                "OutChainTx": {
                    "type": "string"
                },
                "InChainTx": {
                    "type": "string"
                },
                "TokenFee": {
                    "type": "string"
                },
                "PrivacyFee": {
                    "type": "string"
                },
                "OutChainPrivacyFee": {
                    "type": "string"
                },
                "OutChainTokenFee": {
                    "type": "string"
                },
                "BurnTokenFee": {
                    "type": "string"
                },
                "BurnPrivacyFee": {
                    "type": "string"
                },
                "IncognitoTxToPayOutsideChainFee": {
                    "type": "string"
                },
                "Note": {
                    "type": "string"
                },
                "Memo": {
                    "type": "string"
                },
                "TxReceive": {
                    "type": "string"
                },
                "UnifiedStatus": {
                    "type": "null"
                },
                "UnifiedReward": {
                    "type": "null"
                },
                "Decimals": {
                    "type": "integer"
                },
                "PDecimals": {
                    "type": "integer"
                },
                "Symbol": {
                    "type": "string"
                },
                "TxRefundBlacklist": {
                    "type": "string"
                }
            },
            "required": [
                "Address",
                "AddressType",
                "BurnPrivacyFee",
                "BurnTokenFee",
                "CreatedAt",
                "CurrencyType",
                "Decentralized",
                "Decimals",
                "Erc20TokenAddress",
                "Erc20TokenTx",
                "EstFeeAt",
                "EthereumTx",
                "ExpiredAt",
                "ID",
                "InChainTx",
                "IncognitoAmount",
                "IncognitoTx",
                "IncognitoTxToPayOutsideChainFee",
                "Memo",
                "Network",
                "Note",
                "OutChainPrivacyFee",
                "OutChainTokenFee",
                "OutChainTx",
                "PDecimals",
                "PrivacyFee",
                "PrivacyTokenAddress",
                "ReceivedAmount",
                "RequestedAmount",
                "Status",
                "StatusDetail",
                "StatusMessage",
                "Symbol",
                "TokenFee",
                "TxReceive",
                "TxRefundBlacklist",
                "UnifiedReward",
                "UnifiedStatus",
                "UpdatedAt",
                "UserID",
                "UserPaymentAddress",
                "WalletAddress"
            ],
            "title": "Result"
        }
    }
};


 module.exports = {
     getOtaGenerateSchemas,
     authenProfileSchemas,
     disableFunctionConfigSchemas,
     lastVersionSchemas,
     tradeTokenSchemas,
     uniSwapTokenSchemas,
     curveTokenSchemas,
     tradeHistorySchemas,
     uniswapHistorySchemas,
     curveHistorySchemas,
     tradeRewardHistorySchemas,
     uniswapRewardHistorySchemas,
     curveRewardHistorySchemas,
     generateShieldAddressSchemas,
     historyTokenAccountSchemas,
     historyTokenAccountDetailSchemas
 }
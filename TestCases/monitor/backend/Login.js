const validateSchemaCommand = require("../../../schemas/validateSchemaCommand");
const backendApi_schemas = require("../../../schemas/backendApi_schemas");
const { BackendApi } = require('../../../lib/Incognito/BackendApi');
const addDebug = require('../../../lib/Utils/AddingContent').addDebug;


let backendApi = new BackendApi()

describe('[Class] Login', () => {

    describe('TC001_Profile', async () => {
        it('CallAPI', async () => {
            let response = await backendApi.authProfile()

            await validateSchemaCommand.validateSchema(backendApi_schemas.authenProfileSchemas, response.data)
        })
    })

    describe('TC002_DisableFunctionConfig', async () => {
        it('CallAPI', async () => {
            let response = await backendApi.disableFunctionConfig()

            await validateSchemaCommand.validateSchema(backendApi_schemas.disableFunctionConfigSchemas, response.data)
        })
    })

    describe('TC003_LastVersion', async () => {
        it('CallAPI', async () => {
            let response = await backendApi.lastVersion()

            await validateSchemaCommand.validateSchema(backendApi_schemas.lastVersionSchemas, response.data)
        })
    })
})
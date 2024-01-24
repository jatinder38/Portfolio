//Retrieve the "Current Value" of an Environment Variable
var Sdk = window.Sdk || {};
    Sdk.RetrieveEnvironmentVariableValueRequest = function (definitionSchemaName) {
        this.DefinitionSchemaName = definitionSchemaName;
    };
    Sdk.RetrieveEnvironmentVariableValueRequest.prototype.getMetadata = function () {
        return {
            boundParameter: null,
            parameterTypes: {
                "DefinitionSchemaName": {
                    "typeName": "Edm.String",
                    "structuralProperty": 1
                }
            },
         operationType: 1,
         operationName: "RetrieveEnvironmentVariableValue"
    };
};
 
var retrieveEnvironmentVariableValueRequest = new Sdk.RetrieveEnvironmentVariableValueRequest({EnvironmentVariableSchemaName});

Xrm.WebApi.online.execute(retrieveEnvironmentVariableValueRequest).then(
function success(result) {
    if (result.ok) {
        result.json().then(
            function (responseBody) {
                console.log(responseBody.Value);
                         
            });
    }
},
function (error) {
    Xrm.Utility.alertDialog(error.message);
});
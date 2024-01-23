let result= await Xrm.WebApi.retrieveMultipleRecords("environmentvariablevalue","?$select=value&$expand=EnvironmentVariableDefinitionId&$filter=(EnvironmentVariableDefinitionId/schemaname eq '"+websiteurlEnvschemaname+"')");


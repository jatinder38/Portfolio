//Provides properties and methods to use Web API to create and manage records and execute Web API actions and functions in model-driven apps.

//Retrieve single record
var entity = "account";
var id = "d2720525-53ad-43b3-b7dc-e7432f80be13"; //record GUID is required to retrieve
var selectedColumns = "?$select=name"; //columns to be retrieved

Xrm.WebApi.retrieveRecord(entity, id, selectedColumns).then(
    function success(result) {
        console.log("success: " + result.name);
    },
    function (error) {
        console.log(error.message);
    }
);

//Retrieve multiple records
var entity = "account";
var selectedColumns = "?$select=name,accountid,accountnumber,statecode";
var filter = "&$filter=statecode eq 0";
var order = "&$orderby=accountnumber asc" //optional
Xrm.WebApi.retrieveMultipleRecords(entity, selectedColumns + filter).then(
    function success(result) {
        for (var i = 0; i < result.entities.length; i++) {
            var result = result.entities[i];
            var accountid = result["accountid"];
            var name = result["name"];
            console.log(accountid + ": " + name);
        }                    
        // If you're trying to get the first record
        if (result != null) {
            console.log(result.entities[0].name);
        }
    },
    function (error) {
        console.log(error.message);
    }
);

// Create a basic record using WebAPI
// define the data to create new account
var data =
    {
        "name": "Sample Account",
        "description": "This is the description of the sample account",
        "revenue": 5000000,
        "accountcategorycode": 1,
        //The line below creates an association with an existing contact record to set the latter as the primary contact for the new account record
        "primarycontactid@odata.bind": "/contacts(465b158c-541c-e511-80d3-3863bb347ba8)" 
    }
// create a basic account record
Xrm.WebApi.createRecord("account", data).then(
    function success(result) {
        console.log("Account created with ID: " + result.id);
        // perform operations on record creation
    },
    function (error) {
        console.log(error.message);
        // handle error conditions
    }
);
// Create an advanced record using WebAPI
// define data to create primary and related table records
var data =
    {
        "name": "Sample Account",
        "primarycontactid":
        {
            "firstname": "Jatinder",
            "lastname": "Singh",
            "emailaddress1": "test@outlook.com"
        },
        "opportunity_customer_accounts":
        [
            {
                "name": "Opportunity associated to Sample Account",
                "Opportunity_Tasks":
                [
                    { 
                        "subject": "Task associated to opportunity" 
                    }
                ]
            }
        ]
    }
// create an advanced account record with primary contact and opportunity
Xrm.WebApi.createRecord("account", data).then(
    function success(result) {
        console.log("Account created with ID: " + result.id);
        // perform operations on record creation
    },
    function (error) {
        console.log(error.message);
        // handle error conditions
    }
);

// Update a record using WebAPI
// define the data to update a record
var data =
    {
        "name": "Updated Sample Account ",
        "description": "This is the updated description of the sample account",
        "revenue": 6000000,
        "accountcategorycode": 2
    }
// update the record
Xrm.WebApi.updateRecord("account", "5531d753-95af-e711-a94e-000d3a11e605", data).then(
    function success(result) {
        console.log("Account updated");
        // perform operations on record update
    },
    function (error) {
        console.log(error.message);
        // handle error conditions
    }
);
// To update association to the related table records (lookups), set the value of single-valued navigation properties using the @odata.bind annotation to another record.
// define the data to update a record association
var data =
    {
        "primarycontactid@odata.bind": "/contacts(61a0e5b9-88df-e311-b8e5-6c3be5a8b200)"
    }
// update the record association
Xrm.WebApi.updateRecord("account", "5531d753-95af-e711-a94e-000d3a11e605", data).then(
    function success(result) {
        console.log("Account updated");
        // perform operations on record update
    },
    function (error) {
        console.log(error.message);
        // handle error conditions
    }
);

//Delete a record using WebAPI
Xrm.WebApi.deleteRecord("account", "5531d753-95af-e711-a94e-000d3a11e605").then(
    function success(result) {
        console.log("Account deleted");
        // perform operations on record deletion
    },
    function (error) {
        console.log(error.message);
        // handle error conditions
    }
);
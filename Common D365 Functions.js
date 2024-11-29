//Load error or warning messages as per logged in user's language
// LCID 1033 is English and 1036 is French in Dynamics 365 CE
const messages = {
    1033:
    {
        "alertMessageTitle": "Custom alert title.",
        "confirmMessageTitle": "Custom confirmation title."
    },
    1036:
    {
        "alertMessageTitle": "Titre d'alerte personnalisé.",
        "confirmMessageTitle": "Titre de confirmation personnalisé."
    }
}

var userLangId = Xrm.Utility.getGlobalContext().userSettings.languageId; //Returns the language ID for the current user.
let alertTitle = messages[userLangId]?.alertMessageTitle;
let confirmTitle = messages[userLangId]?.confirmMessageTitle;

//Open Alert Dialog
var ShowAlertDialog = function(errorMessage){
    var alertStrings = {
        confirmButtonLabel: "Ok",
        text: errorMessage, //the error message can be passed into this function from another function or it can be a static message
        title: alertTitle   //could be the dynamic or static
    };
    //adjust height and width according to the length of your text
    var alertOptions = {
        height: 250, 
        width: 450
    };
    Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(
        function(success) {
            console.log("Alert dialog closed");
        },
        function(error) {
            console.log(error.message);
        }
    );
};

//Open Confirm Dialog
var ShowConfirmDialog = function(errorMessage){
    var confirmStrings = { 
        text: errorMessage, 
        title: confirmTitle
    };
    //adjust height and width according to the length of your text
    var confirmOptions = { 
        height: 250, 
        width: 450
    };
    Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(
        function (success) {    
            if (success.confirmed) {
                console.log("Dialog closed using OK button.");
            }
            else {
                console.log("Dialog closed using Cancel button or X.");
            }
        }
    );
}

//Refresh Subgrid
function RefreshGrid(){
    const subGridName = "related_opportunities_subgrid";
    //The formContext.getControl(arg) method is a shortcut method to access formContext.ui.controls.get(arg).
    var subgrid = formContext.getControl(subGridName);
    subgrid.refresh();
};

//Hide|Show the ribbon button on the basis of record status reason
/* Go to the Ribbon Workbench and customize the command of the button you want to hide.
 Add a new Enable Rule with custom logic
 Add this function in the custom logic and pass CRM parameter as a parameter
 Attach the enable rule to custom command and publish the solution.*/
function HideCustomButtonWithStatus(primaryControl){
    var formContext = primaryControl;
    var value = true;
    var statusReason = formContext.getAttribute("statuscode").getValue();
    if (statusReason == 100000001 || statusReason == 100000002){ // Hide if status reason is Cancelled or Aborted, else show
        value = false;
    }
    return value;
};


//Hide the ribbon button on the basis of security role
function CheckButtonAccessBasedOnRole(context) {
    var currentUserRoles = context._globalContext._userSettings.securityRoles;
    var roleName = "customer service manager"; //use lower case for security role name
    // Get all the roles of the Logged in User.
    for (var i = 0; i < currentUserRoles.length; i++) {
        var userRoleName = currentUserRoles[i].name;
        if (userRoleName == roleName) {
            // Return true if the Role matches
            return true;
        }
    }
    return false;
};

//Hide/Show the ribbon button on the basis of form type
function HideRibbonButtonBasedOnFormType(eContext) {
    var formContext = eContext.getFormContext();
    let formType = formContext.ui.getFormType();
    var value = false;
    //https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/formcontext-ui/getformtype#return-value
    const formTypeIsCreateRecord = 1;
    const formTypeIsUpdateRecord = 2;
    if (formType != formTypeIsCreateRecord) { //shows button for all form types except 'Create'
       value = true;
    }
    return value;
};

//Hide/Show the ribbon button on the basis of form id
function HideRibbonButtonBasedOnFormId(eContext) {
    var formContext = eContext.getFormContext();
    var formId = formContext.ui.formSelector.getCurrentItem().getId();
    var value = false;
    //https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/clientapi/reference/formcontext-ui-formselector/getid
    const mainFormId = "a72c7955-542b-4ea4-9459-b10cd18b4276"; //Main Form Id
    if (formId == mainFormId) { //shows button on Main Form only
       value = true;
    }
    return value;
};

//Hide/Show a ribbon button for a specific tab, bind the function to the button in ribbon workbench
function ShowHideButtonOnTabChange(primaryControl){
    var formContext = primaryControl;
    var value = false;
    var generalTab = formContext.ui.tabs.get("generaltab");
    if(generalTab.getDisplayState() == "collapsed"){
        value = true;
    }
    return value;
};

//bind to tab state change to run the above function
function RefreshRibbon(executionContext){
    var formContext = executionContext.getFormContext();
    formContext.ui.refreshRibbon();
};

//Call Custom Action from JavaScript and Run Plugin for custom message in Dynamics 365
function CallCustomActionFromJavaScript() {
    //get the current organization url
	var globalContext = Xrm.Utility.getGlobalContext();
    var serverURL = globalContext.getClientUrl();
    //query to send the request to the global Action 
	//Global Action Unique Name - this name is Case Sensitive
    var actionName = "jat_MyCustomAction"; 
    //set the current loggedin userid in to _inputParameter of the 
    var InputParamValue = globalContext.userSettings.userId;
    //Pass the input parameters to action
    var data = {
    "MyInputParam": InputParamValue
    };
    //Create the HttpRequestObject to send WEB API Request 
    var req = new XMLHttpRequest();
    req.open("POST", serverURL + "/api/data/v9.2/" + actionName, true);
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
    req.setRequestHeader("OData-MaxVersion", "4.0");
    req.setRequestHeader("OData-Version", "4.0");
    req.onreadystatechange = function () {
        if (this.readyState == 4 /* complete */){
            req.onreadystatechange = null;
            if (this.status == 200 || this.status == 204){
                console.log("Action Called Successfully...");
               //Get the output parameter of the action (if any)
               result = JSON.parse(this.response);
               console.log(result.MyOutputParam);
            }
            else {
                var error = JSON.parse(this.response).error;
                console.log("Error in Action: "+error.message);
            }
        }
    };
    //Execute request passing the input parameter of the action 
    req.send(window.JSON.stringify(data));
}

//Call a Power Automate flow via JavaScript
//Create a Power Automate flow using the trigger => When a HTTP request is received.
//Create a Request Body JSON schema by adding a sample JSON payload.
//Add actions in the flow and save it. It will create a unique HTTP POST URL.
//Use the same URL in the JavaScript function.
function CallCloudFlow(executionContext) {
    var formContext = executionContext.getFormContext();
    var accountId = formContext.getAttribute("accountid").getValue();
    var accountName = formContext.getAttribute("name").getValue();
    var email = formContext.getAttribute("emailaddress1").getValue();
    var params = {
        "Id":accountId,
        "Name":accountName,
        "Email":email
   }
    var url = "https://prod-000.westus.logic.azure.com:443/workflows/75b05db9981e41x00a6887fff03c1fee/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=uGEet3rej2Z1xWu7JS-8WTLUF0sRnmRsGaXQGSpz1yw";
    var req = new XMLHttpRequest();
	req.open("POST", url, true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.onreadystatechange = function () {
        if (this.readyState === 4) {
            req.onreadystatechange = null;
            if (this.status === 200) {
                let resultJson = JSON.parse(this.response);
                //You may also notify the end-user regarding the success of this action by creating a form level notification or showing an alert dialog.
            } else {
                console.log(this.statusText);
            }
        }
    };
    req.send(JSON.stringify(params));
}
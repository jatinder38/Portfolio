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
function HideCustomButtonWithStatus(primaryControl){
    var formContext = primaryControl;
    var value = true;
    var statusReason = formContext.getAttribute("statuscode").getValue();
    if (statusReason == 100000001 || statusReason == 100000002){ // Hide if status reason is Cancelled or Aborted, else show
        value = false;
    }
    return value;
};
/* Go to the Ribbon Workbench and customize the command of the button you want to hide.
 Add a new Enable Rule with custom logic
 Add this function in the custom logic and pass CRM parameter as a parameter
 Attach the enable rule to custom command and publish the solution.*/

//Hide the ribbon button on the basis of security role

//Hide the ribbon button on the basis of form id and/or form type

//Call an action via JavaScript

//Call a Power Automate flow via JavaScript
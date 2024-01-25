//Get field value >
//To get value of fields like Text|Decimal|Float|Currency|Whole Number:
formContext.getAttribute("FieldName").getValue();
//To get value of look up field:
formContext.getAttribute("FieldName").getValue();
//For obtaining GUID of lookup object:
formContext.getAttribute("FieldName").getValue()[0].id;
//For obtaining Name of lookup object:
formContext.getAttribute("FieldName").getValue()[0].name;
//For obtaining EntityType of lookup object:
formContext.getAttribute("FieldName").getValue()[0].entityType;
//To get value of field like Option set/Boolean:
//For text:
formContext.getAttribute("FieldName").getText();
//For value:
formContext.getAttribute("FieldName").getValue();
//To get value of Multiple option set (available in D365 v9.0 ) :
//For value:
formContext.getAttribute("FieldName").getValue()[indexValue];
//For text:
formContext.getAttribute("FieldName").getText()[indexValue];
// indexValue can be 0,1,2……

//Set field value >
//To set value of fields like Text|Decimal|Float|Currency|Whole Number:
formContext.getAttribute("FieldName").setValue("value");
//To set value of Boolean field type:
formContext.getAttribute("FieldName").setValue(true/false);
//To set value of Option set field type:
formContext.getAttribute("FieldName").setValue(10000000);
//To set LookUp field type:
var lookUp = new Array();
lookUp[0] = new Object();
lookUp[0].id = recordId;
lookUp[0].name = recordName;   // this is optional
lookUp[0].entityType = entityName;
formContext.getAttribute("FieldName").setValue(lookUp);
//To set value of Multiple option set value:   
formContext.getAttribute("FieldName").setValue([100000000,100000001]);

//Check if the field is mandatory or not:
var value = formContext.getAttribute("FieldName").getRequiredLevel(); //returns value 'required' or 'none'.
//Make a field mandatory / remove mandatory:
formContext.getAttribute("FieldName").setRequiredLevel("required");
formContext.getAttribute("FieldName").setRequiredLevel("none");

//Check visibility of a field:
var value = formContext.getControl("FieldName").getVisible();
//value would be true or false. if true, it means the field is visible. if false, it means the  field is not visible.
//Show/Hide field:
formContext.getControl("FieldName").setVisible(true/false);

//Check Visibility of a Section:
var value = formContext.ui.tabs.get("Tab_Name").sections.get("Section").getVisible();
//value would be true or false. if true, it means section is visible. if false, it means section is not visible.
//Show/Hide Section:
formContext.ui.tabs.get("Tab_Name").sections.get("Section").setVisible(true/false);

//Check Visibility of a Tab:
var value = formContext.ui.tabs.get("Tab_Name").getVisible();
//value would be true or false. if true, it means tab is visible. if false, it means tab is not visible.
//Show/Hide Tab:
formContext.ui.tabs.get("Tab_Name").setVisible(true/false);

//Check field is enable/disable (editable/read-only):
var value = formContext.getControl("FieldName").getDisabled();
//value would be true or false. if true, it means field is disabled. if false, it means field is not disabled.

//Enable/Disable field (read-only):
formContext.getControl("FieldName").setDisabled(false/true);

//Enable/Disable fields of a section (read-only):
function disableSection(sectionName) {
var controls = formContext.ui.tabs.get(tabName).sections.get(sectionName).controls.get();
var numberOfControls = controls.length;  
    for (var i = 0; i < numberOfControls; i++) {
            controls[i].setDisabled(true/false);
    }
};

//Hide a Form from Form-Selector
var formItems = formContext.ui.formSelector.items.get(arg);

//Get GUID of the form
var formId = formContext.ui.formSelector.getCurrentItem().getId();

//Get current form
var formItem = formContext.ui.formSelector.getCurrentItem();

//set the visibility of the form in Form selector
formItem.setVisible(bool); //here bool = true or false

//Navigate the user to the selected form
formItem.navigate();

//Enable/Disable Tab (read only):
var Tab =  formContext.ui.tabs.get(tabName);
var Sections =  Tab.sections.get();
for (var i in Sections) {
    var sectionName = Sections[i].getName();
    disableSection(sectionName); //use above function to disable section
}

//Enable/Disable Form (read only):
formContext.data.entity.attributes.forEach(function (attribute, index) {
    var control = formContext.getControl(attribute.getName());
    if (control) {
        control.setDisabled(true)
    }
});

//To save the form:
formContext.data.save();

//To get the Entity name:
var entityName = formContext.data.entity.getEntityName();

//To get GUID of a current record:
var recordId = formContext.data.entity.getId();

//Open another entity form:
Xrm.Utility.openEntityForm("entityName");
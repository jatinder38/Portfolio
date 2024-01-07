// Business Process Flow Events

//Event #1
OnPreProcessStatusChange 
/* description: This event happens before the Process status changes from 'active' to 'finished'
useful for running a validation or a sync/async function  before the BPF is complete/finished. */
//Event handlers
formContext.data.process.addOnPreProcessStatusChange();
formContext.data.process.removeOnPreProcessStatusChange();

//Event #2
OnProcessStatusChange 
/* description: This event happens after the Process status has changed from 'active' to 'finished'
useful for doing any operation post the BPF is complete/finished, like sending an email 
via triggering a Power Automate cloud flow or triggering a webAPI */
//Event handlers
formContext.data.process.addOnProcessStatusChange();
formContext.data.process.removeOnProcessStatusChange();

//Event #3
OnPreStageChange 
/* description: This event happens before the business process flow stage has changed in either direction (next or previous)
useful for doing any operation before the stage has changed, like triggering a plugin via action or validating 
something using a function and throwing exception to restrict moving to next/previous stage or for making controls disabled or hidden */
//Event handlers
formContext.data.process.addOnPreStageChange();
formContext.data.process.removeOnPreStageChange();

//Event #4
OnStageChange
/* description: This event happens after the business process flow stage has changed in either direction (next or previous)
useful for doing any operation after the stage has changed, like setting a field value or status reason value or triggering a plugin via action.
OnStageChange is not ideal for restricting the users from changing the stage.*/
//Event handlers
formContext.data.process.addOnStageChange();
formContext.data.process.removeOnStageChange();

//Event #5
OnStageSelected
/* description: This event happens when the business process flow stage has been selected useful for disabling the fields on BPF
if the user is not authorized to perform an action on that stage or can also check if the selected stage is the active stage or not. */
//Event handlers
formContext.data.process.addOnStageSelected();
formContext.data.process.removeOnStageSelected();

//Get Process Id 
formContext.data.process.getId();

//Get Process status
var processStatus = formContext.data.process.getStatus(); //Returns the current status of the process instance.

//Set Process status
formContext.data.process.setStatus(); //Sets the current status of the active process instance ('active' | 'finished' | 'aborted' | 'invalid').

//get active stage of a process
formContext.data.process.getActiveStage();	//Returns a Stage object representing the active stage.

//set active stage of a process
formContext.data.process.setActiveStage();	//Sets a stage as the active stage.

//get Guid of the stage
formContext.data.process.getActiveStage().getId(); //Returns the unique identifier of the stage.

//move to next stage, can be used with OnPreStageChange event
formContext.data.process.moveNext();

//move to previous stage, can be used with OnPreStageChange event
formContext.data.process.movePrevious();

//get the currently selected stage
var selectedStage = formContext.data.process.getSelectedStage();
var selectedStageId = selectedStage.getId();
var selectedStageName = selectedStage.getName();

//hide the BPF control
formContext.ui.process.setVisible(false);

//show the BPF control
formContext.ui.process.setVisible(true);

//check if BPF is visible, returns true if it is visible; false otherwise.
formContext.ui.process.getVisible();


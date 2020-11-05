var CreditCallPlugin = null;
//Assuming using jQuery, lets wait until the document has finished loading. 
$(document).ready(function () {
    //This reaches out to KioskSimple and requests API initialization
    try {
        outputActionResult("Initialization", "attempting")
        window.external.KioskSimpleAPIInit();
        outputActionResult("Initialization", "done")       
    }
    catch (err) {      
        outputActionResult("Initialization", "Something went wrong intitializing KioskSimple. Error:" + err)
        return;
    }

    //If we got this far, we are successfully running within KioskSimple's local code domain
    if (K()) {
        try{
            //If the credit in KioskSimple changes, lets update our own UI
            var testBank = KioskSimple.Plugins.GetPlugin("Bank");
            testBank.OnCreditChanged = KSCreditChanged;
        }
        catch (error) {
            outputActionResult("Initialization", "Something went wrong intitializing KioskSimple. Error:" + error)
        }               

        CreditCallPlugin = KioskSimple.Plugins.GetPlugin("CreditCall");
        if (CreditCallPlugin != null) {
            //CreditCall plugin is installed, lets setup UI and Handlers to interact with it
            setupUIButtons();
            setupCreditCallPluginHandlers();       
        }
        outputActionResult("Initialization", "KioskSimple loaded.")
    }
});

//Not 100% needed but a nice shortcut to determine if KS is preset.
function K() {
    return !(typeof KioskSimple === 'undefined')
}

//KS Credit Changed Handler. Whenever credit changes in the KioskSimple instance. This handler will fire off. 
function KSCreditChanged(amount) {
    $("#currentCredit").html(amount);
}

function setupCreditCallPluginHandlers()
{
    CreditCallPlugin.OnError = OnError;
    CreditCallPlugin.OnCardDetails = OnCardDetails;
    CreditCallPlugin.OnCardNotification = OnCardNotification;
    CreditCallPlugin.OnTransactionUpdate = OnTransactionUpdate;
    CreditCallPlugin.OnTransactionFinished = OnTransactionFinished;
    CreditCallPlugin.OnConfirmFinished = OnConfirmFinished;
    CreditCallPlugin.OnTransactionInfo = OnTransactionInfo;
	CreditCallPlugin.OnStatus = OnStatus;
}

function KSCreditChanged(amount) {   
    $("#currentCredit").html(amount);
}

function OnConfirmFinished(reference, approved, data, p) {
    var output = new Object();
    output.data = data;
    outputActionResult("OnConfirmFinished", "result:" + JSON.stringify(output))
}

function OnTransactionFinished(reference, approved, pan, type, confirmNeeded, receiptdata, signatureRequired, data) {
    var output = new Object();
    output.data = data;
    outputActionResult("OnTransactionFinished", "result:" + JSON.stringify(output))
}

function OnTransactionUpdate(data) {
    var output = new Object();
    output.data = data;
    outputActionResult("OnTransactionUpdate", "result:" + JSON.stringify(output))
}

function OnError(data) {
    var output = new Object();
    output.data = data;
    outputActionResult("OnError", "result:" + JSON.stringify(output))
}

function OnCardDetails(data) {
    var output = new Object();
    output.data = data;
    outputActionResult("OnCardDetails", "result:" + JSON.stringify(output))
}

function OnCardNotification(data) {
    var output = new Object();
    output.data = data;
    outputActionResult("OnCardNotification", "result:" + JSON.stringify(output))
}

function OnTransactionInfo(ref, data) {
    var output = new Object();
    output.data = data;
    outputActionResult("OnTransactionInfo", "result:" + JSON.stringify(output))
}
function OnStatus(data) {
    var output = new Object();
    output.data = data;
    outputActionResult("OnStatus", "result:" + JSON.stringify(output))
}

function setupUIButtons() {
    var d = new Date();
    var n = d.getTime();
    $('#reference').val('ref'+n);

    $("#btnStartTransaction").click(function () {
        CreditCallPlugin.StartTransaction(getAmount(), getReference(), "Sale", "");
    });

    $("#btnRefundTransactionByAuth").click(function () {
        CreditCallPlugin.RefundTransactionByReference(getAmount(), getReference() + "refund", getReference(), "");
    });

    $("#btnRefundTransaction").click(function () {
        CreditCallPlugin.StartTransaction(getAmount(), getReference(), "Refund", "");
    });

    $("#btnConfirmTransaction").click(function () {
        CreditCallPlugin.ConfirmTransaction(getReference(), getAmount());
    });

    $("#btnVoidTransaction").click(function () {
        CreditCallPlugin.VoidTransaction(getReference(), "SignatureDeclined");
    });

    $("#btnInformation").click(function () {
        CreditCallPlugin.GetTransactionInformation(getReference());
    });

    $("#btnGetStatus").click(function () {
        CreditCallPlugin.GetStatus();
    });
	
	$("#btnTerminateTransaction").click(function () {
        CreditCallPlugin.TerminateTransaction('EPOSTerminated','Transaction Cancelled.');
    });
	
	$("#btnSetIdleMessage").click(function () {
        CreditCallPlugin.SetIdleMessage('Hello');
    });  
}

function outputActionResult(actionName, data) {
    var output = "<a href='#' class='list-group-item'><h4 class='list-group-item-heading'>Action Result: " + actionName + "</h4><p class='list-group-item-text'>" + data + "</p></a>";
    $(".list-group").prepend(output);
}

function formatCashOutput(result, amount, data) {
    var output = new Object();
    output.result = result;
    output.amount = amount;
    output.data = data;
    return output;
}

function getAmount()
{
    var amount = $('#amounttocharge').val();
    amount = amount.replace('.', '');
    return amount;
}

function getReference() {
    return $('#reference').val();
}
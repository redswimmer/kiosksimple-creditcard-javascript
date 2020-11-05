
//Assuming using jQuery, lets wait until the document has finished loading. 
$(document).ready(function () {
    //This reaches out to KioskSimple and requests API initialization
    try{
        window.external.KioskSimpleAPIInit();
    }
    catch (err) {

        //If we got here then we are not running within KioskSimple, lets disable all buttons and output to user
        $("#btnEnableCredit").prop('disabled', true);
        $("#btnDisableCredit").prop('disabled', true);
       
        outputActionResult("Initialization", "Something went wrong intitializing KioskSimple. Error:" + err)
        return;
    }
    //If we got this far, we are successfully running within KioskSimple's local code domain
    if (K()) {
        //If the credit in KioskSImple changes, lets update our own UI
        KioskSimple.Plugins.GetPlugin('Bank').OnCreditChanged = KSCreditChanged;
        KioskSimple.Plugins.GetPlugin('Bank').OnCardSwiped = OnCardSwiped;
        KioskSimple.Plugins.GetPlugin('Bank').OnPaymentComplete = OnPaymentComplete;
        KioskSimple.Plugins.GetPlugin('Bank').OnPaymentCancelled = OnPaymentCancelled;
        KioskSimple.Plugins.GetPlugin('Bank').OnPaymentError = OnPaymentError;
        KioskSimple.Plugins.GetPlugin('Bank').OnUnsupportedCard = OnUnsupportedCard;
        setupUIButtons();
        outputActionResult("Initialization", "Kiosk Simple loaded.")
    }

});

//Not 100% needed but a nice shortcut to determine if KS is preset.
function K() {
    return !(typeof KioskSimple === 'undefined')
}


//KS Credit Changed Handler. Whenever credit changes in the KioskSImple instance. This handler will fire off. 
function KSCreditChanged(amount) {
    $("#currentCredit").html(amount);
}

function OnCardSwiped(data, plugin, device) {
    var output = new Object();
    output.plugin = plugin;
    output.data = data;
    output.device = device;
    outputActionResult("OnCardSwiped", "result:" + JSON.stringify(output))
    
}

function OnPaymentComplete(type, amount, data, plugin, device) {
    var output = new Object();
    output.type = type;
    output.amount = amount;
    output.plugin = plugin;
    output.data = data;
    output.device = device;
    outputActionResult("OnPaymentComplete", "result:" + JSON.stringify(output))

}

function OnPaymentCancelled(type, data, plugin, device) {
    var output = new Object();
    output.type = type;
    output.plugin = plugin;
    output.data = data;
    output.device = device;
    outputActionResult("OnPaymentCancelled", "result:" + JSON.stringify(output))

}

function OnPaymentError(type, data, plugin, device) {
    var output = new Object();
    output.type = type;
    output.plugin = plugin;
    output.data = data;
    output.device = device;
    outputActionResult(" OnPaymentError", "result:" + JSON.stringify(output))

}

function OnUnsupportedCard(type, plugin, device) {
    var output = new Object();
    output.type = type;
    output.plugin = plugin;
    output.device = device;
    outputActionResult("OnUnsupportedCard", "result:" + JSON.stringify(output))

}


var InvoiceToCharge = 0.00;
function setupUIButtons() {
    $("#btnEnableCredit").click(function () {
        KioskSimple.Plugins.GetPlugin('_devices').EnableAllDevicesByCategory("CreditCard");
    });

    $("#btnDisableCredit").click(function () {
        KioskSimple.Plugins.GetPlugin('_devices').DisableAllDevicesByCategory("CreditCard");
    });

    $("#btnAddToInvoice").click(function () {

        InvoiceToCharge += 1.00;
        KioskSimple.Plugins.GetPlugin('Bank').SetAmountDue(InvoiceToCharge);
        $("#amounttocharge").html(InvoiceToCharge);
    });
    //string Track1  - Track 1 of the card being processed
    //string Track2  - Track 2 of the card being processed
    //string Track3  - Track 3 of the card being processed
    //string Name   - Name on the card.
    //string CardNumber  - Card Number  on the front of the card
    //string Expiration - Card expiration date in the '' format
    //decimal Amount - decimal representation of the amount being processed
    //string Description - description field that will be sent with the transaction to the processor
    //(this is useful to append data to the transaction itself for reporting and informational purposes)
    $("#btnProcessAuthDirectly").click(function () {


        KioskSimple.Plugins.GetPlugin('_devices').ProcessCCPayment("","","",InvoiceToCharge,"John Customer","4007000000027","01/22","Testing auth.net processing",false)

    });

}

function outputActionResult(actionName, data) {
    var output = "<a href='#' class='list-group-item'><h4 class='list-group-item-heading'>Action Result: " + actionName + "</h4><p class='list-group-item-text'>" + data + "</p></a>";
    $(".list-group").append(output);
}

function formatCashOutput(result, amount, data) {
    var output = new Object();
    output.result = result;
    output.amount = amount;
    output.data = data;
    return output;
}


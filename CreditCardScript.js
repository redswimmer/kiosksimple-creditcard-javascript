// Handler for cardswipe
window.OnCardSwiped = function (data, plugin, device) {
    try {
        if (document.getElementById("CardNumber") != null) {
            // Card name
            document.getElementById("CardName").value = data.Name;
            // Card number
            document.getElementById("CardNumber").value = data.CardNumber;
            // Expiration date
            var ExpDate = data.Expiration.split("/");
            // Expiration month
            if (ExpDate[0].length == 1)
                ExpDate[0] = "0" + ExpDate[0];
            document.getElementById("ExpirationMonth").value = ExpDate[0];
            // Expiration year
            if (ExpDate[1].length == 2)
                ExpDate[1] = "20" + ExpDate[1];
            document.getElementById("ExpirationYear").value = ExpDate[1];
        }
    } catch (err) {
        alert(err);
    }
}

// Shortcut to check if KS is initialized
function K() {
    return !(typeof KioskSimple === 'undefined')
}

function init() {
    // Initialize KioskSimple
    try {
        window.external.KioskSimpleAPIInit();
        KioskSimple.Plugins.GetPlugin('_devices').EnableAllDevicesByCategory("CreditCard");
    }
    catch (err) {
        alert(err);
    }

    // Wireup handler
    if (K()) {
        KioskSimple.Plugins.GetPlugin('Bank').OnCardSwiped = OnCardSwiped;
    } else {
        alert('KioskSimple Cardswiped handler NOT attached');
    }
}

document.addEventListener("DOMContentLoaded", init);
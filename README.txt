The following is an example of how to use the Creditcall EMV payment gateway to process EMV credit card payments from a local website in KioskSimple.  You could also incorporate the logic from this example into a website running on a remote web server, but for the purpose of this example we'll store the content locally.

Copy the contents of this folder to a location on your computer.  Make sure there are no spaces in the folder path (i.e. use "CreditCallTest" not "Credit Call Test").

Configure KioskSimple to run the local example website
---- Start the KioskSimple configuration app.
---- Select the BROWSER left menu 
---- Select the BROWSER SETTINGS
---- Under Start-up Web Page enter the file path.  For example, if I copied the contents to a folder on my desktop the file path would be "file:///c:/Users/Andrew/Desktop/CreditCall/CreditCallTest.html".  You must include the prefix "file:///" for local files.

Install the CreditCall EMV Payment Gateway Plugin
---- Select the PLUGIN STORE left menu
---- Select the Available plugins tab
---- Download the CreditCall EMV Payment Gateway Plugin
---- You'll be prompted to restart the configuration app after which the new CARD READERS menu item will appear

Configure the Credit Card Reader and Credit Card Processor plugins
---- Select CARD READERS from the left menu
---- Select the CreditCall EMV Payment Gateway Plugin and press CONFIGURE
---- Configure your EMV device (contact us if you need help)
---- Start KioskSimple in Test Mode to test the example website.

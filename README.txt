The following is an example of how to use a credit card reader and credit card processor from a local website in KioskSimple.  You could also incorporate the logic from this example into a website running on a remote web server, but for the purpose of this example we'll store the content locally.

Copy the contents of this folder to a location on your computer.  Make sure there are no spaces in the folder path (i.e. use "CreditCardExample" not "Credit Card Example").

Configure KioskSimple to run the local example website
---- Start the KioskSimple configuration app.
---- Select the BROWSER left menu 
---- Select the BROWSER SETTINGS
---- Under Start-up Web Page enter the file path.  If for example I copied the contents to a folder on my desktop the file path could be "file:///c:/Users/Andrew/Desktop/Credit/CreditTest.html".  You must include the prefix "file:///" for local files.

Install a Credit Card Reader Plugin and a Credit Card Processor Plugin
---- Select the PLUGIN STORE left menu
---- Select the Available plugins tab
---- Download a Credit Card Reader Plugin (i.e. Magtek) 
---- Download Credit Card Processor Plugin (i.e. Authorize.Net) 
---- You'll be prompted to restart the configuration app after which the new CARD READERS menu item will appear

Configure the Credit Card Reader and Credit Card Processor plugins
---- Select CARD READERS from the left menu
---- Select your card reader and press CONFIGURE
---- Enable the device and press DETECT to confirm it’s properly configured.  The device must be attached to a USB port and configured in HID mode (not keyboard emulation mode)
---- Select PROCESSOR and configure your credit card processor.  Most processors will allow you to create a Sandbox test account which you can use for testing.  You can leave these fields blank for the purpose of this example if you don’t care if the card is processed.
---- Start KioskSimple in Test Mode to test the example website.

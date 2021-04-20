# SRS 

### Project Title
Tab2QR

### Category
Mobile application, Web Application

### Purpose
A lot of times we face the problem of opening websites from the PC's browser in the phone's browser. Either we need to share the URL via whatsapp, or save it as draft in email, or we need to type it. Either way, it is very tedious and time consuming. The proposed system described here solves the problem in a very simple manner.

### Scope
It will integrate the advantages of a commonly used medium (QR code) to provide ease of transferring URL(s) across devices without the usage of any public servers/internet or syncing with any personal accounts (chrome sync with gmail for example).

### Existing system :
Present system is either a manual system of using Email or Whatsapp.

### Proposed system : 
A browser extension and a mobile app will be used. The browser extension will generate a QR code for the browser’s current tab, which the mobile app will scan and open the URL(s) on the mobile’s default browser. In-app list functionality to save scanned QR code records will be present as well. Also, the user can open the saved URLs on the laptop/desktop browser by scanning the generated QRs from the mobile app.

### Advantages : 
* This neither requires the user to create any account, nor does it need the internet to sync information. 
* No need to store files in public servers eg. short link generators.
* Removes the hassle of maintaining/saving the browser tabs manually in some source.

### Functional requirements : 
* Users must have Chromium based web browser with the browser extension installed, along with android mobile phone with the app installed.
* Generated QR code should be scanned with our accompanying mobile app only.
* Only the QR code generated by the browser extension should be scanned.
* Prompts the user to save scanned QR codes in the mobile app, in order to provide easy to access records for future. Users will have the choice to save the links of their choice in the local database. Note that if the user wants to open multiple URLs in the mobile browser, then he/she must save it first, otherwise, any one of the URLs of their choice will be opened and others will be lost.
* The user can scan the QR code (using laptop/desktop camera) generated by the mobile app, given the URLs were previously saved in the app and open the URLs in laptop/ desktop browser.

### Non functional requirements : 
* Scanning of QR code must be fast.
* Better component design of the mobile app ( Ease of access, responsiveness)

### Software tools : 
* Client: Chrome web browser, Android 
* Frameworks: React Native, ReactJS
* Programming Language: Javascript
* Development Tools: VS Code
* Database: SQLite (on mobile)

### Deployment : 
As a standalone mobile app and browser extension



# Tab2QR
Tab2QR is a combination of browser (chromium) extension and mobile app which lets anyone share their Tab URLs from computer's browser to mobile phone browser.

Users can select any number of Tabs to share to their mobile phone. Users also get an option to save the shared URLs in their mobile app which can be accessed anytime, to directly open in their mobile browser or share them back to a computer's browser which has the Tab2QR extension installed.

## Getting Started
### Installing the browser extension
* Open the terminal and move to the ```tab2qr-extension``` folder.
* Run ```yarn install``` to install the dependencies.
* Run ```yarn build``` to create a build folder.
* Open the chrome browser > More Tools > Extensions
* Enable the ```developer mode```
* Click on ```load unpacked``` and select the ```build``` folder inside the ```tab2qr-extension``` folder

### Installing the app
* Open the terminal and move to ```Tab2QR``` folder.
* Run ```yarn install``` to install the dependencies.
* Run ```expo start``` to start the expo server

### Features provided by the browser extension
* Share any number of tabs from your current window.
* Genrerate animated QR code to scan from the app.
* Import URLs from mobile app to your browser window.

### Features provided by the mobile app
* Scan animated QR code.
* Directly open URLs in your mobile browser without saving them.
* Save the URLs for later use.
* Share the existing/stored URLs from mobile app to your browser.

## Using the browser extension
### When clicked on current tab, the extension generates animated QR for the current tab URL.
![ss1](https://user-images.githubusercontent.com/73089748/113628952-4d7f4280-9683-11eb-8e62-cafeff3f4749.png)
![ss2](https://user-images.githubusercontent.com/73089748/113628984-58d26e00-9683-11eb-86e2-06eb0acf0f81.png)
### When clicked on current window, the extension prompts the user to select all the URLs to share.
![ss3](https://user-images.githubusercontent.com/73089748/113628999-5ec84f00-9683-11eb-9994-c4fc18bb845c.png)
![ss4](https://user-images.githubusercontent.com/73089748/113629006-625bd600-9683-11eb-9c3f-53842b52552d.png)

## Using the mobile app
### As soon as the mobile app detects animated QR code, it shows a progress bar and scans it.
<p align="center"><img src="https://user-images.githubusercontent.com/73089748/113629572-3ab93d80-9684-11eb-9b50-8c3fef32203a.jpg" alt="s1" width="325" height="600"/></p>

### The user is then prompted to either save the URLs or open any one of the shared URLs from the list.
<p align="center"><img src="https://user-images.githubusercontent.com/73089748/113629826-94216c80-9684-11eb-9651-2d20c1da81e6.png" alt="s2" width="325" height="600"/></p>

### The user can view the shared URLs under the ```Saved``` section
<p align="center"><img src="https://user-images.githubusercontent.com/73089748/113629999-d5198100-9684-11eb-8389-f95f5b45efdb.png" alt="s3" width="325" height="600"/></p>

### The user can view the list of URLs and can either Open or Send the URL. If user clicks on Open, the URL gets opened in the mobile browser. If the user clicks on Send, then a QR is generated which can be scanned by the browser extension
<p align="center"><img src="https://user-images.githubusercontent.com/73089748/113630315-45280700-9685-11eb-9873-6be1254ea2d3.png" alt="s4" width="325" height="600"/></p>

### The user can also Rename, Delete or Share the list with browser extension
<p align="center"><img src="https://user-images.githubusercontent.com/73089748/113630395-65f05c80-9685-11eb-9e03-a65350a63c70.png" alt="s5" width="325" height="600"/></p>

### After clicking Send, the mobile app generates animated QR for the list of links which can be scanned using desktop's camera
![S6](https://user-images.githubusercontent.com/77089409/115274665-8f69b780-a15e-11eb-9510-7cde58726894.png)

### The UI shows a progress bar while scanning the QR code and a message is shown after the scanning is complete.
![S2](https://user-images.githubusercontent.com/77089409/115274636-8678e600-a15e-11eb-8f7f-cf171cdf326e.png)
![S3](https://user-images.githubusercontent.com/77089409/115274690-94c70200-a15e-11eb-998e-896542125366.png)

### The list of scanned QR code can be viewed at the bottom of the screen
![S4](https://user-images.githubusercontent.com/77089409/115274713-985a8900-a15e-11eb-82bb-d9cbebf9a629.png)

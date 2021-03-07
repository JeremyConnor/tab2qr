document.addEventListener('DOMContentLoaded',()=>{
    chrome.tabs.query({
      currentWindow: true,
      active: true
    },function generateQR(foundTabs){
        if(foundTabs.length >0){
            var url = foundTabs[0].url;
            var qrcode = new QRCode(document.getElementById('qrcode'));
            qrcode.makeCode(url);
        }
    });
  });

  
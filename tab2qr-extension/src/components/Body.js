/* global chrome */

import React, { useState, useEffect } from "react";
import { QRCode } from "react-qrcode-logo";
import "./Body.css";

function Body(props) {
  const [tabUrl, setTabUrl] = useState("");

  useEffect(() => {
    // only if running in chrome extension mode fetch
    // the current tab url; otherwise use "document"
    if (chrome.tabs) {
      chrome.tabs.query(
        {
          active: true,
          windowId: chrome.windows.WINDOW_ID_CURRENT,
        },
        (tabs) => {
          setTabUrl(tabs[0].url);
        }
      );
    } else {
      setTabUrl(document.URL);
    }
  }, []);

  return (
    <div className="main">
      <div className="qr">
        <QRCode value={tabUrl} ecLevel="M" size={200} qrStyle="dots" />
      </div>
      <div className="body-footer-text">Generated QR Code</div>
    </div>
  );
}

export default Body;

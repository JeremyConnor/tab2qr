/* global chrome */

import React, { useState, useEffect } from "react";
import { Button, Col, Row } from "antd";
import AnimatedQR from "../AnimatedQR/AnimatedQR";
import config from "../../config";
import "./Body.css";

function Body(props) {
  const [tabUrl, setTabUrl] = useState("");
  const [currentTabQRVisible, setCurrentTabQRVisible] = useState(false);

  useEffect(() => {
    /**
     * Fetch tab URLs from current window using chrome.tabs if extension is installed
     * in chromium based browser, otherwise use document.URL.
     */
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

  // Set condition to "true" to generate QR for current tab only.
  const onCurrentTabClicked = () => {
    setCurrentTabQRVisible(true);
  };

  // Create JSON data for Tab URLs.
  const formatdataToSend = (url) => {
    return JSON.stringify({
      tabs: [url],
    });
  };

  // Generate QR code for multiple Tab URLs.
  const renderChoiceScreen = (
    <div style={{ paddingBottom: 20 }}>
      <div className="title">Generate QR code for</div>
      <Row
        gutter={10}
        justify="center"
        style={{ paddingTop: 10, paddingBottom: 10 }}
      >
        <Col>
          <Button
            type="primary"
            onClick={onCurrentTabClicked}
            style={{ backgroundColor: "#ba68c8", border: 0 }}
          >
            Current Tab
          </Button>
        </Col>
        <Col>
          <Button href="/export.html" target="blank">
            Current Window
          </Button>
        </Col>
      </Row>
      <hr color="#ba68c8" style={{ height: 0.1 }} />
      <Row justify="center">
        <Col style={{ color: "rgba(0,0,0,0.5)" }}>
          version {config.extension.version}
        </Col>
      </Row>
    </div>
  );

  return (
    <div className="main">
      {currentTabQRVisible ? (
        <div
          style={{
            width: config.extension.maxWidth,
            display: "flex",
            paddingLeft: "14%",
            paddingBottom: 20,
          }}
        >
          <AnimatedQR encode={formatdataToSend(tabUrl)} />
        </div>
      ) : (
        renderChoiceScreen
      )}
    </div>
  );
}

export default Body;

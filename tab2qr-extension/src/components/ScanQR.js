/* global chrome */

import React, { useState } from "react";
import { List, Collapse, Row, Button, Typography } from "antd";
import { DeleteFilled } from "@ant-design/icons";
import QRCodeScanner from "./QRCodeScanner";

const { Panel } = Collapse;

function ScanQR(props) {
  const [data, setData] = useState([]);
  const [showDialogueBox, setShowDialogueBox] = useState(false);
  const [dialogueStatus, setDialogueStatus] = useState({});
  const [scanNew, setScanNew] = useState(true);

  const onQRScanned = (text) => {
    try {
      const windowInfo = JSON.parse(text);
      setData((prev) =>
        prev.concat({
          id: prev.length,
          tabs: windowInfo.tabs || [],
        })
      );
      setScanNew(false);
      handleShowDialogue(false, "QR scan successful !");
    } catch (error) {
      onQRScanError(error);
    }
  };

  const onQRScanError = (error) => {
    console.log(error);
    handleShowDialogue(true, "Invalid QR code / data corrupted");
  };

  const handleRestore = () => {
    // if running as an extension
    if (chrome.windows) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].tabs.length > 0) {
          chrome.windows.create(
            {
              focused: false,
              incognito: data[i].incognito,
              url: data[i].tabs,
            },
            (newWindow) => {
              console.log("created new window with details:", newWindow);
            }
          );
        }
      }
    }
  };

  const handleRemoveList = (listId) => {
    setData((prevData) =>
      prevData.filter((eachList) => eachList.id !== listId)
    );
  };

  const handleRemoveUrl = (listId, urlId) => {
    setData((prevData) =>
      prevData.map((eachList) => {
        if (eachList.id === listId) {
          if (eachList.tabs.length === 1) {
            handleRemoveList(eachList.id);
          }
          return {
            ...eachList,
            tabs: eachList.tabs.filter((eachUrl, id) => id !== urlId),
          };
        }
        return eachList;
      })
    );
  };

  const handleDialogueClose = () => {
    // same handler for both "close" and "dismiss" buttons
    setShowDialogueBox(false);
  };

  const handleShowDialogue = (_isError, _message) => {
    setDialogueStatus({ isError: _isError, message: _message });
    setShowDialogueBox(true);
  };

  const handleScanNew = () => {
    console.log("SCAN NEW");
    setScanNew(true);
    handleDialogueClose();
  };

  // this function is passed to QRCodeScanner to inform
  // if it needs to send the data back to parent
  const getScanNew = () => {
    return scanNew;
  };

  const Header = () => (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "1rem",
      }}
    >
      <h4>Scanned Tabs</h4>
      <Button type="primary" onClick={handleRestore}>
        Restore
      </Button>
    </div>
  );

  const ScannedList = () => {
    const renderUrl = (url) => (
      <Typography.Paragraph ellipsis={true}>
        <a href={url}>{url}</a>
      </Typography.Paragraph>
    );

    const renderList = (scannedList) => {
      const renderListItem = (url, urlId) => {
        return (
          <List.Item
            key={urlId}
            actions={[
              <DeleteFilled
                onClick={(event) => {
                  handleRemoveUrl(scannedList.id, urlId);
                  event.stopPropagation();
                }}
              />,
            ]}
          >
            <List.Item.Meta title={renderUrl(url)} />
          </List.Item>
        );
      };

      return (
        <List
          key={scannedList.id}
          itemLayout="horizontal"
          dataSource={scannedList.tabs}
          renderItem={renderListItem}
        />
      );
    };

    return (
      <Collapse>
        {data.map((scannedList) => (
          <Panel
            header={`${scannedList.tabs.length} tabs`}
            key={scannedList.id}
            extra={
              <DeleteFilled
                onClick={(event) => {
                  handleRemoveList(scannedList.id);
                  event.stopPropagation();
                }}
              />
            }
          >
            {renderList(scannedList)}
          </Panel>
        ))}
      </Collapse>
    );
  };

  return (
    <Row justify="center">
      <div
        style={{
          width: "70%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 3px 5px 0 rgba(0, 0, 0, 0.5)",
          backgroundColor: "rgba(255,255,255,0.9)",
        }}
      >
        {showDialogueBox && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0.5rem",
              marginLeft: "10rem",
              marginRight: "10rem",
              marginTop: "1rem",
              marginBottom: "1rem",
              border: "2px solid",
              borderColor: dialogueStatus.isError ? "red" : "green",
              borderRadius: 10,
            }}
          >
            <div
              style={{
                fontWeight: 500,
                fontSize: 16,
                color: dialogueStatus.isError ? "red" : "green",
              }}
            >
              {dialogueStatus.message}
            </div>
            <Button type="primary" onClick={handleScanNew}>
              Scan New
            </Button>
          </div>
        )}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <QRCodeScanner
            onQRScanned={onQRScanned}
            onQRScanError={onQRScanError}
            getScanNew={getScanNew}
          />
        </div>
        <div
          style={{
            paddingLeft: "2rem",
            paddingRight: "2rem",
            paddingBottom: "5rem",
            fontSize: 16,
          }}
        >
          <Header />
          <ScannedList />
        </div>
      </div>
    </Row>
  );
}

export default ScanQR;
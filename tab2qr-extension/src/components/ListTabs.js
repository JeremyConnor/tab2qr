/* global chrome */

import React, { useEffect, useState } from "react";
import {
  List,
  Avatar,
  Typography,
  Row,
  Col,
  Space,
  Checkbox,
  Button,
  Modal,
} from "antd";
import AnimatedQR from "./AnimatedQR";

function ListTabs(props) {
  const [tabs, setTabs] = useState([]);
  const [selected, setSelected] = useState({});
  const [qrVisible, setQrVisible] = useState(false);
  const [dataToSend, setDataToSend] = useState("");

  useEffect(() => {
    if (chrome.windows) {
      getTabsList((tabsData) => {
        let initialSelected = {};

        tabsData.forEach((tab, index) => {
          initialSelected[tab.id] = { checked: false, listIndex: index };
        });

        setTabs(tabsData);
        setSelected(initialSelected);
      });
    }
  }, []);

  // Fetch List of Tab URLs from current window.
  const getTabsList = (callback) => {
    chrome.windows.getCurrent((window) => {
      let tabsData = [];
      chrome.tabs.getAllInWindow(window.id, (tabs) => {
        tabs.forEach(({ id, title, url, favIconUrl }) => {
          tabsData.push({
            id,
            title,
            url,
            icon: favIconUrl,
          });
        });
        console.log(tabsData);
        callback(tabsData);
      });
    });
  };

  // Create JSON of all the selected Tab URLs.
  const getSelectedTabs = (callback) => {
    console.log("SELECTED", selected);
    console.log("TABS", tabs);

    let sendTabsList = { tabs: [] };
    Object.keys(selected).forEach((eachId) => {
      if (selected[eachId].checked) {
        sendTabsList.tabs.push(tabs[selected[eachId].listIndex].url);
      }
    });
    setDataToSend(JSON.stringify(sendTabsList));
    callback(sendTabsList);
  };

  // Select all the Tab URLs from current window.
  const onSelectAll = () => {
    let newState = {};
    Object.keys(selected).forEach((id) => {
      newState[id] = { ...selected[id], checked: true };
    });

    setSelected((previousSelection) => ({
      ...previousSelection,
      ...newState,
    }));
  };

  // Clear all the selections.
  const onClearAll = () => {
    let newState = {};
    Object.keys(selected).forEach((id) => {
      newState[id] = { ...selected[id], checked: false };
    });

    setSelected((previousSelection) => ({
      ...previousSelection,
      ...newState,
    }));
  };

  // Close QR Modal
  const onQRModalClose = () => {
    setQrVisible(false);
  };

  // Open QR Modal
  const onQRModalOpen = () => {
    getSelectedTabs((res) => {
      if (res.tabs.length === 0) onQRModalClose();
      else {
        setQrVisible(true);
      }
    });
  };

  // Update the selected Tab URLs
  const toggleSelection = (tabId, checked) => {
    setSelected((previousSelection) => ({
      ...previousSelection,
      [tabId]: {
        ...previousSelection[tabId],
        checked: checked,
      },
    }));
  };

  const Header = () => {
    return (
      <Row justify="space-between" style={{ paddingBottom: 20 }}>
        <Col>
          <Button type="primary" onClick={onQRModalOpen}>
            Generate QR
          </Button>
        </Col>
        <Col>
          <Space>
            <Button onClick={onSelectAll}>Select All</Button>
            <Button onClick={onClearAll}>Clear All</Button>
          </Space>
        </Col>
      </Row>
    );
  };

  // Modal for QR Code
  const QRCodeUI = () => {
    return (
      <Modal
        visible={qrVisible}
        onCancel={onQRModalClose}
        footer={null}
        width={400}
      >
        {qrVisible && (
          <div style={{ paddingTop: 20 }}>
            <Typography.Title
              level={4}
              style={{ textAlign: "center", color: "#ba68c8" }}
            >
              Your QR Code is ready !
            </Typography.Title>
            <div
              style={{
                paddingRight: "70%",
                paddingBottom: "20%",
                justifyContent: "center",
              }}
            >
              <AnimatedQR encode={dataToSend} overrideSize={250} />
            </div>
          </div>
        )}
      </Modal>
    );
  };

  // List all the Tab URLs along with checkbox
  const ListItem = (item) => {
    const onToggleChecked = (e) => {
      toggleSelection(item.id, e.target.checked);
    };

    const renderIcon = <Avatar src={item.icon} />;

    const renderUrl = (
      <Typography.Paragraph ellipsis={true}>
        <a href={item.url}>{item.url}</a>
      </Typography.Paragraph>
    );

    return (
      <List.Item
        key={item.id}
        actions={[
          <Checkbox
            checked={selected[item.id] ? selected[item.id].checked : false}
            onChange={onToggleChecked}
          />,
        ]}
      >
        <List.Item.Meta
          avatar={renderIcon}
          title={item.title}
          description={renderUrl}
        />
      </List.Item>
    );
  };

  return (
    <Row justify="center">
      <div
        style={{
          width: "60%",
          height: "100%",
          paddingTop: 20,
          paddingLeft: 20,
          paddingRight: 20,
          boxShadow: "0 3px 5px 0 rgba(0, 0, 0, 0.5)",
          backgroundColor: "rgba(255,255,255,0.9)",
        }}
      >
        <div
          style={{
            paddingBottom: 20,
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          Select the tabs from below and click on generate QR
        </div>
        <QRCodeUI />
        <Header />
        <List itemLayout="horizontal" dataSource={tabs} renderItem={ListItem} />
      </div>
    </Row>
  );
}

export default ListTabs;

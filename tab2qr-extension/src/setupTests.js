import "@testing-library/jest-dom";
import "jest-canvas-mock";
import chromeAPIMock from "chrome-api-mock";
import { cleanup } from "@testing-library/react";

// silencing react library deprecation warnings for packages installed
const originalWarn = console.warn.bind(console.warn);

beforeAll(() => {
  console.warn = (msg) =>
    !msg.toString().includes("componentWillReceiveProps") && originalWarn(msg);
});

afterAll(() => {
  console.warn = originalWarn;
  cleanup();
});

// window.matchMedia doesn't come predefined with jest-dom package
delete window.matchMedia;
window.matchMedia = (query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(),
  removeListener: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
});

// Mocks Chrome API instance, including query
// functions and variables defined in tabs & windows
// properties

const getSingleTab = (query, callback) => {
  return callback([
    { id: 1, url: "https://www.google.com", title: "google", icon: null },
  ]);
};

const getAllTabsInWindow = (windowId, callback) => {
  let maxTabs = 100;
  let allTabs = Array(maxTabs)
    .fill(null)
    .map((eachValue, index) =>
      getSingleTab(null, ([tabs]) => {
        return {
          ...tabs,
          id: index,
        };
      })
    );
  return callback(allTabs);
};

const getCurrentWindow = (callback) => {
  let windowObject = { id: 100 };
  return callback(windowObject);
};

let mockTabs = {
  query: getSingleTab,
  getAllInWindow: getAllTabsInWindow,
};
let mockWindows = { WINDOW_ID_CURRENT: null, getCurrent: getCurrentWindow };

let chromeAPI = chromeAPIMock.getChromeInstance();
chromeAPI.tabs = mockTabs;
chromeAPI.windows = mockWindows;

// saving as a global instance
global.chrome = chromeAPI;

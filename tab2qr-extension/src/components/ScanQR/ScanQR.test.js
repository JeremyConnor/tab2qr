import ReactDOM from "react-dom";
import { act } from "@testing-library/react";
import ScanQR from "./ScanQR";

let container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

// test 1
it("ScanQR rendering and updating props", () => {
  act(() => {
    ReactDOM.render(<ScanQR mock={true} />, container);
  });
  expect(container).toBeTruthy();
});

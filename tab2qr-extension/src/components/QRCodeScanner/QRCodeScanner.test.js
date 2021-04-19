import { render } from "@testing-library/react";
import QRCodeScanner from "./QRCodeScanner";

// test 1
it("QRCodeScanner rendering", () => {
  const list = render(<QRCodeScanner mock={true} />);
  expect(list).toBeTruthy();
});

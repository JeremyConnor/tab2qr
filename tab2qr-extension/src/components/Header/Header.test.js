import { render } from "@testing-library/react";
import Header, { ImportButton } from "./Header";

// test 1
it("header rendering", () => {
  const header = render(<Header />);
  expect(header).toBeTruthy();
});

// test 2
it("import-button rendering", () => {
  const importBtn = render(<ImportButton />);
  expect(importBtn).toBeTruthy();
});

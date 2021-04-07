import { render } from "@testing-library/react";
import Body from "./Body";

// test 1
it("body rendering", () => {
  const body = render(<Body />);
  expect(body).toBeTruthy();
});

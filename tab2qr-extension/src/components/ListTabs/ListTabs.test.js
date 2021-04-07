import { render } from "@testing-library/react";
import ListTabs from "./ListTabs";

// test 1
it("ListTabs rendering", () => {
  const list = render(<ListTabs />);
  expect(list).toBeTruthy();
});

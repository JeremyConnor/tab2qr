import { render } from "@testing-library/react";
import App from "./App";

// test 1
it("ListTabs rendering", () => {
  const app = render(<App />);
  expect(app).toBeTruthy();
});

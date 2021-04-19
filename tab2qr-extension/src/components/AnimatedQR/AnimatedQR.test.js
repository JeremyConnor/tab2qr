import { render } from "@testing-library/react";
import AnimatedQR from "./AnimatedQR";

const maxTabs = 40;
const shortURL = "https://www.google.com";
const largeURL = Array(1024).fill("h").join("");

const generateList = (isShortUrl, isSmallList) => {
  let url = isShortUrl ? shortURL : largeURL;
  let list = new Array(isSmallList ? 1 : maxTabs).fill(url);
  return list;
};

const formatDataToSend = (data) => {
  return JSON.stringify({
    tabs: data,
  });
};

// Test 1
it("Animated-QR single-tab small-url rendering", () => {
  const { asFragment } = render(
    <AnimatedQR encode={formatDataToSend(generateList(true, true))} />
  );
  expect(asFragment()).toBeTruthy();
});

// Test 2
it("Animated-QR single-tab large-url rendering", () => {
  const qr = render(
    <AnimatedQR encode={formatDataToSend(generateList(false, true))} />
  );
  expect(qr).toBeTruthy();
});

// Test 3
it("Animated-QR multiple-tabs small-url rendering", () => {
  const qr = render(
    <AnimatedQR encode={formatDataToSend(generateList(true, false))} />
  );
  expect(qr).toBeTruthy();
});

// Test 4
it("Animated-QR multiple-tabs large-url rendering", () => {
  const qr = render(
    <AnimatedQR encode={formatDataToSend(generateList(false, false))} />
  );
  expect(qr).toBeTruthy();
});

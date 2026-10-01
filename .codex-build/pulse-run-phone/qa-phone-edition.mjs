import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { chromium } from "file:///C:/Users/rtees/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs";

const workspaceDir = "D:/0_AnimationAndGameDesign";
const htmlPath = path.join(
  workspaceDir,
  "GameDesign/demo-games/geometry-dash-style/phone-edition/Pulse_Run_Phone_Edition.html",
);
const screenshotPath = path.join(
  workspaceDir,
  "output/geometry-dash-qa/phone-edition-ready.png",
);

await fs.mkdir(path.dirname(screenshotPath), { recursive: true });

const browser = await chromium.launch({ channel: "msedge", headless: true });
const page = await browser.newPage({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  hasTouch: true,
  isMobile: true,
});

const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
page.on("console", (message) => {
  if (message.type() === "error") errors.push(message.text());
});

await page.goto(pathToFileURL(htmlPath).href);
await page.locator("#startButton").waitFor({ state: "visible" });

const viewportCheck = await page.evaluate(() => ({
  documentWidth: document.documentElement.scrollWidth,
  viewportWidth: window.innerWidth,
  canvasWidth: Math.round(document.querySelector("#gameCanvas").getBoundingClientRect().width),
  canvasHeight: Math.round(document.querySelector("#gameCanvas").getBoundingClientRect().height),
}));

await page.screenshot({ path: screenshotPath, fullPage: true });

await page.locator("#startButton").tap();
await page.waitForTimeout(150);
if ((await page.locator("#stateLabel").textContent()) !== "Running") {
  throw new Error("Start button did not enter the running state.");
}

await page.locator("#gameCanvas").tap({ position: { x: 120, y: 100 } });
await page.waitForTimeout(120);
await page.locator("#pauseButton").tap();
if ((await page.locator("#stateLabel").textContent()) !== "Paused") {
  throw new Error("Pause control did not enter the paused state.");
}

await page.locator("#pauseButton").tap();
if ((await page.locator("#stateLabel").textContent()) !== "Running") {
  throw new Error("Pause control did not resume the game.");
}

await page.keyboard.press("KeyR");
await page.waitForTimeout(100);

await page.setViewportSize({ width: 844, height: 390 });
const landscapeCheck = await page.evaluate(() => ({
  documentWidth: document.documentElement.scrollWidth,
  viewportWidth: window.innerWidth,
  canvasWidth: Math.round(document.querySelector("#gameCanvas").getBoundingClientRect().width),
  canvasHeight: Math.round(document.querySelector("#gameCanvas").getBoundingClientRect().height),
}));

if (viewportCheck.documentWidth > viewportCheck.viewportWidth) {
  throw new Error(`Horizontal overflow detected: ${JSON.stringify(viewportCheck)}`);
}

if (landscapeCheck.documentWidth > landscapeCheck.viewportWidth) {
  throw new Error(`Landscape overflow detected: ${JSON.stringify(landscapeCheck)}`);
}

if (errors.length > 0) {
  throw new Error(`Browser errors:\n${errors.join("\n")}`);
}

console.log(JSON.stringify({ viewportCheck, landscapeCheck, screenshotPath, errors }, null, 2));
await browser.close();

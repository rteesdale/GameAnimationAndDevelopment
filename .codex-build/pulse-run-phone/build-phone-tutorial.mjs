import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import {
  Presentation,
  PresentationFile,
} from "file:///C:/Users/rtees/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/@oai/artifact-tool/dist/artifact_tool.mjs";

const workspaceDir = "D:/0_AnimationAndGameDesign";
const skillDir = "C:/Users/rtees/.codex/plugins/cache/openai-primary-runtime/presentations/26.923.10815/skills/presentations";
const buildDir = path.join(workspaceDir, ".codex-build/pulse-run-phone");
const outputDir = path.join(workspaceDir, "Curriculum/PowerPoint_Tutorials/Pulse_Run");
const stagingDir = path.join(workspaceDir, ".codex-finalizer/pulse-run-phone-tutorial");
const pythonExecutable = "C:/Users/rtees/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe";
const screenshotPath = path.join(workspaceDir, "output/geometry-dash-qa/phone-edition-ready.png");
const candidatePath = path.join(stagingDir, "lesson-07-candidate.pptx");
const finalPath = path.join(outputDir, "Pulse_Run_07_Packaging_the_Phone_Edition.pptx");

const { makeNativeBulletParagraphs, finalizePresentation } = await import(
  pathToFileURL(path.join(skillDir, "container_tools/artifact_tool_utils.mjs")).href,
);

await fs.mkdir(buildDir, { recursive: true });
await fs.mkdir(outputDir, { recursive: true });
await fs.mkdir(stagingDir, { recursive: true });

const FONT = "Arial";
const CODE_FONT = "Consolas";
const C = {
  ink: "#131315",
  paper: "#F4F1E8",
  cyan: "#45D9E8",
  coral: "#FF5B57",
  yellow: "#FFCC33",
  green: "#82DC73",
  violet: "#8075FF",
  grey: "#A9A7A0",
};
const deckTitle = "Pulse Run 07: Packaging the Phone Edition";

function addShape(slide, geometry, position, fill, line = { fill: "none", width: 0 }) {
  return slide.shapes.add({ geometry, position, fill, line });
}

function addText(slide, text, position, options = {}) {
  const shape = addShape(slide, "textbox", position, options.fill ?? "none", options.line ?? { fill: "none", width: 0 });
  shape.text = text;
  shape.text.style = {
    typeface: options.typeface ?? FONT,
    fontSize: options.fontSize ?? 24,
    bold: options.bold ?? false,
    color: options.color ?? C.ink,
    alignment: options.alignment ?? "left",
    verticalAlignment: options.verticalAlignment ?? "middle",
    autoFit: "none",
  };
  return shape;
}

function addBullets(slide, items, position, options = {}) {
  const shape = addShape(slide, "textbox", position, "none", { fill: "none", width: 0 });
  shape.text = makeNativeBulletParagraphs(items, {
    marginLeftPoints: 20,
    hangingPoints: 10,
    spaceAfterPoints: options.spaceAfterPoints ?? 10,
  });
  shape.text.style = {
    typeface: options.typeface ?? FONT,
    fontSize: options.fontSize ?? 25,
    color: options.color ?? C.ink,
    autoFit: "none",
  };
  return shape;
}

function addHeader(slide, title, dark = false) {
  addText(slide, title, { left: 70, top: 42, width: 1040, height: 62 }, {
    fontSize: 42,
    bold: true,
    color: dark ? C.paper : C.ink,
  });
  addText(slide, "07", { left: 1132, top: 44, width: 78, height: 54 }, {
    fontSize: 28,
    bold: true,
    color: dark ? C.yellow : C.coral,
    alignment: "right",
  });
  addShape(slide, "rect", { left: 70, top: 116, width: 1140, height: 5 }, dark ? C.cyan : C.ink);
}

function addFooter(slide, number, dark = false) {
  addText(slide, deckTitle, { left: 70, top: 674, width: 940, height: 20 }, {
    fontSize: 14,
    bold: true,
    color: dark ? C.grey : "#66645F",
  });
  addText(slide, String(number), { left: 1130, top: 674, width: 80, height: 20 }, {
    fontSize: 14,
    bold: true,
    color: dark ? C.grey : "#66645F",
    alignment: "right",
  });
}

function addNotes(slide, text) {
  slide.speakerNotes.textFrame.setText(text);
}

function addNode(slide, text, position, fill, options = {}) {
  const shape = addShape(slide, "roundRect", position, fill, {
    style: "solid",
    fill: options.line ?? "none",
    width: options.lineWidth ?? 0,
  });
  shape.borderRadius = 8;
  shape.text = text;
  shape.text.style = {
    typeface: options.typeface ?? FONT,
    fontSize: options.fontSize ?? 24,
    bold: options.bold ?? true,
    color: options.color ?? C.ink,
    alignment: "center",
    verticalAlignment: "middle",
    autoFit: "none",
  };
  return shape;
}

function connect(slide, from, to, color = C.paper) {
  slide.shapes.connect(from, to, {
    kind: "straight",
    fromSide: "right",
    toSide: "left",
    line: { style: "solid", fill: color, width: 3 },
    tail: { type: "triangle", width: "sm", length: "sm" },
  });
}

const presentation = Presentation.create({ slideSize: { width: 1280, height: 720 } });

// 1. Cover
{
  const slide = presentation.slides.add();
  slide.background.fill = C.ink;
  const image = await fs.readFile(screenshotPath);
  slide.images.add({
    blob: new Uint8Array(image),
    contentType: "image/png",
    alt: "Pulse Run phone edition open in a narrow mobile browser",
    fit: "cover",
    position: { left: 810, top: 0, width: 470, height: 720 },
  });
  addShape(slide, "rect", { left: 775, top: 0, width: 80, height: 720 }, "#131315/70");
  addShape(slide, "rect", { left: 72, top: 112, width: 12, height: 430 }, C.yellow);
  addText(slide, "PULSE RUN 07", { left: 118, top: 116, width: 500, height: 46 }, { fontSize: 20, bold: true, color: C.cyan });
  addText(slide, "Packaging the\nPhone Edition", { left: 118, top: 190, width: 650, height: 180 }, {
    fontSize: 58,
    bold: true,
    color: C.paper,
    verticalAlignment: "top",
  });
  addText(slide, "Why one distributable file can be easier to move and open", { left: 122, top: 410, width: 620, height: 92 }, {
    fontSize: 25,
    color: C.paper,
    verticalAlignment: "top",
  });
  addText(slide, "Beginner coding tutorial", { left: 120, top: 618, width: 450, height: 34 }, { fontSize: 18, bold: true, color: C.yellow });
  addNotes(slide, "Open the phone edition directly from its saved location. Emphasize that its gameplay is the same; only the delivery format has changed. Source: local Pulse_Run_Phone_Edition.html.");
}

// 2. Goals
{
  const slide = presentation.slides.add();
  slide.background.fill = C.paper;
  addHeader(slide, "Learning goals");
  addText(slide, "By the end of this tutorial, students can:", { left: 74, top: 152, width: 760, height: 44 }, { fontSize: 25, bold: true, color: C.coral });
  addBullets(slide, [
    "Distinguish editable source files from a distribution build",
    "Explain how relative file paths create dependencies",
    "Describe how CSS and JavaScript can be placed inside HTML",
    "Identify the benefits, limits, and tests for a one-file edition",
  ], { left: 88, top: 212, width: 1060, height: 340 }, { fontSize: 27, spaceAfterPoints: 16 });
  addShape(slide, "rect", { left: 72, top: 590, width: 1136, height: 2 }, C.ink);
  addText(slide, "Key question", { left: 72, top: 607, width: 170, height: 34 }, { fontSize: 18, bold: true, color: C.cyan });
  addText(slide, "Why keep several source files when one file is easier to share?", { left: 250, top: 600, width: 930, height: 48 }, { fontSize: 25, bold: true });
  addFooter(slide, 2);
  addNotes(slide, "Use the key question to surface two different needs: humans need maintainable source code, while players need a reliable package.");
}

// 3. Source dependencies
{
  const slide = presentation.slides.add();
  slide.background.fill = C.ink;
  addHeader(slide, "The source project uses three files", true);
  const html = addNode(slide, "index.html\nstructure", { left: 110, top: 245, width: 290, height: 170 }, C.yellow);
  const css = addNode(slide, "css/style.css\nappearance", { left: 500, top: 178, width: 300, height: 135 }, C.cyan);
  const js = addNode(slide, "js/game.js\nbehaviour", { left: 500, top: 350, width: 300, height: 135 }, C.coral);
  connect(slide, html, css);
  connect(slide, html, js);
  const browser = addNode(slide, "Browser combines\nthe files", { left: 900, top: 245, width: 270, height: 170 }, C.green);
  connect(slide, css, browser);
  connect(slide, js, browser);
  addText(slide, "The links are relative paths. Move or omit one file and the page can lose its style or game logic.", { left: 145, top: 515, width: 990, height: 76 }, {
    fontSize: 25,
    color: C.paper,
    alignment: "center",
  });
  addFooter(slide, 3, true);
  addNotes(slide, "Show the link and script tags in index.html. A relative URL is resolved from the document's location. Source: local index.html. Reference: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/url_value");
}

// 4. Inlining
{
  const slide = presentation.slides.add();
  slide.background.fill = C.paper;
  addHeader(slide, "Packaging places the dependencies inside HTML");
  addShape(slide, "rect", { left: 70, top: 158, width: 650, height: 450 }, C.ink, { style: "solid", fill: C.yellow, width: 3 });
  addText(slide, `<style>\n  /* contents of style.css */\n</style>\n\n<canvas id="gameCanvas"></canvas>\n\n<script>\n  // contents of game.js\n</script>`, { left: 95, top: 182, width: 602, height: 395 }, {
    typeface: CODE_FONT,
    fontSize: 21,
    color: C.paper,
    verticalAlignment: "top",
  });
  addBullets(slide, [
    "The browser receives one HTML document",
    "No CSS or JavaScript path can break",
    "The same game code still runs offline",
    "No internet connection is introduced",
  ], { left: 765, top: 180, width: 430, height: 360 }, { fontSize: 23, spaceAfterPoints: 14 });
  addText(slide, "Inlining changes where the code lives, not what the code means.", { left: 770, top: 535, width: 410, height: 70 }, { fontSize: 23, bold: true, color: C.coral });
  addFooter(slide, 4);
  addNotes(slide, "Compare this slide with the original link and script tags. The build script reads the source files and inserts their contents between style and script tags. Source: local build-phone-edition.mjs and generated phone HTML.");
}

// 5. Comparison
{
  const slide = presentation.slides.add();
  slide.background.fill = C.paper;
  addHeader(slide, "Each format serves a different audience");
  addText(slide, "Teaching source", { left: 80, top: 160, width: 500, height: 54 }, { fontSize: 30, bold: true, color: C.coral });
  addText(slide, "Phone edition", { left: 700, top: 160, width: 500, height: 54 }, { fontSize: 30, bold: true, color: C.cyan });
  addShape(slide, "rect", { left: 626, top: 160, width: 3, height: 410 }, C.ink);
  addBullets(slide, [
    "HTML, CSS, and JavaScript stay separate",
    "Beginners can find each responsibility",
    "Editing and debugging are easier",
    "This remains the master version",
  ], { left: 84, top: 230, width: 495, height: 330 }, { fontSize: 24, spaceAfterPoints: 13 });
  addBullets(slide, [
    "One item is easier to send or copy",
    "Relative dependency errors disappear",
    "The combined file is harder to study",
    "It must be rebuilt after source changes",
  ], { left: 704, top: 230, width: 495, height: 330 }, { fontSize: 24, spaceAfterPoints: 13 });
  addFooter(slide, 5);
  addNotes(slide, "Do not present one format as universally better. Separation helps authors; bundling helps distribution. Platform file-opening rules can still vary, especially on phones.");
}

// 6. Workflow
{
  const slide = presentation.slides.add();
  slide.background.fill = C.ink;
  addHeader(slide, "Use one source of truth", true);
  const nodes = [
    ["Edit source", C.cyan],
    ["Bundle files", C.yellow],
    ["Test phone\nedition", C.coral],
    ["Distribute", C.green],
  ];
  const shapes = nodes.map(([label, color], index) => addNode(slide, label, {
    left: 72 + index * 288,
    top: 242,
    width: 250,
    height: 180,
  }, color));
  for (let index = 0; index < shapes.length - 1; index += 1) connect(slide, shapes[index], shapes[index + 1]);
  addText(slide, "Never hand-edit both copies. Rebuild the phone edition from the readable source after every approved change.", { left: 145, top: 480, width: 990, height: 92 }, {
    fontSize: 26,
    color: C.paper,
    alignment: "center",
  });
  addFooter(slide, 6, true);
  addNotes(slide, "Demonstrate the generated comment at the top of the phone edition. The bundler also checks that no external script or stylesheet remains. Source: local build-phone-edition.mjs.");
}

// 7. Checkpoint
{
  const slide = presentation.slides.add();
  slide.background.fill = C.ink;
  addHeader(slide, "Checkpoint: audit a portable build", true);
  addText(slide, "Prove that the phone edition is genuinely portable.", { left: 78, top: 162, width: 1120, height: 90 }, {
    fontSize: 35,
    bold: true,
    color: C.yellow,
    verticalAlignment: "top",
  });
  addText(slide, "Test checklist", { left: 80, top: 282, width: 230, height: 42 }, { fontSize: 24, bold: true, color: C.cyan });
  addBullets(slide, [
    "Confirm that only one game file is required",
    "Open it without an internet connection",
    "Test tap, pause, sound, collision, and restart",
    "Check portrait and landscape orientations",
  ], { left: 90, top: 332, width: 660, height: 250 }, { fontSize: 24, color: C.paper, spaceAfterPoints: 12 });
  addShape(slide, "rect", { left: 805, top: 292, width: 4, height: 260 }, C.coral);
  addText(slide, "Evidence", { left: 850, top: 292, width: 300, height: 42 }, { fontSize: 24, bold: true, color: C.coral });
  addText(slide, "A completed checklist and one noted limitation of the device or browser.", { left: 850, top: 350, width: 330, height: 170 }, { fontSize: 25, color: C.paper, verticalAlignment: "top" });
  addFooter(slide, 7, true);
  addNotes(slide, "Airplane mode is a useful classroom test, but direct opening still depends on the phone's file manager and browser. Installing a web app is a different process and commonly requires a secure web origin. Reference: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Tutorials/CycleTracker/Secure_connection");
}

await (await PresentationFile.exportPptx(presentation)).save(candidatePath);

await finalizePresentation({
  workspaceDir,
  candidatePath,
  finalPath,
  pythonExecutable,
  integrityValidatorPath: path.join(skillDir, "container_tools/inspect_presentation_package_integrity.py"),
  layoutValidatorPath: path.join(skillDir, "container_tools/inspect_presentation_layout_geometry.py"),
  layoutArgs: [
    "--expected-slide-size-emu", "12192000,6858000",
    "--validate-bullet-geometry",
    "--validate-heading-fit",
  ],
  explicitTotalSlideCount: 7,
  requiredNativeTableOwnerSlides: [],
  requiredNativeChartOwnerSlides: [],
  fontPolicy: { basis: "design", families: [FONT, CODE_FONT] },
  verifyArtifactToolImport: true,
  receiptPath: path.join(stagingDir, "lesson-07-revision-2.validation.json"),
});

console.log(finalPath);

import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { Presentation, PresentationFile } from "@oai/artifact-tool";

const {
  SKILL_DIR,
  TMP_DIR,
  FINAL_PPTX,
  RUNTIME_PYTHON,
} = process.env;

if (!path.isAbsolute(SKILL_DIR ?? "") || !path.isAbsolute(TMP_DIR ?? "") || !path.isAbsolute(FINAL_PPTX ?? "")) {
  throw new Error("Set SKILL_DIR, TMP_DIR, and FINAL_PPTX as absolute paths.");
}

const workspaceDir = "D:\\0_AnimationAndGameDesign";
const { resolvePresentationFont, finalizePresentation } = await import(
  pathToFileURL(path.join(SKILL_DIR, "container_tools/artifact_tool_utils.mjs")).href,
);

await fs.mkdir(TMP_DIR, { recursive: true });
await fs.mkdir(path.dirname(FINAL_PPTX), { recursive: true });

const fontFamily = resolvePresentationFont({ fontFamily: "Aptos" });
const presentation = Presentation.create({ slideSize: { width: 1280, height: 720 } });

const C = {
  ink: "#111827",
  softInk: "#374151",
  muted: "#64748B",
  bg: "#F7F3EA",
  paper: "#FFFDF7",
  teal: "#0F766E",
  blue: "#2563EB",
  amber: "#D97706",
  coral: "#E11D48",
  green: "#15803D",
  cream: "#FDF6E8",
  charcoal: "#111827",
  white: "#FFFFFF",
};

const imagePaths = {
  cover: path.join(workspaceDir, "game-development-google-classroom-photoreal-1600x400.png"),
  classroom: path.join(workspaceDir, "game-development-google-classroom.png"),
  godot: path.join(workspaceDir, "Godot", "godot-docs-html-stable", "_images", "editor_intro_workspace_game.webp"),
};

const coverBytes = await fs.readFile(imagePaths.cover);
const classroomBytes = await fs.readFile(imagePaths.classroom);
const godotBytes = await fs.readFile(imagePaths.godot);

function addBox(slide, { left, top, width, height, fill = C.white, line = "none", radius = 0 }) {
  return slide.shapes.add({
    geometry: "rect",
    position: { left, top, width, height },
    fill,
    line: line === "none" ? { fill: "none", width: 0 } : line,
    borderRadius: radius,
  });
}

function addText(slide, text, position, style = {}) {
  const shape = slide.shapes.add({
    geometry: "textbox",
    position,
    fill: "none",
    line: { fill: "none", width: 0 },
  });
  shape.text = text;
  shape.text.style = {
    typeface: fontFamily,
    fontSize: Math.max(style.fontSize ?? 28, 22),
    bold: style.bold ?? false,
    color: style.color ?? C.ink,
    alignment: style.alignment ?? "left",
    autoFit: style.autoFit ?? "none",
  };
  return shape;
}

function title(slide, text, subtitle) {
  addText(slide, text, { left: 72, top: 52, width: 760, height: 74 }, { fontSize: 38, bold: true });
  if (subtitle) addText(slide, subtitle, { left: 72, top: 116, width: 700, height: 42 }, { fontSize: 19, color: C.softInk });
}

function footer(slide, n) {
  addText(slide, `Game Animation & Development Studio  ${n}`, { left: 72, top: 666, width: 560, height: 30 }, { fontSize: 16, color: C.muted });
}

function setNotes(slide, lines) {
  slide.speakerNotes.textFrame.setText(lines.join("\n"));
}

function addDiscussionPrompt(slide, prompt, y = 548) {
  addBox(slide, { left: 72, top: y, width: 1136, height: 94, fill: "#E7F3F1", line: { style: "solid", fill: "#A7D8D2", width: 1 }, radius: 8 });
  addText(slide, "Discussion prompt", { left: 100, top: y + 14, width: 290, height: 30 }, { fontSize: 16, bold: true, color: C.teal });
  addText(slide, prompt, { left: 100, top: y + 46, width: 1030, height: 38 }, { fontSize: 21, color: C.ink });
}

// Slide 1
{
  const slide = presentation.slides.add();
  slide.background.fill = C.charcoal;
  slide.images.add({
    blob: coverBytes,
    contentType: "image/png",
    alt: "Students in a game development classroom",
    fit: "cover",
    position: { left: 0, top: 0, width: 1280, height: 720 },
  });
  addBox(slide, { left: 0, top: 0, width: 1280, height: 720, fill: "#000000/46" });
  addText(slide, "Game Animation & Development Studio", { left: 74, top: 392, width: 960, height: 96 }, { fontSize: 47, bold: true, color: C.white });
  addText(slide, "First meet and greet", { left: 78, top: 496, width: 540, height: 42 }, { fontSize: 24, color: "#FDE68A" });
  addText(slide, "Today is for names, interests, expectations, and the big idea behind the studio.", { left: 78, top: 558, width: 820, height: 56 }, { fontSize: 23, color: C.white });
  setNotes(slide, [
    "Welcome students warmly. Keep the tone conversational.",
    "Source context: D:\\0_AnimationAndGameDesign\\Curriculum\\Wednesday_Studio_Session_Types.md and Academic_Year_Course_Outline_Find_It_Fix_It.md.",
    "Image source: local workspace image game-development-google-classroom-photoreal-1600x400.png.",
  ]);
}

// Slide 2
{
  const slide = presentation.slides.add();
  slide.background.fill = C.bg;
  title(slide, "Simple Meeting Agenda", "A short first session with plenty of room to talk");
  const items = [
    ["Welcome", "What the studio is for"],
    ["Introductions", "Names, interests, and experience"],
    ["Studio culture", "How we build and give feedback"],
    ["Big ideas", "Games, animation, users, and testing"],
    ["Starting pathway", "Where each student begins next"],
  ];
  items.forEach(([head, body], i) => {
    const y = 184 + i * 78;
    addText(slide, String(i + 1).padStart(2, "0"), { left: 98, top: y, width: 58, height: 36 }, { fontSize: 25, bold: true, color: [C.teal, C.blue, C.amber, C.coral, C.green][i] });
    addBox(slide, { left: 170, top: y - 4, width: 3, height: 48, fill: "#CBD5E1" });
    addText(slide, head, { left: 198, top: y - 2, width: 300, height: 30 }, { fontSize: 24, bold: true });
    addText(slide, body, { left: 500, top: y + 1, width: 560, height: 30 }, { fontSize: 21, color: C.softInk });
  });
  addDiscussionPrompt(slide, "What would make this studio worth showing up for each week?");
  footer(slide, 2);
  setNotes(slide, [
    "Use this as a timing guide, not a rigid lecture.",
    "Invite short responses early so students know the session expects voices, not silence.",
    "Source context: Orientation And Placement Meeting agenda in Wednesday_Studio_Session_Types.md.",
  ]);
}

// Slide 3
{
  const slide = presentation.slides.add();
  slide.background.fill = C.paper;
  title(slide, "Why This Studio Exists", "The aim is to make work that another person can experience");
  addText(slide, "Students will learn by making visible progress, testing early, and explaining how each change affects the audience.", { left: 80, top: 192, width: 650, height: 110 }, { fontSize: 30, bold: true, color: C.ink });
  const points = [
    "A game idea becomes clearer when someone else tries it.",
    "An animation becomes stronger when motion, timing, and feeling connect.",
    "A small improvement can teach more than a large unfinished plan.",
  ];
  points.forEach((p, i) => {
    addText(slide, p, { left: 100, top: 344 + i * 58, width: 650, height: 42 }, { fontSize: 21, color: C.softInk });
  });
  slide.images.add({
    blob: classroomBytes,
    contentType: "image/png",
    alt: "Illustrated animation and game design classroom",
    fit: "cover",
    position: { left: 810, top: 158, width: 360, height: 360 },
    geometry: "rect",
  });
  addDiscussionPrompt(slide, "Think of a game, animation, or app you like. What does it make the audience do or feel?", 560);
  footer(slide, 3);
  setNotes(slide, [
    "Connect the studio to audience experience. This is the first big idea.",
    "Image source: local workspace image game-development-google-classroom.png.",
  ]);
}

// Slide 4
{
  const slide = presentation.slides.add();
  slide.background.fill = C.bg;
  title(slide, "Studio Culture", "Good creative work needs trust, iteration, and clear feedback");
  const norms = [
    ["Test early", "Show rough work before it feels finished."],
    ["Save often", "Protect progress before risky changes."],
    ["Describe problems clearly", "Name what happened and where it happened."],
    ["Focus feedback on the work", "Critique the design, experience, or communication."],
    ["Credit assets", "Respect the people whose work helps your project."],
    ["Improve one small thing", "Choose a change you can test this week."],
  ];
  norms.forEach(([head, body], i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 90 + col * 560;
    const y = 176 + row * 118;
    addText(slide, head, { left: x, top: y, width: 360, height: 32 }, { fontSize: 24, bold: true, color: [C.teal, C.blue, C.amber, C.coral, C.green, C.ink][i] });
    addText(slide, body, { left: x, top: y + 38, width: 440, height: 52 }, { fontSize: 19, color: C.softInk });
  });
  addDiscussionPrompt(slide, "Which norm will help us most when the work gets difficult?");
  footer(slide, 4);
  setNotes(slide, [
    "These norms are adapted from the Studio Level 1 manual.",
    "Ask students which one they think the group will need most.",
    "Source context: StudioLevel1_Explorer_Game_Foundations_Instruction_Manual.md.",
  ]);
}

// Slide 5
{
  const slide = presentation.slides.add();
  slide.background.fill = C.paper;
  title(slide, "Big Idea: Designed Experiences", "Games and animations are built from choices that shape what people notice");
  const terms = [
    ["Player action", "What the player does"],
    ["Goal", "What the player tries to achieve"],
    ["Rule", "What limits or guides the action"],
    ["Feedback", "How the work tells the audience what changed"],
    ["Feeling", "The response the design is trying to create"],
  ];
  terms.forEach(([head, body], i) => {
    const y = 182 + i * 66;
    addText(slide, head, { left: 92, top: y, width: 240, height: 30 }, { fontSize: 23, bold: true, color: [C.teal, C.blue, C.amber, C.coral, C.green][i] });
    addText(slide, body, { left: 346, top: y + 2, width: 430, height: 32 }, { fontSize: 21, color: C.softInk });
  });
  slide.images.add({
    blob: godotBytes,
    contentType: "image/webp",
    alt: "Godot editor showing a playable game screen",
    fit: "cover",
    crop: { left: 0.02, top: 0.02, right: 0.02, bottom: 0.02 },
    position: { left: 820, top: 176, width: 360, height: 300 },
  });
  addDiscussionPrompt(slide, "When you play or watch something, what makes you say I understand what to do?", 536);
  footer(slide, 5);
  setNotes(slide, [
    "Keep this slide interactive. Ask for examples from students' games, shows, apps, or videos.",
    "Image source: local Godot documentation image editor_intro_workspace_game.webp.",
    "Source context: Lesson 1 vocabulary in StudioLevel1_Explorer_Game_Foundations_Instruction_Manual.md.",
  ]);
}

// Slide 6
{
  const slide = presentation.slides.add();
  slide.background.fill = C.bg;
  title(slide, "Big Idea: Find It, Fix It, Play It", "The first projects start with small changes to working or partly working examples");
  const steps = [
    ["Find", "What is unclear, missing, unfair, broken, or weak?"],
    ["Fix", "Change one thing that a player can notice."],
    ["Test", "Let another person try it before you explain it."],
    ["Explain", "Describe how the player experience changed."],
  ];
  steps.forEach(([head, body], i) => {
    const x = 74 + i * 296;
    addBox(slide, { left: x, top: 198, width: 246, height: 260, fill: C.white, line: { style: "solid", fill: "#E2E8F0", width: 1 }, radius: 8 });
    addText(slide, head, { left: x + 20, top: 224, width: 196, height: 44 }, { fontSize: 29, bold: true, color: [C.teal, C.blue, C.amber, C.coral][i] });
    addText(slide, body, { left: x + 20, top: 294, width: 198, height: 120 }, { fontSize: 19, color: C.softInk });
  });
  addText(slide, "First task mindset: one small improvement, tested with a real person.", { left: 100, top: 484, width: 1000, height: 44 }, { fontSize: 24, bold: true, color: C.ink, alignment: "center" });
  addDiscussionPrompt(slide, "What kind of problem do you notice first in games: controls, fairness, story, visuals, sound, or instructions?", 542);
  footer(slide, 6);
  setNotes(slide, [
    "This is the course pathway in plain language.",
    "Source context: Core Teaching Principle and Year Goal in Academic_Year_Course_Outline_Find_It_Fix_It.md.",
  ]);
}

// Slide 7
{
  const slide = presentation.slides.add();
  slide.background.fill = C.paper;
  title(slide, "Starting Pathways", "Students can begin at different levels and still share the same studio rhythm");
  const rows = [
    ["Explorer", "Modify and explain a simple 2D game prototype."],
    ["Builder", "Repair, tune, and extend an arcade-style game."],
    ["Designer", "Improve story, UI, feedback, systems, and user experience."],
    ["Developer", "Contribute to a team project with a defined production role."],
    ["Director", "Prepare a polished demo, pitch, and documentation."],
  ];
  rows.forEach(([level, desc], i) => {
    const y = 174 + i * 75;
    addText(slide, level, { left: 118, top: y, width: 190, height: 34 }, { fontSize: 25, bold: true, color: [C.teal, C.blue, C.amber, C.coral, C.green][i] });
    addBox(slide, { left: 326, top: y + 5, width: 5, height: 30, fill: "#CBD5E1" });
    addText(slide, desc, { left: 360, top: y + 1, width: 720, height: 36 }, { fontSize: 23, color: C.softInk });
  });
  addDiscussionPrompt(slide, "Where do you think you are starting, and what would help you move up one level?");
  footer(slide, 7);
  setNotes(slide, [
    "Do not make placement feel fixed. Emphasize starting point, not ranking.",
    "Source context: Studio Level Fit table in Academic_Year_Course_Outline_Find_It_Fix_It.md.",
  ]);
}

// Slide 8
{
  const slide = presentation.slides.add();
  slide.background.fill = C.charcoal;
  addText(slide, "First Conversation", { left: 72, top: 54, width: 680, height: 70 }, { fontSize: 42, bold: true, color: C.white });
  addText(slide, "Use these questions to learn who is in the room.", { left: 74, top: 122, width: 760, height: 42 }, { fontSize: 22, color: "#CBD5E1" });
  const questions = [
    "What games, animations, tools, or stories have shaped your taste?",
    "What have you made before, even if it was small or unfinished?",
    "What do you want to learn first: art, code, story, level design, sound, UI, or production?",
    "What access do you have to a laptop, files, and Google Classroom?",
  ];
  questions.forEach((q, i) => {
    addText(slide, q, { left: 90, top: 204 + i * 82, width: 790, height: 58 }, { fontSize: 22, color: C.white });
  });
  addBox(slide, { left: 922, top: 212, width: 240, height: 304, fill: "#FDE68A" });
  addText(slide, "Next step", { left: 948, top: 240, width: 190, height: 38 }, { fontSize: 23, bold: true, color: C.ink });
  addText(slide, "Join Google Classroom, complete the interest form, and bring one idea or example to the next session.", { left: 948, top: 296, width: 186, height: 170 }, { fontSize: 19, color: C.ink });
  addText(slide, "Thank you", { left: 78, top: 608, width: 400, height: 52 }, { fontSize: 34, bold: true, color: "#FDE68A" });
  setNotes(slide, [
    "Let students answer in pairs first if the room is quiet.",
    "Source context: Orientation And Placement Meeting outputs in Wednesday_Studio_Session_Types.md.",
  ]);
}

const stagingDir = path.join(workspaceDir, ".codex-finalizer");
await fs.mkdir(stagingDir, { recursive: true });
const candidatePath = path.join(stagingDir, "meet_greet_candidate.pptx");
await (await PresentationFile.exportPptx(presentation)).save(candidatePath);

const requirements = {
  explicitTotalSlideCount: 8,
  requiredNativeTableOwnerSlides: [],
  requiredNativeChartOwnerSlides: [],
};
const fontPolicy = { basis: "design", families: [fontFamily] };
const expectedSlideSizeEmu = "12192000,6858000";

await finalizePresentation({
  ...requirements,
  workspaceDir,
  candidatePath,
  finalPath: FINAL_PPTX,
  pythonExecutable: RUNTIME_PYTHON,
  integrityValidatorPath: path.join(SKILL_DIR, "container_tools/inspect_presentation_package_integrity.py"),
  layoutValidatorPath: path.join(SKILL_DIR, "container_tools/inspect_presentation_layout_geometry.py"),
  layoutArgs: [
    "--expected-slide-size-emu", expectedSlideSizeEmu,
    "--validate-bullet-geometry",
    "--validate-heading-fit",
  ],
  requiredNativeTableOwnerSlides: [],
  fontPolicy,
  verifyArtifactToolImport: true,
  receiptPath: path.join(stagingDir, `${path.basename(FINAL_PPTX)}.validation.json`),
});

const reviewDir = path.join(TMP_DIR, "rendered");
await fs.mkdir(reviewDir, { recursive: true });
for (let i = 0; i < presentation.slides.length; i++) {
  const slide = presentation.slides.get(i);
  const png = await presentation.export({ slide, format: "png", scale: 1 });
  await fs.writeFile(path.join(reviewDir, `slide-${String(i + 1).padStart(2, "0")}.png`), new Uint8Array(await png.arrayBuffer()));
  const layout = await slide.export({ format: "layout" });
  await fs.writeFile(path.join(reviewDir, `slide-${String(i + 1).padStart(2, "0")}.layout.json`), await layout.text());
}
const montage = await presentation.export({ format: "webp", montage: true, scale: 1 });
await fs.writeFile(path.join(reviewDir, "montage.webp"), new Uint8Array(await montage.arrayBuffer()));

console.log(JSON.stringify({ finalPath: FINAL_PPTX, reviewDir, fontFamily }, null, 2));

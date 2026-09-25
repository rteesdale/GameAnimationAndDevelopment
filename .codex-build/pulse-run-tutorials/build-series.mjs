import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { Presentation, PresentationFile } from "@oai/artifact-tool";

const workspaceDir = "D:/0_AnimationAndGameDesign";
const skillDir = "C:/Users/rtees/.codex/plugins/cache/openai-primary-runtime/presentations/26.923.10815/skills/presentations";
const buildDir = path.join(workspaceDir, ".codex-build/pulse-run-tutorials");
const outputDir = path.join(workspaceDir, "Curriculum/PowerPoint_Tutorials/Pulse_Run");
const stagingDir = path.join(workspaceDir, ".codex-finalizer/pulse-run-tutorials");
const pythonExecutable = "C:/Users/rtees/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe";

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
  pale: "#E7E3D9",
};

const screenshots = {
  structure: path.join(workspaceDir, "output/geometry-dash-qa/desktop-ready.png"),
  loop: path.join(workspaceDir, "output/geometry-dash-qa/desktop-playing.png"),
  physics: path.join(workspaceDir, "output/geometry-dash-qa/jump-timing.png"),
  level: path.join(workspaceDir, "output/geometry-dash-qa/mobile-ready-final.png"),
  collision: path.join(workspaceDir, "output/geometry-dash-qa/first-jump-check.png"),
  testing: path.join(workspaceDir, "output/geometry-dash-qa/desktop-finish.png"),
};

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
    typeface: FONT,
    fontSize: options.fontSize ?? 25,
    color: options.color ?? C.ink,
    autoFit: "none",
  };
  return shape;
}

function addHeader(slide, title, lessonNumber, dark = false) {
  addText(slide, title, { left: 70, top: 42, width: 1040, height: 62 }, {
    fontSize: 42,
    bold: true,
    color: dark ? C.paper : C.ink,
  });
  addText(slide, String(lessonNumber).padStart(2, "0"), { left: 1132, top: 44, width: 78, height: 54 }, {
    fontSize: 28,
    bold: true,
    color: dark ? C.yellow : C.coral,
    alignment: "right",
  });
  addShape(slide, "rect", { left: 70, top: 116, width: 1140, height: 5 }, dark ? C.cyan : C.ink);
}

function addFooter(slide, deckTitle, slideNumber, dark = false) {
  addText(slide, deckTitle, { left: 70, top: 674, width: 940, height: 20 }, {
    fontSize: 14,
    bold: true,
    color: dark ? C.grey : "#66645F",
  });
  addText(slide, String(slideNumber), { left: 1130, top: 674, width: 80, height: 20 }, {
    fontSize: 14,
    bold: true,
    color: dark ? C.grey : "#66645F",
    alignment: "right",
  });
}

async function addCover(presentation, deck, imagePath) {
  const slide = presentation.slides.add();
  slide.background.fill = C.ink;
  const bytes = await fs.readFile(imagePath);
  slide.images.add({
    blob: new Uint8Array(bytes),
    contentType: "image/png",
    alt: `Pulse Run game view for ${deck.title}`,
    fit: "cover",
    position: { left: 0, top: 0, width: 1280, height: 720 },
  });
  addShape(slide, "rect", { left: 0, top: 0, width: 1280, height: 720 }, "#131315/76");
  addShape(slide, "rect", { left: 72, top: 112, width: 12, height: 430 }, C.yellow);
  addText(slide, `PULSE RUN ${String(deck.number).padStart(2, "0")}`, { left: 118, top: 116, width: 500, height: 46 }, {
    fontSize: 20,
    bold: true,
    color: C.cyan,
  });
  addText(slide, deck.title, { left: 118, top: 190, width: 850, height: 180 }, {
    fontSize: 60,
    bold: true,
    color: C.paper,
    verticalAlignment: "top",
  });
  addText(slide, deck.subtitle, { left: 122, top: 410, width: 760, height: 82 }, {
    fontSize: 26,
    color: C.paper,
    verticalAlignment: "top",
  });
  addText(slide, "Beginner coding tutorial", { left: 120, top: 618, width: 450, height: 34 }, {
    fontSize: 18,
    bold: true,
    color: C.yellow,
  });
  slide.speakerNotes.textFrame.setText(deck.coverNotes);
}

function addGoalsSlide(presentation, deck, goals) {
  const slide = presentation.slides.add();
  slide.background.fill = C.paper;
  addHeader(slide, "Learning goals", deck.number);
  addText(slide, "By the end of this tutorial, students can:", { left: 74, top: 152, width: 760, height: 44 }, {
    fontSize: 25,
    bold: true,
    color: C.coral,
  });
  addBullets(slide, goals, { left: 88, top: 212, width: 1040, height: 340 }, { fontSize: 27, spaceAfterPoints: 16 });
  addShape(slide, "rect", { left: 72, top: 590, width: 1136, height: 2 }, C.ink);
  addText(slide, "Key question", { left: 72, top: 607, width: 170, height: 34 }, { fontSize: 18, bold: true, color: C.cyan });
  addText(slide, deck.keyQuestion, { left: 250, top: 600, width: 930, height: 48 }, { fontSize: 25, bold: true, color: C.ink });
  addFooter(slide, deck.shortTitle, 2);
  slide.speakerNotes.textFrame.setText(deck.goalNotes);
}

function addCodeSlide(presentation, deck, slideNumber, title, code, points, notes, accent = C.cyan) {
  const slide = presentation.slides.add();
  slide.background.fill = C.paper;
  addHeader(slide, title, deck.number);
  addShape(slide, "rect", { left: 70, top: 158, width: 650, height: 450 }, C.ink, { style: "solid", fill: accent, width: 3 });
  addText(slide, code, { left: 95, top: 178, width: 602, height: 410 }, {
    typeface: CODE_FONT,
    fontSize: 20,
    color: C.paper,
    verticalAlignment: "top",
  });
  addBullets(slide, points, { left: 765, top: 172, width: 430, height: 390 }, { fontSize: 23, spaceAfterPoints: 12 });
  addFooter(slide, deck.shortTitle, slideNumber);
  slide.speakerNotes.textFrame.setText(notes);
}

function addDiagramSlide(presentation, deck, slideNumber, title, nodes, caption, notes) {
  const slide = presentation.slides.add();
  slide.background.fill = C.ink;
  addHeader(slide, title, deck.number, true);
  const gap = 28;
  const left = 72;
  const totalWidth = 1136;
  const nodeWidth = (totalWidth - gap * (nodes.length - 1)) / nodes.length;
  const colours = [C.cyan, C.yellow, C.coral, C.green, C.violet];
  const shapes = [];
  nodes.forEach((node, index) => {
    const shape = addShape(slide, "roundRect", {
      left: left + index * (nodeWidth + gap),
      top: 242,
      width: nodeWidth,
      height: 180,
    }, colours[index % colours.length], { fill: "none", width: 0 });
    shape.borderRadius = 8;
    shape.text = node;
    shape.text.style = {
      typeface: FONT,
      fontSize: 25,
      bold: true,
      color: C.ink,
      alignment: "center",
      verticalAlignment: "middle",
      autoFit: "none",
    };
    shapes.push(shape);
  });
  for (let index = 0; index < shapes.length - 1; index += 1) {
    slide.shapes.connect(shapes[index], shapes[index + 1], {
      kind: "straight",
      fromSide: "right",
      toSide: "left",
      line: { style: "solid", fill: C.paper, width: 3 },
      tail: { type: "triangle", width: "sm", length: "sm" },
    });
  }
  addText(slide, caption, { left: 145, top: 480, width: 990, height: 90 }, {
    fontSize: 26,
    color: C.paper,
    alignment: "center",
  });
  addFooter(slide, deck.shortTitle, slideNumber, true);
  slide.speakerNotes.textFrame.setText(notes);
}

function addCompareSlide(presentation, deck, slideNumber, title, leftTitle, leftItems, rightTitle, rightItems, notes) {
  const slide = presentation.slides.add();
  slide.background.fill = C.paper;
  addHeader(slide, title, deck.number);
  addText(slide, leftTitle, { left: 80, top: 160, width: 500, height: 54 }, { fontSize: 30, bold: true, color: C.coral });
  addText(slide, rightTitle, { left: 700, top: 160, width: 500, height: 54 }, { fontSize: 30, bold: true, color: C.cyan });
  addShape(slide, "rect", { left: 626, top: 160, width: 3, height: 410 }, C.ink);
  addBullets(slide, leftItems, { left: 84, top: 230, width: 495, height: 330 }, { fontSize: 24, spaceAfterPoints: 13 });
  addBullets(slide, rightItems, { left: 704, top: 230, width: 495, height: 330 }, { fontSize: 24, spaceAfterPoints: 13 });
  addFooter(slide, deck.shortTitle, slideNumber);
  slide.speakerNotes.textFrame.setText(notes);
}

function addChallengeSlide(presentation, deck, title, task, steps, evidence, notes) {
  const slide = presentation.slides.add();
  slide.background.fill = C.ink;
  addHeader(slide, title, deck.number, true);
  addText(slide, task, { left: 78, top: 162, width: 1120, height: 90 }, {
    fontSize: 35,
    bold: true,
    color: C.yellow,
    verticalAlignment: "top",
  });
  addText(slide, "Task steps", { left: 80, top: 282, width: 230, height: 42 }, { fontSize: 24, bold: true, color: C.cyan });
  addBullets(slide, steps, { left: 90, top: 332, width: 660, height: 250 }, { fontSize: 24, color: C.paper, spaceAfterPoints: 12 });
  addShape(slide, "rect", { left: 805, top: 292, width: 4, height: 260 }, C.coral);
  addText(slide, "Evidence", { left: 850, top: 292, width: 300, height: 42 }, { fontSize: 24, bold: true, color: C.coral });
  addText(slide, evidence, { left: 850, top: 350, width: 330, height: 170 }, { fontSize: 25, color: C.paper, verticalAlignment: "top" });
  addFooter(slide, deck.shortTitle, 7, true);
  slide.speakerNotes.textFrame.setText(notes);
}

const decks = [
  {
    number: 1,
    filename: "Pulse_Run_01_Project_Structure.pptx",
    image: screenshots.structure,
    title: "Project Structure and Canvas",
    shortTitle: "Pulse Run 01: Project Structure",
    subtitle: "How HTML, CSS, and JavaScript divide the work",
    keyQuestion: "Which file should change when the game needs a new behaviour?",
    coverNotes: "Open index.html before presenting. Ask students what they think the browser must load before the game can appear.",
    goalNotes: "Use the goals as a diagnostic. Students may know HTML or CSS but still confuse structure, appearance, and behaviour.",
    goals: [
      "Explain the purpose of index.html, style.css, and game.js",
      "Identify which interface elements belong in HTML",
      "Describe why the moving world belongs inside Canvas",
      "Trace how the script connects to the page",
    ],
    slides: [
      { type: "diagram", title: "Three files, three responsibilities", nodes: ["HTML\nStructure", "CSS\nAppearance", "JavaScript\nBehaviour"], caption: "The browser combines all three files into one playable experience.", notes: "Ask for one example from the game for each box. Source: local index.html, style.css, and game.js." },
      { type: "code", title: "The page loads the game", code: `<canvas id="gameCanvas"\n  width="960" height="540">\n</canvas>\n\n<script src="js/game.js"></script>`, points: ["Canvas supplies the drawing surface", "The id lets JavaScript find it", "The script loads after the HTML", "A classic script works from file://"], notes: "Point to the closing body tag in index.html. Ask why loading the script last helps. Source: index.html.", accent: C.yellow },
      { type: "compare", title: "Canvas and HTML have different jobs", leftTitle: "Canvas game world", leftItems: ["Player and obstacles", "Background and ground", "Frame by frame movement", "Debug hitboxes"], rightTitle: "HTML interface", rightItems: ["Start and restart buttons", "Progress and attempt text", "Pause and sound controls", "Accessible status messages"], notes: "Stress that Canvas is pixels while HTML contains real controls and readable text. Source: index.html and game.js." },
      { type: "code", title: "JavaScript finds HTML elements", code: `const canvas = document.querySelector(\n  "#gameCanvas"\n);\n\nconst startButton = document.querySelector(\n  "#startButton"\n);`, points: ["# means an element id", "The result is stored in a constant", "Later code can draw or listen for clicks", "The lookup happens once at startup"], notes: "Have students locate both ids in index.html, then find these constants in game.js. Source: game.js." },
    ],
    challenge: { title: "Checkpoint: trace one control", task: "Trace the Start button from HTML to JavaScript.", steps: ["Find id=\"startButton\" in index.html", "Find the matching querySelector", "Find its click event listener", "Explain which function runs"], evidence: "A four step explanation using the actual names from the source.", notes: "Expected chain: button element, startButton constant, addEventListener, startRun()." },
  },
  {
    number: 2,
    filename: "Pulse_Run_02_Game_Loop.pptx",
    image: screenshots.loop,
    title: "The Game Loop",
    shortTitle: "Pulse Run 02: The Game Loop",
    subtitle: "How the browser updates and redraws a moving game",
    keyQuestion: "What must happen during every frame of play?",
    coverNotes: "Run the game and pause after one jump. Explain that the still image came from many rapid updates.",
    goalNotes: "Students should leave with a conceptual loop before studying individual formulas.",
    goals: ["Describe the update and draw cycle", "Explain the role of requestAnimationFrame", "Use delta time to reason about movement", "Identify why update stops during pause"],
    slides: [
      { type: "diagram", title: "One frame of the game", nodes: ["Read input", "Update values", "Check collisions", "Draw scene"], caption: "The browser repeats this cycle before each visible frame.", notes: "Ask students which steps change data and which step only shows data. Source: MDN Anatomy of a video game and local game.js." },
      { type: "code", title: "The browser schedules each frame", code: `function frame(time) {\n  const elapsed = Math.min(\n    (time - state.lastTime) / 1000,\n    0.034\n  );\n\n  state.lastTime = time;\n  if (state.mode === "playing") {\n    update(elapsed);\n  }\n  draw();\n  requestAnimationFrame(frame);\n}`, points: ["time comes from the browser", "elapsed measures seconds", "Only playing mode updates", "draw still shows paused scenes"], notes: "Trace top to bottom. Source: game.js. Reference: https://developer.mozilla.org/docs/Games/Anatomy" },
      { type: "compare", title: "Update and draw stay separate", leftTitle: "update(deltaTime)", leftItems: ["Changes distance", "Applies gravity", "Moves the player", "Checks collisions", "Changes game state"], rightTitle: "draw()", rightItems: ["Clears the old picture", "Draws background and ground", "Draws obstacles and finish", "Draws the player", "Never changes the rules"], notes: "Ask what bug might occur if drawing changed player position. Source: game.js." },
      { type: "code", title: "Delta time controls speed", code: `state.distance +=\n  RUN_SPEED * deltaTime;\n\nstate.player.velocityY +=\n  PLAYER.gravity * deltaTime;\n\nstate.player.y +=\n  state.player.velocityY * deltaTime;`, points: ["Speed describes change per second", "A frame uses only part of a second", "Multiplication converts rates into frame changes", "Slow displays still move at similar speed"], notes: "Use a simple example: 300 pixels per second times 0.02 seconds gives 6 pixels. Source: game.js." },
    ],
    challenge: { title: "Checkpoint: follow one frame", task: "Narrate one frame while the player is airborne.", steps: ["Name the current mode", "Calculate what gravity changes", "Describe the collision check", "List the final drawing order"], evidence: "A spoken or written frame trace that uses update and draw correctly.", notes: "Listen for the misconception that requestAnimationFrame moves objects by itself." },
  },
  {
    number: 3,
    filename: "Pulse_Run_03_Input_and_Jump_Physics.pptx",
    image: screenshots.physics,
    title: "Input and Jump Physics",
    shortTitle: "Pulse Run 03: Input and Jump Physics",
    subtitle: "How one button changes velocity and creates a jump",
    keyQuestion: "How do velocity and gravity create a complete jump arc?",
    coverNotes: "Turn on hitboxes with D and pause during a jump. Ask students which values must be changing.",
    goalNotes: "Keep the focus on relationships between values. Formal physics terminology can come later.",
    goals: ["Read Canvas x and y coordinates", "Explain vertical position and velocity", "Describe how gravity changes a jump", "Connect several inputs to one game action"],
    slides: [
      { type: "diagram", title: "The jump changes over time", nodes: ["Jump sets\nnegative speed", "Player rises", "Gravity slows\nthe rise", "Player falls", "Ground stops\nthe fall"], caption: "One impulse begins the jump. Gravity shapes everything that follows.", notes: "In Canvas, smaller y values are higher on screen. Source: game.js." },
      { type: "code", title: "The jump begins with one assignment", code: `if (state.mode !== "playing" ||\n    !state.player.grounded) return;\n\nstate.player.velocityY =\n  -PLAYER.jumpSpeed;\n\nstate.player.grounded = false;`, points: ["The guard rejects invalid jumps", "Negative y speed moves upward", "One value starts the whole arc", "grounded blocks air jumps"], notes: "Ask students to predict what happens if the minus sign disappears. Source: game.js." },
      { type: "code", title: "Gravity reverses the motion", code: `state.player.velocityY +=\n  PLAYER.gravity * deltaTime;\n\nstate.player.y +=\n  state.player.velocityY * deltaTime;`, points: ["Gravity adds downward speed", "Velocity eventually reaches zero", "Positive velocity produces falling", "Position changes after velocity"], notes: "Sketch a simple number line on the board: -900, -500, 0, +500. Source: game.js." },
      { type: "compare", title: "Many inputs, one action", leftTitle: "Input events", leftItems: ["Space key", "Up Arrow key", "Mouse click", "Screen tap"], rightTitle: "requestJump()", rightItems: ["Starts from ready", "Restarts after a result", "Checks grounded during play", "Applies jump velocity once"], notes: "The input devices differ, but they call the same function. Source: game.js." },
    ],
    challenge: { title: "Checkpoint: tune the jump", task: "Change one physics value and predict the effect before testing.", steps: ["Choose gravity or jumpSpeed", "Write a prediction", "Change the value by about 10 percent", "Run three trials", "Compare the result with the prediction"], evidence: "Before and after values plus one sentence explaining the changed game feel.", notes: "Encourage one variable at a time. Restore the source value after the experiment." },
  },
  {
    number: 4,
    filename: "Pulse_Run_04_Level_Data_and_Rendering.pptx",
    image: screenshots.level,
    title: "Level Data and Rendering",
    shortTitle: "Pulse Run 04: Level Data and Rendering",
    subtitle: "How obstacle records become a scrolling course",
    keyQuestion: "How can one drawing function render many different obstacles?",
    coverNotes: "Show the mobile view to reinforce that logical game coordinates remain the same when the Canvas appears smaller.",
    goalNotes: "Students should see data as a design tool, not merely as syntax.",
    goals: ["Read an obstacle object", "Explain world and screen positions", "Trace how type selects a drawing method", "Edit level pacing without rewriting the engine"],
    slides: [
      { type: "code", title: "Obstacles are stored as data", code: `const obstacles = [\n  { type: "spike",\n    x: 980, width: 44, height: 48 },\n\n  { type: "block",\n    x: 2150, width: 86, height: 72 }\n];`, points: ["type chooses behaviour and drawing", "x places the object in the level", "width and height describe size", "One array contains the course"], notes: "Ask students which property they would change to move a spike later. Source: game.js." },
      { type: "diagram", title: "World position becomes screen position", nodes: ["Obstacle\nworld x", "Subtract\ndistance", "Add player\nscreen x", "Current\nscreen x"], caption: "The player stays near the left while the level moves past the camera.", notes: "Use x = obstacle.x - state.distance + PLAYER.x. Source: game.js." },
      { type: "code", title: "Type selects the drawing", code: `if (obstacle.type === "spike") {\n  // draw a triangle\n} else {\n  // draw a block\n}\n\nobstacles.forEach(drawObstacle);`, points: ["The loop visits every record", "One function handles both types", "New records reuse existing logic", "Visible objects skip no game rules"], notes: "Distinguish adding a new object from adding a new object type. Source: game.js." },
      { type: "compare", title: "Foreground and background move differently", leftTitle: "Gameplay layer", leftItems: ["Ground uses full distance", "Obstacles use full distance", "Movement must match collision", "Timing affects challenge"], rightTitle: "Background layer", rightItems: ["Mountains use a small multiplier", "Stars move even more slowly", "Parallax suggests depth", "No collision rules apply"], notes: "Source: drawBackground(), drawGround(), and drawObstacle() in game.js." },
    ],
    challenge: { title: "Checkpoint: add a fair obstacle", task: "Add one new spike to a safe part of the course.", steps: ["Choose an x position with enough warning", "Copy one spike record", "Change only the x value", "Run the full approach", "Ask another person to test"], evidence: "The new data record and one observation from a playtest.", notes: "Check commas carefully. A syntax error in an array often comes from missing punctuation." },
  },
  {
    number: 5,
    filename: "Pulse_Run_05_Collision_and_Game_States.pptx",
    image: screenshots.collision,
    title: "Collision and Game States",
    shortTitle: "Pulse Run 05: Collision and Game States",
    subtitle: "How invisible rectangles control loss, landing, pause, and victory",
    keyQuestion: "How does the game decide what should happen after contact?",
    coverNotes: "Press D during play. Explain that the green rectangles are the boundaries used by code.",
    goalNotes: "Collision becomes easier when students separate detection from the response that follows.",
    goals: ["Explain rectangular overlap", "Describe why hitboxes can be smaller than artwork", "Distinguish landing from crashing", "Trace ready, playing, paused, lost, and won states"],
    slides: [
      { type: "code", title: "Rectangles overlap when all edges cross", code: `return a.x < b.x + b.width &&\n  a.x + a.width > b.x &&\n  a.y < b.y + b.height &&\n  a.y + a.height > b.y;`, points: ["Each line compares one pair of edges", "All four conditions must be true", "One false condition means separation", "The test works for player and obstacles"], notes: "Use two books or sheets of paper to demonstrate overlap physically. Source: game.js." },
      { type: "compare", title: "Artwork and hitboxes serve different purposes", leftTitle: "Visible shape", leftItems: ["Communicates the object", "May rotate or contain empty space", "Can change during the art pass", "Supports the visual style"], rightTitle: "Collision shape", rightItems: ["Defines contact", "Uses simple rectangles", "Stays predictable", "Can be slightly forgiving"], notes: "Point out the inset in playerRect() and the narrow spike rectangle. Source: game.js." },
      { type: "code", title: "A block can support or stop the player", code: `const fallingOntoBlock =\n  state.player.velocityY >= 0 &&\n  previousBottom <= blockTop + 8;\n\nif (overlaps(player, collision) &&\n    fallingOntoBlock) {\n  // place player on top\n}`, points: ["Velocity confirms downward movement", "Previous position shows the approach", "The tolerance allows a fair landing", "Other overlap causes a crash"], notes: "The previous position prevents side contact from becoming a landing. Source: game.js." },
      { type: "diagram", title: "Game states control available actions", nodes: ["Ready", "Playing", "Paused", "Lost or won"], caption: "Input means something different in each state, but one state is active at a time.", notes: "Discuss transitions: Start, P, collision, finish, Restart. Source: state.mode and related functions in game.js." },
    ],
    challenge: { title: "Checkpoint: diagnose a collision", task: "Use debug mode to explain one collision before changing code.", steps: ["Press D to show hitboxes", "Approach one obstacle", "Pause near contact", "Compare visible and collision shapes", "Describe which edges overlap"], evidence: "A screenshot or sketch with the four relevant edges labelled.", notes: "The aim is explanation. Students should not change hitboxes until they can describe the current result." },
  },
  {
    number: 6,
    filename: "Pulse_Run_06_Testing_and_Extension.pptx",
    image: screenshots.testing,
    title: "Testing and Extension",
    shortTitle: "Pulse Run 06: Testing and Extension",
    subtitle: "How to change the game without losing a working version",
    keyQuestion: "What evidence shows that a change improved the game?",
    coverNotes: "Begin with the completed screen. Ask what had to work correctly for the game to reach this state.",
    goalNotes: "Testing should connect code changes to player experience, not only to the absence of errors.",
    goals: ["Use debug tools and focused test cases", "Check keyboard, pointer, and mobile layouts", "Change one system at a time", "Explain how a revision affects the player"],
    slides: [
      { type: "compare", title: "Different tests answer different questions", leftTitle: "Code behaviour", leftItems: ["Does Start begin one loop?", "Does collision end the run?", "Does Pause freeze updates?", "Does victory reach 100 percent?"], rightTitle: "Player experience", rightItems: ["Is the first obstacle readable?", "Does jumping feel responsive?", "Are hitboxes fair?", "Can a new player recover quickly?"], notes: "A technically correct game can still confuse players. Use both columns during review." },
      { type: "code", title: "Debug mode reveals invisible rules", code: `if (event.code === "KeyD") {\n  state.debug = !state.debug;\n}\n\nif (state.debug) {\n  drawHitbox(playerRect());\n}`, points: ["A Boolean stores on or off", "The D key toggles the value", "Rendering reads the value", "Game rules remain unchanged"], notes: "Debug displays should observe the system without altering its behaviour. Source: game.js." },
      { type: "diagram", title: "A controlled revision cycle", nodes: ["Predict", "Change one value", "Run the same test", "Observe", "Explain"], caption: "Keeping the test constant makes the effect of one change easier to identify.", notes: "Connect this process to the studio's Find It, Fix It, Play It model." },
      { type: "compare", title: "A complete offline test set", leftTitle: "Inputs and states", leftItems: ["Space and Up Arrow", "Click or tap", "Pause and resume", "Mute and unmute", "Restart after loss"], rightTitle: "Display and delivery", rightItems: ["Desktop viewport", "Narrow mobile viewport", "Direct file:// launch", "No missing local assets", "A full winning run"], notes: "Use this as a release checklist before students submit a project folder." },
    ],
    challenge: { title: "Studio challenge: a 10 second segment", task: "Design, test, and explain one original course segment.", steps: ["Sketch the intended jump rhythm", "Add obstacle records", "Test from a clean restart", "Observe another player", "Revise one problem"], evidence: "Playable folder, one feedback note, and a short explanation of the revision.", notes: "Assess understanding, testing, and explanation more heavily than decoration or difficulty." },
  },
];

async function buildDeck(deck) {
  const presentation = Presentation.create({ slideSize: { width: 1280, height: 720 } });
  await addCover(presentation, deck, deck.image);
  addGoalsSlide(presentation, deck, deck.goals);

  let number = 3;
  for (const item of deck.slides) {
    if (item.type === "code") {
      addCodeSlide(presentation, deck, number, item.title, item.code, item.points, item.notes, item.accent);
    } else if (item.type === "diagram") {
      addDiagramSlide(presentation, deck, number, item.title, item.nodes, item.caption, item.notes);
    } else if (item.type === "compare") {
      addCompareSlide(presentation, deck, number, item.title, item.leftTitle, item.leftItems, item.rightTitle, item.rightItems, item.notes);
    }
    number += 1;
  }

  addChallengeSlide(presentation, deck, deck.challenge.title, deck.challenge.task, deck.challenge.steps, deck.challenge.evidence, deck.challenge.notes);

  const candidatePath = path.join(stagingDir, `${deck.number}-candidate.pptx`);
  const finalPath = path.join(outputDir, deck.filename);
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
    receiptPath: path.join(stagingDir, `revision-2-${deck.filename}.validation.json`),
  });

  return finalPath;
}

const outputs = [];
for (const deck of decks) outputs.push(await buildDeck(deck));
console.log(JSON.stringify(outputs, null, 2));

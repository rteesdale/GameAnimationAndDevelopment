import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..", "..");
const outDir = join(root, "output", "pulse-run-editor-tutorial");
const frameDir = join(outDir, "frames");
mkdirSync(frameDir, { recursive: true });

const magick = "magick";
const ffmpeg = "ffmpeg";
const width = 1280;
const height = 720;

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function lines(text, max = 47) {
  const words = text.split(" ");
  const output = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > max && line) {
      output.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) output.push(line);
  return output;
}

function textBlock(items, x, y, size = 30, color = "#f4f1e8") {
  let currentY = y;
  return items.map((item) => {
    const wrapped = lines(item, 34);
    const block = wrapped.map((line, index) => {
      const prefix = index === 0 ? "• " : "  ";
      return `<text x="${x}" y="${currentY + index * (size + 8)}" font-size="${size}" fill="${color}">${esc(prefix + line)}</text>`;
    }).join("\n");
    currentY += wrapped.length * (size + 8) + 18;
    return block;
  }).join("\n");
}

function editorMock(selected = "spike") {
  const selectedY = selected === "block" ? 210 : 164;
  return `
    <g transform="translate(720 185)">
      <rect x="0" y="0" width="520" height="420" rx="10" fill="#15161b" stroke="#5f626e" stroke-width="2"/>
      <text x="24" y="42" font-size="24" fill="#ffcc33" font-weight="800">Level editor</text>
      <rect x="24" y="70" width="120" height="42" rx="6" fill="#252434" stroke="#45d9e8"/>
      <text x="44" y="98" font-size="18" fill="#f4f1e8">Add spike</text>
      <rect x="156" y="70" width="118" height="42" rx="6" fill="#252434" stroke="#45d9e8"/>
      <text x="177" y="98" font-size="18" fill="#f4f1e8">Add block</text>
      <rect x="286" y="70" width="184" height="42" rx="6" fill="#3a3013" stroke="#ffcc33"/>
      <text x="305" y="98" font-size="18" fill="#ffcc33">Even spike spacing</text>

      <rect x="24" y="130" width="190" height="210" rx="8" fill="#202129" stroke="#444957"/>
      <text x="42" y="158" font-size="18" fill="#ffcc33">Objects</text>
      <rect x="42" y="${selectedY}" width="144" height="34" rx="6" fill="#3a3013" stroke="#ffcc33"/>
      <text x="55" y="187" font-size="16" fill="${selected === "spike" ? "#ffcc33" : "#f4f1e8"}">1. spike at 980</text>
      <text x="55" y="233" font-size="16" fill="${selected === "block" ? "#ffcc33" : "#f4f1e8"}">2. block at 2150</text>
      <text x="55" y="279" font-size="16" fill="#f4f1e8">3. spike at 2620</text>

      <rect x="235" y="130" width="250" height="210" rx="8" fill="#202129" stroke="#444957"/>
      <text x="253" y="158" font-size="18" fill="#ffcc33">Properties</text>
      <text x="253" y="194" font-size="16" fill="#aaa">X</text>
      <rect x="310" y="171" width="90" height="32" rx="5" fill="#131315" stroke="#5f626e"/>
      <text x="331" y="194" font-size="16" fill="#f4f1e8">${selected === "spike" ? "980" : "2150"}</text>
      <text x="253" y="238" font-size="16" fill="#aaa">Width</text>
      <rect x="310" y="215" width="90" height="32" rx="5" fill="#131315" stroke="#5f626e"/>
      <text x="338" y="238" font-size="16" fill="#f4f1e8">${selected === "spike" ? "44" : "86"}</text>
      <text x="253" y="282" font-size="16" fill="#aaa">Height</text>
      <rect x="310" y="259" width="90" height="32" rx="5" fill="#131315" stroke="#5f626e"/>
      <text x="338" y="282" font-size="16" fill="#f4f1e8">${selected === "spike" ? "48" : "72"}</text>
      <rect x="253" y="307" width="16" height="16" fill="#ffcc33"/>
      <text x="279" y="321" font-size="16" fill="#f4f1e8">${selected === "spike" ? "Deadly" : "Can land on"}</text>

      <rect x="24" y="360" width="460" height="40" rx="6" fill="#131315" stroke="#444957"/>
      <polygon points="74,390 90,370 106,390" fill="#ff5b57" stroke="#f4f1e8"/>
      <rect x="196" y="371" width="32" height="19" fill="#8075ff" stroke="#f4f1e8"/>
      <polygon points="330,390 346,370 362,390" fill="#ff5b57" stroke="#f4f1e8"/>
      <line x1="24" y1="400" x2="484" y2="400" stroke="#45d9e8" stroke-width="3"/>
    </g>`;
}

function courseStrip() {
  return `
    <g transform="translate(115 430)">
      <rect x="0" y="0" width="1035" height="90" rx="8" fill="#15161b" stroke="#444957"/>
      <line x1="30" y1="66" x2="1005" y2="66" stroke="#45d9e8" stroke-width="4"/>
      <polygon points="150,66 172,22 194,66" fill="#ff5b57" stroke="#f4f1e8" stroke-width="3"/>
      <polygon points="220,66 242,22 264,66" fill="#ff5b57" stroke="#f4f1e8" stroke-width="3"/>
      <polygon points="290,66 312,22 334,66" fill="#ff5b57" stroke="#f4f1e8" stroke-width="3"/>
      <rect x="500" y="18" width="90" height="48" fill="#8075ff" stroke="#f4f1e8" stroke-width="3"/>
      <polygon points="760,66 782,22 804,66" fill="#82dc73" stroke="#f4f1e8" stroke-width="3"/>
      <text x="132" y="86" font-size="16" fill="#aaa">even rhythm</text>
      <text x="730" y="86" font-size="16" fill="#aaa">safe spike option</text>
    </g>`;
}

function slide({ title, subtitle = "", bullets = [], visual = "", footer = "" }) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="${width}" height="${height}" fill="#131315"/>
  <rect x="0" y="0" width="${width}" height="88" fill="#202129"/>
  <rect x="52" y="28" width="34" height="34" transform="rotate(45 69 45)" fill="#ffcc33"/>
  <rect x="66" y="42" width="34" height="34" transform="rotate(45 83 59)" fill="#ff5b57"/>
  <text x="112" y="58" font-family="Arial, sans-serif" font-size="30" font-weight="800" fill="#f4f1e8">Pulse Run Level Editor</text>
  <text x="64" y="145" font-family="Arial, sans-serif" font-size="52" font-weight="900" fill="#ffcc33">${esc(title)}</text>
  ${subtitle ? `<text x="68" y="194" font-family="Arial, sans-serif" font-size="27" fill="#c7c2b6">${esc(subtitle)}</text>` : ""}
  <g font-family="Arial, sans-serif">
    ${textBlock(bullets, 82, subtitle ? 260 : 230)}
    ${visual}
  </g>
  ${footer ? `<text x="64" y="668" font-family="Arial, sans-serif" font-size="22" fill="#82dc73">${esc(footer)}</text>` : ""}
</svg>`;
}

const slides = [
  {
    name: "01-title",
    duration: 3,
    svg: slide({
      title: "Build the level as data",
      subtitle: "Use the editor to change spikes and blocks without rewriting code.",
      bullets: ["Open Pulse Run.", "Press E or click Editor.", "The game pauses so you can design."],
      visual: courseStrip(),
      footer: "Goal: make a fair, readable challenge."
    })
  },
  {
    name: "02-editor-mode",
    duration: 4,
    svg: slide({
      title: "1. Turn on Editor mode",
      subtitle: "Editor mode shows the object tools and hitboxes.",
      bullets: ["Press E.", "Choose an object from the list.", "The selected object appears in the Properties panel."],
      visual: editorMock("spike"),
      footer: "Tip: press E again when you are ready to playtest."
    })
  },
  {
    name: "03-add",
    duration: 4,
    svg: slide({
      title: "2. Add spikes and blocks",
      subtitle: "Spikes create danger. Blocks create platform rhythm.",
      bullets: ["Use Add spike for hazards.", "Use Add block for platforms.", "Duplicate repeats a useful object quickly."],
      visual: editorMock("block"),
      footer: "Start simple. One change at a time is easier to test."
    })
  },
  {
    name: "04-properties",
    duration: 5,
    svg: slide({
      title: "3. Change the object values",
      subtitle: "The game updates as soon as you change the numbers.",
      bullets: ["X moves the object through the level.", "Width and Height change its size.", "Behavior checkboxes change how it works."],
      visual: editorMock("spike"),
      footer: "Small number changes can make a jump much easier or harder."
    })
  },
  {
    name: "05-spacing",
    duration: 5,
    svg: slide({
      title: "4. Use even spike spacing",
      subtitle: "Select a spike in a nearby group, then press Even spike spacing.",
      bullets: ["Works with 2 or more nearby spikes.", "First and last spikes stay fixed.", "Middle spikes form a rhythm."],
      visual: courseStrip(),
      footer: "This helps players read the pattern before they jump."
    })
  },
  {
    name: "06-timeline",
    duration: 4,
    svg: slide({
      title: "5. Use the timeline",
      subtitle: "The timeline shows where objects appear during the run.",
      bullets: ["Click a marker to select an object.", "Drag a marker to move it.", "Use Arrow Left or Right for careful nudging."],
      visual: editorMock("spike"),
      footer: "Timeline editing is best for fixing timing."
    })
  },
  {
    name: "07-export",
    duration: 4,
    svg: slide({
      title: "6. Export your level",
      subtitle: "Export JSON turns your design into level data.",
      bullets: ["Copy the JSON to save your level.", "Paste JSON back in with Import JSON.", "Submit exported JSON when asked in Classroom."],
      visual: `
        <g transform="translate(690 225)">
          <rect x="0" y="0" width="430" height="250" rx="10" fill="#15161b" stroke="#5f626e"/>
          <rect x="24" y="24" width="150" height="44" rx="6" fill="#252434" stroke="#45d9e8"/>
          <text x="44" y="53" font-size="20" fill="#f4f1e8">Export JSON</text>
          <rect x="24" y="88" width="382" height="132" rx="6" fill="#101116" stroke="#444957"/>
          <text x="44" y="122" font-size="18" fill="#82dc73">{</text>
          <text x="66" y="152" font-size="18" fill="#f4f1e8">"objects": [ ... ]</text>
          <text x="44" y="182" font-size="18" fill="#82dc73">}</text>
        </g>`,
      footer: "JSON is your portable level file."
    })
  },
  {
    name: "08-playtest",
    duration: 5,
    svg: slide({
      title: "7. Playtest and revise",
      subtitle: "A level is finished when another player can understand it.",
      bullets: ["Turn Editor off.", "Play the level from the start.", "Change one thing, then test again.", "Ask: Is it fair? Is it readable?"],
      visual: courseStrip(),
      footer: "Designer rule: observe the player before explaining the level."
    })
  }
];

for (let index = 0; index < slides.length; index += 1) {
  const number = String(index + 1).padStart(2, "0");
  const svgPath = join(frameDir, `${number}-${slides[index].name}.svg`);
  const pngPath = join(frameDir, `${number}-${slides[index].name}.png`);
  writeFileSync(svgPath, slides[index].svg, "utf8");
  execFileSync(magick, [svgPath, pngPath], { stdio: "inherit" });
}

const concatPath = join(outDir, "slides.ffconcat");
const concatText = [
  "ffconcat version 1.0",
  ...slides.flatMap((entry, index) => {
    const number = String(index + 1).padStart(2, "0");
    const pngPath = join(frameDir, `${number}-${entry.name}.png`).replaceAll("\\", "/");
    return [`file '${pngPath}'`, `duration ${entry.duration}`];
  }),
  `file '${join(frameDir, `08-${slides.at(-1).name}.png`).replaceAll("\\", "/")}'`
].join("\n");
writeFileSync(concatPath, concatText, "utf8");

const videoPath = join(outDir, "Pulse_Run_Level_Editor_Tutorial.mp4");
const videoInputs = [];
slides.forEach((entry, index) => {
  const number = String(index + 1).padStart(2, "0");
  videoInputs.push(
    "-loop", "1",
    "-t", String(entry.duration),
    "-i", join(frameDir, `${number}-${entry.name}.png`)
  );
});

execFileSync(ffmpeg, [
  "-y",
  ...videoInputs,
  "-filter_complex", `concat=n=${slides.length}:v=1:a=0,format=yuv420p,fps=30`,
  "-movflags", "+faststart",
  videoPath
], { stdio: "inherit" });

const guide = `# Pulse Run Level Editor Student Guide

## What the editor is for

The editor lets you change the level without rewriting the game code. Spikes, blocks, and their behavior are stored as level data.

## Steps

1. Open Pulse Run.
2. Press **E** or click **Editor**.
3. Add a spike or block.
4. Select an object from the list.
5. Change X, Width, Height, or behavior settings.
6. Use the timeline to adjust when objects appear.
7. Select a spike and use **Even spike spacing** when nearby spikes need a clearer rhythm.
8. Turn Editor off and playtest.
9. Export JSON if you need to save or submit your level.

## Design checks

- Can a new player tell what is dangerous?
- Is the first jump fair?
- Are spikes spaced in a readable pattern?
- Did you test after each important change?
- Can someone else play it before you explain it?
`;
writeFileSync(join(outDir, "Pulse_Run_Level_Editor_Student_Guide.md"), guide, "utf8");

console.log(`Video created: ${videoPath}`);

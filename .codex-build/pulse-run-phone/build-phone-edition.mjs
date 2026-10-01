import fs from "node:fs/promises";
import path from "node:path";

const workspaceDir = "D:/0_AnimationAndGameDesign";
const sourceDir = path.join(
  workspaceDir,
  "GameDesign/demo-games/geometry-dash-style",
);
const outputDir = path.join(sourceDir, "phone-edition");
const outputPath = path.join(outputDir, "Pulse_Run_Phone_Edition.html");

const htmlPath = path.join(sourceDir, "index.html");
const cssPath = path.join(sourceDir, "css/style.css");
const scriptPath = path.join(sourceDir, "js/game.js");

const [sourceHtml, sourceCss, sourceScript] = await Promise.all([
  fs.readFile(htmlPath, "utf8"),
  fs.readFile(cssPath, "utf8"),
  fs.readFile(scriptPath, "utf8"),
]);

const stylesheetTag = '  <link rel="stylesheet" href="css/style.css">';
const scriptTag = '  <script src="js/game.js"></script>';

if (!sourceHtml.includes(stylesheetTag) || !sourceHtml.includes(scriptTag)) {
  throw new Error(
    "The source page no longer contains the expected CSS and JavaScript tags.",
  );
}

if (sourceCss.includes("</style>") || sourceScript.includes("</script>")) {
  throw new Error(
    "A source file contains an HTML closing tag and cannot be inlined safely.",
  );
}

const mobileMetadata = [
  '  <meta name="mobile-web-app-capable" content="yes">',
  '  <meta name="apple-mobile-web-app-capable" content="yes">',
  '  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">',
].join("\n");

const generatedNotice = [
  "<!--",
  "  GENERATED PHONE DISTRIBUTION EDITION.",
  "  Edit index.html, css/style.css, or js/game.js in the teaching source,",
  "  then run .codex-build/pulse-run-phone/build-phone-edition.mjs again.",
  "-->",
].join("\n");

let bundledHtml = sourceHtml
  .replace("<!doctype html>", `<!doctype html>\n${generatedNotice}`)
  .replace(
    '  <meta name="theme-color" content="#131315">',
    `  <meta name="theme-color" content="#131315">\n${mobileMetadata}`,
  )
  .replace(stylesheetTag, `  <style>\n${sourceCss.trimEnd()}\n  </style>`)
  .replace(scriptTag, `  <script>\n${sourceScript.trimEnd()}\n  </script>`);

const externalDependencies = bundledHtml.match(
  /<(?:script|link)\b[^>]*(?:src|href)=["'](?!data:)[^"']+["'][^>]*>/gi,
);

if (externalDependencies) {
  throw new Error(
    `The bundled page still has external dependencies:\n${externalDependencies.join("\n")}`,
  );
}

await fs.mkdir(outputDir, { recursive: true });
await fs.writeFile(outputPath, bundledHtml, "utf8");

console.log(outputPath);

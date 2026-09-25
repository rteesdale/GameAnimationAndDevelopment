# Offline JavaScript Game Development Production Policy

## Status And Purpose

This policy records the production and teaching decisions for the studio's initial game-development cycle. It applies to the planned Tic-Tac-Toe and Geometry Dash-style demo projects and establishes an offline-first workflow suitable for the hardware currently available to the club.

The first cycle should prioritize reliable access, small playable outcomes, transferable programming concepts, and a repeatable project workflow. It should not depend on internet access, accounts, cloud services, package managers, or high-performance computers.

## Agreed Production Direction

- Build small demo versions of Tic-Tac-Toe and a Geometry Dash-style auto-runner.
- Use offline HTML, CSS, and JavaScript as the primary environment for the initial cycle.
- Make each project playable in a normal web browser from its local project folder.
- Keep all code, images, audio, fonts, and other assets inside the project folder.
- Use vanilla JavaScript for the first versions so students can see the underlying game logic.
- Use Scratch as an optional introductory environment where appropriate.
- Treat Godot as a later progression when the club has suitable hardware and students are ready for a fuller engine workflow.
- Continue evaluating browser-based game engines, but do not make the first projects dependent on an online service.

## Offline Technical Requirements

The first projects must:

- Run without an internet connection after the project folder has been distributed.
- Open through `index.html` in a current desktop browser.
- Avoid CDNs, remote fonts, remote media, analytics, logins, and cloud-only features.
- Avoid package installation and build steps for the introductory cycle.
- Avoid JavaScript modules and `fetch()` while projects are expected to run directly from a `file://` address.
- Use relative paths for all local assets.
- Start sound only after a player action, such as pressing a Start button.
- Provide keyboard controls and, where practical, mouse or touch controls.

A typical production structure is:

```text
demo-games/
|-- tic-tac-toe/
|   |-- index.html
|   |-- css/
|   |   `-- style.css
|   |-- js/
|   |   `-- game.js
|   `-- assets/
|       |-- images/
|       `-- audio/
`-- geometry-dash-style/
    |-- index.html
    |-- css/
    |   `-- style.css
    |-- js/
    |   |-- game.js
    |   `-- levels.js
    `-- assets/
        |-- images/
        `-- audio/
```

Tic-Tac-Toe and the Geometry Dash-style auto-runner must remain separate, self-contained game folders. Each game must open from its own `index.html` and must not depend on files stored in the other game's folder. This allows either project to be copied, distributed, reset, assessed, or archived independently.

For the earliest exercises, a smaller internal structure is acceptable if it makes distribution and reopening easier, but the two games must still remain separate.

## Shared Production Workflow

Every project should follow the same visible cycle:

```text
Play and analyse -> build or repair one system -> test -> explain the effect -> revise -> package a playable checkpoint
```

Students should work from a small functioning example, prepared checkpoint, or deliberately incomplete version. They should not begin with a blank project unless they already have the necessary experience.

Each development stage must end with a version that can be opened and played. Checkpoint folders should allow a student to recover from mistakes, compare stages, or rejoin after missing a session.

## Demonstration Project Sequence

### Tic-Tac-Toe

Tic-Tac-Toe should introduce event-driven programming and game-state logic before students encounter continuous animation.

Its core concepts are:

- A board represented as data.
- Click or tap input.
- Alternating turns.
- Valid and invalid moves.
- Win and draw detection.
- Restarting and resetting state.
- Separating game rules from the visible interface.

### Geometry Dash-Style Auto-Runner

The auto-runner should introduce real-time game programming after students understand basic state and input.

Its core concepts are:

- The repeating game loop: input, update, collision check, and draw.
- Position, velocity, gravity, and jump force.
- Conditional input, including preventing jumps while airborne.
- A scrolling world with a fixed game speed.
- Obstacles represented as reusable data.
- Ready, playing, lost, and won states.
- Testing and tuning values to change the player's experience.

## First Playable Auto-Runner Level

The first level is a learning laboratory, not a full reproduction of the commercial game. It should last approximately 30 to 45 seconds and use one principal action: jump.

### Required Elements

- A square player that moves through the level automatically.
- A ground plane.
- Gravity and a fixed jump force.
- Constant horizontal game speed.
- Static spikes or rectangular hazards.
- Simple platform blocks.
- Collision, failure, and immediate restart.
- A visible finish marker and completed state.
- A simple progress indicator.
- Start, pause, restart, and mute controls as appropriate.
- Space, Up Arrow, mouse click, or screen tap as equivalent jump inputs where practical.

### Level Teaching Sequence

1. A safe runway lets the player observe movement before acting.
2. One clearly signalled obstacle introduces the first jump.
3. Repeated single obstacles reinforce timing.
4. A raised block or wider obstacle introduces variation.
5. A short combination brings familiar patterns closer together.
6. A final test combines learned patterns without adding a new mechanic.
7. A clear finish area confirms success.

Collision boxes should initially be simple and slightly forgiving. Difficulty should support learning rather than punish small timing errors.

### Deferred Features

The first level should not include moving platforms, portals, character transformations, procedural generation, music synchronization, saved progress, multiple levels, elaborate particle effects, or other systems that obscure the core loop.

## Rendering Policy

The project should use a staged hybrid approach: draw first, prove the game works, and then apply sprite artwork.

### Functional Prototype

- Render the game world in one HTML Canvas.
- Draw the player as a coloured square, optionally rotating while airborne.
- Draw spikes with Canvas paths.
- Draw platforms and the ground as rectangles with simple borders or patterns.
- Draw the background with solid colours and a small number of simple shapes.
- Use ordinary HTML for controls, instructions, progress, mute, and restart.

Geometric drawing keeps coordinates, dimensions, movement, and collision visible to learners without introducing image-loading problems during the first implementation.

### Art Pass

After the complete level works:

1. Add a debug mode that displays collision boxes.
2. Replace the player drawing with a locally stored sprite.
3. Replace spikes and platforms with reusable local images or tiles.
4. Add a lightweight background art layer.
5. Compare the geometric and illustrated versions and explain what changed.

Player movement, physics, collision, and level data must remain independent of the artwork. Collision should use simple invisible rectangles or polygons rather than visible image pixels. This allows artwork to change without changing the rules and supports fair, forgiving hitboxes.

## Pedagogic Sequence For The Auto-Runner

The teaching sequence should be divided into six playable stages:

1. **Play and analyse:** Play the completed demonstration and identify its rules, inputs, objects, feedback, and game states.
2. **Make the world move:** Introduce Canvas coordinates, drawing, and the animation loop.
3. **Make the player jump:** Add input, vertical velocity, gravity, and ground detection.
4. **Add challenge:** Add obstacles and collision detection.
5. **Make it a game:** Add start, loss, restart, progress, and victory states.
6. **Design and test:** Store obstacles as level data and create or revise a short level segment.

Students should see and play a meaningful result during every stage.

## Tutorial Material Standard

Tutorials should gradually transfer responsibility from the teacher to the student:

1. **Worked example:** The teacher demonstrates a small completed feature and explains the decisions aloud.
2. **Code tracing:** Students predict the effect of selected instructions or values before running them.
3. **Completion task:** Students fill in a deliberately omitted section.
4. **Repair task:** Students diagnose and correct a prepared fault.
5. **Modification task:** Students change values or behavior and explain the result.
6. **Independent extension:** Students design and test a short original level segment.

### Learner Materials

Each tutorial unit should include:

- A small set of explicit learning outcomes.
- A one-page diagram of the relevant game loop or system.
- A labelled Canvas coordinate-system diagram where needed.
- Short, focused code sections instead of uninterrupted full-file listings.
- Predict-before-running questions.
- Playable checkpoint folders.
- Debugging cards for common faults.
- A concise vocabulary sheet.
- Core, support, and extension tasks.
- A testing checklist and short reflection prompt.

Suggested debugging cards include:

- The player will not jump.
- The player can jump while airborne.
- Collision occurs too early or too late.
- Restart creates more than one animation loop.
- Movement speed changes noticeably between computers.
- An image or sound cannot be found offline.

### Teacher Materials

Teacher material should include:

- A completed reference version for each checkpoint.
- Expected outputs and likely misconceptions.
- A short think-aloud demonstration plan.
- Troubleshooting notes.
- Suggested timings and stopping points.
- An observation checklist for student understanding.
- A clean reset copy of every starter project.

## Assessment Policy

Students should be assessed on understanding, testing, and intentional improvement rather than visual polish or extreme difficulty.

Evidence should show whether a student can:

- Explain the main game loop.
- Trace how velocity and position produce a jump.
- Change a value intentionally and describe the effect.
- Diagnose a simple fault.
- Represent obstacles or board positions as data.
- Test another student's game and provide useful feedback.
- Revise work in response to testing.
- Explain one technical or design decision.
- Package a project so another person can open and play it offline.

The culminating auto-runner task should be a short original level segment of approximately 10 seconds. Student or team segments may later be reviewed and combined into a shared class level.

## Accessibility And Player Care

- Avoid rapid flashing and intense visual effects.
- Provide pause, restart, and mute controls.
- Support more than one input method where practical.
- Use readable contrast and clearly distinguish hazards from decoration.
- Do not rely on sound alone to communicate important events.
- Keep early collision boundaries fair and predictable.
- Let a new user test the game before the creator explains it.

## Current Open Decision

The club has not made a final long-term engine decision. Scratch, LOVE2D, Godot, and browser-based engines may still be evaluated against:

- Offline availability.
- Performance on modest hardware.
- Setup and maintenance requirements.
- Ease of learning and classroom management.
- Export and sharing options.
- Progression from beginner to more advanced work.

Until that evaluation is complete, offline vanilla JavaScript is the approved starting environment for the two demonstration projects.

## Reference Guidance

- MDN, [Anatomy of a video game](https://developer.mozilla.org/en-US/docs/Games/Anatomy)
- MDN, [JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- MDN, [Autoplay guide for media and Web Audio APIs](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay)
- Education Endowment Foundation, [Supporting pupils with worked examples](https://educationendowmentfoundation.org.uk/news/supporting-pupils-with-worked-examples)
- W3C, [Seizures and physical reactions guidance](https://www.w3.org/WAI/WCAG21/Understanding/seizures-and-physical-reactions)

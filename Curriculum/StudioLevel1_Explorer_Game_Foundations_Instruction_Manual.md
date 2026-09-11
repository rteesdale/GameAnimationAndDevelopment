# Studio Level 1: Explorer - Game Foundations Instruction Manual

## Purpose

This manual is a Studio Level 1: Explorer entry module for an Animation and Game Programming Club using Godot. It is designed for students who may have no prior programming, animation, or game design experience. The module deliberately introduces CAPE Animation and Game Design concepts early, but in a beginner-friendly way.

The final product for this level is a working one-screen collection game built in Godot. Students will design a player character, collect items, avoid hazards, track score, display simple instructions, and explain their design choices.

## Module Identity

| Item | Description |
|---|---|
| Studio level | Studio Level 1: Explorer |
| Module name | Game Foundations |
| Recommended length | 12 core lessons plus 2 showcase/reflection sessions |
| Session length | 60-90 minutes |
| Engine | Godot, 2D mode |
| Main project | One-screen collection game |
| Suggested game title format | `Verb + Object`, for example `Catch the Stars`, `Save the Mangoes`, `Gather the Gems` |
| Main CAPE bridge | Unit 1 foundations, drawing/layout, story/character, and early Unit 2 interaction/game development |

## Teacher Starting Position

This module assumes the teacher is learning alongside the students. That is not a weakness. It should be made explicit to students as part of the studio culture: game development is iterative, designers test ideas, programmers debug, artists revise, and teams learn by building.

The safest teaching posture is:

1. Show the smallest working example.
2. Let students change one thing.
3. Ask what changed in the player experience.
4. Return to the design vocabulary.
5. Save often.

## CAPE Alignment Summary

The Studio Level 1: Explorer module does not attempt to teach the full CAPE syllabus. It plants the first layer of the spiral.

| CAPE Area | Studio Level 1: Explorer Treatment |
|---|---|
| Unit 1 Module 1: Understanding Animation and Game Design | Game definitions, genres, goals, rules, characters, environments, sound, actions, choice, iterative design, ethical use of assets |
| Unit 1 Module 2: Drawing and Layout | Shape, colour, texture, foreground/background, simple concept art, digital artwork, game screen layout |
| Unit 1 Module 3: Story and Character Development | One-sentence synopsis, simple character description, storyboard of start-play-win/lose sequence |
| Unit 2 Module 1: Interactive Design | UI, instructions, feedback, consistency, learnability, player controls |
| Unit 2 Module 2: Game Design and Development | Core mechanics, player actions, victory conditions, score, hazards, playtesting |
| Unit 2 Module 3: Animation for Games | Simple 2D motion, animation as feedback, basic timing and visual response |

## Reference Text Integration

The module draws from the following reference ideas without requiring Studio Level 1: Explorer students to read the texts directly.

| Text | Teacher Use In This Module |
|---|---|
| Anthropy and Clark, *A Game Design Vocabulary* | Use "verbs and objects" to help students describe player actions clearly: move, collect, avoid, chase, escape, unlock. Use "scenes" to explain what is visible and interactive on the screen. |
| Brathwaite and Schreiber, *Challenges for Game Designers* | Use non-digital design challenges before Godot work. Teach game atoms: players, goals, rules, resources, mechanics, game state, and feedback. |
| Adams, *Fundamentals of Game Design* | Use broad concepts of gameplay, core mechanics, UI, stories, goals, and player experience. |
| Novak, *Game Development Essentials* | Use industry roles, production pipeline, game concept, documentation, playtesting, and team practice. |
| Schell, *The Art of Game Design* | Use simple "lenses" as teacher prompts: What does the player do? What does the player feel? What is confusing? What is fun? What could be improved? |
| Godot offline documentation | Use editor basics, nodes and scenes, scripting, player input, signals, and the first 2D game structure as technical reference. |

## Godot Documentation Map

Use the local offline Godot documentation folder:

`D:\0_AnimationAndGameDesign\Godot\godot-docs-html-stable`

Recommended pages:

| Godot Topic | Local Documentation Path |
|---|---|
| Introduction to Godot | `getting_started\introduction\introduction_to_godot.html` |
| First look at the editor | `getting_started\introduction\first_look_at_the_editor.html` |
| Key concepts | `getting_started\introduction\key_concepts_overview.html` |
| Nodes and scenes | `getting_started\step_by_step\nodes_and_scenes.html` |
| First script | `getting_started\step_by_step\scripting_first_script.html` |
| Player input | `getting_started\step_by_step\scripting_player_input.html` |
| Signals | `getting_started\step_by_step\signals.html` |
| First 2D game setup | `getting_started\first_2d_game\01.project_setup.html` |
| Player scene | `getting_started\first_2d_game\02.player_scene.html` |
| Coding the player | `getting_started\first_2d_game\03.coding_the_player.html` |
| Main scene | `getting_started\first_2d_game\05.the_main_game_scene.html` |
| Heads-up display | `getting_started\first_2d_game\06.heads_up_display.html` |

## Final Game Specification

Every Studio Level 1: Explorer student or pair should produce a game with these minimum features.

| Feature | Minimum Requirement |
|---|---|
| Player | A visible player object controlled by keyboard arrows or WASD |
| Collectibles | At least 5 collectible objects |
| Hazard | At least 1 object or area that causes a penalty or game over |
| Score | Score increases when collecting items |
| Feedback | Player receives visual or text feedback when collecting or losing |
| Win condition | Player wins when all collectibles are collected or target score is reached |
| Lose condition | Player loses when touching hazard too many times or timer runs out |
| UI | Title/instructions and score display |
| Theme | A clear theme suitable for school and the student age group |
| Documentation | One-page concept sheet, simple screen sketch, playtest checklist, final reflection |

## Teacher Preparation Checklist

Before Lesson 1:

1. Install Godot on lab machines or confirm it opens.
2. Create a shared folder structure for student projects.
3. Prepare a sample project called `Teacher_Collect_Demo`.
4. Prepare simple placeholder assets: coloured circles/squares are enough.
5. Print or share the student design sheets in this manual.
6. Decide whether students work individually or in pairs. Pairs are recommended.
7. Establish saving rules: one project folder per pair, named clearly.

Suggested folder structure:

```text
StudioLevel1_GameFoundations/
  StudentProjects/
    Pair01_CatchTheStars/
    Pair02_SaveTheMangoes/
  SharedAssets/
    placeholder_player.png
    placeholder_collectible.png
    placeholder_hazard.png
  TeacherDemo/
  ExportedGames/
  Documentation/
```

## Studio Norms

Post these norms in the room.

1. We test early.
2. We save before risky changes.
3. We describe problems clearly.
4. We give feedback on the game, not the person.
5. We credit assets we did not create.
6. We make games suitable for our school community.
7. We improve one small thing at a time.

## Assessment Philosophy

Studio Level 1: Explorer assessment should be low-pressure and portfolio-based. Students should receive credit for thinking, building, testing, revising, and explaining. The game does not need to be commercially polished. It does need to be playable.

Use the rubric near the end of this manual for final assessment.

---

# Lesson 1: What Is A Game?

## Lesson Purpose

Students learn that games are designed systems. They identify player, goal, rules, challenge, feedback, and outcome. This creates the vocabulary they will use all year.

## CAPE Links

| CAPE Objective | Explorer Translation |
|---|---|
| Define terms associated with game design | Students define game, player, rule, goal, feedback |
| Explain game genres | Students identify familiar game types |
| Outline elements of gameplay | Students identify rules, characters, environment, actions, choice |

## Reference Links

| Text | Use |
|---|---|
| Anthropy and Clark | Games can be discussed through clear vocabulary: action words, objects, scenes |
| Brathwaite and Schreiber | Introduce game atoms: players, goals, mechanics, resources, game state |
| Adams | Introduce gameplay as what the player does within rules and goals |

## Learning Outcomes

By the end of the lesson, students can:

1. Explain that a game has a player, rules, a goal, challenge, feedback, and an outcome.
2. Identify at least three game genres.
3. Describe one game using action verbs and objects.
4. Modify a simple non-digital game rule and predict how it changes play.

## Materials

| Material | Purpose |
|---|---|
| Whiteboard | Build class vocabulary |
| Sticky notes or paper slips | Game atom activity |
| Simple objects such as coins, counters, paper balls | Non-digital game prototype |
| Student Design Sheet 1 | First game analysis |

## Key Vocabulary

| Term | Student-Friendly Meaning |
|---|---|
| Game | A rule-based activity where a player tries to reach a goal |
| Player | The person making choices in the game |
| Goal | What the player is trying to achieve |
| Rule | A limit or instruction that controls what can happen |
| Challenge | What makes the goal difficult |
| Feedback | How the game tells the player what happened |
| Genre | A type or category of game |
| Mechanic | An action or rule that makes the game work |
| Win condition | What must happen for the player to win |
| Lose condition | What causes the player to fail |

## Teacher Script

Open with:

"Today we are not starting with code. We are starting with design. A game is not just graphics. A game is a set of choices, rules, goals, feedback, and feelings. If we can describe those clearly, we can build better games in Godot."

Ask:

1. "What games have you played in the last week?"
2. "What were you trying to do?"
3. "What rules stopped you from doing anything you wanted?"
4. "How did the game tell you that you were doing well or badly?"

Build a board table:

| Game | Player Action | Goal | Rule | Feedback |
|---|---|---|---|---|

Use student examples. Keep the emphasis on structure, not whether a game is "good."

## Mini-Lecture

Explain:

A game can be described through six basic questions:

1. Who is the player?
2. What can the player do?
3. What is the player trying to achieve?
4. What makes the goal difficult?
5. How does the game respond?
6. How does the game end?

Introduce the phrase "verb plus object." Examples:

| Verb | Object | Game Meaning |
|---|---|---|
| collect | coins | The player gains score |
| avoid | hazards | The player stays safe |
| chase | enemy | The player pursues a target |
| protect | base | The player defends something |
| unlock | door | The player opens progress |

For Studio Level 1: Explorer, their first Godot game will mainly use:

```text
move + player
collect + item
avoid + hazard
increase + score
reach + win condition
```

## Practical Activity 1: Human Game Atoms

Time: 20 minutes.

1. Place students in groups of 4.
2. Give each group paper slips labelled: player, goal, rule, challenge, feedback, win condition.
3. Each group invents a 2-minute classroom-safe game using only paper/counters.
4. They must fill in each slip before playing.
5. Groups swap games and try to play using only the written rules.

Teacher watch-for:

| If students... | Prompt |
|---|---|
| Make rules too vague | "Would another group understand this without you explaining?" |
| Forget feedback | "How does the player know they scored?" |
| Make no challenge | "What makes this difficult but fair?" |
| Make rules too complex | "What is the one main action?" |

## Practical Activity 2: Rule Change Test

Time: 15 minutes.

Each group changes exactly one rule and plays again.

Examples:

| Original Rule | Changed Rule | Likely Effect |
|---|---|---|
| Collect 5 counters | Collect 10 counters | Longer game |
| Walk only | Hop only | Harder movement |
| 1 hazard | 3 hazards | More challenge |
| Unlimited time | 30 seconds | More pressure |

Students answer:

1. What rule did we change?
2. Did the game become easier, harder, faster, slower, or more confusing?
3. Was the change an improvement? Why?

## Feedback Questions

Use these during playtesting:

1. What is the player trying to do?
2. What action does the player repeat most?
3. What rule creates the most challenge?
4. How does the player know they are making progress?
5. What confused you first?
6. What would you change if you had one more round?

## Exit Ticket

Students complete:

```text
A game is ______________________________.
In my first Godot game, the player will probably ______________________________.
One kind of feedback I could use is ______________________________.
```

## Teacher Reflection

After class, note:

1. Which students naturally explain rules clearly?
2. Which students focus on art first?
3. Which students focus on competition?
4. Which students may need extra support with written instructions?

---

# Lesson 2: Genres, Goals, And Player Experience

## Lesson Purpose

Students learn that different games create different player experiences. They classify genres, identify short-term and long-term goals, and choose a suitable game type for a beginner Godot project.

## CAPE Links

| CAPE Objective | Explorer Translation |
|---|---|
| Explain game genres | Students classify games by type |
| Explain game goals | Students distinguish entertainment, education, and edutainment |
| Integrate short-term and long-term goals | Students design collectible goals and final win condition |
| Understand target audience | Students design for school-safe beginner play |

## Reference Links

| Text | Use |
|---|---|
| Adams | Genre, gameplay, player experience, goals |
| Schell | Ask what the player experiences and why |
| Novak | Game concept and target audience |

## Learning Outcomes

Students can:

1. Name common game genres.
2. Explain short-term and long-term goals.
3. Describe a target audience.
4. Choose a feasible beginner game concept.

## Key Vocabulary

| Term | Meaning |
|---|---|
| Arcade | Fast, simple action game focused on score or survival |
| Puzzle | Game based on solving problems |
| Adventure | Game based on exploration and story |
| Simulation | Game that imitates a real or imagined system |
| Sports | Game based on sport rules |
| Educational game | Game designed mainly to teach |
| Edutainment | Game that teaches while entertaining |
| Target audience | The people the game is designed for |
| Short-term goal | A small goal the player can complete quickly |
| Long-term goal | The larger goal that completes the game |

## Teacher Script

"When we choose a game idea, we are also choosing a player experience. A puzzle game asks the player to think. An arcade game asks the player to react. An adventure game asks the player to explore. Our first game must be small enough to finish, but still clear enough to feel like a real game."

## Discussion: Genre Sort

Create genre signs around the room:

```text
Arcade
Puzzle
Adventure
Sports
Simulation
Strategy
Role-playing
Board/card
```

Read out game examples. Students move to the genre they think fits. Allow debate when a game fits more than one genre.

Sample questions:

1. What does the player do most often?
2. Is the challenge mainly speed, thinking, exploration, or competition?
3. What kind of feedback does the game give?
4. What kind of player would enjoy it?

## Mini-Lecture: Goals

Use a simple board example:

| Goal Type | Example In Collection Game |
|---|---|
| Short-term | Collect one fruit |
| Medium-term | Avoid hazard and collect five fruits |
| Long-term | Reach target score and win |

Explain:

If the player only has a long-term goal, the game may feel empty. If the player only has short-term goals, the game may feel repetitive. A good beginner game can combine both:

```text
Short-term: collect each item
Long-term: collect all items before losing
```

## Practical Activity: Game Concept Cards

Time: 30 minutes.

Students create three possible game concepts using this template:

```text
Title:
Genre:
Target audience:
Player verb:
Object:
Short-term goal:
Long-term goal:
Challenge:
Feedback:
Why this is suitable for Studio Level 1: Explorer:
```

Examples:

```text
Title: Save the Mangoes
Genre: Arcade collection
Target audience: Studio Level 1: Explorer students
Player verb: Collect
Object: Mangoes
Short-term goal: Collect one mango
Long-term goal: Collect all mangoes before touching the hazard three times
Challenge: Moving around hazards
Feedback: Score increases and a message appears
Why suitable: Simple, bright, school-safe, easy to understand
```

## Peer Feedback Protocol

Students exchange concept cards.

Peer reviewers answer:

1. I understand the goal: yes/no.
2. I understand the main action: yes/no.
3. The idea sounds possible in one screen: yes/no.
4. One thing I like is...
5. One thing that may be too difficult is...
6. One suggestion is...

## Teacher Feedback Questions

1. Can this game be played on one screen?
2. Can the player action be explained in one sentence?
3. Is the target audience clear?
4. What is the first thing the player sees?
5. How does the player win?
6. How does the player lose?

## Exit Ticket

```text
My strongest game idea is:
The genre is:
The main player action is:
The short-term goal is:
The long-term goal is:
```

---

# Lesson 3: Visual Design, Characters, And Environment

## Lesson Purpose

Students design the look of their game using simple visual principles. They create a player character, collectibles, hazards, and a one-screen environment.

## CAPE Links

| CAPE Objective | Explorer Translation |
|---|---|
| Apply elements and principles of art and design | Students use shape, colour, size, contrast, balance |
| Create layers of an environment | Students identify background and active gameplay layer |
| Create concept art | Students sketch a game screen |
| Create characters | Students design a simple playable character |
| Apply Caribbean socio-cultural context | Students may use local themes, festivals, folklore, food, places, or school culture |

## Reference Links

| Text | Use |
|---|---|
| Adams | Visual design supports gameplay clarity |
| Novak | Concept art and production planning |
| Schell | Ask what the player notices first |

## Learning Outcomes

Students can:

1. Use shape and colour to distinguish player, collectible, and hazard.
2. Sketch a one-screen layout.
3. Explain how visual design helps the player understand the game.
4. Create or choose placeholder assets responsibly.

## Key Vocabulary

| Term | Meaning |
|---|---|
| Asset | A visual, sound, or other file used in a game |
| Sprite | A 2D image used for a character or object |
| Background | The non-interactive visual layer behind the game |
| Foreground | The visual layer in front of the background |
| Contrast | Difference that helps something stand out |
| Silhouette | The outline shape of a character |
| Colour theory | Choosing colours to create meaning or mood |
| Concept art | A planning drawing that shows the idea before production |

## Teacher Script

"A player should not need to guess what is safe, what is dangerous, and what can be collected. Visual design is not decoration only. It is communication."

## Mini-Lecture: Readability

Show or draw three symbols:

1. Player: blue circle.
2. Collectible: yellow star.
3. Hazard: red triangle.

Ask:

1. Which one looks safe?
2. Which one looks dangerous?
3. Which one looks valuable?
4. Why?

Explain:

Students may later make prettier art, but first the game must be readable. Readable means the player can understand what things are quickly.

## Practical Activity 1: Shape Language

Time: 15 minutes.

Students draw three versions of each:

| Game Object | Shape Ideas |
|---|---|
| Player | circle, rounded rectangle, simple character, vehicle |
| Collectible | star, coin, fruit, gem, book |
| Hazard | spike, flame, enemy, puddle, barrier |

They choose one set and explain:

1. Why does the player look controllable?
2. Why does the collectible look desirable?
3. Why does the hazard look dangerous?

## Practical Activity 2: One-Screen Layout Sketch

Time: 25 minutes.

Students draw their full game screen on paper.

Required labels:

1. Player starting position.
2. Collectibles.
3. Hazard.
4. Score display.
5. Instructions area or start message.
6. Background theme.
7. Boundaries.

Design constraints:

1. The player must have space to move.
2. Collectibles must not all be in one corner.
3. The hazard must be avoidable.
4. Score text must not cover important game objects.
5. The win condition must be visible or explained.

## Practical Activity 3: Asset Ethics

Time: 10 minutes.

Discuss:

1. Can we take any image from Google and put it in our game?
2. What does credit mean?
3. What is the difference between making our own asset and using someone else's?
4. Why do CAPE and real studios care about copyright?

Studio Level 1: Explorer rule:

Use self-created assets, teacher-provided assets, public domain assets, or Creative Commons assets with credit.

## Feedback Questions

Visual design:

1. What does the player notice first?
2. Can you tell what is dangerous without reading?
3. Can you tell what should be collected?
4. Does the background distract from gameplay?
5. Is the score easy to see?

Theme:

1. What is the world of this game?
2. Is the theme school-appropriate?
3. Does the theme connect to the target audience?
4. Could a Caribbean/local element strengthen the idea?

## Exit Ticket

```text
My player will look like:
My collectible will look like:
My hazard will look like:
The most important colour in my game is:
The player should notice this first:
```

---

# Lesson 4: Story, Character, And The One-Sentence Synopsis

## Lesson Purpose

Students learn that even a simple arcade game can have a tiny story context. They write a one-sentence synopsis, create a basic character description, and storyboard the player experience.

## CAPE Links

| CAPE Objective | Explorer Translation |
|---|---|
| Create a synopsis | Students write a one-sentence game summary |
| Write a narrative based on story principles | Students define setup, problem, action, result |
| Create a storyboard | Students draw start, gameplay, win, lose |
| Design genre-appropriate characters | Students connect character to genre and goal |

## Reference Links

| Text | Use |
|---|---|
| Adams | Story can support gameplay without overwhelming it |
| Novak | Game concept includes synopsis and character |
| Schell | Ask what fantasy or role the player steps into |

## Learning Outcomes

Students can:

1. Write a clear one-sentence game synopsis.
2. Describe a player character using role, goal, and challenge.
3. Create a 4-panel storyboard.
4. Explain how story supports player motivation.

## Key Vocabulary

| Term | Meaning |
|---|---|
| Synopsis | A short summary of the game idea |
| Character | A person, creature, object, or avatar in the game |
| Avatar | The character or object controlled by the player |
| Storyboard | A sequence of drawings showing important moments |
| Setup | The starting situation |
| Problem | What is wrong or difficult |
| Resolution | How the game ends |

## Teacher Script

"Your Studio Level 1: Explorer game does not need a long story. But it should have a reason. A reason helps the player care. Instead of 'a square collects circles,' we can say 'a student collects lost library books before the bell rings.' Same mechanic, clearer experience."

## Mini-Lecture: Four-Part Tiny Story

Use this structure:

```text
Someone wants something, but something is in the way, so the player must act before the game ends.
```

Examples:

1. A student wants to collect missing art supplies, but wet paint puddles are in the way, so the player must collect all supplies before time runs out.
2. A young explorer wants to gather festival lights, but shadows block the path, so the player must collect all lights without touching the shadows.
3. A gardener wants to save mangoes, but rolling stones are dangerous, so the player must gather enough mangoes to win.

## Practical Activity 1: Synopsis Workshop

Students write three versions of their synopsis:

1. Plain version:

```text
The player collects items and avoids hazards.
```

2. Themed version:

```text
The player is a young gardener collecting mangoes while avoiding rolling stones.
```

3. Goal version:

```text
The player must collect 10 mangoes and avoid rolling stones to save the harvest.
```

Students choose the clearest version.

## Practical Activity 2: Character Card

Students complete:

```text
Character name:
Role/avatar:
Goal:
Strength:
Weakness/limitation:
What the character collects:
What the character avoids:
Colour/shape:
Why this character fits the game:
```

## Practical Activity 3: Four-Panel Storyboard

Students draw:

| Panel | Required Content |
|---|---|
| 1. Start | Title/instruction screen or first moment |
| 2. Play | Player collects first item |
| 3. Danger | Player approaches or avoids hazard |
| 4. End | Win or lose message |

Each panel must include:

1. What the player sees.
2. What the player does.
3. What feedback appears.

## Feedback Questions

Synopsis:

1. Who is the player?
2. What does the player want?
3. What is in the way?
4. What action does the player repeat?
5. Can the idea be understood in one sentence?

Storyboard:

1. Does the storyboard show how to start?
2. Does it show the main action?
3. Does it show danger or challenge?
4. Does it show how the game ends?
5. What feedback appears on screen?

## Exit Ticket

```text
My final synopsis:
My player character:
My game problem:
My ending:
```

---

# Lesson 5: Godot First Look - Projects, Editor, Nodes, Scenes

## Lesson Purpose

Students open Godot and learn the minimum mental model: a game is built from scenes; scenes contain nodes; nodes have properties; scripts add behaviour.

## CAPE Links

| CAPE Objective | Explorer Translation |
|---|---|
| Identify tools required for game design | Students identify Godot as the game engine |
| Use a game design tool | Students create a Godot project |
| Outline stages of iterative game design | Students create, test, revise |

## Godot Documentation Links

| Topic | Local Documentation |
|---|---|
| First look at editor | `getting_started\introduction\first_look_at_the_editor.html` |
| Key concepts | `getting_started\introduction\key_concepts_overview.html` |
| Nodes and scenes | `getting_started\step_by_step\nodes_and_scenes.html` |

## Learning Outcomes

Students can:

1. Create a Godot project.
2. Identify the Scene panel, FileSystem, Inspector, and viewport.
3. Create and save a simple scene.
4. Add nodes and change properties.

## Key Vocabulary

| Term | Meaning |
|---|---|
| Engine | Software used to build and run a game |
| Project | The folder containing all game files |
| Scene | A saved collection of nodes |
| Node | A building block in Godot |
| Property | A setting for a node |
| Inspector | The panel where properties are edited |
| Viewport | The area where the scene is viewed and arranged |
| Run | Start the game to test it |

## Teacher Script

"Godot can look busy at first. Today we only care about four places: the scene tree, the viewport, the inspector, and the file system. If you can find those, you can begin."

## Setup Steps

Teacher demonstrates, then students repeat.

1. Open Godot.
2. Click `New Project`.
3. Name project: `StudioLevel1_YourName_GameFoundations`.
4. Choose a project folder.
5. Use default renderer unless the machines require compatibility mode.
6. Click `Create & Edit`.

## Editor Tour

Students label a screenshot or copy this table:

| Area | What It Does |
|---|---|
| Scene tree | Shows nodes in the current scene |
| Viewport | Lets you place and view objects |
| Inspector | Lets you change selected object properties |
| FileSystem | Shows project files |
| Play button | Runs the project |

## Practical Activity 1: Build A Toy Scene

Students create:

1. Root node: `Node2D`, rename to `ToyScene`.
2. Add child `Sprite2D` or `ColorRect`.
3. If using `ColorRect`, set size and colour.
4. Add child `Label`.
5. Set Label text: `My First Godot Scene`.
6. Save scene as `toy_scene.tscn`.
7. Press Run Current Scene.

If Godot asks for a main scene, choose the current scene.

## Practical Activity 2: Properties Hunt

Students change:

1. Position of the sprite or rectangle.
2. Colour if using `ColorRect`.
3. Text in the Label.
4. Scale of one object.
5. Name of at least two nodes.

## Teacher Troubleshooting

| Problem | Likely Cause | Fix |
|---|---|---|
| Student cannot run scene | Scene not saved | Save scene first |
| Nothing appears | Object outside visible area or too small | Reset position near center, enlarge |
| Cannot edit text | Wrong node selected | Select Label, then Inspector |
| Lost panel | Layout changed | Use Editor menu/layout reset if needed |
| Project not found later | Saved in wrong folder | Establish class folder naming rules |

## Feedback Questions

1. What is the root node?
2. What child nodes did you add?
3. What property did you change?
4. What happened when you ran the scene?
5. What is still confusing about the editor?

## Exit Ticket

```text
In Godot, a node is:
In Godot, a scene is:
One property I changed today was:
```

---

# Lesson 6: Player Movement - The First Playable Verb

## Lesson Purpose

Students create a controllable player. This is the first major shift from visual scene to interactive game.

## CAPE Links

| CAPE Objective | Explorer Translation |
|---|---|
| Outline elements of gameplay | Player actions and controls |
| Apply common mechanics | Movement as a mechanic |
| Create user interface/input controls | Arrow keys or WASD |
| Use a game design tool | Godot input and script |

## Godot Documentation Links

| Topic | Local Documentation |
|---|---|
| First script | `getting_started\step_by_step\scripting_first_script.html` |
| Player input | `getting_started\step_by_step\scripting_player_input.html` |
| First 2D game player scene | `getting_started\first_2d_game\02.player_scene.html` and `getting_started\first_2d_game\03.coding_the_player.html` |

## Learning Outcomes

Students can:

1. Create a player scene.
2. Add a simple script.
3. Use keyboard input to move the player.
4. Test and adjust movement speed.

## Key Vocabulary

| Term | Meaning |
|---|---|
| Script | Code attached to a node |
| Variable | A named value that can change or be reused |
| Input | Player controls such as keys or mouse |
| Speed | How fast the player moves |
| Vector | A value with direction and size |
| Delta | Time passed since the last frame, used for smooth movement |

## Teacher Script

"The first verb in our game is move. If movement feels bad, everything else will feel bad. Today our goal is not fancy art. It is controllable movement."

## Scene Structure

Students create a new scene:

```text
Player (Area2D)
  ColorRect or Sprite2D
  CollisionShape2D
```

For beginners, `Area2D` is recommended because it is easy to detect overlaps with collectibles and hazards later.

## Step-By-Step Build

1. Create a new scene.
2. Root node: `Area2D`.
3. Rename root: `Player`.
4. Add `ColorRect` as child.
5. Set `ColorRect` size to around `40 x 40`.
6. Choose a clear player colour.
7. Add `CollisionShape2D`.
8. In the Inspector, create a `RectangleShape2D`.
9. Resize the collision shape to match the visible player.
10. Save scene as `player.tscn`.

## Add Script

Attach script to `Player`.

Use this beginner version:

```gdscript
extends Area2D

@export var speed := 300.0

func _process(delta):
	var direction := Vector2.ZERO

	if Input.is_action_pressed("ui_right"):
		direction.x += 1
	if Input.is_action_pressed("ui_left"):
		direction.x -= 1
	if Input.is_action_pressed("ui_down"):
		direction.y += 1
	if Input.is_action_pressed("ui_up"):
		direction.y -= 1

	if direction.length() > 0:
		direction = direction.normalized()

	position += direction * speed * delta
```

Teacher explanation:

| Code | Meaning |
|---|---|
| `speed` | How fast the player moves |
| `direction` | Where the player is trying to move |
| `Input.is_action_pressed` | Checks if a key action is being held |
| `position +=` | Changes the player's position |
| `delta` | Makes movement smoother across different computers |

## Create Test Scene

1. Create new scene with root `Node2D`.
2. Rename: `Main`.
3. Drag `player.tscn` into the scene.
4. Save as `main.tscn`.
5. Run and test movement.

## Practical Challenge

Students test three speeds:

| Speed | Feel |
|---|---|
| 100 | Slow |
| 300 | Medium |
| 600 | Fast |

Students answer:

1. Which speed felt easiest to control?
2. Which speed felt exciting?
3. Which speed would make collecting too easy or too hard?

## Feedback Questions

1. What is the player verb today?
2. Which keys control the player?
3. Does the player move too fast, too slow, or just right?
4. What happens if two direction keys are pressed together?
5. Why does the player need a collision shape even if we cannot see it?

## Common Errors

| Error | Cause | Fix |
|---|---|---|
| Player does not move | Script not attached or scene not running | Check script icon and run main scene |
| Error under `Vector2.ZERO` | Typing mistake | Compare carefully |
| Movement too fast | Speed too high | Lower speed |
| Player invisible | ColorRect too small or same colour as background | Change size/colour |
| Collision warning | CollisionShape2D has no shape | Add RectangleShape2D |

## Exit Ticket

```text
Today my player could:
The speed I liked best was:
One code line I understand is:
One code line I still need help with is:
```

---

# Lesson 7: Boundaries, Space, And Fair Challenge

## Lesson Purpose

Students learn that game space needs limits. They keep the player inside the screen and begin thinking about fairness, level layout, and challenge.

## CAPE Links

| CAPE Objective | Explorer Translation |
|---|---|
| Create layers/environment | Students define the play area |
| Outline structure of a game using levels | Students create one clear play space |
| Apply common mechanics | Boundaries and rules |
| Discuss constraints | Space constraints affect design |

## Reference Links

| Text | Use |
|---|---|
| Brathwaite and Schreiber | Rules and constraints shape play |
| Adams | Level space and gameplay clarity |
| Schell | Ask whether challenge is fair |

## Learning Outcomes

Students can:

1. Explain why games need boundaries.
2. Keep the player inside the visible screen.
3. Arrange objects in a fair play area.
4. Explain how space changes difficulty.

## Mini-Lecture: Space Is A Rule

Explain:

A boundary is a rule made visible. If the player can leave the screen forever, the game breaks. If the player has too little space, the game feels unfair.

## Code Update: Clamp Player To Screen

In `player.gd`, add a screen size variable:

```gdscript
var screen_size := Vector2.ZERO
```

Add `_ready()`:

```gdscript
func _ready():
	screen_size = get_viewport_rect().size
```

At the end of `_process(delta)`, after movement:

```gdscript
position.x = clamp(position.x, 0, screen_size.x)
position.y = clamp(position.y, 0, screen_size.y)
```

Teacher explanation:

| Code | Meaning |
|---|---|
| `get_viewport_rect().size` | Gets the size of the game window |
| `clamp` | Keeps a value between a minimum and maximum |
| `0` | Left or top edge |
| `screen_size.x/y` | Right or bottom edge |

## Practical Activity: Fair Space Test

Students draw or build three layouts:

1. Easy: collectibles spread out, hazard far away.
2. Medium: collectibles near hazard but avoidable.
3. Unfair: hazard blocks everything.

Students compare:

| Layout | Is It Fair? | Why? |
|---|---|---|
| Easy | | |
| Medium | | |
| Unfair | | |

## Feedback Questions

1. Can the player escape danger?
2. Is there enough room to move?
3. Are collectibles reachable?
4. Does the hazard create challenge or frustration?
5. What rule does the boundary create?

## Exit Ticket

```text
A fair challenge is:
One unfair layout problem is:
The boundary rule in my game is:
```

---

# Lesson 8: Collectibles, Score, And Feedback

## Lesson Purpose

Students add collectibles and score. They learn how feedback tells the player that an action mattered.

## CAPE Links

| CAPE Objective | Explorer Translation |
|---|---|
| Elements of gameplay | Rules, actions, feedback, score |
| Apply mechanics | Collection and scoring |
| Create UI | Score display |
| Interactive design principles | Feedback, learnability, consistency |

## Godot Documentation Links

| Topic | Local Documentation |
|---|---|
| Signals | `getting_started\step_by_step\signals.html` |
| HUD | `getting_started\first_2d_game\06.heads_up_display.html` |

## Learning Outcomes

Students can:

1. Create a collectible scene.
2. Detect when player touches collectible.
3. Increase score.
4. Display score on screen.
5. Explain feedback.

## Key Vocabulary

| Term | Meaning |
|---|---|
| Collectible | An object the player gathers |
| Score | A number showing progress or success |
| Signal | A Godot message sent when something happens |
| UI | User interface, such as text, score, buttons |
| Feedback | The game's response to player action |

## Scene Structure

Create `collectible.tscn`:

```text
Collectible (Area2D)
  ColorRect or Sprite2D
  CollisionShape2D
```

Use a bright colour and a smaller size than the player.

## Collectible Script

Attach to `Collectible`:

```gdscript
extends Area2D

signal collected

func _on_area_entered(area):
	if area.name == "Player":
		collected.emit()
		queue_free()
```

Connect the `area_entered` signal from `Collectible` to itself, creating `_on_area_entered`.

Alternative teacher note:

If signal connection becomes too much for students, demonstrate slowly and have them repeat. This is a good moment to explain that games are event-driven: something happens, then the game responds.

## Main Scene Structure

Update `main.tscn`:

```text
Main (Node2D)
  Player
  Collectibles (Node2D)
    Collectible
    Collectible2
    Collectible3
  CanvasLayer
    ScoreLabel
```

Create a `Label` named `ScoreLabel`.

## Main Script

Attach to `Main`:

```gdscript
extends Node2D

var score := 0

@onready var score_label := $CanvasLayer/ScoreLabel

func _ready():
	score_label.text = "Score: 0"
	for collectible in $Collectibles.get_children():
		collectible.collected.connect(_on_collectible_collected)

func _on_collectible_collected():
	score += 1
	score_label.text = "Score: " + str(score)
```

## Teacher Explanation

| Code | Meaning |
|---|---|
| `score := 0` | Game starts with no points |
| `@onready` | Finds the label after the scene is ready |
| `get_children()` | Gets all collectible objects |
| `connect` | Tells Godot what function should respond |
| `score += 1` | Adds 1 to score |
| `str(score)` | Converts score number into text |

## Practical Activity: Feedback Types

Students list possible feedback:

| Feedback Type | Example |
|---|---|
| Number | Score increases |
| Visual | Collectible disappears |
| Text | "Great!" appears |
| Sound | Chime plays |
| Animation | Player flashes |

For Studio Level 1: Explorer minimum, use score increase and collectible disappearance.

## Feedback Questions

1. How does the player know an item was collected?
2. Is the score easy to read?
3. Should every collectible be worth the same?
4. What happens when all collectibles are gone?
5. Does collection feel satisfying?

## Common Errors

| Error | Cause | Fix |
|---|---|---|
| Score does not change | Signal not connected | Check connection from collectible to main or self |
| Collectible does not disappear | Collision shape missing or signal missing | Check collision and function |
| Error finding ScoreLabel | Node path wrong | Confirm exact scene tree path |
| Player passes over item with no effect | Collision layers or shape mismatch | Ensure both Area2D nodes have CollisionShape2D |

## Exit Ticket

```text
The feedback in my game is:
My score changes when:
One thing that was hard today:
```

---

# Lesson 9: Hazards, Lose Conditions, And Player Safety

## Lesson Purpose

Students add danger. They learn that challenge must be readable, avoidable, and fair.

## CAPE Links

| CAPE Objective | Explorer Translation |
|---|---|
| Apply common mechanics | Hazards and lose conditions |
| Core dynamics | Avoidance and survival |
| User experience | Fair challenge, clear feedback |
| Ethics and ratings | School-safe representation of danger |

## Reference Links

| Text | Use |
|---|---|
| Brathwaite and Schreiber | Chance, skill, challenge, constraints |
| Adams | Balance and player experience |
| Schell | Ask whether the player blames themself or the game |

## Learning Outcomes

Students can:

1. Create a hazard object.
2. Detect player collision with hazard.
3. Trigger penalty or game over.
4. Explain fair vs unfair challenge.

## Key Vocabulary

| Term | Meaning |
|---|---|
| Hazard | Something dangerous to the player |
| Penalty | A negative result from a mistake |
| Lives | Number of chances before losing |
| Game over | Lose state |
| Fair challenge | Difficulty the player can understand and respond to |

## Design Rule

For Studio Level 1: Explorer, hazards should not be graphic or violent. Use school-safe examples:

1. Puddles.
2. Spikes as abstract triangles.
3. Storm clouds.
4. Rolling balls.
5. Locked zones.
6. Time pressure.

## Hazard Scene

Create `hazard.tscn`:

```text
Hazard (Area2D)
  ColorRect or Sprite2D
  CollisionShape2D
```

Use a clear warning colour such as red, orange, or dark purple. Avoid making it look like a collectible.

## Hazard Script

Attach to `Hazard`:

```gdscript
extends Area2D

signal hit_player

func _on_area_entered(area):
	if area.name == "Player":
		hit_player.emit()
```

Connect `area_entered` to itself.

## Main Script Update

Add lives:

```gdscript
var lives := 3
@onready var lives_label := $CanvasLayer/LivesLabel
```

In `_ready()`:

```gdscript
lives_label.text = "Lives: " + str(lives)
for hazard in $Hazards.get_children():
	hazard.hit_player.connect(_on_hazard_hit_player)
```

Add function:

```gdscript
func _on_hazard_hit_player():
	lives -= 1
	lives_label.text = "Lives: " + str(lives)

	if lives <= 0:
		score_label.text = "Game Over"
		get_tree().paused = true
```

Scene tree should include:

```text
Hazards (Node2D)
  Hazard
CanvasLayer
  ScoreLabel
  LivesLabel
```

## Teacher Note About Pause

If pausing causes confusion, use a simpler response:

```gdscript
if lives <= 0:
	score_label.text = "Game Over"
```

The game may still technically run, but the concept of lose condition is visible.

## Practical Activity: Hazard Fairness Test

Students place one hazard in three positions:

1. Too easy: far from all collectibles.
2. Too hard: directly on top of a collectible.
3. Fair: near a collectible but avoidable.

They test each position and record:

```text
Position tested:
Was it fair?
How did it change the game?
What position will we keep?
```

## Feedback Questions

1. Can the player see the hazard clearly?
2. Can the player avoid it?
3. Is the penalty clear?
4. Does the game become more exciting or just annoying?
5. Should touching the hazard end the game instantly or remove a life?

## Exit Ticket

```text
My hazard is:
My penalty is:
My lose condition is:
My hazard is fair because:
```

---

# Lesson 10: Win Conditions, Instructions, And UI

## Lesson Purpose

Students add a clear ending and improve the user interface. They learn that a player should know how to begin, what to do, and when the game is over.

## CAPE Links

| CAPE Objective | Explorer Translation |
|---|---|
| User interface design | Score, lives, instruction text, win/lose message |
| Interactive design principles | Consistent, learnable, predictable, feedback |
| Common mechanics | Victory condition and game state |
| Present game concept | Clear title and instructions |

## Godot Documentation Links

| Topic | Local Documentation |
|---|---|
| UI overview | `tutorials\ui\index.html` |
| Control node gallery | `tutorials\ui\control_node_gallery.html` |
| HUD | `getting_started\first_2d_game\06.heads_up_display.html` |

## Learning Outcomes

Students can:

1. Add instruction text.
2. Add a win condition.
3. Display win/lose messages.
4. Explain UI clarity.

## Key Vocabulary

| Term | Meaning |
|---|---|
| UI | Information and controls shown to the player |
| HUD | Heads-up display, game information shown during play |
| Instruction | Text or symbol telling the player what to do |
| Win condition | What must happen to win |
| Game state | Current condition of the game, such as playing, won, or lost |

## UI Minimum

Every game should show:

1. Title or game name.
2. Instruction sentence.
3. Score.
4. Lives or warning.
5. Win/lose message.

Example:

```text
Save the Mangoes
Collect all mangoes. Avoid stones.
Score: 0
Lives: 3
```

## Main Script Win Condition

Add a target score:

```gdscript
@export var target_score := 5
```

Update collect function:

```gdscript
func _on_collectible_collected():
	score += 1
	score_label.text = "Score: " + str(score)

	if score >= target_score:
		score_label.text = "You Win! Score: " + str(score)
		get_tree().paused = true
```

If pause was not used:

```gdscript
if score >= target_score:
	score_label.text = "You Win! Score: " + str(score)
```

## Practical Activity: UI Critique

Students look at each other's screens for 30 seconds without explanation.

They answer:

1. What is the game called?
2. What do you think the player must do?
3. What should the player avoid?
4. Where is the score?
5. What is unclear?

## Teacher Mini-Lecture: Five Beginner UI Principles

Use CAPE interactive design language in simple form:

| Principle | Explorer Meaning |
|---|---|
| Consistent | Same colours and words mean the same thing |
| Perceivable | The player can see/read important information |
| Learnable | The player can quickly understand what to do |
| Predictable | The game responds in expected ways |
| Feedback | The game shows that an action happened |

## UI Improvement Checklist

Students revise:

| Check | Done |
|---|---|
| Text is large enough to read | |
| Score does not overlap player | |
| Instructions are short | |
| Hazard colour differs from collectible | |
| Win message appears | |
| Lose message appears | |

## Feedback Questions

1. What does the player need to know before moving?
2. Can the player read the text quickly?
3. Does the UI block gameplay?
4. What happens when the player wins?
5. What happens when the player loses?

## Exit Ticket

```text
My instruction sentence is:
My win condition is:
My UI is clear because:
One UI change I made:
```

---

# Lesson 11: Sound, Animation, And Juice

## Lesson Purpose

Students add simple feedback polish through sound, colour changes, movement, or animation. The goal is not advanced animation; it is helping the game feel responsive.

## CAPE Links

| CAPE Objective | Explorer Translation |
|---|---|
| Basic sound editing techniques | Students understand sound as feedback |
| Create simple 2D animation movements | Students add simple motion or visual response |
| Interactive design feedback | Feedback becomes more noticeable |
| Design assets for games | Students improve clarity and appeal |

## Godot Documentation Links

| Topic | Local Documentation |
|---|---|
| 2D sprite animation | `tutorials\2d\2d_sprite_animation.html` |
| First 2D game finishing | `getting_started\first_2d_game\07.finishing-up.html` |
| Audio classes | Use Godot class docs for `AudioStreamPlayer` or `AudioStreamPlayer2D` |

## Learning Outcomes

Students can:

1. Explain why feedback polish matters.
2. Add at least one polish effect.
3. Keep polish helpful rather than distracting.
4. Credit any sound or image assets used.

## Key Vocabulary

| Term | Meaning |
|---|---|
| Polish | Small improvements that improve feel |
| Juice | Extra feedback that makes actions feel satisfying |
| Animation | A change over time, such as movement, frame change, or flashing |
| Sound effect | A short sound used as feedback |
| Timing | When feedback happens |

## Teacher Script

"A game can technically work but still feel flat. Polish is how we help the player feel that the game noticed them. A score change is feedback. A score change plus a small sound or visual flash is stronger feedback."

## Polish Options

Students choose one or two:

| Option | Beginner Difficulty | Effect |
|---|---|---|
| Collectible disappears | Already done | Basic feedback |
| Score changes | Already done | Progress feedback |
| Add collection sound | Medium | Satisfaction |
| Change player colour briefly | Medium | Visual feedback |
| Add win message | Easy | Ending feedback |
| Add simple animated collectible | Medium | Visual appeal |
| Add background music | Medium | Mood |

## Practical Activity: Feedback Upgrade

Students complete:

```text
The action I want to improve:
Current feedback:
New feedback I will add:
Why this helps the player:
```

Example:

```text
Action: Collect mango
Current feedback: Score increases and mango disappears
New feedback: Small chime sound
Why this helps: The player hears success even if they are watching movement
```

## Optional Sound Steps

1. Add `AudioStreamPlayer` to `Main`.
2. Rename it `CollectSound`.
3. Add a short sound file to the project.
4. Assign the sound file to the stream property.
5. In `_on_collectible_collected()`, add:

```gdscript
$CollectSound.play()
```

## Optional Simple Animation Without Sprite Sheet

For a simple pulsing collectible:

1. Select `Collectible`.
2. Add `AnimationPlayer`.
3. Create animation named `pulse`.
4. Animate scale from `1,1` to `1.2,1.2` and back.
5. Set animation to loop.
6. Play automatically if comfortable.

If this is too much, use manual movement or skip. Studio Level 1: Explorer needs responsiveness more than advanced animation.

## Feedback Questions

1. What action received new feedback?
2. Is the feedback noticeable?
3. Is the feedback annoying after repeated play?
4. Does the sound fit the theme?
5. Did you create or properly credit the asset?

## Exit Ticket

```text
The polish I added was:
It improves the game because:
One thing I must credit is:
```

---

# Lesson 12: Playtesting And Iteration

## Lesson Purpose

Students learn that games improve through testing and revision. They conduct structured peer playtests and make targeted changes.

## CAPE Links

| CAPE Objective | Explorer Translation |
|---|---|
| Iterative game design | Prototype, playtest, revise, repeat |
| Effective communication | Give and receive useful feedback |
| Constraints | Revise within time and skill limits |
| Production documentation | Record changes and reasons |

## Reference Links

| Text | Use |
|---|---|
| Brathwaite and Schreiber | Iterative design and constraints |
| Schell | Use questions/lenses to improve experience |
| Novak | Testing and production process |

## Learning Outcomes

Students can:

1. Playtest another student's game respectfully.
2. Record observations, not just opinions.
3. Identify one priority revision.
4. Make and explain a change.

## Key Vocabulary

| Term | Meaning |
|---|---|
| Prototype | An early working version |
| Playtest | Watching someone play to learn what works |
| Bug | Something that does not work as intended |
| Iteration | A cycle of testing and improving |
| Revision | A change made after feedback |

## Teacher Script

"Playtesting is not judging whether someone is talented. It is how designers find out what the game is actually teaching the player. If a tester gets confused, that is useful information."

## Playtest Rules

1. The designer does not explain unless the tester is completely stuck.
2. The tester says what they are thinking.
3. The observer writes what happened.
4. Feedback must include one strength and one improvement.
5. The designer chooses one change to make first.

## Playtest Sheet

```text
Game title:
Designer(s):
Tester:

1. What did you think the goal was?
2. What did you try first?
3. Did you understand the controls?
4. Did you know what to collect?
5. Did you know what to avoid?
6. Was the score/lives display clear?
7. Did you win or lose?
8. What felt fun?
9. What felt confusing?
10. One suggested improvement:
```

## Observation Sheet

Designer records:

```text
Tester name:
Where did the tester pause?
What did the tester misunderstand?
What did the tester enjoy?
Did any bug happen?
What change should we make?
```

## Revision Priority Ladder

Teach students to fix in this order:

1. Game-breaking bugs.
2. Confusing controls or instructions.
3. Unclear win/lose condition.
4. Unfair challenge.
5. Visual polish.
6. Extra features.

## Practical Activity

1. Pair A tests Pair B's game for 5 minutes.
2. Pair B observes silently.
3. Switch.
4. Each pair chooses one revision.
5. Make revision.
6. Test again quickly.

## Feedback Questions

1. What did the tester understand immediately?
2. What did the tester misunderstand?
3. What is the most important fix?
4. What change can be completed today?
5. Did the revision improve the game?

## Exit Ticket

```text
The most useful feedback I received was:
The change I made was:
The game is better because:
```

---

# Lesson 13: Mini Pitch And Documentation

## Lesson Purpose

Students prepare a short presentation and a one-page concept sheet. This introduces CAPE-style pitching and production documentation at a gentle level.

## CAPE Links

| CAPE Objective | Explorer Translation |
|---|---|
| Demonstrate effective pitch delivery | Students present their game clearly |
| Create production plan/concept note | Students complete one-page game concept |
| Production Bible foundation | Students collect design documents |
| Communication skills | Students explain purpose, audience, and features |

## Reference Links

| Text | Use |
|---|---|
| Novak | Production documents and roles |
| Schell | Explain the experience and design intention |
| Adams | Game concept and player experience |

## Learning Outcomes

Students can:

1. Present their game in 1-2 minutes.
2. Explain title, genre, goal, controls, win/lose condition.
3. Describe one design choice.
4. Submit a simple documentation packet.

## Student Documentation Packet

Minimum:

1. Game concept sheet.
2. Screen sketch or storyboard.
3. Playtest sheet.
4. Asset credit list.
5. Final reflection.

## One-Page Concept Sheet

```text
Game Title:
Designer(s):
Genre:
Target Audience:

Synopsis:

Player Character:

Main Player Action:

Collectibles:

Hazard:

Controls:

Win Condition:

Lose Condition:

Feedback:

One Design Choice I Am Proud Of:

Assets Created By Us:

Assets From Other Sources And Credits:
```

## Mini Pitch Structure

Students use:

1. Hook: "Our game is called..."
2. Concept: "The player must..."
3. Controls: "You move using..."
4. Challenge: "The difficulty comes from..."
5. Feedback: "The game shows progress by..."
6. Reflection: "One thing we improved after playtesting was..."

## Peer Feedback Questions

1. Did the pitch explain the game clearly?
2. Did the speaker explain the goal?
3. Did the speaker explain challenge?
4. Did the speaker mention feedback or playtesting?
5. What was one strong design choice?
6. What is one question you still have?

## Teacher Feedback Prompts

Use gentle CAPE language:

1. "Your concept is clear because..."
2. "Your target audience could be clearer if..."
3. "Your mechanics are easy to understand because..."
4. "Your UI could improve by..."
5. "Your documentation shows iteration because..."

## Exit Ticket

```text
One sentence from my pitch that worked well:
One part I need to practise:
One thing I learned about explaining a game:
```

---

# Lesson 14: Showcase, Reflection, And Next Spiral

## Lesson Purpose

Students share their finished games, reflect on learning, and preview how Studio Level 2: Builder will deepen the same concepts.

## CAPE Links

| CAPE Objective | Explorer Translation |
|---|---|
| Pitch delivery | Present game to peers |
| Iterative design | Explain changes made |
| Production documentation | Submit final packet |
| Soft skills | Collaboration, communication, creativity |

## Learning Outcomes

Students can:

1. Demonstrate a working game.
2. Explain the game's design structure.
3. Reflect on one technical and one design skill learned.
4. Identify a next step for future development.

## Showcase Format

Option A: Gallery Walk

1. Half the class stands by games.
2. Half the class plays and leaves feedback.
3. Switch after 20 minutes.

Option B: Projector Demo

1. Each pair gets 3 minutes.
2. 1 minute pitch.
3. 1 minute gameplay.
4. 1 minute feedback.

## Showcase Feedback Card

```text
Game played:
One thing I understood quickly:
One thing I enjoyed:
One thing that could improve:
One question for the designer:
```

## Final Reflection

Students complete:

```text
1. My game is about:
2. The player can:
3. The goal is:
4. The challenge is:
5. The feedback is:
6. The hardest Godot skill was:
7. The strongest design choice was:
8. One bug or problem I solved was:
9. One thing I would improve with more time:
10. One skill I want to learn next year:
```

## Next Spiral Preview

Explain:

In Studio Level 2: Builder, students will return to the same ideas, but deeper:

| Studio Level 1: Explorer | Studio Level 2: Builder |
|---|---|
| One-screen game | Two-level arcade game |
| Simple movement | More refined movement and collisions |
| Static collectibles | Moving hazards or timed events |
| Basic score | Score plus lives/timer/progression |
| Simple UI | Start screen, pause/restart, clearer HUD |
| One playtest cycle | Multiple playtest/revision cycles |

---

# Student Handouts

## Handout 1: Game Analysis Sheet

```text
Game name:
Genre:
Target audience:

Who is the player?

What can the player do?

What is the goal?

What are the rules?

What creates challenge?

How does the game give feedback?

How does the player win?

How does the player lose?

One thing I would change:
```

## Handout 2: Game Concept Card

```text
Title:
Genre:
Target audience:

Main player verb:
Main object:

Short-term goal:
Long-term goal:

Challenge:
Feedback:

Theme:

Why this game is suitable for Studio Level 1: Explorer:
```

## Handout 3: One-Screen Layout Planner

```text
Game title:

Draw your game screen. Label:
- Player start
- Collectibles
- Hazard
- Score
- Lives
- Instructions
- Background
- Boundaries

Questions:
1. Can the player move freely?
2. Can the player see what to collect?
3. Can the player see what to avoid?
4. Is the score readable?
5. Is the challenge fair?
```

## Handout 4: Four-Panel Storyboard

```text
Panel 1: Start
What does the player see?
What instruction appears?

Panel 2: Main action
What does the player do?
What feedback appears?

Panel 3: Challenge
What danger or obstacle appears?
How does the player respond?

Panel 4: Ending
What does winning or losing look like?
```

## Handout 5: Playtest Sheet

```text
Game title:
Designer(s):
Tester:

1. What did you think the goal was?
2. What did you try first?
3. Were the controls clear?
4. Did you know what to collect?
5. Did you know what to avoid?
6. Was the score/lives display clear?
7. Did you win or lose?
8. What felt fun?
9. What felt confusing?
10. One suggested improvement:
```

## Handout 6: Asset Credit List

```text
Game title:
Designer(s):

Assets we created ourselves:

Assets provided by teacher:

Assets from other sources:
Asset name:
Source:
Creator:
Licence/permission:
How it was used:

Sounds/music:
Sound name:
Source:
Creator:
Licence/permission:
```

---

# Final Assessment Rubric

Use a 4-point scale.

| Area | 4 - Strong | 3 - Secure | 2 - Developing | 1 - Beginning |
|---|---|---|---|---|
| Game concept | Clear title, genre, audience, goal, challenge, theme | Mostly clear concept and goal | Some idea present but unclear | Concept incomplete |
| Playability | Game can be played from start to finish with win/lose outcome | Game mostly playable with minor issues | Game partially playable | Game does not run or cannot be played |
| Player control | Movement is responsive and suitable | Movement works but may need tuning | Movement works inconsistently | Player control missing |
| Mechanics | Collectibles, score, hazard, rules, feedback work together | Most mechanics work | Some mechanics work | Mechanics missing or disconnected |
| UI and feedback | Instructions, score, lives/messages are clear and readable | UI mostly clear | UI partially clear | UI missing or confusing |
| Visual design | Player, collectible, hazard, and background are readable and themed | Most visuals are readable | Some visual confusion | Visuals unclear |
| Iteration | Playtest evidence and meaningful revision included | Some playtest/revision evidence | Limited revision | No playtest evidence |
| Documentation | Concept sheet, storyboard/layout, playtest, credits, reflection complete | Most documents complete | Some documents missing | Documentation minimal |
| Communication | Pitch explains concept, controls, goal, challenge, and improvement | Pitch explains most major points | Pitch is brief or unclear | Pitch missing or very unclear |
| Collaboration | Pair/team worked responsibly and solved problems together | Mostly responsible collaboration | Uneven collaboration | Collaboration problems blocked progress |

## Suggested Weighting

| Component | Weight |
|---|---|
| Working game | 40% |
| Documentation | 25% |
| Playtesting and revision | 15% |
| Pitch/showcase | 10% |
| Studio habits/collaboration | 10% |

---

# Teacher Quick Reference: Common Godot Build

## Recommended Scene Tree

```text
Main (Node2D)
  Player (Area2D instance)
  Collectibles (Node2D)
    Collectible (Area2D instance)
    Collectible2
    Collectible3
    Collectible4
    Collectible5
  Hazards (Node2D)
    Hazard (Area2D instance)
  CanvasLayer
    TitleLabel
    InstructionLabel
    ScoreLabel
    LivesLabel
```

## Player Script

```gdscript
extends Area2D

@export var speed := 300.0
var screen_size := Vector2.ZERO

func _ready():
	screen_size = get_viewport_rect().size

func _process(delta):
	var direction := Vector2.ZERO

	if Input.is_action_pressed("ui_right"):
		direction.x += 1
	if Input.is_action_pressed("ui_left"):
		direction.x -= 1
	if Input.is_action_pressed("ui_down"):
		direction.y += 1
	if Input.is_action_pressed("ui_up"):
		direction.y -= 1

	if direction.length() > 0:
		direction = direction.normalized()

	position += direction * speed * delta
	position.x = clamp(position.x, 0, screen_size.x)
	position.y = clamp(position.y, 0, screen_size.y)
```

## Collectible Script

```gdscript
extends Area2D

signal collected

func _on_area_entered(area):
	if area.name == "Player":
		collected.emit()
		queue_free()
```

## Hazard Script

```gdscript
extends Area2D

signal hit_player

func _on_area_entered(area):
	if area.name == "Player":
		hit_player.emit()
```

## Main Script

```gdscript
extends Node2D

@export var target_score := 5

var score := 0
var lives := 3
var game_finished := false

@onready var score_label := $CanvasLayer/ScoreLabel
@onready var lives_label := $CanvasLayer/LivesLabel

func _ready():
	score_label.text = "Score: 0"
	lives_label.text = "Lives: " + str(lives)

	for collectible in $Collectibles.get_children():
		collectible.collected.connect(_on_collectible_collected)

	for hazard in $Hazards.get_children():
		hazard.hit_player.connect(_on_hazard_hit_player)

func _on_collectible_collected():
	if game_finished:
		return

	score += 1
	score_label.text = "Score: " + str(score)

	if score >= target_score:
		game_finished = true
		score_label.text = "You Win! Score: " + str(score)

func _on_hazard_hit_player():
	if game_finished:
		return

	lives -= 1
	lives_label.text = "Lives: " + str(lives)

	if lives <= 0:
		game_finished = true
		score_label.text = "Game Over"
```

## Debug Checklist

| Symptom | Check |
|---|---|
| Player does not move | Is player script attached? Is main scene running? |
| Player moves off screen | Is clamp code in player script? |
| Collectible does not collect | Does collectible have collision shape? Is signal connected? |
| Score does not update | Is collectible signal connected to main? Is node path correct? |
| Hazard does nothing | Does hazard have signal and collision shape? |
| Labels cause errors | Are label names exactly `ScoreLabel` and `LivesLabel`? |
| Game freezes unexpectedly | Did you use `get_tree().paused = true`? Remove if confusing. |
| Player hidden | Check colour, size, position, and layer order. |

---

# Extension Tasks

Use only after the minimum game works.

| Extension | Adds |
|---|---|
| Timer | Time pressure and urgency |
| Moving hazard | More challenge |
| Sound effects | Stronger feedback |
| Start screen | Better UI flow |
| Restart key | Replayability |
| Animated player | Visual polish |
| Second collectible type | Choice and scoring variety |
| Local cultural theme | Stronger CAPE cultural relevance |

## Extension: Timer

Add `Timer` node and `TimeLabel`.

Simple concept:

1. Game starts with 30 seconds.
2. Timer decreases.
3. If time reaches 0, game over.

Only attempt if students already understand score and lives.

## Extension: Moving Hazard

Attach simple movement to hazard:

```gdscript
extends Area2D

signal hit_player

@export var speed := 120.0
@export var left_limit := 100.0
@export var right_limit := 600.0
var direction := 1

func _process(delta):
	position.x += speed * direction * delta

	if position.x > right_limit:
		direction = -1
	if position.x < left_limit:
		direction = 1

func _on_area_entered(area):
	if area.name == "Player":
		hit_player.emit()
```

Discuss:

1. Does movement make the game more exciting?
2. Is the hazard still fair?
3. Should speed be slower?

---

# Teacher Notes On Differentiation

## For Students Who Need More Support

Give them:

1. A partially completed Godot project.
2. Fewer collectibles.
3. One hazard only.
4. Printed code with missing values rather than blank script.
5. A partner role such as tester, artist, or UI designer.

Success target:

The student can explain the player, goal, rule, and feedback, even if they need help with code.

## For Students Who Move Quickly

Ask them to add:

1. Moving hazard.
2. Better UI layout.
3. Sound effect.
4. Restart button/key.
5. Custom art.
6. A second level as an optional preview of Studio Level 2: Builder.

Challenge target:

The student can explain how the new feature changes player experience.

## For Mixed Skill Pairs

Assign rotating roles:

| Role | Responsibility |
|---|---|
| Driver | Controls mouse/keyboard |
| Navigator | Reads steps and checks logic |
| Tester | Plays and records problems |
| Designer | Checks theme, layout, and readability |

Rotate every 15-20 minutes.

---

# Teacher Reflection After Module

After the showcase, record:

1. Which Godot concepts were hardest?
2. Which design concepts students understood fastest?
3. Did students finish a playable game?
4. Was the one-screen scope appropriate?
5. Which assets or templates should be prepared next time?
6. Which students are ready for Studio Level 2: Builder extension work?
7. What should be simplified?
8. What should be deepened?

## Evidence To Keep

Keep examples of:

1. Strong concept sheets.
2. Clear storyboards.
3. Good UI examples.
4. Playtest sheets with useful feedback.
5. Finished exported games.
6. Common bugs and fixes.

This evidence will help build the club's own local reference library over time.

---

# Compact Lesson Sequence

| Lesson | Main Theory | Main Practical | Product |
|---|---|---|---|
| 1 | Game atoms | Non-digital game | Game analysis |
| 2 | Genres/goals/audience | Concept cards | Chosen concept |
| 3 | Visual design/layout | Screen sketch | Layout plan |
| 4 | Story/character | Synopsis/storyboard | Storyboard |
| 5 | Godot editor | Toy scene | First scene |
| 6 | Movement/input | Player scene | Moving player |
| 7 | Boundaries/fairness | Clamp and layout test | Play space |
| 8 | Collection/feedback | Collectibles and score | Scoring system |
| 9 | Hazards/lose condition | Hazard and lives | Challenge system |
| 10 | UI/win condition | Instructions and ending | Playable game loop |
| 11 | Sound/animation polish | Feedback upgrade | Polished prototype |
| 12 | Iteration | Peer playtest | Revised game |
| 13 | Pitch/documentation | Mini pitch | Concept packet |
| 14 | Showcase/reflection | Demo games | Final portfolio |

## Minimum Completion Definition

A Studio Level 1: Explorer project is complete when:

1. The game opens.
2. The player can move.
3. The player can collect items.
4. Score changes.
5. A hazard creates penalty or game over.
6. The game can be won.
7. The player receives instructions.
8. The student can explain the game using CAPE-aligned vocabulary.

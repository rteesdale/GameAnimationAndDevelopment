# Studio Level 2: Builder - Arcade Systems Instruction Manual

## Purpose

This manual extends the Studio Level 1: Explorer module into a Studio Level 2: Builder arcade production module. Students revisit the same CAPE-aligned strands, but now build a more complete two-level arcade game with stronger movement, clearer feedback, simple animation, a start/end flow, playtesting, and documentation.

The final product is a working two-level 2D arcade game in Godot.

## Module Identity

| Item | Description |
|---|---|
| Studio level | Studio Level 2: Builder |
| Module name | Arcade Systems |
| Recommended length | 14 lessons plus showcase |
| Session length | 60-90 minutes |
| Engine | Godot, 2D mode |
| Main project | Two-level arcade game |
| Prior knowledge assumed | Explorer-level movement, collectibles, hazards, score, basic UI |
| CAPE bridge | Unit 1 foundations plus deeper Unit 2 game design and interaction design |

## Spiral Progression From Studio Level 1: Explorer

| Studio Level 1: Explorer | Studio Level 2: Builder |
|---|---|
| One-screen collection game | Two-level arcade game |
| Basic movement | Tuned movement and collision response |
| Static hazards | Moving hazards or timed threats |
| Score only | Score, lives, timer, level progression |
| Simple labels | Title screen, instructions, HUD, win/lose screens |
| One playtest cycle | Multiple revision cycles |
| Basic concept sheet | Mini game design document |

## CAPE Alignment Summary

| CAPE Area | Studio Level 2: Builder Treatment |
|---|---|
| Unit 1 Module 1 | Game genres, goals, iterative design, software tools, team roles, ethical asset use |
| Unit 1 Module 2 | Layout, layers, colour, visual clarity, first two game levels |
| Unit 1 Module 3 | Synopsis, simple narrative context, storyboard, character/environment fit |
| Unit 2 Module 1 | UI, feedback, learnability, player instructions, target audience |
| Unit 2 Module 2 | Mechanics, core dynamics, short- and long-term goals, level progression |
| Unit 2 Module 3 | 2D sprite movement, simple animation, sound/visual feedback |

## Reference Text Integration

| Text | Teacher Use |
|---|---|
| Anthropy and Clark, *A Game Design Vocabulary* | Describe arcade play through verbs, objects, scenes, context, and player interpretation. |
| Brathwaite and Schreiber, *Challenges for Game Designers* | Use non-digital prototypes to explore skill, chance, rules, constraints, and level challenge. |
| Adams, *Fundamentals of Game Design* | Support genre, core mechanics, UI, level design, and balancing discussions. |
| Novak, *Game Development Essentials* | Use production roles, pipeline, documentation, playtesting, and team workflow. |
| Schell, *The Art of Game Design* | Use design lenses: essential experience, skill, surprise, fairness, and feedback. |
| Godot documentation | Use nodes/scenes, scripting, input, signals, timers, UI, animation, and scene changes. |

## Godot Documentation Map

Use local docs at:

`D:\0_AnimationAndGameDesign\Godot\godot-docs-html-stable`

| Topic | Local Documentation Path |
|---|---|
| Nodes and scenes | `getting_started\step_by_step\nodes_and_scenes.html` |
| Scripting | `getting_started\step_by_step\scripting_first_script.html` |
| Input | `getting_started\step_by_step\scripting_player_input.html` |
| Signals | `getting_started\step_by_step\signals.html` |
| First 2D game | `getting_started\first_2d_game\index.html` |
| Changing scenes | `tutorials\scripting\change_scenes_manually.html` |
| UI | `tutorials\ui\index.html` |
| 2D sprite animation | `tutorials\2d\2d_sprite_animation.html` |

## Final Game Specification

Every Studio Level 2: Builder student or pair should produce:

| Feature | Minimum Requirement |
|---|---|
| Title screen | Game title, controls, start instruction |
| Player | Controlled by keyboard with tuned speed |
| Two levels | Level 1 and Level 2 with increased difficulty |
| Collectibles or objective items | Items needed for score, progress, or victory |
| Hazards | At least one moving hazard or timed threat |
| Score/lives/timer | At least two of these systems |
| Level progression | Clear transition from Level 1 to Level 2 |
| Win/lose screens | Player receives clear final result |
| Feedback | Visual and/or sound feedback for key events |
| Documentation | Mini GDD, storyboard/layouts, asset credits, playtest notes, reflection |

## Recommended Game Types

| Game Type | Why It Fits Studio Level 2: Builder |
|---|---|
| Timed collector | Builds on Studio Level 1: Explorer collection and adds pressure |
| Dodger | Teaches movement, hazards, fairness, and survival |
| Maze escape | Teaches spatial reasoning and level layout |
| Simple top-down chase | Teaches enemy movement and player avoidance |
| Arcade delivery game | Teaches route planning, scoring, and time limits |

---

# Lesson 1: Arcade Game Deconstruction

## Purpose

Students analyse arcade games as systems of repeated actions, pressure, feedback, and scoring.

## Learning Outcomes

Students can:

1. Identify the main verb in an arcade game.
2. Distinguish short-term and long-term goals.
3. Explain how difficulty increases.
4. Describe feedback systems.

## Key Vocabulary

| Term | Meaning |
|---|---|
| Arcade game | A fast, clear game built around repeated actions and score/challenge |
| Main verb | The action the player performs most |
| Difficulty curve | How a game becomes harder over time |
| Pressure | A force that makes the player act quickly or carefully |
| Loop | A repeated sequence of action and feedback |

## Activity: Arcade Autopsy

Students analyse a familiar simple arcade game.

```text
Game:
Main verb:
Main object:
Short-term goal:
Long-term goal:
Pressure:
Feedback:
How difficulty increases:
What makes it replayable:
```

## Feedback Questions

1. What does the player do again and again?
2. What makes the player feel pressure?
3. What tells the player they are improving?
4. When does the game feel unfair?
5. How could this game be simplified for Godot?

## Practical Design Task

Students create a paper prototype of an arcade loop:

```text
Move -> collect/avoid -> score/life changes -> difficulty increases -> repeat
```

---

# Lesson 2: Studio Level 2: Builder Game Concept And Constraints

## Purpose

Students choose a feasible two-level arcade game and define constraints.

## Learning Outcomes

Students can:

1. Write a concise concept.
2. Define target audience.
3. Identify constraints: time, skill, assets, scope.
4. Choose mechanics that can be finished.

## Mini GDD Template

```text
Game title:
Genre:
Target audience:
Core experience:
Main verb:
Secondary verb:
Short-term goal:
Long-term goal:
Level 1 challenge:
Level 2 challenge:
Score/lives/timer system:
Win condition:
Lose condition:
Assets needed:
Risks:
```

## Teacher Guidance

Push students toward small verbs:

| Good Studio Level 2: Builder Verbs | Risky Verbs |
|---|---|
| move | craft |
| collect | simulate |
| avoid | build a world |
| deliver | multiplayer battle |
| escape | online ranking |

## Feedback Questions

1. Can this be completed in two levels?
2. What is the smallest playable version?
3. What feature can be removed if time runs out?
4. Is Level 2 harder in a clear way?

---

# Lesson 3: Level Design On Paper

## Purpose

Students design two levels before building them.

## CAPE Link

Unit 1 Module 2 expects students to outline levels and design early game levels. Studio Level 2: Builder does this with two playable levels.

## Learning Outcomes

Students can:

1. Draw Level 1 and Level 2 layouts.
2. Identify start, goal, hazards, collectibles, UI, and boundaries.
3. Explain how Level 2 increases challenge.

## Level Planner

```text
Level name:
Player start:
Goal:
Collectibles/objectives:
Hazards:
Safe spaces:
UI elements:
What teaches the player:
What challenges the player:
```

## Challenge Increase Options

| Level 1 | Level 2 |
|---|---|
| Few hazards | More hazards |
| Static hazard | Moving hazard |
| No timer | Timer added |
| Wide paths | Narrower paths |
| Few collectibles | More spread-out collectibles |
| Simple route | Multiple route choices |

## Feedback Questions

1. Can the player understand Level 1 quickly?
2. What does Level 2 add?
3. Is Level 2 harder or just cluttered?
4. Does the level use space fairly?

---

# Lesson 4: Godot Project Setup And Scene Plan

## Purpose

Students set up a Godot project with reusable scenes.

## Recommended Scene Plan

```text
scenes/
  title_screen.tscn
  level_1.tscn
  level_2.tscn
  win_screen.tscn
  lose_screen.tscn
  player.tscn
  collectible.tscn
  hazard.tscn
scripts/
  player.gd
  level.gd
  hazard.gd
assets/
  sprites/
  sounds/
```

## Learning Outcomes

Students can:

1. Create a clean project folder.
2. Create reusable player, collectible, and hazard scenes.
3. Save files with clear names.
4. Explain why reusable scenes help production.

## Practical Task

Create:

1. `player.tscn`
2. `collectible.tscn`
3. `hazard.tscn`
4. `level_1.tscn`

## Feedback Questions

1. Are names clear?
2. Can a scene be reused?
3. What belongs in `assets`?
4. What belongs in `scripts`?

---

# Lesson 5: Improved Player Movement

## Purpose

Students refine movement and connect control feel to player experience.

## Learning Outcomes

Students can:

1. Implement keyboard movement.
2. Tune speed.
3. Keep the player inside the screen.
4. Explain movement feel.

## Player Script

```gdscript
extends Area2D

@export var speed := 320.0
var screen_size := Vector2.ZERO

func _ready():
	screen_size = get_viewport_rect().size

func _process(delta):
	var direction := Input.get_vector("ui_left", "ui_right", "ui_up", "ui_down")
	position += direction * speed * delta
	position.x = clamp(position.x, 0, screen_size.x)
	position.y = clamp(position.y, 0, screen_size.y)
```

## Movement Feel Test

Students test:

| Speed | Feel | Best For |
|---|---|---|
| 180 | careful | maze |
| 320 | balanced | collector |
| 500 | frantic | dodger |

## Feedback Questions

1. Does movement match the genre?
2. Is diagonal movement too powerful?
3. Does speed make hazards fair?
4. Is the game easier or harder after changing speed?

---

# Lesson 6: Score, Lives, And Timer Systems

## Purpose

Students add systems that create progress and pressure.

## Learning Outcomes

Students can:

1. Track score.
2. Track lives.
3. Use a timer or countdown.
4. Explain how systems affect difficulty.

## Required Choice

Students must include at least two:

1. Score.
2. Lives.
3. Timer.

## Level Script Skeleton

```gdscript
extends Node2D

@export var target_score := 5
@export var next_level_path := ""

var score := 0
var lives := 3
var time_left := 45
var finished := false

@onready var score_label := $CanvasLayer/ScoreLabel
@onready var lives_label := $CanvasLayer/LivesLabel
@onready var time_label := $CanvasLayer/TimeLabel

func _ready():
	update_hud()

func update_hud():
	score_label.text = "Score: " + str(score)
	lives_label.text = "Lives: " + str(lives)
	time_label.text = "Time: " + str(time_left)
```

## Feedback Questions

1. What tells the player they are progressing?
2. What creates pressure?
3. Is the timer too short?
4. Are lives forgiving enough?

---

# Lesson 7: Moving Hazards

## Purpose

Students add controlled movement to hazards and discuss fair challenge.

## Learning Outcomes

Students can:

1. Create a moving hazard.
2. Tune speed and range.
3. Make hazard movement readable.
4. Explain fairness.

## Moving Hazard Script

```gdscript
extends Area2D

signal hit_player

@export var speed := 120.0
@export var left_limit := 100.0
@export var right_limit := 700.0

var direction := 1

func _process(delta):
	position.x += speed * direction * delta

	if position.x >= right_limit:
		direction = -1
	if position.x <= left_limit:
		direction = 1

func _on_area_entered(area):
	if area.name == "Player":
		hit_player.emit()
```

## Fairness Checklist

| Question | Yes/No |
|---|---|
| Can the player see the hazard before contact? | |
| Is there a safe route? | |
| Is the movement pattern learnable? | |
| Does the hazard match the theme? | |
| Does Level 2 increase challenge fairly? | |

---

# Lesson 8: Scene Changes And Level Progression

## Purpose

Students connect Level 1 to Level 2 and create a complete game flow.

## Learning Outcomes

Students can:

1. Explain game state.
2. Change from one scene to another.
3. Connect win/lose outcomes to screens.

## Simple Scene Change

```gdscript
func go_to_next_level():
	if next_level_path != "":
		get_tree().change_scene_to_file(next_level_path)
```

Example exported path:

```gdscript
@export var next_level_path := "res://scenes/level_2.tscn"
```

## Game Flow Diagram

```text
Title Screen -> Level 1 -> Level 2 -> Win Screen
                         -> Lose Screen
```

## Feedback Questions

1. Does the player know when Level 1 ends?
2. Is the transition clear?
3. Does Level 2 feel connected to Level 1?
4. What happens after losing?

---

# Lesson 9: UI And Player Instructions

## Purpose

Students improve the title screen, HUD, and end screens.

## Learning Outcomes

Students can:

1. Create readable UI.
2. Explain controls.
3. Display score/lives/time.
4. Use UI feedback consistently.

## UI Requirements

| Screen | Required Information |
|---|---|
| Title | Title, goal, controls, start prompt |
| HUD | Score, lives, time if used |
| Win | Success message, final score |
| Lose | Game over message, reason if possible |

## Feedback Questions

1. Can a first-time player start without help?
2. Is text large enough?
3. Does the HUD block gameplay?
4. Are labels consistent?

---

# Lesson 10: Sound And Simple Animation

## Purpose

Students use sound or animation to strengthen feedback.

## Learning Outcomes

Students can:

1. Add a sound effect or visual animation.
2. Explain how it supports feedback.
3. Avoid distracting polish.
4. Credit assets.

## Polish Menu

| Feature | Purpose |
|---|---|
| Collect sound | Confirms success |
| Hazard sound | Confirms danger |
| Animated collectible | Draws attention |
| Player flash | Shows damage |
| Title music | Establishes mood |

## Feedback Questions

1. Does the sound match the event?
2. Is it too loud or repetitive?
3. Does animation help readability?
4. Did you credit assets?

---

# Lesson 11: Playtesting Round 1

## Purpose

Students test Level 1 for clarity and basic functionality.

## Playtest Focus

1. Can the tester start?
2. Can the tester control the player?
3. Does the tester understand the goal?
4. Does Level 1 end correctly?
5. Are score/lives/time working?

## Feedback Questions

1. Where did the tester get confused?
2. What broke?
3. Was Level 1 too easy, too hard, or fair?
4. What is the top fix?

---

# Lesson 12: Playtesting Round 2

## Purpose

Students test Level 2 and whole-game flow.

## Playtest Focus

1. Title to Level 1.
2. Level 1 to Level 2.
3. Level 2 to win/lose.
4. Difficulty increase.
5. UI clarity.

## Revision Priority

1. Broken transitions.
2. Broken win/lose states.
3. Unclear instructions.
4. Unfair challenge.
5. Polish.

---

# Lesson 13: Mini GDD And Arcade Pitch

## Purpose

Students prepare documentation and present their design.

## Required Documentation

1. Mini GDD.
2. Level 1 and Level 2 sketches.
3. Asset credit list.
4. Playtest notes.
5. Reflection.

## Pitch Structure

```text
Our game is called...
It is a...
The player must...
Level 1 teaches...
Level 2 adds...
The main challenge is...
After playtesting we changed...
```

---

# Lesson 14: Showcase And Reflection

## Purpose

Students demonstrate a playable two-level game and reflect on growth.

## Final Reflection

```text
My game's main verb is:
My short-term goal is:
My long-term goal is:
Level 2 is harder because:
The clearest feedback in my game is:
One bug I fixed was:
One design change from playtesting was:
One skill I want to improve in Studio Level 3: Designer is:
```

---

# Student Handouts

## Mini GDD

```text
Title:
Designer(s):
Genre:
Target audience:
Core experience:
Main verb:
Rules:
Short-term goal:
Long-term goal:
Level 1 design:
Level 2 design:
Score/lives/timer:
Win condition:
Lose condition:
Assets:
Credits:
```

## Playtest Sheet

```text
Game:
Tester:
Could you start without help?
Were controls clear?
Was Level 1 clear?
Was Level 2 harder?
Did score/lives/time work?
Did win/lose work?
Most fun moment:
Most confusing moment:
One suggested fix:
```

---

# Final Assessment Rubric

| Area | 4 - Strong | 3 - Secure | 2 - Developing | 1 - Beginning |
|---|---|---|---|---|
| Concept | Clear arcade concept, audience, goals, and challenge | Mostly clear | Partly clear | Unclear |
| Playability | Complete two-level game with working flow | Mostly complete | Partially playable | Not playable |
| Mechanics | Movement, hazards, scoring/lives/timer work together | Most work | Some work | Few work |
| Level design | Level 2 increases challenge fairly | Some progression | Weak progression | No progression |
| UI feedback | Clear title, HUD, and endings | Mostly clear | Inconsistent | Missing/confusing |
| Iteration | Strong playtest evidence and revisions | Some evidence | Limited evidence | None |
| Documentation | Complete mini GDD and credits | Mostly complete | Incomplete | Minimal |
| Pitch | Clear and reflective | Mostly clear | Limited | Missing |

## Minimum Completion Definition

A Studio Level 2: Builder project is complete when:

1. It has two playable levels.
2. It has a clear arcade goal.
3. It includes score/lives/timer systems.
4. It has a clear title screen and ending.
5. It has playtest evidence.
6. The student can explain how Level 2 deepens the challenge.


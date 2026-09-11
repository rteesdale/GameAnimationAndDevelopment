# Studio Level 3: Designer - Story And Systems Instruction Manual

## Purpose

This manual moves students from simple arcade construction into story-driven systems. Students build a short 2D narrative game in Godot with character, environment, interaction, UI, and at least two outcomes. The focus is not long storytelling; it is the relationship between story, player choice, systems, and feedback.

The final product is a short 2D narrative game, such as a top-down quest, mini adventure, story collector, or choice-based exploration game.

## Module Identity

| Item | Description |
|---|---|
| Studio level | Studio Level 3: Designer |
| Module name | Story And Systems |
| Recommended length | 14 lessons plus showcase |
| Session length | 60-90 minutes |
| Engine | Godot, 2D |
| Main project | Short narrative 2D game with interaction and outcomes |
| Prior knowledge assumed | Basic movement, collectibles, hazards, levels, UI, playtesting |
| CAPE bridge | Strong Unit 1 Module 3 and Unit 2 Modules 1-2 preparation |

## Spiral Progression

| Studio Level 2: Builder | Studio Level 3: Designer |
|---|---|
| Two-level arcade game | Short narrative/system game |
| Score/lives/timer | Inventory, quest state, dialogue, choices |
| Level difficulty | Story progression and player decisions |
| Basic UI | Dialogue boxes, prompts, menus, feedback |
| Simple hazard | Characters, objects, locks, conditions |
| Mini GDD | Story/game design document |

## CAPE Alignment Summary

| CAPE Area | Studio Level 3: Designer Treatment |
|---|---|
| Unit 1 Module 1 | Game goals, genres, roles, iterative design, ethical and social issues |
| Unit 1 Module 2 | Environment, layers, concept art, Caribbean context, level structure |
| Unit 1 Module 3 | Synopsis, narrative, story arc, storyboard, character design, environment assets |
| Unit 2 Module 1 | Interactive design, UI, wireframes, storytelling, demographics, culture |
| Unit 2 Module 2 | Game mechanics, stories in games, character/environment creation, UI design |
| Unit 2 Module 3 | 2D animation, animated assets, simple character movement |

## Reference Text Integration

| Text | Teacher Use |
|---|---|
| Anthropy and Clark | Use verbs, objects, scenes, context, resistance, and storytelling to discuss meaning in play. |
| Brathwaite and Schreiber | Use non-digital challenges to prototype rules, resources, quest states, and choices. |
| Adams | Use story types, character, world design, UI, and player experience. |
| Novak | Use game writing, production roles, documentation, and pipeline. |
| Schell | Use lenses of story, character, world, choice, and player experience. |

## Final Game Specification

| Feature | Minimum Requirement |
|---|---|
| Player/avatar | Controlled character or cursor |
| Setting | Clear environment with theme |
| Story | One-page synopsis and simple story arc |
| Interaction | At least 3 interactable objects or NPCs |
| Quest/system state | At least one variable tracks progress |
| Choice or outcome | At least two endings or result states |
| UI | Dialogue/prompt text and clear instructions |
| Assets | Character, environment, and object assets |
| Playtest | At least two playtest cycles |
| Documentation | Synopsis, character card, storyboard, UI wireframe, asset credits, reflection |

---

# Lesson 1: Story In Games

## Purpose

Students learn that game story is not only cutscenes or text. Story can be expressed through goals, environment, objects, rules, and consequences.

## Learning Outcomes

Students can:

1. Distinguish linear and interactive story.
2. Identify story expressed through gameplay.
3. Write a short game premise.

## Key Vocabulary

| Term | Meaning |
|---|---|
| Premise | The basic story idea |
| Story arc | Beginning, development, climax, resolution |
| Interactive story | Story shaped by player action |
| Environmental storytelling | Story shown through place and objects |
| Outcome | Result caused by player action |

## Activity: Story Without Text

Students examine a game screenshot or invented scene and answer:

1. Where are we?
2. Who might live here?
3. What happened before the player arrived?
4. What object tells us something?
5. What might the player need to do?

## Feedback Questions

1. What does the player understand without being told?
2. What does the environment suggest?
3. What is the player's role?
4. What is the central problem?

---

# Lesson 2: Synopsis, Theme, And Audience

## Purpose

Students write a synopsis and define target audience, cultural context, and rating suitability.

## CAPE Link

Unit 1 Module 3 and Unit 2 Module 1 require synopsis, story development, target audience, culture, and ratings.

## Synopsis Template

```text
In [setting], [player character] must [goal], but [obstacle/conflict]. The player will [main actions], and the outcome depends on [choice/system].
```

## Practical Activity

Students create three premise options:

1. School/community setting.
2. Caribbean folklore or heritage setting.
3. Original fantasy/sci-fi setting.

They choose one based on:

| Criterion | Yes/No |
|---|---|
| Suitable for school | |
| Can be built in 2D | |
| Has a clear goal | |
| Has 3 interactions | |
| Can have 2 outcomes | |

## Feedback Questions

1. Is the story too large?
2. Can the player act on the problem?
3. What is culturally meaningful?
4. What should be avoided for age appropriateness?

---

# Lesson 3: Character Design And Archetypes

## Purpose

Students design characters that fit genre, story, and gameplay.

## Learning Outcomes

Students can:

1. Identify archetypes.
2. Design a player character and supporting character.
3. Connect shape/colour to role.

## Character Card

```text
Name:
Role:
Archetype:
Goal:
Fear/obstacle:
Main visual shape:
Main colour:
How player interacts with them:
What they reveal about the story:
```

## Archetype Starter List

| Archetype | Game Use |
|---|---|
| Hero/protagonist | Player role |
| Mentor | Gives guidance |
| Guardian | Blocks progress |
| Trickster | Creates uncertainty |
| Ally | Helps player |
| Shadow/antagonist | Opposes player |

## Feedback Questions

1. Can we tell the character's role visually?
2. Does the character fit the story?
3. What does the character want?
4. How does the player interact with them?

---

# Lesson 4: Environment And Story Space

## Purpose

Students design the game's environment as a readable story space.

## Environment Planner

```text
Setting:
Mood:
Background elements:
Midground/play area:
Foreground/important objects:
Interactable objects:
Blocked areas:
Clues:
Colour palette:
```

## Practical Activity

Students draw a top-down or side-view map with:

1. Player start.
2. 3 interactable objects/NPCs.
3. One blocked path or condition.
4. One final area/outcome point.
5. UI/dialogue space.

## Feedback Questions

1. Does the space guide the player?
2. What objects are interactive?
3. Can the player tell where to go?
4. What does the environment say about the story?

---

# Lesson 5: Interaction Design And Wireframes

## Purpose

Students design interaction prompts, dialogue UI, and player guidance.

## CAPE Link

Unit 2 Module 1: interactive design principles and UI wireframes.

## UI Requirements

1. Instruction prompt.
2. Dialogue box or message label.
3. Objective text.
4. Ending message.

## Wireframe Activity

Students draw:

```text
Main play screen:
Dialogue screen:
Choice prompt:
Ending screen:
```

## Feedback Questions

1. Is interaction discoverable?
2. Does the prompt use consistent wording?
3. Can the player read dialogue quickly?
4. What feedback confirms an interaction?

---

# Lesson 6: Godot Interaction Basics

## Purpose

Students create an interactable object in Godot.

## Scene Structure

```text
Interactable (Area2D)
  Sprite2D or ColorRect
  CollisionShape2D
```

## Interactable Script

```gdscript
extends Area2D

signal interacted(message)

@export var message := "You found something."
var player_near := false

func _process(_delta):
	if player_near and Input.is_action_just_pressed("ui_accept"):
		interacted.emit(message)

func _on_area_entered(area):
	if area.name == "Player":
		player_near = true

func _on_area_exited(area):
	if area.name == "Player":
		player_near = false
```

## Feedback Questions

1. Does the player know they can interact?
2. Which key is used?
3. What message appears?
4. What should happen after interaction?

---

# Lesson 7: Dialogue And Objective Text

## Purpose

Students add simple dialogue and objective feedback.

## Main Scene UI

```text
CanvasLayer
  ObjectiveLabel
  DialogueLabel
```

## Main Script Example

```gdscript
extends Node2D

var clues_found := 0

@onready var objective_label := $CanvasLayer/ObjectiveLabel
@onready var dialogue_label := $CanvasLayer/DialogueLabel

func _ready():
	objective_label.text = "Find 3 clues."
	dialogue_label.text = ""
	for item in $Interactables.get_children():
		item.interacted.connect(_on_item_interacted)

func _on_item_interacted(message):
	clues_found += 1
	dialogue_label.text = message
	objective_label.text = "Clues: " + str(clues_found) + "/3"
```

## Feedback Questions

1. Is the objective clear?
2. Does dialogue help or slow the game?
3. Is the text too long?
4. Does interaction change progress?

---

# Lesson 8: Quest State And Conditions

## Purpose

Students learn that games remember player actions through variables.

## Learning Outcomes

Students can:

1. Use a variable to track progress.
2. Lock or unlock an outcome.
3. Explain game state.

## Conditional Ending Example

```gdscript
func try_finish_game():
	if clues_found >= 3:
		dialogue_label.text = "You solved the mystery."
	else:
		dialogue_label.text = "You still need more clues."
```

## Feedback Questions

1. What does the game remember?
2. How does the player know progress changed?
3. What condition unlocks the ending?
4. What happens if the player is not ready?

---

# Lesson 9: Branching Outcomes

## Purpose

Students create at least two result states.

## Outcome Types

| Outcome | Example |
|---|---|
| Success | Player collected enough clues |
| Partial success | Player solved part of problem |
| Failure | Player ran out of time or missed key item |
| Choice ending | Player chose A or B |

## Simple Branch

```gdscript
func show_ending():
	if clues_found >= 3:
		get_tree().change_scene_to_file("res://scenes/good_ending.tscn")
	else:
		get_tree().change_scene_to_file("res://scenes/partial_ending.tscn")
```

## Feedback Questions

1. Are endings caused by player action?
2. Does the player understand why they got that ending?
3. Is one ending clearly better, or just different?
4. Is the branch small enough to finish?

---

# Lesson 10: Art, Animation, And Mood

## Purpose

Students add visual consistency and simple animation.

## Required Polish

Choose at least two:

1. Animated player idle/walk.
2. Highlight on interactable objects.
3. Background detail.
4. Sound cue for interaction.
5. Colour palette matching mood.

## Feedback Questions

1. Does the art support the story?
2. Can interactable objects be identified?
3. Does animation improve clarity?
4. Are assets credited?

---

# Lesson 11: Playtesting For Comprehension

## Purpose

Students test whether the story and interactions are understandable.

## Playtest Questions

```text
What do you think the story is?
What is your goal?
Where did you try to go first?
Which objects seemed interactive?
Did you understand the dialogue?
Did you understand the ending?
What confused you?
```

## Revision Focus

1. Unclear objective.
2. Hidden interactables.
3. Dialogue too long.
4. Ending unexplained.
5. Bugs.

---

# Lesson 12: Playtesting For Systems

## Purpose

Students test variables, conditions, and endings.

## Test Cases

| Test | Expected Result |
|---|---|
| Finish with 0 clues | Partial/failure ending |
| Finish with all clues | Success ending |
| Interact twice with same object | Should not unfairly duplicate progress unless intended |
| Walk away during prompt | Prompt should clear or remain sensible |

## Feedback Questions

1. Did the game remember correctly?
2. Can players exploit the system?
3. Are endings reliable?
4. What bug must be fixed first?

---

# Lesson 13: Story/Game Design Document

## Required Documentation

1. Synopsis.
2. Story arc.
3. Character cards.
4. Environment map.
5. UI wireframe.
6. Interaction list.
7. Outcome map.
8. Asset credits.
9. Playtest notes.
10. Reflection.

## Outcome Map Template

```text
Start:
Required interactions:
Choice or condition:
Outcome 1:
Outcome 2:
Feedback shown to player:
```

---

# Lesson 14: Showcase And Reflection

## Reflection Prompts

```text
My story is about:
The player role is:
The player changes the story by:
The game remembers:
The two outcomes are:
One UI improvement from testing was:
One system bug I fixed was:
One Studio Level 4: Developer skill I want next is:
```

---

# Final Assessment Rubric

| Area | 4 - Strong | 3 - Secure | 2 - Developing | 1 - Beginning |
|---|---|---|---|---|
| Story concept | Clear, suitable, playable story | Mostly clear | Partly clear | Unclear |
| Character/environment | Strong fit between role, setting, and visuals | Mostly fitting | Some fit | Weak/missing |
| Interaction | 3+ clear interactions with feedback | Mostly clear | Inconsistent | Missing |
| Systems | Variables/conditions create outcomes reliably | Mostly reliable | Some issues | Not working |
| UI | Dialogue/objectives readable and helpful | Mostly clear | Some confusion | Missing |
| Outcomes | Two outcomes caused by player action | Mostly clear | Weak connection | Missing |
| Playtesting | Strong comprehension and system testing | Some testing | Limited | None |
| Documentation | Complete story/GDD packet | Mostly complete | Incomplete | Minimal |

## Minimum Completion Definition

A Studio Level 3: Designer project is complete when:

1. It has a playable short story or quest.
2. It includes at least 3 interactions.
3. It tracks progress with a variable.
4. It has at least 2 outcomes.
5. It includes clear UI prompts/dialogue.
6. It has story and system playtest evidence.


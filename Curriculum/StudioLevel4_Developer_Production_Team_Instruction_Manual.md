# Studio Level 4: Developer - Production Team Instruction Manual

## Purpose

This manual prepares students for CAPE-style production without making the club feel like an exam class. Students work in small teams to produce a polished three-level 2D game with title screen, instructions, scoring/lives, win/lose states, sound, animation, playtesting, and a junior production bible.

The final product is a three-level 2D game in Godot.

## Module Identity

| Item | Description |
|---|---|
| Studio level | Studio Level 4: Developer |
| Module name | Production Team |
| Recommended length | 16 lessons plus showcase |
| Session length | 60-90 minutes |
| Engine | Godot, 2D |
| Main project | Three-level 2D game |
| Production style | Team-based studio project |
| CAPE bridge | Direct preparation for Unit 1 Production Bible and Unit 2 2D game expectations |

## Spiral Progression

| Studio Level 3: Designer | Studio Level 4: Developer |
|---|---|
| Narrative/system prototype | Team-built three-level game |
| Interactions and outcomes | Complete loop and progression |
| Basic documentation | Junior Production Bible |
| Simple UI | Full title, help, HUD, pause/restart, end screens |
| Playtest comprehension | Playtest balance, usability, bugs, audience |

## CAPE Alignment Summary

| CAPE Area | Studio Level 4: Developer Treatment |
|---|---|
| Unit 1 Module 1 | Production pipeline, pitch, SWOT, tools, roles, ethics, IP |
| Unit 1 Module 2 | Three-level design, concept art, layout, Caribbean/cultural relevance |
| Unit 1 Module 3 | Production Bible, synopsis, storyboard, character/environment assets |
| Unit 2 Module 1 | UI, interaction design, demographics, pitch, ethical business practice |
| Unit 2 Module 2 | Three-level game, mechanics, goals, camera views, constraints |
| Unit 2 Module 3 | Animated assets, sound, 2D movement, polish |

## Final Game Specification

| Feature | Requirement |
|---|---|
| Three levels | Each level increases challenge or complexity |
| Title/help | Opening screen and instructions |
| Player | Tuned movement and clear controls |
| Mechanics | At least two mechanics beyond movement |
| Scoring/progress | Score, lives, timer, inventory, or objectives |
| Hazards/enemies | Clear and fair challenge |
| UI | HUD plus win/lose/end screens |
| Animation/sound | At least one animation and two sound cues |
| Team documentation | Junior Production Bible |
| Playtesting | At least three documented test cycles |
| Pitch | 3-minute team pitch/demo |

## Team Roles

| Role | Responsibility |
|---|---|
| Producer | Schedule, checklist, scope control |
| Designer | Mechanics, rules, levels, player experience |
| Programmer | Godot scripts and debugging |
| Artist/animator | Visual assets, layout, animation |
| Sound/UI designer | Sound, HUD, menus, readability |
| Tester/documenter | Playtest sheets, bug list, credits |

Students may hold multiple roles, but every team needs named responsibilities.

---

# Lesson 1: CAPE-Style Production Overview

## Purpose

Students understand the project pipeline: concept, pre-production, production, testing, polish, pitch.

## Learning Outcomes

Students can:

1. Explain production stages.
2. Identify team roles.
3. Define project scope.
4. Understand why documentation matters.

## Activity: Production Pipeline Sort

Students sort tasks into:

| Stage | Tasks |
|---|---|
| Pre-production | concept, synopsis, level sketches, asset list |
| Production | Godot build, art, sound, UI |
| Testing | playtest, bug logs, balance |
| Post-production | polish, export, pitch, reflection |

## Feedback Questions

1. What must be planned before building?
2. What can be prototyped quickly?
3. What is risky?
4. What should be cut if time is short?

---

# Lesson 2: Team Concept And Scope

## Purpose

Teams choose a three-level concept that can be completed.

## Concept Sheet

```text
Title:
Genre:
Target audience:
Core experience:
Main mechanic:
Secondary mechanic:
Level 1:
Level 2:
Level 3:
Win condition:
Lose condition:
Unique hook:
Scope risks:
```

## Scope Rule

The game must be explainable as:

```text
The player must [main verb] [object/goal] while [challenge], across three levels.
```

## Feedback Questions

1. Is the core loop clear?
2. Can this be built with current Godot skills?
3. Does each level add something?
4. What is the smallest playable version?

---

# Lesson 3: Junior Production Bible Setup

## Purpose

Teams begin a living document that will grow throughout production.

## Production Bible Sections

1. Project aims.
2. Synopsis/game summary.
3. Target audience/demographics.
4. Competitive advantage/hook.
5. Character descriptions.
6. Environment descriptions.
7. Mechanics and controls.
8. Level designs.
9. UI wireframes.
10. Asset list.
11. Production schedule.
12. Risk/SWOT.
13. Playtest evidence.
14. Credits.
15. Reflection.

## SWOT Starter

| Category | Prompt |
|---|---|
| Strengths | What is already working? |
| Weaknesses | What might be hard for us? |
| Opportunities | What makes the idea interesting? |
| Threats | What could stop us finishing? |

---

# Lesson 4: Mechanics And Core Loop

## Purpose

Teams define and prototype the core loop before building all levels.

## Core Loop Template

```text
Player sees:
Player does:
Game responds:
Progress changes:
Challenge increases:
Loop repeats:
```

## Practical Task

Build a greybox prototype using simple shapes only:

1. Player.
2. Objective.
3. Hazard/enemy.
4. Score/progress.
5. End condition.

## Feedback Questions

1. Is the game fun before art is added?
2. Is the loop understandable?
3. What mechanic creates the most interest?
4. What is unnecessary?

---

# Lesson 5: Level Progression Design

## Purpose

Teams design three levels with planned progression.

## Level Progression Table

| Level | Teaches/Adds | Challenge | Player Goal | New Element |
|---|---|---|---|---|
| 1 | Basic controls | Low | Learn loop | Main mechanic |
| 2 | More pressure | Medium | Apply loop | Moving hazard/timer |
| 3 | Mastery | High | Win game | Combined challenge |

## Feedback Questions

1. Does Level 1 teach?
2. Does Level 2 deepen?
3. Does Level 3 test mastery?
4. Is the difficulty curve fair?

---

# Lesson 6: Reusable Godot Architecture

## Purpose

Teams organize Godot projects for a larger game.

## Recommended Structure

```text
scenes/
  screens/
  levels/
  actors/
  objects/
scripts/
assets/
  sprites/
  audio/
docs/
```

## Reusable Scenes

1. Player.
2. Collectible/objective.
3. Hazard/enemy.
4. Level exit.
5. HUD.

## Feedback Questions

1. Which scenes are reused?
2. Which scripts belong to objects?
3. Are file names understandable?
4. Can another teammate find assets?

---

# Lesson 7: Player, Camera, And Controls

## Purpose

Teams finalize movement and camera style.

## Camera Options

| View | Best For |
|---|---|
| Static | One-screen arcade |
| Scrollable | Larger levels |
| Top-down | Maze/adventure |
| Side-view | Platform style |

## Feedback Questions

1. Does the camera fit the genre?
2. Are controls responsive?
3. Does the player ever get lost?
4. Is the view readable?

---

# Lesson 8: UI, HUD, And Help Screens

## Purpose

Teams build title/help/HUD/end screens.

## Required Screens

1. Title.
2. Help/instructions.
3. Level gameplay HUD.
4. Pause or restart prompt.
5. Win.
6. Lose.

## UI Checklist

| Item | Done |
|---|---|
| Controls explained | |
| Score/progress shown | |
| Lives/time/objective shown | |
| Text readable | |
| UI does not block play | |
| End states clear | |

---

# Lesson 9: Sound And Animation Production

## Purpose

Teams add audio and animation deliberately.

## Required Feedback Cues

1. Success cue.
2. Danger/damage cue.
3. Win or lose cue.

## Animation Options

1. Player idle/walk.
2. Collectible shine/pulse.
3. Hazard movement.
4. UI transition.

## Feedback Questions

1. Does feedback match the action?
2. Is sound balanced?
3. Is animation readable?
4. Are assets credited?

---

# Lesson 10: Playtest 1 - Core Loop

## Focus

1. Can players start?
2. Do they understand the goal?
3. Is the main mechanic fun?
4. Does Level 1 work?

## Output

Bug list and one design revision.

---

# Lesson 11: Playtest 2 - Difficulty And Progression

## Focus

1. Are Levels 1-3 in the right order?
2. Is difficulty fair?
3. Are win/lose states reliable?
4. Does UI support the player?

## Output

Balance changes and revised level plan.

---

# Lesson 12: Playtest 3 - Polish And Audience

## Focus

1. Target audience suitability.
2. Visual clarity.
3. Sound/animation feedback.
4. Final bugs.
5. Pitch readiness.

## Output

Final polish list.

---

# Lesson 13: Production Bible Completion

## Required Evidence

1. Current game screenshots.
2. Level sketches.
3. Playtest notes.
4. Bug list.
5. Asset credits.
6. Schedule updates.
7. Reflection on changes.

## Feedback Questions

1. Does documentation match the final game?
2. Are changes explained?
3. Are assets credited?
4. Is the production story clear?

---

# Lesson 14: Pitch Deck

## Pitch Structure

```text
1. Title and hook
2. Target audience
3. Gameplay summary
4. Character/environment
5. Three-level progression
6. Main mechanics
7. Demo
8. Playtest improvement
9. Credits/team roles
```

## Feedback Questions

1. Is the pitch persuasive?
2. Is the demo ready?
3. Can each team member speak?
4. Does the pitch mention iteration?

---

# Lesson 15: Final Build And Export

## Purpose

Teams prepare final playable build.

## Checklist

| Item | Done |
|---|---|
| Correct main scene | |
| No missing assets | |
| All levels reachable | |
| Win state works | |
| Lose state works | |
| Credits included | |
| Export/tested if possible | |

---

# Lesson 16: Showcase And Reflection

## Reflection Prompts

```text
My role was:
Our core loop was:
Our biggest design change was:
Our hardest bug was:
Our strongest level was:
Our playtest evidence showed:
If preparing for CAPE, I would improve:
```

---

# Final Assessment Rubric

| Area | 4 - Strong | 3 - Secure | 2 - Developing | 1 - Beginning |
|---|---|---|---|---|
| Concept and audience | Clear, suitable, compelling | Mostly clear | Partly clear | Unclear |
| Three-level design | Strong progression and fairness | Mostly clear | Weak progression | Missing |
| Mechanics | Multiple mechanics integrated well | Mostly working | Some working | Minimal |
| UI and feedback | Complete, readable, helpful | Mostly clear | Inconsistent | Missing |
| Animation/sound | Purposeful and credited | Present | Limited | Missing |
| Technical stability | Full playable flow | Minor issues | Major issues | Not playable |
| Production Bible | Complete and reflective | Mostly complete | Incomplete | Minimal |
| Playtesting | 3 cycles with revisions | Some revisions | Limited | None |
| Pitch | Clear team pitch and demo | Mostly clear | Limited | Missing |
| Collaboration | Roles clear and productive | Mostly productive | Uneven | Problematic |

## Minimum Completion Definition

A Studio Level 4: Developer project is complete when:

1. It has three playable levels.
2. It has title/help/HUD/end screens.
3. It includes score/progress and win/lose states.
4. It includes animation and sound feedback.
5. It has a junior Production Bible.
6. It has documented playtesting and revision.


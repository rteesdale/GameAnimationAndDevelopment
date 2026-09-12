# Game Animation & Development Studio: Scaffolding Research Sources

## Purpose

This document records useful sources that informed the early structure of the Game Animation & Development Studio, especially the decision to use Godot 2D with a starter-project and broken/fix-it teaching model.

These sources should be treated as reference points for planning, not as a fixed syllabus.

## Core Planning Takeaways

- Use Godot as the core engine, especially for 2D work.
- Avoid starting beginners from a blank project too early.
- Use starter projects, broken/fix-it tasks, and small modifications.
- Prioritize quick playable wins.
- Separate the skills students are learning: game design, programming logic, Godot engine use, art/assets, testing, and documentation.
- Use Wednesday sessions for feedback, user experience observation, critique, community, and next-step direction.
- Use Google Classroom for tutorials, concept lessons, resources, and slower problem solving.
- Rotate roles when students share laptops so non-drivers stay active.

## Godot Official Sources

### Godot Documentation

Link: https://docs.godotengine.org/en/stable/

Useful because:

- Godot's official documentation separates learners by readiness, including students who have never made a game before.
- The documentation supports both online and offline use.
- It reinforces that Godot is a full 2D and 3D game engine, so beginners need careful scaffolding.

Planning implication:

- Use Godot, but do not expect beginners to discover the workflow independently.
- Keep local/offline documentation available for students and teacher reference.

### Godot First 2D Game

Link: https://docs.godotengine.org/en/stable/getting_started/first_2d_game/

Useful because:

- It provides an official beginner pathway for a complete small 2D game.
- It supports the decision to begin with 2D rather than 3D.

Planning implication:

- Use the official first 2D game structure as a reference, but adapt it into smaller club-friendly chunks and starter projects.

### Godot System Requirements

Link: https://docs.godotengine.org/en/stable/about/system_requirements.html

Useful because:

- It gives a reasonable technical baseline for student laptops.
- It supports a laptop-readiness question in the student interest form.

Planning implication:

- Ask students whether they have a laptop that can run Godot for 2D work.
- Recommend a reasonably modern laptop, ideally with around 8 GB RAM for editor work.

## Godot Reddit And Community Discussions

### Teaching Godot To Students / Kids

Link: https://www.reddit.com/r/godot/comments/1htv64y/thought_on_how_to_approach_irl_teaching_godot_to/

Useful because:

- Discussion emphasized that Godot is powerful but can overwhelm beginners.
- Commenters suggested starting with an existing working project and having students modify it.
- Examples included changing movement, jump distance, enemy behavior, gravity, or level layout.
- This supports a quick-win, modify-first approach.

Planning implication:

- First student tasks should be "change this and explain what changed" rather than "make a game from scratch."
- Use broken/fix-it tasks in the first few weeks.

### Godot As A Programming Teaching Tool For Kids

Link: https://www.reddit.com/r/godot/comments/1lulbww/godot_as_a_programming_teaching_tool_for_kids/

Useful because:

- Discussion framed Godot learning as several overlapping skills: coding, engine APIs, game design, and project management.
- This helps avoid treating "learn Godot" as one simple objective.

Planning implication:

- Explicitly separate learning goals:
  - game design concepts
  - programming logic
  - Godot editor use
  - assets and animation
  - testing and feedback

### Game Development For Kids

Link: https://www.reddit.com/r/godot/comments/1gi8asf/game_development_for_kids/

Useful because:

- Discussion reinforced the need for visible feedback and age-appropriate scaffolding.
- It also highlighted the tension between beginner-friendly tools and students wanting something that feels serious.

Planning implication:

- Godot can remain the main tool, while simpler visual tools can be optional support rather than the public identity of the club.
- Prioritize visible outcomes: movement, collision, score, animation, sound, feedback, and UI changes.

## Classroom And Tutorial Sources

### KidsCanCode: Godot In The Classroom

Link: https://kidscancode.org/blog/2017/11/godot_classroom_1/

Useful because:

- A classroom reflection noted that file management and project organization can be more frustrating than the programming itself.
- This is especially relevant for a lunchtime club where lost files can destroy momentum.

Planning implication:

- Treat project folders, saving, naming, and bringing work back as explicit early skills.
- The first weeks should include a project folder routine.

### KidsCanCode Godot Recipes

Link: https://kidscancode.org/godot_recipes/

Useful because:

- Provides small, focused Godot examples and recipes.
- Good for teacher preparation and possible extension challenges.

Planning implication:

- Use as a source for bite-sized Google Classroom tutorials or extension quests.

## Engine Comparison Sources

### Unity Manual

Link: https://docs.unity3d.com/Manual/index.html

Useful because:

- Shows Unity's breadth: 2D, 3D, packages, rendering, scripting, UI, services, multiplayer, and platform development.
- Confirms Unity is powerful but likely too broad for the club's initial 30-minute check-in structure.

Planning implication:

- Unity can be referenced as an industry engine, but should not be the first core pathway unless a later advanced group specifically needs it.

### Unity System Requirements

Link: https://docs.unity3d.com/Manual/system-requirements.html

Useful because:

- Helps compare hardware and setup friction with Godot.

Planning implication:

- Unity may be more appropriate for advanced independent work than for the first shared club pathway.

### Roblox Creator Hub Education

Link: https://create.roblox.com/docs/education

Useful because:

- Roblox provides education content and has strong student familiarity.
- It may be motivating for some students.

Planning implication:

- Roblox could work as an extension lane, but should not replace the Godot 2D core pathway at the initial stage.
- It introduces account, platform, social, and classroom-management issues that may complicate the club.

### Roblox Hardware Requirements

Link: https://en.help.roblox.com/hc/en-us/articles/203312800-Computer-Hardware-Operating-System-Requirements

Useful because:

- Provides official hardware/OS information for Roblox.

Planning implication:

- Keep Roblox as an optional pathway only if school account and access issues are manageable.

## Research And Engagement Sources

### Game Development-Based Learning Experience

Link: https://arxiv.org/abs/1805.04457

Useful because:

- Supports the idea that game development can motivate students through creation, sharing, identity, and community.
- Reinforces the value of public sharing and peer review.

Planning implication:

- Keep Wednesday sessions as community-building and feedback moments.
- Include showcases and WIP reviews throughout the year.

### Pair Programming And Engagement

Link: https://www.wired.com/2013/07/programming-game-engagement/

Useful because:

- Discusses engagement differences in paired programming roles.
- Supports the need to rotate roles so one student does not become a passive observer.

Planning implication:

- Laptop-sharing groups need defined rotating roles:
  - driver
  - navigator
  - tester
  - designer/documenter

## Ideas To Explore For Initial Stages

### Starter Project Pack

Create 2-3 tiny Godot starter projects:

1. Movement Playground.
2. Broken Collector.
3. Broken Hazard/Dodge Game.
4. Optional Story Interaction Demo.

### Broken/Fix-It Challenge Types

- Player is too slow.
- Player moves off screen.
- Collectible gives no visible feedback.
- Score does not update clearly.
- Hazard is unfair.
- Objective is unclear.
- UI text does not explain the goal.
- Level path is confusing.
- Sound or animation feedback is missing.

### First Weeks Design Principle

The first visible student task should be:

> Change a game and explain how the player experience changed.

Not:

> Build a full game from scratch.


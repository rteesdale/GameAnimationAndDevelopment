(() => {
  "use strict";

  // Cache the HTML elements once. Repeated document searches inside the game
  // loop would waste work because these elements never change identity.
  const canvas = document.querySelector("#gameCanvas");
  const context = canvas.getContext("2d");
  const startPanel = document.querySelector("#startPanel");
  const resultPanel = document.querySelector("#resultPanel");
  const pausePanel = document.querySelector("#pausePanel");
  const startButton = document.querySelector("#startButton");
  const restartButton = document.querySelector("#restartButton");
  const editorButton = document.querySelector("#editorButton");
  const pauseButton = document.querySelector("#pauseButton");
  const muteButton = document.querySelector("#muteButton");
  const stateLabel = document.querySelector("#stateLabel");
  const attemptLabel = document.querySelector("#attemptLabel");
  const progressFill = document.querySelector("#progressFill");
  const progressLabel = document.querySelector("#progressLabel");
  const resultEyebrow = document.querySelector("#resultEyebrow");
  const resultTitle = document.querySelector("#resultTitle");
  const resultMessage = document.querySelector("#resultMessage");
  const liveStatus = document.querySelector("#liveStatus");
  const editorPanel = document.querySelector("#editorPanel");
  const addSpikeButton = document.querySelector("#addSpikeButton");
  const addBlockButton = document.querySelector("#addBlockButton");
  const addPlatformButton = document.querySelector("#addPlatformButton");
  const duplicateObjectButton = document.querySelector("#duplicateObjectButton");
  const evenSpikeSpacingButton = document.querySelector("#evenSpikeSpacingButton");
  const deleteObjectButton = document.querySelector("#deleteObjectButton");
  const objectList = document.querySelector("#objectList");
  const objectTypeInput = document.querySelector("#objectTypeInput");
  const objectXInput = document.querySelector("#objectXInput");
  const objectYInput = document.querySelector("#objectYInput");
  const objectWidthInput = document.querySelector("#objectWidthInput");
  const objectHeightInput = document.querySelector("#objectHeightInput");
  const deadlyInput = document.querySelector("#deadlyInput");
  const solidInput = document.querySelector("#solidInput");
  const canLandOnInput = document.querySelector("#canLandOnInput");
  const deadlySidesInput = document.querySelector("#deadlySidesInput");
  const editorTimeline = document.querySelector("#editorTimeline");
  const exportLevelButton = document.querySelector("#exportLevelButton");
  const importLevelButton = document.querySelector("#importLevelButton");
  const levelJsonInput = document.querySelector("#levelJsonInput");

  // The game uses one logical 960 x 540 coordinate system. CSS may make the
  // Canvas look larger or smaller, but game positions keep these same values.
  const VIEW = { width: 960, height: 540, groundY: 430 };

  // Physics values use logical pixels and seconds. A negative vertical speed
  // moves upward because Canvas y coordinates increase toward the bottom.
  const PLAYER = { x: 152, size: 42, gravity: 3000, jumpSpeed: 950 };

  // Level data is loaded by js/levels.js. The fallback keeps the error obvious
  // if the scripts are accidentally reordered or the file is missing.
  const level = window.PULSE_RUN_LEVEL || {
    id: "missing-level",
    name: "Missing Level",
    end: 0,
    speed: 0,
    objects: []
  };

  // Keeping the palette in one object prevents colour values from being
  // scattered throughout all the drawing functions.
  const COLORS = {
    ink: "#131315",
    paper: "#f4f1e8",
    cyan: "#45d9e8",
    coral: "#ff5b57",
    yellow: "#ffcc33",
    green: "#82dc73",
    violet: "#8075ff"
  };

  const DEFAULT_OBJECTS = {
    spike: {
      width: 44,
      height: 48,
      behavior: { deadly: true, solid: false, canLandOn: false, deadlySides: false }
    },
    block: {
      width: 86,
      height: 72,
      behavior: { deadly: false, solid: true, canLandOn: true, deadlySides: true }
    },
    platform: {
      width: 150,
      height: 28,
      behavior: { deadly: false, solid: true, canLandOn: true, deadlySides: false }
    }
  };
  const NEAR_SPIKE_GAP = 140;

  // This object contains every value that changes while the game runs.
  // Keeping mutable values together makes reset, pause, and restart predictable.
  const state = {
    mode: "ready",
    distance: 0,
    attempt: 1,
    lastTime: 0,
    debug: false,
    editorMode: false,
    selectedObjectId: null,
    draggingTimelineId: null,
    muted: false,
    player: {
      y: VIEW.groundY - PLAYER.size,
      velocityY: 0,
      rotation: 0,
      grounded: true
    }
  };

  // Browsers require a user action before creating or resuming game audio.
  // The context therefore begins as null and is created by Start or Jump.
  let audioContext = null;

  // Create the Web Audio context only when the player has interacted.
  function ensureAudio() {
    if (!audioContext) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) audioContext = new AudioContext();
    }
    if (audioContext?.state === "suspended") audioContext.resume();
  }

  // Generate a short sound in code. This keeps the project fully offline and
  // avoids loading audio files while students study the core systems.
  function playTone(frequency, duration, type = "square", volume = 0.04) {
    if (state.muted || !audioContext) return;
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const now = audioContext.currentTime;

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, now);
    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start(now);
    oscillator.stop(now + duration);
  }

  // Put the player and level distance back at their starting values.
  function resetPlayer() {
    state.distance = 0;
    state.player.y = VIEW.groundY - PLAYER.size;
    state.player.velocityY = 0;
    state.player.rotation = 0;
    state.player.grounded = true;
    updateHud();
  }

  // Begin a new attempt and synchronize the visible interface with game state.
  function startRun() {
    if (state.editorMode) toggleEditorMode();
    ensureAudio();
    resetPlayer();
    state.mode = "playing";
    state.lastTime = performance.now();
    startPanel.hidden = true;
    resultPanel.hidden = true;
    pausePanel.hidden = true;
    pauseButton.disabled = false;
    pauseButton.textContent = "Pause";
    pauseButton.setAttribute("aria-label", "Pause game");
    stateLabel.textContent = "Running";
    liveStatus.textContent = `Attempt ${state.attempt} started.`;
    canvas.focus();
    playTone(440, 0.08, "square", 0.035);
  }

  function currentModeLabel() {
    if (state.mode === "playing") return "Running";
    if (state.mode === "paused") return "Paused";
    if (state.mode === "won") return "Complete";
    if (state.mode === "lost") return "Crashed";
    return "Ready";
  }

  function defaultBehavior(type) {
    return { ...DEFAULT_OBJECTS[type].behavior };
  }

  function objectBehavior(object) {
    return { ...defaultBehavior(object.type), ...(object.behavior || {}) };
  }

  function nextObjectId(type) {
    const prefix = DEFAULT_OBJECTS[type] ? type : "spike";
    let index = 1;
    let id = `${prefix}-${String(index).padStart(3, "0")}`;
    while (level.objects.some((object) => object.id === id)) {
      index += 1;
      id = `${prefix}-${String(index).padStart(3, "0")}`;
    }
    return id;
  }

  function clampNumber(value, min, max) {
    const number = Number(value);
    if (!Number.isFinite(number)) return min;
    return Math.min(max, Math.max(min, number));
  }

  function defaultObjectY(type, height) {
    if (type === "spike") return VIEW.groundY - height;
    if (type === "platform") return VIEW.groundY - 150;
    return VIEW.groundY - height;
  }

  function maxObjectY(height) {
    return Math.max(0, VIEW.groundY - height);
  }

  function normalizeObject(object, fallbackType = "spike") {
    const type = DEFAULT_OBJECTS[object?.type] ? object.type : fallbackType;
    const defaults = DEFAULT_OBJECTS[type];
    const height = clampNumber(object?.height ?? defaults.height, 20, 240);
    return {
      id: typeof object?.id === "string" && object.id ? object.id : nextObjectId(type),
      type,
      x: clampNumber(object?.x, 0, Math.max(level.end, 1)),
      width: clampNumber(object?.width ?? defaults.width, 20, 400),
      height,
      y: clampNumber(object?.y ?? defaultObjectY(type, height), 0, maxObjectY(height)),
      behavior: { ...defaultBehavior(type), ...(object?.behavior || {}) }
    };
  }

  function isSolidPlatformObject(object) {
    return object.type === "block" || object.type === "platform";
  }

  function selectedObject() {
    return level.objects.find((object) => object.id === state.selectedObjectId) || null;
  }

  function ensureSelection() {
    if (!selectedObject() && level.objects.length > 0) {
      state.selectedObjectId = level.objects[0].id;
    }
  }

  function syncStatePanels() {
    if (state.editorMode) {
      startPanel.hidden = true;
      resultPanel.hidden = true;
      pausePanel.hidden = true;
      return;
    }

    startPanel.hidden = state.mode !== "ready";
    resultPanel.hidden = state.mode !== "lost" && state.mode !== "won";
    pausePanel.hidden = state.mode !== "paused";
  }

  // Stop gameplay, show the correct result panel, and play result feedback.
  function endRun(won) {
    state.mode = won ? "won" : "lost";
    pauseButton.disabled = true;
    stateLabel.textContent = won ? "Complete" : "Crashed";
    resultEyebrow.textContent = won ? "Level complete" : "Run ended";
    resultTitle.textContent = won ? "Circuit cleared" : "Try again";
    resultMessage.textContent = won
      ? `First Circuit cleared on attempt ${state.attempt}.`
      : "Watch the obstacle and jump a little earlier.";
    restartButton.textContent = won ? "Run again" : "Restart";
    resultPanel.hidden = false;
    liveStatus.textContent = won ? "Level complete." : "Collision. Press Space to restart.";

    if (won) {
      playTone(660, 0.15, "triangle", 0.05);
      window.setTimeout(() => playTone(880, 0.2, "triangle", 0.05), 120);
    } else {
      playTone(110, 0.24, "sawtooth", 0.05);
    }
  }

  // Count a new attempt before using the same start routine again.
  function restartRun() {
    state.attempt += 1;
    attemptLabel.textContent = `Attempt ${state.attempt}`;
    startRun();
  }

  // Pausing changes the mode. The animation loop still draws, but update()
  // stops changing positions until the player resumes.
  function togglePause() {
    if (state.mode === "playing") {
      state.mode = "paused";
      pausePanel.hidden = false;
      pauseButton.textContent = "Resume";
      pauseButton.setAttribute("aria-label", "Resume game");
      stateLabel.textContent = "Paused";
      liveStatus.textContent = "Game paused.";
    } else if (state.mode === "paused") {
      state.mode = "playing";
      state.lastTime = performance.now();
      pausePanel.hidden = true;
      pauseButton.textContent = "Pause";
      pauseButton.setAttribute("aria-label", "Pause game");
      stateLabel.textContent = "Running";
      liveStatus.textContent = "Game resumed.";
    }
  }

  // Editor mode freezes motion and shows collision boxes so level objects can
  // be inspected before property controls are added.
  function toggleEditorMode() {
    state.editorMode = !state.editorMode;
    editorButton.setAttribute("aria-pressed", String(state.editorMode));
    editorButton.setAttribute("aria-label", state.editorMode ? "Exit editor mode" : "Enter editor mode");
    editorPanel.hidden = !state.editorMode;

    if (state.editorMode) {
      state.debug = true;
      if (state.mode === "playing") togglePause();
      ensureSelection();
      syncStatePanels();
      renderEditor();
      stateLabel.textContent = "Editing";
      liveStatus.textContent = "Editor mode on. Level objects are paused and hitboxes are shown.";
    } else {
      state.debug = false;
      syncStatePanels();
      stateLabel.textContent = currentModeLabel();
      liveStatus.textContent = "Editor mode off.";
    }
  }

  function objectLabel(object, index) {
    return `${index + 1}. ${object.type} at ${Math.round(object.x)}, ${Math.round(object.y)}`;
  }

  function renderObjectList() {
    objectList.replaceChildren();
    level.objects.forEach((object, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "object-row";
      button.textContent = objectLabel(object, index);
      button.setAttribute("role", "option");
      button.setAttribute("aria-selected", String(object.id === state.selectedObjectId));
      button.addEventListener("click", () => {
        state.selectedObjectId = object.id;
        renderEditor();
      });
      objectList.append(button);
    });
  }

  function setPropertyControlsDisabled(disabled) {
    [
      objectTypeInput,
      objectXInput,
      objectYInput,
      objectWidthInput,
      objectHeightInput,
      deadlyInput,
      solidInput,
      canLandOnInput,
      deadlySidesInput,
      duplicateObjectButton,
      evenSpikeSpacingButton,
      deleteObjectButton
    ].forEach((control) => {
      control.disabled = disabled;
    });
  }

  function renderPropertyControls() {
    const object = selectedObject();
    setPropertyControlsDisabled(!object);
    if (!object) return;

    const behavior = objectBehavior(object);
    evenSpikeSpacingButton.disabled = object.type !== "spike";
    objectTypeInput.value = object.type;
    objectXInput.value = Math.round(object.x);
    objectXInput.max = Math.max(level.end, 1);
    objectYInput.value = Math.round(object.y);
    objectYInput.max = maxObjectY(object.height);
    objectWidthInput.value = Math.round(object.width);
    objectHeightInput.value = Math.round(object.height);
    deadlyInput.checked = Boolean(behavior.deadly);
    solidInput.checked = Boolean(behavior.solid);
    canLandOnInput.checked = Boolean(behavior.canLandOn);
    deadlySidesInput.checked = Boolean(behavior.deadlySides);
  }

  function renderTimeline() {
    editorTimeline.replaceChildren();
    level.objects.forEach((object) => {
      const marker = document.createElement("button");
      marker.type = "button";
      marker.className = "timeline-marker";
      marker.textContent = object.type === "spike" ? "S" : object.type === "platform" ? "P" : "B";
      marker.style.left = `${level.end > 0 ? (object.x / level.end) * 100 : 0}%`;
      marker.dataset.objectId = object.id;
      marker.dataset.type = object.type;
      marker.setAttribute("aria-label", `${object.type} at ${Math.round(object.x)}`);
      marker.setAttribute("aria-selected", String(object.id === state.selectedObjectId));
      marker.addEventListener("click", () => {
        state.selectedObjectId = object.id;
        renderEditor();
      });
      marker.addEventListener("keydown", (event) => {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        state.selectedObjectId = object.id;
        moveSelectedObject(event.key === "ArrowRight" ? 10 : -10);
      });
      editorTimeline.append(marker);
    });
  }

  function renderEditor() {
    ensureSelection();
    renderObjectList();
    renderPropertyControls();
    renderTimeline();
  }

  function updateSelectedObject(updates) {
    const object = selectedObject();
    if (!object) return;
    Object.assign(object, updates);
    object.x = clampNumber(object.x, 0, Math.max(level.end, 1));
    object.width = clampNumber(object.width, 20, 400);
    object.height = clampNumber(object.height, 20, 240);
    object.y = clampNumber(object.y, 0, maxObjectY(object.height));
    object.behavior = { ...defaultBehavior(object.type), ...(object.behavior || {}) };
    renderEditor();
  }

  function addObject(type) {
    const defaults = DEFAULT_OBJECTS[type];
    const object = normalizeObject({
      id: nextObjectId(type),
      type,
      x: Math.min(level.end - defaults.width, Math.max(120, Math.round(state.distance + 600))),
      y: defaultObjectY(type, defaults.height),
      width: defaults.width,
      height: defaults.height,
      behavior: defaultBehavior(type)
    }, type);
    level.objects.push(object);
    state.selectedObjectId = object.id;
    renderEditor();
    liveStatus.textContent = `${type} added.`;
  }

  function duplicateSelectedObject() {
    const object = selectedObject();
    if (!object) return;
    const duplicate = normalizeObject({
      ...object,
      id: nextObjectId(object.type),
      x: Math.min(level.end - object.width, object.x + 80),
      behavior: { ...objectBehavior(object) }
    }, object.type);
    level.objects.push(duplicate);
    state.selectedObjectId = duplicate.id;
    renderEditor();
    liveStatus.textContent = "Object duplicated.";
  }

  function deleteSelectedObject() {
    const index = level.objects.findIndex((object) => object.id === state.selectedObjectId);
    if (index === -1) return;
    level.objects.splice(index, 1);
    state.selectedObjectId = level.objects[Math.min(index, level.objects.length - 1)]?.id || null;
    renderEditor();
    liveStatus.textContent = "Object deleted.";
  }

  function findNearbySpikeCluster(selectedSpike) {
    const spikes = level.objects
      .filter((object) => object.type === "spike")
      .sort((a, b) => a.x - b.x);
    const selectedIndex = spikes.findIndex((object) => object.id === selectedSpike.id);
    if (selectedIndex === -1) return [];

    let startIndex = selectedIndex;
    while (startIndex > 0) {
      const previous = spikes[startIndex - 1];
      const current = spikes[startIndex];
      const gap = current.x - (previous.x + previous.width);
      if (gap > NEAR_SPIKE_GAP) break;
      startIndex -= 1;
    }

    let endIndex = selectedIndex;
    while (endIndex < spikes.length - 1) {
      const current = spikes[endIndex];
      const next = spikes[endIndex + 1];
      const gap = next.x - (current.x + current.width);
      if (gap > NEAR_SPIKE_GAP) break;
      endIndex += 1;
    }

    return spikes.slice(startIndex, endIndex + 1);
  }

  function evenSpikeSpacing() {
    const object = selectedObject();
    if (!object || object.type !== "spike") {
      liveStatus.textContent = "Select a spike before evening nearby spike spacing.";
      return;
    }

    const cluster = findNearbySpikeCluster(object);
    if (cluster.length < 2) {
      liveStatus.textContent = "Select a spike near at least one other spike.";
      return;
    }

    const firstX = cluster[0].x;
    const last = cluster[cluster.length - 1];
    const clusterEnd = last.x + last.width;
    const totalSpikeWidth = cluster.reduce((total, spike) => total + spike.width, 0);
    const evenGap = Math.max(0, (clusterEnd - firstX - totalSpikeWidth) / (cluster.length - 1));
    let nextX = firstX + cluster[0].width + evenGap;
    for (let index = 1; index < cluster.length - 1; index += 1) {
      cluster[index].x = Math.round(nextX / 10) * 10;
      nextX = cluster[index].x + cluster[index].width + evenGap;
    }

    renderEditor();
    liveStatus.textContent = `${cluster.length} nearby spikes spaced evenly.`;
  }

  function updateSelectedBehavior(key, value) {
    const object = selectedObject();
    if (!object) return;
    object.behavior = { ...objectBehavior(object), [key]: value };
    renderEditor();
  }

  function changeSelectedType(type) {
    const object = selectedObject();
    if (!object || !DEFAULT_OBJECTS[type]) return;
    const defaults = DEFAULT_OBJECTS[type];
    object.type = type;
    object.width = defaults.width;
    object.height = defaults.height;
    object.y = defaultObjectY(type, defaults.height);
    object.behavior = defaultBehavior(type);
    renderEditor();
  }

  function exportLevel() {
    levelJsonInput.value = JSON.stringify(level, null, 2);
    levelJsonInput.select();
    liveStatus.textContent = "Level JSON exported.";
  }

  function importLevel() {
    try {
      const imported = JSON.parse(levelJsonInput.value);
      if (!Array.isArray(imported.objects)) throw new Error("Missing objects array");

      level.id = typeof imported.id === "string" && imported.id ? imported.id : level.id;
      level.name = typeof imported.name === "string" && imported.name ? imported.name : level.name;
      level.end = clampNumber(imported.end ?? level.end, 500, 30000);
      level.speed = clampNumber(imported.speed ?? level.speed, 50, 900);
      level.objects.splice(0, level.objects.length, ...imported.objects.map((object) => normalizeObject(object)));
      state.selectedObjectId = level.objects[0]?.id || null;
      updateHud();
      renderEditor();
      liveStatus.textContent = "Level JSON imported.";
    } catch (error) {
      liveStatus.textContent = "Level JSON could not be imported.";
      window.alert(`Import failed: ${error.message}`);
    }
  }

  function updateObjectXFromTimeline(clientX) {
    const object = selectedObject();
    if (!object) return;
    const rect = editorTimeline.getBoundingClientRect();
    const ratio = clampNumber((clientX - rect.left) / rect.width, 0, 1);
    object.x = Math.round((ratio * level.end) / 10) * 10;
    renderEditor();
  }

  function moveSelectedObject(delta) {
    const object = selectedObject();
    if (!object) return;
    object.x = clampNumber(object.x + delta, 0, Math.max(level.end, 1));
    object.x = Math.round(object.x / 10) * 10;
    renderEditor();
  }

  // One action serves several states: start, restart, or jump. During play, a
  // jump only begins when grounded, which prevents unlimited air jumps.
  function requestJump() {
    if (state.editorMode) {
      liveStatus.textContent = "Exit editor mode before playing.";
      return;
    }

    if (state.mode === "ready") {
      startRun();
      return;
    }
    if (state.mode === "lost" || state.mode === "won") {
      restartRun();
      return;
    }
    if (state.mode !== "playing" || !state.player.grounded) return;

    ensureAudio();
    state.player.velocityY = -PLAYER.jumpSpeed;
    state.player.grounded = false;
    playTone(300, 0.08, "square", 0.025);
  }

  // Collision uses a slightly smaller rectangle than the visible player.
  // This makes close jumps feel fair without changing the artwork.
  function playerRect() {
    const inset = 5;
    return {
      x: PLAYER.x + inset,
      y: state.player.y + inset,
      width: PLAYER.size - inset * 2,
      height: PLAYER.size - inset * 2
    };
  }

  // Convert an obstacle's level position into its current screen position.
  // Spikes receive a narrower hitbox than their visible triangle.
  function obstacleRect(obstacle) {
    const screenX = obstacle.x - state.distance + PLAYER.x;
    if (obstacle.type === "spike") {
      return {
        x: screenX + 9,
        y: obstacle.y + 13,
        width: obstacle.width - 18,
        height: obstacle.height - 13
      };
    }
    return {
      x: screenX,
      y: obstacle.y,
      width: obstacle.width,
      height: obstacle.height
    };
  }

  // Axis-aligned bounding-box collision compares the four rectangle edges.
  function overlaps(a, b) {
    return a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y;
  }

  // update() advances the simulation by deltaTime seconds. Using elapsed time
  // keeps the movement speed similar on fast and slow displays.
  function update(deltaTime) {
    state.distance += level.speed * deltaTime;

    // Gravity changes vertical velocity, then velocity changes position.
    state.player.velocityY += PLAYER.gravity * deltaTime;
    state.player.y += state.player.velocityY * deltaTime;
    let landedThisFrame = false;

    // Rotation is visual feedback only and does not change the hitbox.
    if (!state.player.grounded) {
      state.player.rotation += 4.8 * deltaTime;
    }

    // Clamp the player to the floor so gravity cannot pull it through.
    const groundTop = VIEW.groundY - PLAYER.size;
    if (state.player.y >= groundTop) {
      state.player.y = groundTop;
      state.player.velocityY = 0;
      state.player.rotation = Math.round(state.player.rotation / (Math.PI / 2)) * (Math.PI / 2);
      landedThisFrame = true;
    }

    // Only nearby obstacles need detailed collision checks.
    const player = playerRect();
    for (const obstacle of level.objects) {
      const behavior = objectBehavior(obstacle);
      const collision = obstacleRect(obstacle);
      if (collision.x > VIEW.width || collision.x + collision.width < 0) continue;

      if (isSolidPlatformObject(obstacle) && behavior.solid && behavior.canLandOn) {
        // A falling player may land on a block from above. Contact from the
        // side or underside still ends the attempt.
        const previousBottom = player.y + player.height - state.player.velocityY * deltaTime;
        const blockTop = collision.y;
        const fallingOntoBlock = state.player.velocityY >= 0 && previousBottom <= blockTop + 8;

        if (overlaps(player, collision) && fallingOntoBlock) {
          state.player.y = blockTop - PLAYER.size;
          state.player.velocityY = 0;
          landedThisFrame = true;
          continue;
        }
      }

      if (overlaps(playerRect(), collision)) {
        const dangerousSpike = obstacle.type === "spike" && behavior.deadly;
        const dangerousBlock = isSolidPlatformObject(obstacle) && (behavior.deadly || behavior.deadlySides);
        if (dangerousSpike || dangerousBlock) {
          endRun(false);
          return;
        }
      }
    }

    // If neither the floor nor a block supported the player, it is airborne.
    state.player.grounded = landedThisFrame;

    // Reaching the level distance changes the state to won.
    if (state.distance >= level.end) endRun(true);
    updateHud();
  }

  // Keep the HTML progress display in step with the Canvas simulation.
  function updateHud() {
    const progress = level.end > 0 ? Math.min(100, Math.round((state.distance / level.end) * 100)) : 0;
    progressFill.style.width = `${progress}%`;
    progressLabel.value = `${progress}%`;
    progressLabel.textContent = `${progress}%`;
  }

  // Draw the sky, distant mountains, guide lines, and stars. The mountains and
  // stars move more slowly than the ground to create simple parallax depth.
  function drawBackground() {
    const sky = context.createLinearGradient(0, 0, 0, VIEW.groundY);
    sky.addColorStop(0, "#252434");
    sky.addColorStop(1, "#183f49");
    context.fillStyle = sky;
    context.fillRect(0, 0, VIEW.width, VIEW.groundY);

    context.fillStyle = "rgba(69, 217, 232, 0.12)";
    for (let i = -1; i < 7; i += 1) {
      const x = ((i * 190 - state.distance * 0.12) % 1330) - 80;
      context.beginPath();
      context.moveTo(x, VIEW.groundY);
      context.lineTo(x + 110, 210);
      context.lineTo(x + 220, VIEW.groundY);
      context.closePath();
      context.fill();
    }

    context.strokeStyle = "rgba(244, 241, 232, 0.08)";
    context.lineWidth = 1;
    for (let y = 70; y < VIEW.groundY; y += 70) {
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(VIEW.width, y);
      context.stroke();
    }

    context.fillStyle = "rgba(255, 204, 51, 0.8)";
    for (let i = 0; i < 10; i += 1) {
      const x = (i * 137 - state.distance * 0.06 + 90) % (VIEW.width + 80);
      const y = 70 + (i % 4) * 48;
      context.fillRect(x, y, 3, 3);
    }
  }

  // Draw the solid floor and moving diagonal marks that reinforce speed.
  function drawGround() {
    context.fillStyle = COLORS.ink;
    context.fillRect(0, VIEW.groundY, VIEW.width, VIEW.height - VIEW.groundY);
    context.fillStyle = COLORS.cyan;
    context.fillRect(0, VIEW.groundY, VIEW.width, 5);

    context.strokeStyle = "rgba(69, 217, 232, 0.16)";
    context.lineWidth = 1;
    const spacing = 50;
    const offset = -(state.distance % spacing);
    for (let x = offset; x < VIEW.width; x += spacing) {
      context.beginPath();
      context.moveTo(x, VIEW.groundY + 5);
      context.lineTo(x - 28, VIEW.height);
      context.stroke();
    }
  }

  // Choose a drawing method from the obstacle's type. Both types use the same
  // obstacle data later for collision detection.
  function drawObstacle(obstacle) {
    const x = obstacle.x - state.distance + PLAYER.x;
    if (x > VIEW.width + 100 || x + obstacle.width < -100) return;
    const behavior = objectBehavior(obstacle);

    if (obstacle.type === "spike") {
      context.fillStyle = behavior.deadly ? COLORS.coral : COLORS.green;
      context.beginPath();
      context.moveTo(x, obstacle.y + obstacle.height);
      context.lineTo(x + obstacle.width / 2, obstacle.y);
      context.lineTo(x + obstacle.width, obstacle.y + obstacle.height);
      context.closePath();
      context.fill();
      context.strokeStyle = COLORS.paper;
      context.lineWidth = 3;
      context.stroke();
    } else {
      const y = obstacle.y;
      context.fillStyle = obstacle.type === "platform" ? COLORS.green : behavior.solid ? COLORS.violet : "rgba(128, 117, 255, 0.45)";
      context.fillRect(x, y, obstacle.width, obstacle.height);
      context.strokeStyle = behavior.deadlySides || behavior.deadly ? COLORS.coral : COLORS.paper;
      context.lineWidth = 4;
      context.strokeRect(x + 2, y + 2, obstacle.width - 4, obstacle.height - 4);
      context.fillStyle = "rgba(19, 19, 21, 0.24)";
      context.fillRect(x + 13, y + 8, Math.max(0, obstacle.width - 26), Math.max(0, obstacle.height - 16));
    }

    if (state.editorMode && obstacle.id === state.selectedObjectId) drawSelectionOutline(obstacle);
    if (state.debug) drawHitbox(obstacleRect(obstacle));
  }

  function drawSelectionOutline(obstacle) {
    const x = obstacle.x - state.distance + PLAYER.x;
    const y = obstacle.y;
    context.save();
    context.strokeStyle = COLORS.yellow;
    context.lineWidth = 3;
    context.setLineDash([8, 6]);
    context.strokeRect(x - 8, y - 8, obstacle.width + 16, obstacle.height + 16);
    context.restore();
  }

  // Draw a checkered marker at the fixed world position level.end.
  function drawFinish() {
    const x = level.end - state.distance + PLAYER.x;
    if (x > VIEW.width + 120 || x < -120) return;

    context.fillStyle = COLORS.paper;
    context.fillRect(x, 190, 8, VIEW.groundY - 190);
    const tile = 24;
    for (let row = 0; row < 6; row += 1) {
      for (let column = 0; column < 4; column += 1) {
        context.fillStyle = (row + column) % 2 === 0 ? COLORS.yellow : COLORS.ink;
        context.fillRect(x + 8 + column * tile, 198 + row * tile, tile, tile);
      }
    }
  }

  // Draw the square around its centre so rotation does not change its position.
  function drawPlayer() {
    const centerX = PLAYER.x + PLAYER.size / 2;
    const centerY = state.player.y + PLAYER.size / 2;
    context.save();
    context.translate(centerX, centerY);
    context.rotate(state.player.rotation);
    context.fillStyle = COLORS.yellow;
    context.fillRect(-PLAYER.size / 2, -PLAYER.size / 2, PLAYER.size, PLAYER.size);
    context.strokeStyle = COLORS.ink;
    context.lineWidth = 5;
    context.strokeRect(-PLAYER.size / 2 + 2.5, -PLAYER.size / 2 + 2.5, PLAYER.size - 5, PLAYER.size - 5);
    context.fillStyle = COLORS.ink;
    context.fillRect(-10, -8, 7, 7);
    context.fillRect(6, -8, 7, 7);
    context.fillRect(-9, 9, 22, 5);
    context.restore();

    if (state.debug) drawHitbox(playerRect());
  }

  // Debug hitboxes make invisible collision boundaries visible to students.
  function drawHitbox(rect) {
    context.save();
    context.strokeStyle = COLORS.green;
    context.fillStyle = "rgba(130, 220, 115, 0.14)";
    context.lineWidth = 2;
    context.fillRect(rect.x, rect.y, rect.width, rect.height);
    context.strokeRect(rect.x, rect.y, rect.width, rect.height);
    context.restore();
  }

  // Rendering order matters: later drawings appear in front of earlier ones.
  function draw() {
    context.clearRect(0, 0, VIEW.width, VIEW.height);
    drawBackground();
    drawGround();
    level.objects.forEach(drawObstacle);
    drawFinish();
    drawPlayer();
  }

  // requestAnimationFrame supplies a timestamp before each browser repaint.
  // The delta is capped so returning to a background tab cannot create a huge
  // physics step that throws the player through an obstacle.
  function frame(time) {
    const elapsed = Math.min((time - state.lastTime) / 1000, 0.034);
    state.lastTime = time;
    if (state.mode === "playing") update(elapsed);
    draw();
    window.requestAnimationFrame(frame);
  }

  // Match the Canvas backing pixels to device density while preserving the
  // 960 x 540 logical coordinate system through a transform.
  function resizeCanvas() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = VIEW.width * ratio;
    canvas.height = VIEW.height * ratio;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  // Convert keyboard presses into the small set of game actions.
  function handleKeydown(event) {
    if (["Space", "ArrowUp"].includes(event.code)) {
      event.preventDefault();
      requestJump();
    } else if (event.code === "KeyP") {
      event.preventDefault();
      togglePause();
    } else if (event.code === "KeyM") {
      toggleMute();
    } else if (event.code === "KeyE") {
      event.preventDefault();
      toggleEditorMode();
    } else if (event.code === "KeyD") {
      if (state.editorMode) {
        liveStatus.textContent = "Hitboxes stay visible in editor mode.";
        return;
      }
      state.debug = !state.debug;
      liveStatus.textContent = `Hitboxes ${state.debug ? "shown" : "hidden"}.`;
    }
  }

  // Muting changes a preference and updates the accessible button state.
  function toggleMute() {
    state.muted = !state.muted;
    muteButton.textContent = state.muted ? "Sound off" : "Sound on";
    muteButton.setAttribute("aria-pressed", String(state.muted));
    muteButton.setAttribute("aria-label", state.muted ? "Turn sound on" : "Mute sound");
    if (!state.muted) {
      ensureAudio();
      playTone(520, 0.08, "square", 0.025);
    }
  }

  function bindPress(button, action) {
    let handledPointer = false;
    button.addEventListener("pointerup", (event) => {
      event.preventDefault();
      handledPointer = true;
      action();
      window.setTimeout(() => {
        handledPointer = false;
      }, 0);
    });
    button.addEventListener("click", () => {
      if (handledPointer) return;
      action();
    });
  }

  level.objects.splice(0, level.objects.length, ...level.objects.map((object) => normalizeObject(object)));
  state.selectedObjectId = level.objects[0]?.id || null;

  // Event listeners connect HTML, keyboard, pointer, and browser events to the
  // game functions. The game pauses automatically when its tab is hidden.
  bindPress(startButton, startRun);
  bindPress(restartButton, restartRun);
  bindPress(editorButton, toggleEditorMode);
  bindPress(addSpikeButton, () => addObject("spike"));
  bindPress(addBlockButton, () => addObject("block"));
  bindPress(addPlatformButton, () => addObject("platform"));
  bindPress(duplicateObjectButton, duplicateSelectedObject);
  bindPress(evenSpikeSpacingButton, evenSpikeSpacing);
  bindPress(deleteObjectButton, deleteSelectedObject);
  objectTypeInput.addEventListener("change", () => changeSelectedType(objectTypeInput.value));
  objectXInput.addEventListener("input", () => updateSelectedObject({ x: Number(objectXInput.value) }));
  objectYInput.addEventListener("input", () => updateSelectedObject({ y: Number(objectYInput.value) }));
  objectWidthInput.addEventListener("input", () => updateSelectedObject({ width: Number(objectWidthInput.value) }));
  objectHeightInput.addEventListener("input", () => updateSelectedObject({ height: Number(objectHeightInput.value) }));
  deadlyInput.addEventListener("change", () => updateSelectedBehavior("deadly", deadlyInput.checked));
  solidInput.addEventListener("change", () => updateSelectedBehavior("solid", solidInput.checked));
  canLandOnInput.addEventListener("change", () => updateSelectedBehavior("canLandOn", canLandOnInput.checked));
  deadlySidesInput.addEventListener("change", () => updateSelectedBehavior("deadlySides", deadlySidesInput.checked));
  bindPress(exportLevelButton, exportLevel);
  bindPress(importLevelButton, importLevel);
  editorTimeline.addEventListener("pointerdown", (event) => {
    const marker = event.target.closest(".timeline-marker");
    if (!marker) return;
    state.selectedObjectId = marker.dataset.objectId;
    state.draggingTimelineId = marker.dataset.objectId;
    marker.setPointerCapture(event.pointerId);
    updateObjectXFromTimeline(event.clientX);
  });
  editorTimeline.addEventListener("pointermove", (event) => {
    if (!state.draggingTimelineId) return;
    updateObjectXFromTimeline(event.clientX);
  });
  editorTimeline.addEventListener("pointerup", () => {
    state.draggingTimelineId = null;
  });
  editorTimeline.addEventListener("pointercancel", () => {
    state.draggingTimelineId = null;
  });
  bindPress(pauseButton, togglePause);
  bindPress(muteButton, toggleMute);
  canvas.addEventListener("pointerdown", requestJump);
  window.addEventListener("keydown", handleKeydown);
  window.addEventListener("resize", resizeCanvas);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && state.mode === "playing") togglePause();
  });

  // Set the initial resolution and picture before starting the perpetual loop.
  resizeCanvas();
  updateHud();
  renderEditor();
  draw();
  window.requestAnimationFrame((time) => {
    state.lastTime = time;
    window.requestAnimationFrame(frame);
  });
})();

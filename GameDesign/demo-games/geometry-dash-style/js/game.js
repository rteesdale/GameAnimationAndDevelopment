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

  // The game uses one logical 960 x 540 coordinate system. CSS may make the
  // Canvas look larger or smaller, but game positions keep these same values.
  const VIEW = { width: 960, height: 540, groundY: 430 };

  // Physics values use logical pixels and seconds. A negative vertical speed
  // moves upward because Canvas y coordinates increase toward the bottom.
  const PLAYER = { x: 152, size: 42, gravity: 2200, jumpSpeed: 900 };

  // The level ends after the world has moved this many logical pixels.
  const LEVEL_END = 8850;
  const RUN_SPEED = 310;

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

  // Each obstacle is data. The drawing and collision systems interpret these
  // records, so adding an obstacle does not require a new block of game logic.
  const obstacles = [
    { type: "spike", x: 980, width: 44, height: 48 },
    { type: "spike", x: 1510, width: 44, height: 48 },
    { type: "spike", x: 1580, width: 44, height: 48 },
    { type: "block", x: 2150, width: 86, height: 72 },
    { type: "spike", x: 2610, width: 44, height: 48 },
    { type: "spike", x: 2670, width: 44, height: 48 },
    { type: "spike", x: 2730, width: 44, height: 48 },
    { type: "block", x: 3370, width: 110, height: 92 },
    { type: "spike", x: 3650, width: 44, height: 48 },
    { type: "block", x: 4210, width: 90, height: 62 },
    { type: "spike", x: 4860, width: 44, height: 48 },
    { type: "spike", x: 4930, width: 44, height: 48 },
    { type: "block", x: 5480, width: 95, height: 82 },
    { type: "spike", x: 6210, width: 44, height: 48 },
    { type: "spike", x: 6270, width: 44, height: 48 },
    { type: "block", x: 6830, width: 125, height: 72 },
    { type: "spike", x: 7460, width: 44, height: 48 },
    { type: "spike", x: 7520, width: 44, height: 48 },
    { type: "spike", x: 7580, width: 44, height: 48 },
    { type: "block", x: 8140, width: 130, height: 90 }
  ];

  // This object contains every value that changes while the game runs.
  // Keeping mutable values together makes reset, pause, and restart predictable.
  const state = {
    mode: "ready",
    distance: 0,
    attempt: 1,
    lastTime: 0,
    debug: false,
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

  // One action serves several states: start, restart, or jump. During play, a
  // jump only begins when grounded, which prevents unlimited air jumps.
  function requestJump() {
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
        y: VIEW.groundY - obstacle.height + 13,
        width: obstacle.width - 18,
        height: obstacle.height - 13
      };
    }
    return {
      x: screenX,
      y: VIEW.groundY - obstacle.height,
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
    state.distance += RUN_SPEED * deltaTime;

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
    for (const obstacle of obstacles) {
      const collision = obstacleRect(obstacle);
      if (collision.x > VIEW.width || collision.x + collision.width < 0) continue;

      if (obstacle.type === "block") {
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
        endRun(false);
        return;
      }
    }

    // If neither the floor nor a block supported the player, it is airborne.
    state.player.grounded = landedThisFrame;

    // Reaching the level distance changes the state to won.
    if (state.distance >= LEVEL_END) endRun(true);
    updateHud();
  }

  // Keep the HTML progress display in step with the Canvas simulation.
  function updateHud() {
    const progress = Math.min(100, Math.round((state.distance / LEVEL_END) * 100));
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

    if (obstacle.type === "spike") {
      context.fillStyle = COLORS.coral;
      context.beginPath();
      context.moveTo(x, VIEW.groundY);
      context.lineTo(x + obstacle.width / 2, VIEW.groundY - obstacle.height);
      context.lineTo(x + obstacle.width, VIEW.groundY);
      context.closePath();
      context.fill();
      context.strokeStyle = COLORS.paper;
      context.lineWidth = 3;
      context.stroke();
    } else {
      const y = VIEW.groundY - obstacle.height;
      context.fillStyle = COLORS.violet;
      context.fillRect(x, y, obstacle.width, obstacle.height);
      context.strokeStyle = COLORS.paper;
      context.lineWidth = 4;
      context.strokeRect(x + 2, y + 2, obstacle.width - 4, obstacle.height - 4);
      context.fillStyle = "rgba(19, 19, 21, 0.24)";
      context.fillRect(x + 13, y + 13, obstacle.width - 26, obstacle.height - 26);
    }

    if (state.debug) drawHitbox(obstacleRect(obstacle));
  }

  // Draw a checkered marker at the fixed world position LEVEL_END.
  function drawFinish() {
    const x = LEVEL_END - state.distance + PLAYER.x;
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
    obstacles.forEach(drawObstacle);
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
    } else if (event.code === "KeyD") {
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

  // Event listeners connect HTML, keyboard, pointer, and browser events to the
  // game functions. The game pauses automatically when its tab is hidden.
  startButton.addEventListener("click", startRun);
  restartButton.addEventListener("click", restartRun);
  pauseButton.addEventListener("click", togglePause);
  muteButton.addEventListener("click", toggleMute);
  canvas.addEventListener("pointerdown", requestJump);
  window.addEventListener("keydown", handleKeydown);
  window.addEventListener("resize", resizeCanvas);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && state.mode === "playing") togglePause();
  });

  // Set the initial resolution and picture before starting the perpetual loop.
  resizeCanvas();
  updateHud();
  draw();
  window.requestAnimationFrame((time) => {
    state.lastTime = time;
    window.requestAnimationFrame(frame);
  });
})();

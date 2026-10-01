(() => {
  "use strict";

  // Level data lives outside the game loop so future editor tools can update
  // the same records that drawing, collision, and progress systems read.
  window.PULSE_RUN_LEVEL = {
    id: "first-circuit",
    name: "First Circuit",
    end: 8850,
    speed: 300,
    objects: [
      { id: "spike-001", type: "spike", x: 980, width: 44, height: 48, behavior: { deadly: true } },
      { id: "spike-002", type: "spike", x: 1520, width: 44, height: 48, behavior: { deadly: true } },
      { id: "spike-003", type: "spike", x: 1580, width: 44, height: 48, behavior: { deadly: true } },
      { id: "block-001", type: "block", x: 2150, width: 86, height: 72, behavior: { solid: true, canLandOn: true, deadlySides: true } },
      { id: "spike-004", type: "spike", x: 2620, width: 44, height: 48, behavior: { deadly: true } },
      { id: "spike-005", type: "spike", x: 2660, width: 44, height: 48, behavior: { deadly: true } },
      { id: "spike-006", type: "spike", x: 2700, width: 44, height: 48, behavior: { deadly: true } },
      { id: "block-002", type: "block", x: 3340, width: 110, height: 92, behavior: { solid: true, canLandOn: true, deadlySides: true } },
      { id: "spike-007", type: "spike", x: 3600, width: 44, height: 48, behavior: { deadly: true } },
      { id: "block-003", type: "block", x: 4210, width: 90, height: 62, behavior: { solid: true, canLandOn: true, deadlySides: true } },
      { id: "spike-008", type: "spike", x: 4860, width: 44, height: 48, behavior: { deadly: true } },
      { id: "spike-009", type: "spike", x: 4900, width: 44, height: 48, behavior: { deadly: true } },
      { id: "block-004", type: "block", x: 5400, width: 95, height: 82, behavior: { solid: true, canLandOn: true, deadlySides: true } },
      { id: "spike-010", type: "spike", x: 6210, width: 44, height: 48, behavior: { deadly: true } },
      { id: "spike-011", type: "spike", x: 6250, width: 44, height: 48, behavior: { deadly: true } },
      { id: "block-005", type: "block", x: 6830, width: 125, height: 72, behavior: { solid: true, canLandOn: true, deadlySides: true } },
      { id: "spike-012", type: "spike", x: 7450, width: 44, height: 48, behavior: { deadly: true } },
      { id: "spike-013", type: "spike", x: 7490, width: 44, height: 48, behavior: { deadly: true } },
      { id: "spike-014", type: "spike", x: 7530, width: 44, height: 48, behavior: { deadly: true } },
      { id: "block-006", type: "block", x: 8140, width: 130, height: 90, behavior: { solid: true, canLandOn: true, deadlySides: true } }
    ]
  };
})();

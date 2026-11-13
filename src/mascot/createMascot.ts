import {
  BoxGeometry,
  Color,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  type Object3D,
} from "three";

const CLAUDE_ORANGE = 0xd97757;
const EYE_COLOR = 0x1a1210;

/** Height of the hands when the arms are up (model units, feet at 0). */
export const HAND_HEIGHT = 2.3;
/** Sideways position of the gripping hand (the right one), model units. */
export const HAND_X = 1.37;

export type MascotAction = "wave" | "flip" | "spin" | "dance" | "squish" | "stomp";

const DURATION: Record<MascotAction, number> = {
  wave: 1.9,
  flip: 0.9,
  spin: 0.9,
  dance: 2,
  squish: 0.8,
  stomp: 1.1,
};

const TRANSFORM_SECONDS = 1;
const SPARKLES = 10;

export type MascotInputs = {
  /** Seconds, monotonic. */
  time: number;
  /** Where the body should face (radians, 0 = towards the camera). */
  yaw: number;
  /** Hop progress 0..1 while jumping between perches, null otherwise. */
  hop: number | null;
  /** Targets (eased internally): sitting 0..1, hanging by the hands 0..1, size. */
  sit: number;
  hang: number;
  scale: number;
};

export type Mascot = {
  root: Group;
  play: (action: MascotAction, time: number) => void;
  /** Starts the Claude-orange -> theme color transformation. */
  transform: (time: number) => void;
  /** Skips the transformation: already in the theme color. */
  setThemed: () => void;
  update: (inputs: MascotInputs) => void;
  dispose: () => void;
};

const smooth = (v: number) => v * v * (3 - 2 * v);

// A blocky, pixel-art style creature built from boxes: body, two eyes,
// two arms and four legs. Original geometry, no external model files.
// Feet sit at y = 0, so scaling squashes it against whatever it stands on.
// A `swing` group sits at hand height so it can dangle like a pendulum.
export function createMascot(themeColor: number | string): Mascot {
  const orange = new Color(CLAUDE_ORANGE);
  const theme = new Color(themeColor);
  const material = new MeshStandardMaterial({ color: orange, roughness: 0.7 });
  material.emissive = new Color(theme);
  material.emissiveIntensity = 0;
  const eyeMaterial = new MeshStandardMaterial({ color: EYE_COLOR, roughness: 0.4 });
  const sparkleMaterial = new MeshBasicMaterial({ color: theme, transparent: true });
  const geometries: BoxGeometry[] = [];

  const box = (w: number, h: number, d: number, mat: MeshStandardMaterial | MeshBasicMaterial) => {
    const geometry = new BoxGeometry(w, h, d);
    geometries.push(geometry);
    return new Mesh(geometry, mat);
  };

  const root = new Group();
  const swing = new Group();
  swing.position.set(HAND_X, HAND_HEIGHT, 0);
  const pivot = new Group();
  pivot.position.set(-HAND_X, -HAND_HEIGHT, 0);
  root.add(swing);
  swing.add(pivot);

  const body = box(2, 1.3, 1.1, material);
  body.position.y = 1.3;
  pivot.add(body);

  const eyes: Object3D[] = [];
  for (const side of [-1, 1]) {
    const eye = box(0.22, 0.4, 0.1, eyeMaterial);
    eye.position.set(side * 0.45, 1.45, 0.58);
    pivot.add(eye);
    eyes.push(eye);
  }

  const arms: Mesh[] = [];
  for (const side of [-1, 1]) {
    const arm = box(0.4, 0.5, 0.5, material);
    arm.geometry.translate(0, -0.15, 0);
    arm.position.set(side * 1.2, 1.55, 0);
    pivot.add(arm);
    arms.push(arm);
  }

  const legs: Mesh[] = [];
  [-0.7, -0.25, 0.25, 0.7].forEach((x) => {
    const leg = box(0.25, 0.65, 0.3, material);
    leg.geometry.translate(0, -0.3, 0);
    leg.position.set(x, 0.65, 0);
    pivot.add(leg);
    legs.push(leg);
  });

  const sparkles: Mesh[] = [];
  for (let i = 0; i < SPARKLES; i++) {
    const sparkle = box(1, 1, 1, sparkleMaterial);
    sparkle.visible = false;
    root.add(sparkle);
    sparkles.push(sparkle);
  }

  let nextBlink = 1.5;
  let blinkUntil = 0;
  let yaw = 0;
  let sit = 0;
  let hang = 0;
  let scale = 1;
  let action: { kind: MascotAction; start: number } | null = null;
  let transformAt: number | null = null; // null: not transformed yet
  let themed = false;

  return {
    root,
    play(kind, time) {
      action = { kind, start: time };
    },
    transform(time) {
      if (!themed && transformAt === null) transformAt = time;
    },
    setThemed() {
      themed = true;
      material.color.copy(theme);
    },
    update(inputs) {
      const { time, hop } = inputs;
      yaw += (inputs.yaw - yaw) * 0.14;
      sit += (inputs.sit - sit) * 0.18;
      hang += (inputs.hang - hang) * 0.2;
      scale += (inputs.scale - scale) * 0.15;

      // Per-frame pose, rebuilt from the idle state.
      let lift = Math.sin(time * 2) * 0.025 * (1 - hang);
      let sx = 1;
      let sy = 1 + Math.sin(time * 2) * 0.012;
      let rotX = 0;
      let rotY = yaw;
      let rotZ = 0;
      // Hanging: the right hand holds on, the left arm dangles.
      let armR = 2.9 * hang;
      let armL = (-0.35 + Math.sin(time * 2 + 1.2) * 0.3) * hang;
      let legTuck = 0;
      const legSwing = Math.sin(time * 2 - 0.8) * 0.3 * hang;
      let eyeScale = 1;

      if (hop !== null) {
        if (hop < 0.15) {
          const s = hop / 0.15;
          sy = 1 - 0.2 * s;
          sx = 1 + 0.1 * s;
        } else if (hop < 0.85) {
          sy = 1.08;
          sx = 0.96;
          armR = 2.4;
          armL = -2.4;
          legTuck = 0.5;
        } else {
          const s = (hop - 0.85) / 0.15;
          sy = 0.8 + 0.2 * s;
          sx = 1.1 - 0.1 * s;
        }
      }

      if (action) {
        const a = time - action.start;
        const d = DURATION[action.kind];
        if (a >= d) {
          action = null;
        } else {
          const p = a / d;
          const arc = Math.sin(Math.PI * p);
          switch (action.kind) {
            case "wave":
              armR = (2.3 + Math.sin(a * 14) * 0.35) * Math.min(1, arc * 4);
              break;
            case "flip":
              rotX = -p * Math.PI * 2;
              lift += arc * 1.1;
              armR = 2;
              armL = -2;
              break;
            case "spin":
              rotY += p * Math.PI * 2;
              lift += arc * 0.5;
              armR = 1.4;
              armL = -1.4;
              break;
            case "dance":
              rotZ = Math.sin(a * 12) * 0.1;
              lift += Math.abs(Math.sin(a * 12)) * 0.16;
              armR = 1.6 + Math.sin(a * 12) * 0.6;
              armL = -1.6 + Math.sin(a * 12 + Math.PI) * 0.6;
              break;
            case "squish": {
              const wobble = Math.exp(-4 * p) * Math.sin(a * 22);
              sy = 1 + wobble * 0.25;
              sx = 1 - wobble * 0.12;
              eyeScale = p < 0.5 ? 1.35 : 1;
              break;
            }
            case "stomp": {
              // Two heavy jumps in place (used to push the accordion open).
              const wave = Math.sin(a * 9);
              lift += Math.max(0, wave) * 0.45;
              sy = 1 - 0.2 * Math.max(0, -wave);
              sx = 1 + 0.08 * Math.max(0, -wave);
              armR = 1.2 * Math.max(0, wave);
              armL = -1.2 * Math.max(0, wave);
              break;
            }
          }
        }
      }

      // Sitting: hips lowered, legs stuck out in front.
      lift -= 0.6 * sit;
      legTuck += 1.35 * sit;

      // Diagonal body, swinging from side to side around the hand.
      swing.rotation.z = (0.2 + Math.sin(time * 2) * 0.55) * hang;
      pivot.position.y = -HAND_HEIGHT + lift;
      pivot.scale.set(sx, sy, sx);
      pivot.rotation.set(rotX, rotY, rotZ);
      root.scale.setScalar(scale);
      // Arms stretch while hanging, so the hands reach the edge it holds on to.
      arms[1].scale.y = 1 + 0.8 * hang;
      arms[1].rotation.z = armR;
      arms[0].rotation.z = armL;
      legs.forEach((leg, i) => (leg.rotation.x = -legTuck + (i % 2 ? legSwing : -legSwing)));

      // Transformation: Claude orange -> theme color, with a soft glow and sparkles.
      if (transformAt !== null && !themed) {
        const p = Math.min(1, (time - transformAt) / TRANSFORM_SECONDS);
        material.color.copy(orange).lerp(theme, smooth(p));
        material.emissiveIntensity = Math.sin(Math.PI * p) * 0.4;
        sparkles.forEach((sparkle, i) => {
          const angle = (i / SPARKLES) * Math.PI * 2 + 0.4;
          const radius = 0.9 + p * 1.1;
          sparkle.visible = p < 1;
          sparkle.position.set(Math.cos(angle) * radius, 1.4 + Math.sin(angle) * radius * 0.8, 0.3);
          sparkle.scale.setScalar(0.11 * (1 - p));
          sparkle.rotation.set(0, 0, angle + p * 3);
        });
        if (p >= 1) {
          themed = true;
          material.emissiveIntensity = 0;
          sparkles.forEach((s) => (s.visible = false));
        }
      }

      if (time >= nextBlink) {
        blinkUntil = time + 0.12;
        nextBlink = time + 2.5 + ((Math.sin(time * 7.3) + 1) / 2) * 3;
      }
      const closed = time < blinkUntil;
      eyes.forEach((eye) => eye.scale.set(1, closed ? 0.1 : eyeScale, 1));
    },
    dispose() {
      geometries.forEach((g) => g.dispose());
      material.dispose();
      eyeMaterial.dispose();
      sparkleMaterial.dispose();
    },
  };
}

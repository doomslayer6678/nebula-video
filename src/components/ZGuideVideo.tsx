import { makeTransform, scale, translateY } from "@remotion/animation-utils";
import { loadFont } from "@remotion/google-fonts/Montserrat";
import {
  AbsoluteFill,
  Img,
  OffthreadVideo,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const { fontFamily } = loadFont("normal", { weights: ["700", "800", "900"] });

// ─── Brand colors ────────────────────────────────────────────────────────────
const C = {
  primary: "#1847F5",
  navy: "#0F1B3D",
  white: "#FFFFFF",
  lightBlue: "#4D8EF7",
  iconBlue: "#1A56F0",
} as const;

// ─── Types ───────────────────────────────────────────────────────────────────
interface Beat {
  text: string;
  /** Frame (within the scene) when this beat appears */
  startFrame: number;
  /** Frame (within the scene) when this beat disappears */
  endFrame: number;
  color?: string;
  fontSize?: number;
  fontWeight?: string | number;
}

interface SceneConfig {
  id: string;
  durationInFrames: number;
  /** Gradient shown behind the image (or as sole background when no image) */
  gradient: string;
  /**
   * Drop a PNG into public/content/z-guide/images/<imageFile>
   * and set this field to that filename (e.g. "scene-1.png").
   * Leave undefined to use the gradient only.
   */
  imageFile?: string;
  /**
   * Path relative to /public for a video background (e.g. "content/z-guide/app-recording.mp4").
   * The video plays as a muted Ken-Burns background with a dark overlay.
   */
  videoFile?: string;
  /** Seconds offset into the video file to start playback from */
  videoStartFrom?: number;
  beats: Beat[];
}

// ─── Script → scenes ─────────────────────────────────────────────────────────
// 1 frame = 1/30 s.  Total duration: 720 frames = 24 s.
const SCENES: SceneConfig[] = [
  {
    id: "opening",
    durationInFrames: 120, // 4 s
    gradient: `linear-gradient(160deg, ${C.navy} 0%, ${C.iconBlue} 100%)`,
    // imageFile: "scene-1.png",   ← drop your opening image here
    beats: [
      {
        text: "Meeting someone new\nused to end with",
        startFrame: 0,
        endFrame: 55,
        fontSize: 90,
      },
      {
        text: '"I\'ll find you\non Instagram."',
        startFrame: 51,
        endFrame: 90,
        color: C.lightBlue,
        fontSize: 88,
      },
      {
        text: "Not anymore.",
        startFrame: 87,
        endFrame: 120,
        fontSize: 116,
        fontWeight: "900",
      },
    ],
  },
  {
    id: "qr-code",
    durationInFrames: 120, // 4 s
    gradient: `linear-gradient(160deg, ${C.primary} 0%, ${C.navy} 100%)`,
    imageFile: "scene-2.png", // ← QR code share screenshot (drop into public/content/z-guide/images/)
    beats: [
      {
        text: "Your Z Guide QR code\nis your real life profile.",
        startFrame: 0,
        endFrame: 72,
        fontSize: 82,
      },
      {
        text: "Share it with anyone.\nAnywhere.",
        startFrame: 66,
        endFrame: 120,
        fontSize: 90,
        color: C.lightBlue,
      },
    ],
  },
  {
    id: "scan",
    durationInFrames: 90, // 3 s
    gradient: `linear-gradient(135deg, ${C.navy} 0%, ${C.lightBlue} 100%)`,
    videoFile: "content/z-guide/app-recording.mp4", // ← app screen recording
    beats: [
      {
        text: "One scan and\nyou're connected.",
        startFrame: 0,
        endFrame: 42,
        fontSize: 92,
      },
      {
        text: "No searching.\nNo awkward handles.",
        startFrame: 39,
        endFrame: 90,
        fontSize: 88,
        color: C.lightBlue,
      },
    ],
  },
  {
    id: "use-cases",
    durationInFrames: 90, // 3 s
    gradient: `linear-gradient(160deg, ${C.iconBlue} 0%, ${C.navy} 100%)`,
    // imageFile: "scene-4.png",   ← people / venue / event collage
    beats: [
      {
        text: "For people.",
        startFrame: 0,
        endFrame: 30,
        fontSize: 116,
        fontWeight: "900",
      },
      {
        text: "For venues.",
        startFrame: 27,
        endFrame: 57,
        fontSize: 116,
        fontWeight: "900",
        color: C.lightBlue,
      },
      {
        text: "For events.",
        startFrame: 54,
        endFrame: 90,
        fontSize: 116,
        fontWeight: "900",
      },
    ],
  },
  {
    id: "features",
    durationInFrames: 150, // 5 s
    gradient: `linear-gradient(160deg, ${C.navy} 0%, ${C.primary} 50%, ${C.lightBlue} 100%)`,
    // imageFile: "scene-5.png",   ← app UI / meetup / reservation / tickets
    beats: [
      {
        text: "Plan meetups.",
        startFrame: 0,
        endFrame: 39,
        fontSize: 116,
        fontWeight: "900",
      },
      {
        text: "Book a table.",
        startFrame: 33,
        endFrame: 72,
        fontSize: 116,
        fontWeight: "900",
        color: C.lightBlue,
      },
      {
        text: "Grab tickets.",
        startFrame: 66,
        endFrame: 105,
        fontSize: 116,
        fontWeight: "900",
      },
      {
        text: "Anything is possible\nwith Z Guide.",
        startFrame: 99,
        endFrame: 150,
        fontSize: 82,
        color: C.lightBlue,
      },
    ],
  },
  {
    id: "cta",
    durationInFrames: 150, // 5 s
    gradient: `linear-gradient(160deg, ${C.primary} 0%, ${C.navy} 100%)`,
    // imageFile: "scene-6.png",   ← Z Guide logo / clean CTA background
    beats: [
      {
        text: "Real connections\nstart in real life.",
        startFrame: 0,
        endFrame: 54,
        fontSize: 82,
      },
      {
        text: "Try Z Guide Free.",
        startFrame: 48,
        endFrame: 99,
        fontSize: 100,
        color: C.primary,
        fontWeight: "900",
      },
      {
        text: "ZGuide.com",
        startFrame: 93,
        endFrame: 150,
        fontSize: 112,
        color: C.lightBlue,
        fontWeight: "900",
      },
    ],
  },
];

// Pre-compute absolute start frames for each scene
const SCENE_STARTS: number[] = [];
{
  let offset = 0;
  for (const scene of SCENES) {
    SCENE_STARTS.push(offset);
    offset += scene.durationInFrames;
  }
}

export const ZGUIDE_TOTAL_FRAMES =
  SCENE_STARTS[SCENE_STARTS.length - 1] +
  SCENES[SCENES.length - 1].durationInFrames;

// ─── Text beat ───────────────────────────────────────────────────────────────
const TextBeat: React.FC<Beat & { nextBeatStart?: number }> = ({
  text,
  startFrame,
  endFrame,
  nextBeatStart,
  color = C.white,
  fontSize = 100,
  fontWeight = "800",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (frame < startFrame || frame >= endFrame) return null;

  const localFrame = frame - startFrame;

  // Slam-in spring
  const enter = spring({
    frame: localFrame,
    fps,
    config: { damping: 220, mass: 0.35, stiffness: 350 },
    durationInFrames: 12,
  });

  // Quick exit when the next beat takes over
  const exitStartLocal = nextBeatStart
    ? Math.max(0, nextBeatStart - startFrame - 7)
    : endFrame - startFrame + 60; // last beat stays until scene cuts
  const exit = spring({
    frame: Math.max(0, localFrame - exitStartLocal),
    fps,
    config: { damping: 300, mass: 0.3, stiffness: 400 },
    durationInFrames: 7,
  });

  const enterScale = interpolate(enter, [0, 1], [0.82, 1]);
  const exitScale = interpolate(exit, [0, 1], [1, 0.9]);
  const ty = interpolate(enter, [0, 1], [40, 0]);
  const opacity = enter * Math.max(0, 1 - exit * 1.3);

  return (
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "center", display: "flex" }}
    >
      <div
        style={{
          fontSize,
          fontWeight,
          color,
          fontFamily,
          textTransform: "uppercase",
          textAlign: "center",
          letterSpacing: "-0.02em",
          lineHeight: 1.15,
          width: "88%",
          whiteSpace: "pre-line",
          opacity,
          transform: makeTransform([scale(enterScale * exitScale), translateY(ty)]),
          textShadow: "0 6px 32px rgba(0,0,0,0.55)",
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};

// ─── Scene ───────────────────────────────────────────────────────────────────
const ZGuideScene: React.FC<{ config: SceneConfig; sceneIndex: number }> = ({
  config,
  sceneIndex,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = frame / config.durationInFrames;

  // Subtle Ken Burns zoom: alternates in/out per scene
  const kenBurnsScale =
    sceneIndex % 2 === 0
      ? interpolate(progress, [0, 1], [1.0, 1.08])
      : interpolate(progress, [0, 1], [1.08, 1.0]);

  const startFromInFrames = config.videoStartFrom
    ? Math.round(config.videoStartFrom * fps)
    : 0;

  return (
    <AbsoluteFill>
      {/* Gradient base (always shown) */}
      <AbsoluteFill style={{ background: config.gradient }} />

      {/* Optional video background (app screen recording) */}
      {config.videoFile && (
        <AbsoluteFill style={{ overflow: "hidden" }}>
          <OffthreadVideo
            src={staticFile(config.videoFile)}
            startFrom={startFromInFrames}
            muted
            style={{
              position: "absolute",
              width: `${kenBurnsScale * 100}%`,
              height: `${kenBurnsScale * 100}%`,
              top: `${-(kenBurnsScale - 1) * 50}%`,
              left: `${-(kenBurnsScale - 1) * 50}%`,
              objectFit: "cover",
            }}
          />
          {/* Dark navy overlay so text stays readable over the video */}
          <AbsoluteFill style={{ backgroundColor: C.navy, opacity: 0.55 }} />
        </AbsoluteFill>
      )}

      {/* Optional image background (static screenshot) */}
      {config.imageFile && !config.videoFile && (
        <AbsoluteFill style={{ overflow: "hidden" }}>
          <Img
            src={staticFile(`content/z-guide/images/${config.imageFile}`)}
            style={{
              position: "absolute",
              width: `${kenBurnsScale * 100}%`,
              height: `${kenBurnsScale * 100}%`,
              top: `${-(kenBurnsScale - 1) * 50}%`,
              left: `${-(kenBurnsScale - 1) * 50}%`,
              objectFit: "cover",
            }}
          />
          {/* Dark navy overlay so text stays readable */}
          <AbsoluteFill style={{ backgroundColor: C.navy, opacity: 0.6 }} />
        </AbsoluteFill>
      )}

      {/* Subtle radial glow (brand accent) */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(72,142,247,0.14) 0%, transparent 68%)",
        }}
      />

      {/* Text beats */}
      {config.beats.map((beat, i) => (
        <TextBeat
          key={`beat-${i}`}
          {...beat}
          nextBeatStart={config.beats[i + 1]?.startFrame}
        />
      ))}
    </AbsoluteFill>
  );
};

// ─── Composition root ────────────────────────────────────────────────────────
export const ZGuideVideo: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.navy }}>
    {SCENES.map((scene, index) => (
      <Sequence
        key={scene.id}
        from={SCENE_STARTS[index]}
        durationInFrames={scene.durationInFrames}
      >
        <ZGuideScene config={scene} sceneIndex={index} />
      </Sequence>
    ))}
  </AbsoluteFill>
);

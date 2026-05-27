import React from "react";
import { Sequence } from "remotion";
import { SceneOpening } from "./scenes/SceneOpening";
import { SceneQR } from "./scenes/SceneQR";
import { SceneScanning } from "./scenes/SceneScanning";
import { SceneStats } from "./scenes/SceneStats";
import { SceneProfile } from "./scenes/SceneProfile";
import { SceneCTA } from "./scenes/SceneCTA";

// 33s @ 30fps = 990 frames (extended to fit 7s video naturally)
//   0– 120   SceneOpening   "Z Guide is a free social app..."     (4s)
// 120– 330   SceneQR        video1.mov in phone mockup            (7s)
// 330– 510   SceneScanning  video → cross-dissolve → image1.png  (6s)
// 510– 660   SceneStats     animated chart                        (5s)
// 660– 810   SceneProfile   image1.png in phone mockup            (5s)
// 810– 990   SceneCTA       logo + Info@ZGuide.com                (6s)

export const ZGuideAd: React.FC = () => {
  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        overflow: "hidden",
        background: "#0F1B3D",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
        position: "relative",
      }}
    >
      <Sequence from={0} durationInFrames={120}>
        <SceneOpening />
      </Sequence>
      <Sequence from={120} durationInFrames={210}>
        <SceneQR />
      </Sequence>
      <Sequence from={330} durationInFrames={180}>
        <SceneScanning />
      </Sequence>
      <Sequence from={510} durationInFrames={150}>
        <SceneStats />
      </Sequence>
      <Sequence from={660} durationInFrames={150}>
        <SceneProfile />
      </Sequence>
      <Sequence from={810} durationInFrames={180}>
        <SceneCTA />
      </Sequence>
    </div>
  );
};

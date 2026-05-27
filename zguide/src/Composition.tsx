import React from "react";
import { Sequence } from "remotion";
import { SceneOpening } from "./scenes/SceneOpening";
import { SceneQR } from "./scenes/SceneQR";
import { SceneScanning } from "./scenes/SceneScanning";
import { SceneStats } from "./scenes/SceneStats";
import { SceneProfile } from "./scenes/SceneProfile";
import { SceneCTA } from "./scenes/SceneCTA";

// 30s @ 30fps = 900 frames
//   0–120   SceneOpening   "Z Guide is a free social app..."    (4s)
// 120–270   SceneQR        "It starts with one QR code."        (5s)
// 270–420   SceneScanning  "Customers connect through Z Guide."  (5s)
// 420–570   SceneStats     "More connections. More revenue."     (5s)
// 570–720   SceneProfile   "You become the place where..."       (5s)
// 720–900   SceneCTA       "Want to see how it works?"           (6s)

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
      <Sequence from={120} durationInFrames={150}>
        <SceneQR />
      </Sequence>
      <Sequence from={270} durationInFrames={150}>
        <SceneScanning />
      </Sequence>
      <Sequence from={420} durationInFrames={150}>
        <SceneStats />
      </Sequence>
      <Sequence from={570} durationInFrames={150}>
        <SceneProfile />
      </Sequence>
      <Sequence from={720} durationInFrames={180}>
        <SceneCTA />
      </Sequence>
    </div>
  );
};

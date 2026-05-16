import React from "react";
import { Sequence } from "remotion";
import { SceneTitle } from "./scenes/SceneTitle";
import { SceneTagline } from "./scenes/SceneTagline";
import { SceneCredits } from "./scenes/SceneCredits";
import { SceneLogo } from "./scenes/SceneLogo";

// Scene layout — 255 frames @ 30fps = 8.5s
//   0– 60  SceneTitle    (2s)  THE / AUTISTIC / MILE slams in
//  60–150  SceneTagline  (3s)  Color split + EDUCATE. ENGAGE. INSPIRE.
// 150–210  SceneCredits  (2s)  Hosted by / JSA credit
// 210–255  SceneLogo     (1.5s) Circular logo hold

export const AutisticMileIntro: React.FC = () => {
  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        overflow: "hidden",
        fontFamily: '"Bebas Neue", Impact, "Arial Narrow", sans-serif',
        position: "relative",
      }}
    >
      <Sequence from={0} durationInFrames={60}>
        <SceneTitle />
      </Sequence>
      <Sequence from={60} durationInFrames={90}>
        <SceneTagline />
      </Sequence>
      <Sequence from={150} durationInFrames={60}>
        <SceneCredits />
      </Sequence>
      <Sequence from={210} durationInFrames={45}>
        <SceneLogo />
      </Sequence>
    </div>
  );
};

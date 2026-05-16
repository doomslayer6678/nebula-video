import React from "react";
import { Sequence, Audio, staticFile } from "remotion";
import { SceneFlash } from "./scenes/SceneFlash";
import { SceneTagline } from "./scenes/SceneTagline";
import { SceneTitle } from "./scenes/SceneTitle";
import { SceneCredits } from "./scenes/SceneCredits";
import { SceneLogo } from "./scenes/SceneLogo";

// Scene layout — 300 frames @ 30fps = 10s
//   0– 60  SceneFlash    (2s)  Black → color flashes → navy
//  60–150  SceneTagline  (3s)  Geometric sweep + EDUCATE. ENGAGE. INSPIRE.
// 150–240  SceneTitle    (3s)  THE / AUTISTIC / MILE slams in
// 240–270  SceneCredits  (1s)  Hosted by / JSA credit
// 270–300  SceneLogo     (1s)  Circular logo hold

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
      {/* Audio — starts at 22s into the track (22 × 30 = 660 frames offset) */}
      <Audio src={staticFile("music.mp3")} startFrom={660} volume={1} />

      <Sequence from={0} durationInFrames={60}>
        <SceneFlash />
      </Sequence>
      <Sequence from={60} durationInFrames={90}>
        <SceneTagline />
      </Sequence>
      <Sequence from={150} durationInFrames={90}>
        <SceneTitle />
      </Sequence>
      <Sequence from={240} durationInFrames={30}>
        <SceneCredits />
      </Sequence>
      <Sequence from={270} durationInFrames={30}>
        <SceneLogo />
      </Sequence>
    </div>
  );
};

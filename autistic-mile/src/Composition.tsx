import React from "react";
import { Sequence, Audio, staticFile } from "remotion";
import { SceneTitle } from "./scenes/SceneTitle";
import { SceneTagline } from "./scenes/SceneTagline";
import { SceneCredits } from "./scenes/SceneCredits";
import { SceneLogo } from "./scenes/SceneLogo";

// Scene layout — 225 frames @ 30fps = 7.5s
//   0– 60  SceneTitle    (2s)  THE / AUTISTIC / MILE slams in
//  60–120  SceneTagline  (2s)  Color split + EDUCATE. ENGAGE. INSPIRE.
// 120–180  SceneCredits  (2s)  Hosted by / JSA credit
// 180–225  SceneLogo     (1.5s) Circular logo hold

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
        <SceneTitle />
      </Sequence>
      <Sequence from={60} durationInFrames={60}>
        <SceneTagline />
      </Sequence>
      <Sequence from={120} durationInFrames={60}>
        <SceneCredits />
      </Sequence>
      <Sequence from={180} durationInFrames={45}>
        <SceneLogo />
      </Sequence>
    </div>
  );
};

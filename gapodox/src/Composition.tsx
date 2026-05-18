import React from "react";
import { Sequence } from "remotion";
import { SceneOpening } from "./scenes/SceneOpening";
import { ScenePain } from "./scenes/ScenePain";
import { SceneSolution } from "./scenes/SceneSolution";
import { SceneFeatures } from "./scenes/SceneFeatures";
import { SceneZWheel } from "./scenes/SceneZWheel";
import { SceneComparison } from "./scenes/SceneComparison";
import { SceneCTA } from "./scenes/SceneCTA";

//   0–120   SceneOpening    (4s)  YOU'RE DIVERSIFIED. OR SO YOU THINK.
// 120–210   ScenePain       (3s)  Too many screens. Zero full picture.
// 210–300   SceneSolution   (3s)  Gapodox brings it all together.
// 300–450   SceneFeatures   (5s)  Stocks / Crypto / Market data
// 450–630   SceneZWheel     (6s)  Meet the Z Wheel — cinematic build
// 630–780   SceneComparison (5s)  Your portfolio vs hedge funds & Congress
// 780–900   SceneCTA        (4s)  Try Free at Gapodox.com

export const GapodoxAd: React.FC = () => {
  return (
    <div style={{ width: 1920, height: 1080, overflow: "hidden", position: "relative" }}>
      <Sequence from={0}   durationInFrames={120}><SceneOpening /></Sequence>
      <Sequence from={120} durationInFrames={90}><ScenePain /></Sequence>
      <Sequence from={210} durationInFrames={90}><SceneSolution /></Sequence>
      <Sequence from={300} durationInFrames={150}><SceneFeatures /></Sequence>
      <Sequence from={450} durationInFrames={180}><SceneZWheel /></Sequence>
      <Sequence from={630} durationInFrames={150}><SceneComparison /></Sequence>
      <Sequence from={780} durationInFrames={120}><SceneCTA /></Sequence>
    </div>
  );
};

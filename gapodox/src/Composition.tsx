import React from "react";
import { Sequence } from "remotion";
import { SceneOpening } from "./scenes/SceneOpening";
import { ScenePain } from "./scenes/ScenePain";
import { SceneSolution } from "./scenes/SceneSolution";
import { SceneFeatures } from "./scenes/SceneFeatures";
import { SceneZWheel } from "./scenes/SceneZWheel";
import { SceneComparison } from "./scenes/SceneComparison";
import { SceneCTA } from "./scenes/SceneCTA";

//   0–120   SceneOpening    (4s)   YOU'RE DIVERSIFIED. OR SO YOU THINK.
// 120–225   ScenePain       (3.5s) One dashboard. Your portfolio...
// 225–315   SceneSolution   (3s)   Gapodox brings it all together.
// 315–465   SceneFeatures   (5s)   Stocks / Crypto / Market data
// 465–645   SceneZWheel     (6s)   Meet the Z Wheel
// 645–795   SceneComparison (5s)   Your portfolio vs hedge funds & Congress
// 795–915   SceneCTA        (4s)   Try Free at Gapodox.com

export const GapodoxAd: React.FC = () => {
  return (
    <div style={{ width: 1920, height: 1080, overflow: "hidden", position: "relative" }}>
      <Sequence from={0}   durationInFrames={120}><SceneOpening /></Sequence>
      <Sequence from={120} durationInFrames={105}><ScenePain /></Sequence>
      <Sequence from={225} durationInFrames={90}><SceneSolution /></Sequence>
      <Sequence from={315} durationInFrames={150}><SceneFeatures /></Sequence>
      <Sequence from={465} durationInFrames={180}><SceneZWheel /></Sequence>
      <Sequence from={645} durationInFrames={150}><SceneComparison /></Sequence>
      <Sequence from={795} durationInFrames={120}><SceneCTA /></Sequence>
    </div>
  );
};

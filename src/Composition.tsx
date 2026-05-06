import React from "react";
import { Sequence } from "remotion";
import { Scene1Opening } from "./scenes/Scene1Opening";
import { Scene2Tools } from "./scenes/Scene2Tools";
import { Scene3Intro } from "./scenes/Scene3Intro";
import { Scene4Platform } from "./scenes/Scene4Platform";
import { Scene5Stats } from "./scenes/Scene5Stats";
import { Scene6Recruiter } from "./scenes/Scene6Recruiter";
import { Scene7Features } from "./scenes/Scene7Features";
import { Scene8Differentiation } from "./scenes/Scene8Differentiation";
import { Scene9CTA } from "./scenes/Scene9CTA";

// 30s @ 30fps = 900 frames
// Scene layout:
//   0–90    Scene 1  Opening chaos        (3s)
//  90–210   Scene 2  Too many tools       (4s)
// 210–300   Scene 3  Nebula changes that  (3s)
// 300–450   Scene 4  Platform overview    (5s)
// 450–555   Scene 5  Stats                (3.5s)
// 555–645   Scene 6  Recruiter focus      (3s)
// 645–765   Scene 7  Feature cards        (4s)
// 765–855   Scene 8  Differentiation      (3s)
// 855–900   Scene 9  CTA                  (1.5s)

export const NebulaDemo: React.FC = () => {
  return (
    <div
      style={{
        background: "#080B18",
        width: 1280,
        height: 720,
        overflow: "hidden",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
        position: "relative",
      }}
    >
      <Sequence from={0} durationInFrames={90}>
        <Scene1Opening />
      </Sequence>
      <Sequence from={90} durationInFrames={120}>
        <Scene2Tools />
      </Sequence>
      <Sequence from={210} durationInFrames={90}>
        <Scene3Intro />
      </Sequence>
      <Sequence from={300} durationInFrames={150}>
        <Scene4Platform />
      </Sequence>
      <Sequence from={450} durationInFrames={105}>
        <Scene5Stats />
      </Sequence>
      <Sequence from={555} durationInFrames={90}>
        <Scene6Recruiter />
      </Sequence>
      <Sequence from={645} durationInFrames={120}>
        <Scene7Features />
      </Sequence>
      <Sequence from={765} durationInFrames={90}>
        <Scene8Differentiation />
      </Sequence>
      <Sequence from={855} durationInFrames={45}>
        <Scene9CTA />
      </Sequence>
    </div>
  );
};

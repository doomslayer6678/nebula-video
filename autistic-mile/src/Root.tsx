import "./index.css";
import { Composition } from "remotion";
import { AutisticMileIntro } from "./Composition";
import React from "react";

// YouTube 1080p — 7.5 seconds at 30fps = 225 frames
export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="AutisticMileIntro"
      component={AutisticMileIntro}
      durationInFrames={225}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};

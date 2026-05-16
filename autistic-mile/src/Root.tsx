import "./index.css";
import { Composition } from "remotion";
import { AutisticMileIntro } from "./Composition";
import React from "react";

// YouTube 1080p — 8.5 seconds at 30fps = 255 frames
export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="AutisticMileIntro"
      component={AutisticMileIntro}
      durationInFrames={255}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};

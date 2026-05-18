import React from "react";
import { Composition } from "remotion";
import { GapodoxAd } from "./Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="GapodoxAd"
      component={GapodoxAd}
      durationInFrames={900}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};

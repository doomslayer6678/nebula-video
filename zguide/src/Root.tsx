import React from "react";
import { Composition } from "remotion";
import { ZGuideAd } from "./Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="ZGuideAd"
      component={ZGuideAd}
      durationInFrames={900}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};

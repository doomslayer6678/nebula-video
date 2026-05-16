import "./index.css";
import { Composition } from "remotion";
import { AutisticMileIntro } from "./Composition";

// YouTube 1080p — 10 seconds at 30fps = 300 frames
export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="AutisticMileIntro"
      component={AutisticMileIntro}
      durationInFrames={300}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};

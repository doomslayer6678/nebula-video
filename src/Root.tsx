import "./index.css";
import { Composition } from "remotion";
import { NebulaDemo } from "./Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="NebulaDemo"
      component={NebulaDemo}
      durationInFrames={900}
      fps={30}
      width={1280}
      height={720}
    />
  );
};

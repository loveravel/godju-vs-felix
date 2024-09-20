import React from "react";
import purpleShot from "/purple-shot.png";
import { IShot } from "../../store/useBotStore.ts";

const Shot: React.FC<IShot> = (props) => {
  const { currentPosition: currentPosition, endPosition } = props;

  return (
    <img
      style={{
        position: "absolute",
        left: currentPosition.x,
        bottom: currentPosition.y,
        transform: `scaleX(${currentPosition.x > endPosition.x ? -1 : 1})`,
      }}
      height={70}
      width={70}
      src={purpleShot}
      alt="Shot!"
    />
  );
};

export default Shot;

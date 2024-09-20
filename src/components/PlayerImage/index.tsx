import React from "react";

export interface IPlayerImageProps {
  imageUrl: string;
}

const PlayerImage: React.FC<IPlayerImageProps> = ({ imageUrl }) => {
  return (
    <img
      src={imageUrl}
      alt="Игрок"
      style={{
        width: "100%",
        height: "100%",
      }}
    />
  );
};

export default PlayerImage;

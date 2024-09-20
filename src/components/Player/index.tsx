import React, { useEffect, useRef } from "react";
import PlayerImage from "../PlayerImage";
import { usePlayerStore } from "../../store/usePlayerStore.ts";
import { useBotStore } from "../../store/useBotStore.ts";

const Player: React.FC = () => {
  const keysPressed = useRef<{ [key: string]: boolean }>({});
  const {
    position,
    jumpHeight,
    move,
    updateJump,
    directionX,
    imageUrl,
    setIsDead,
  } = usePlayerStore();
  const { shots } = useBotStore();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      keysPressed.current[event.key] = true;

      if (keysPressed.current["ArrowLeft"]) {
        move("left");
      }
      if (keysPressed.current["ArrowRight"]) {
        move("right");
      }
      if (keysPressed.current["ArrowUp"] || keysPressed.current[" "]) {
        move("jump");
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      keysPressed.current[event.key] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [move]);

  useEffect(() => {
    const interval = setInterval(() => {
      updateJump();
    }, 50);

    return () => clearInterval(interval);
  }, [updateJump]);

  // console.log(position, shots);

  useEffect(() => {
    const playerWidth = 150; // Ширина игрока
    const playerHeight = 150; // Высота игрока

    const playerRect = {
      left: position.x,
      right: position.x + playerWidth,
      top: position.y + jumpHeight,
      bottom: position.y + jumpHeight + playerHeight,
    };

    shots.forEach((shot) => {
      const shotRect = {
        left: shot.currentPosition.x,
        right: shot.currentPosition.x, // Предполагается, что у shot есть width
        // right: shot.currentPosition.x + shot.width, // Предполагается, что у shot есть width
        top: shot.currentPosition.y,
        bottom: shot.currentPosition.y, // Предполагается, что у shot есть height
        // bottom: shot.currentPosition.y + shot.height, // Предполагается, что у shot есть height
      };

      // Проверка на пересечение
      if (
        playerRect.left < shotRect.right &&
        playerRect.right > shotRect.left &&
        playerRect.top < shotRect.bottom &&
        playerRect.bottom > shotRect.top
      ) {
        console.log("Игрок умер");
        setIsDead(true);
      }
    });
  }, [position, jumpHeight, shots]);

  return (
    <div
      className="player"
      style={{
        width: "150px",
        height: "150px",
        position: "absolute",
        left: position.x,
        bottom: position.y + jumpHeight,
        transition: "bottom 0.1s",
        transform: `scaleX(${directionX === "right" ? -1 : 1})`,
      }}
    >
      <PlayerImage imageUrl={imageUrl} />
    </div>
  );
};

export default Player;

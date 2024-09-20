import React, { useEffect } from "react";
import { useBotStore } from "../../store/useBotStore.ts";
import { usePlayerStore } from "../../store/usePlayerStore.ts";
import PlayerImage from "../PlayerImage";
import imageUrl from "/satoru.png";

const Bot: React.FC = () => {
  const playerStore = usePlayerStore();
  const botStore = useBotStore();
  const { position, directionX } = botStore;

  // Запускаем периодические движения и стрельбу
  // const startBotBehavior = () => {
  //   const interval = setInterval(() => {
  //     const botStore = useBotStore.getState(); // Получаем текущее состояние
  //     botStore.randomMove(); // Вызываем randomMove
  //     if (Math.random() < 0.1) {
  //       // 10% шанс на стрельбу
  //       botStore.shoot(); // Вызываем shoot
  //     }
  //   }, 1000); // Каждую секунду
  //
  //   return () => clearInterval(interval); // Функция для остановки интервала
  // };

  useEffect(() => {
    const interval = setInterval(() => {
      botStore.randomMove();
      if (Math.random() < 0.1 && botStore.shots.length < 1) {
        botStore.shoot(playerStore.position);
      }
      botStore.updateShots();
    }, 100);

    return () => clearInterval(interval);
  }, [botStore]);

  return (
    <div
      className="player"
      style={{
        width: "150px",
        height: "150px",
        position: "absolute",
        left: position.x,
        bottom: position.y,
        transition: "bottom 0.1s",
        transform: `scaleX(${directionX === "right" ? -1 : 1})`,
      }}
    >
      <PlayerImage imageUrl={imageUrl} />
    </div>
  );
};

export default Bot;

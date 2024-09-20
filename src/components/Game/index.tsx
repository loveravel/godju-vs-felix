import React from "react";
import Player from "../Player";
import Bot from "../Bot";
import Shot from "../Shot";
import { useBotStore } from "../../store/useBotStore";
import { usePlayerStore } from "../../store/usePlayerStore.ts";

const Game: React.FC = () => {
  const botStore = useBotStore();
  const { isDead } = usePlayerStore();

  return (
    <div className="game" style={{ fontSize: "36px" }}>
      {isDead ? (
        "ТЫ УМИР ОТ ФИОЛЕТОВОГО ГОДЖУ САТОРУ"
      ) : (
        <>
          <Player />
          <Bot />
          <div>
            {botStore.shots.map((shot, index) => (
              <Shot
                key={index}
                currentPosition={shot.currentPosition}
                endPosition={shot.endPosition}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Game;

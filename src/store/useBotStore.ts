import { create } from "zustand";
import defaultBotImageUrl from "/satoru.png";

export type TMoveDirectionX = "left" | "right";
export type TMoveDirection = TMoveDirectionX | "up" | "down";

export interface IShot {
  currentPosition: { x: number; y: number };
  endPosition: { x: number; y: number };
}

interface IBotStore {
  position: { x: number; y: number };
  directionX: TMoveDirectionX;
  imageUrl: string;
  randomMove: () => void;
  shoot: (endPosition: { x: number; y: number }) => void;
  shots: IShot[];
  updateShots: () => void;
}

export const useBotStore = create<IBotStore>((set) => ({
  position: { x: 400, y: 400 },
  directionX: "left",
  imageUrl: defaultBotImageUrl,
  shots: [],

  randomMove: () => {
    const directions: TMoveDirection[] = ["left", "right", "up", "down"];
    const randomDirection =
      directions[Math.floor(Math.random() * directions.length)];

    set((state) => {
      const newPosition = { ...state.position };

      switch (randomDirection) {
        case "left":
          newPosition.x = Math.max(newPosition.x - 20, 0); // Ограничиваем левую границу
          state.directionX = "left";
          break;
        case "right":
          newPosition.x = Math.min(newPosition.x + 20, 800); // Ограничиваем правую границу
          state.directionX = "right";
          break;
        case "up":
          newPosition.y = Math.min(newPosition.y + 10, 600); // Ограничиваем верхнюю границу
          break;
        case "down":
          newPosition.y = Math.max(newPosition.y - 10, 250); // Ограничиваем нижнюю границу на 250
          break;
        default:
          break;
      }

      return {
        position: newPosition,
      };
    });
  },

  shoot: (endPosition: { x: number; y: number }) => {
    set((state) => {
      const newShot: IShot = {
        currentPosition: { ...state.position }, // Начальная позиция - текущее положение бота
        endPosition: endPosition, // Конечная позиция - переданная в функцию
      };
      return { shots: [...state.shots, newShot] }; // Добавляем новый выстрел в массив
    });
  },

  updateShots: () => {
    set((state) => {
      const updatedShots = state.shots
        .map((shot) => {
          const deltaX = shot.endPosition.x - shot.currentPosition.x;
          const deltaY = shot.endPosition.y - shot.currentPosition.y;
          const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
          const speed = 60;

          if (distance > speed) {
            const newCurrentPosition = {
              x: shot.currentPosition.x + (deltaX / distance) * speed,
              y: shot.currentPosition.y + (deltaY / distance) * speed,
            };

            return { ...shot, currentPosition: newCurrentPosition }; // Обновляем текущую позицию
          } else {
            return null; // Возвращаем null, если снаряд достиг конечной позиции
          }
        })
        .filter((shot) => shot !== null); // Удаляем null значения

      return { shots: updatedShots }; // Обновляем массив выстрелов
    });
  },
}));

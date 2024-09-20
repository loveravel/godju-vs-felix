import { create } from "zustand";
import defaultPlayerImageUrl from "/felix.png";

export type TMoveDirectionX = "left" | "right";
export type TMoveDirection = TMoveDirectionX | "jump";

interface IPlayerStore {
  position: { x: number; y: number };
  directionX: TMoveDirectionX;
  jumpHeight: number;
  isJumping: boolean;
  MAX_JUMP_HEIGHT: number;
  JUMP_SPEED: number;
  GRAVITY: number;
  move: (direction: TMoveDirection) => void;
  updateJump: () => void;
  imageUrl: string;
  isDead: boolean;
  setIsDead: (isDead: boolean) => void;
}

export const usePlayerStore = create<IPlayerStore>((set) => ({
  position: { x: 0, y: 10 },
  jumpHeight: 0,
  isJumping: false,
  MAX_JUMP_HEIGHT: 120,
  JUMP_SPEED: 20,
  GRAVITY: 15,
  directionX: "left",
  imageUrl: defaultPlayerImageUrl,
  isDead: false,

  move: (direction: TMoveDirection) => {
    set((state) => {
      const newPosition = { ...state.position };

      switch (direction) {
        case "left":
          newPosition.x = Math.max(newPosition.x - 20, 0); // Ограничиваем левую границу
          state.directionX = "left";
          break;
        case "right":
          newPosition.x = Math.min(newPosition.x + 20, 900); // Ограничиваем правую границу
          state.directionX = "right";
          break;
        case "jump":
          if (!state.isJumping) {
            state.isJumping = true;
            state.jumpHeight = 0;
          }
          break;
        default:
          break;
      }

      return {
        position: newPosition,
        jumpHeight: state.jumpHeight,
        isJumping: state.isJumping,
      };
    });
  },

  updateJump: () => {
    set((state) => {
      let newJumpHeight = state.jumpHeight;

      if (state.isJumping) {
        if (newJumpHeight < state.MAX_JUMP_HEIGHT) {
          newJumpHeight += state.JUMP_SPEED; // Увеличиваем высоту прыжка
        } else {
          state.isJumping = false; // Достигли максимальной высоты
        }
      } else if (newJumpHeight > 0) {
        newJumpHeight -= state.GRAVITY; // Падение
      }
      return { jumpHeight: newJumpHeight };
    });
  },

  setIsDead: (isDead: boolean) => set(() => ({ isDead })),
}));

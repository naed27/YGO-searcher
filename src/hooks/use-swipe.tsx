import { useDrag } from "@use-gesture/react";

interface Props {
  onUp?: () => void;
  onDown?: () => void;
  onLeft?: () => void;
  onRight?: () => void;
  threshold?: number;
}

const defaultThreshold = 0.3;
const defaultCallback = () => {};

const useSwipe = ({
  onUp = defaultCallback,
  onDown = defaultCallback,
  onLeft = defaultCallback,
  onRight = defaultCallback,
  threshold = defaultThreshold,
}: Props = {}) => {

  const bind = useDrag(({ last, velocity: [vx, vy], direction: [dx, dy] }) => {

    if (Math.abs(vx) > Math.abs(vy)) {
      if (dx === -1 && last && Math.abs(vx) > threshold) {
        onLeft();
      } else if (dx === 1 && last && Math.abs(vx) > threshold) {
        onRight();
      }
    } else {
      if (dy === -1 && last && Math.abs(vy) > threshold) {
        onUp();
      } else if (dy === 1 && last && Math.abs(vy) > threshold) {
        onDown();
      }
    }
    
  });

  return bind;
};

export default useSwipe;

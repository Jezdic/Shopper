import { animated, useTransition } from "react-spring";
import useEscape from "../utils/useEscape";

const options = {
  from: { opacity: 0 },
  enter: { opacity: 1 },
  leave: { opacity: 0 },
  delay: 200,
};

const ModalOverlay = ({ close, toggle }) => {
  const transitions = useTransition(toggle, options);
  useEscape(close);

  return transitions(
    (animationStyles, item) =>
      item && (
        <animated.div
          onClick={close}
          className='fixed top-0 left-0 w-screen h-screen bg-black/60 z-10 '
          style={animationStyles}
        ></animated.div>
      )
  );
};

export default ModalOverlay;

import { Link } from "react-router-dom";
import { animated, useTransition } from "react-spring";

const options = {
  from: { opacity: 0, y: -500 },
  enter: { opacity: 1, y: 0 },
  leave: { opacity: 0, y: -500 },
};

const CartPreview = ({ open }) => {
  const transitions = useTransition(open, options);
  const cartItems = JSON.parse(localStorage.getItem("cartItems"));

  return transitions(
    (animationStyles, item) =>
      item && (
        <animated.div
          className='absolute right-10 z-10  top-15 w-[300px] p-2'
          style={animationStyles}
        >
          {cartItems.length > 0 && (
            <div className='border rounded-md shadow-md bg-white p-2'>
              {cartItems.map((item) => (
                <div className='flex items-center justify-between mb-2 gap-4 text-xs'>
                  <img
                    src={`/img/products/${item.image}`}
                    width={75}
                    alt={item.name}
                  />
                  <span>{item.name}</span>
                  <span>{item.size}</span>
                  <span>${item.price}</span>
                </div>
              ))}
              <div className='flex items-center mt-4 border-t-2 pt-2 justify-end'>
                <div>
                  Total: $
                  {cartItems
                    .reduce((acc, curr) => acc + curr.price, 0)
                    .toFixed(2)}
                </div>
              </div>
            </div>
          )}
        </animated.div>
      )
  );
};

export default CartPreview;

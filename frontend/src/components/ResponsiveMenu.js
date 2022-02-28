import { Link } from "react-router-dom";
import { animated, useTransition } from "react-spring";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineAccountCircle } from "react-icons/md";
import { logout } from "../actions/userActions";
import { AiOutlineClose } from "react-icons/ai";

import CartButton from "./CartButton";

const options = {
  from: { x: 700, opacity: 0 },
  enter: { x: 0, opacity: 1 },
  leave: { x: 700, opacity: 0 },
};

const ResponsiveMenu = ({ toggle, toggleSignup, closeMenu }) => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();

  const transitions = useTransition(toggle, options);

  const handleLogout = () => {
    dispatch(logout());
  };

  return transitions(
    (animationStyles, item) =>
      item && (
        <animated.div
          className='fixed right-0 top-0 w-screen h-screen bg-purple-500 p-4 gap-10 z-10 text-4xl flex flex-col justify-center rounded-b-xl text-white pl-8'
          style={animationStyles}
          onClick={closeMenu}
        >
          <AiOutlineClose size={50} className='absolute top-4 right-4 ' />
          <CartButton />
          <Link to='/'>Home</Link>
          <Link to='/products'>Shop</Link>
          {userInfo && (
            <Link to='/profile' className='cursor-pointer '>
              <MdOutlineAccountCircle size={25} className='inline' />
              {userInfo.name}
            </Link>
          )}
          {userInfo && (
            <button onClick={handleLogout} className=' cursor-pointer'>
              {" "}
              Log out
            </button>
          )}
          {!userInfo && <button onClick={toggleSignup}>Log in</button>}
        </animated.div>
      )
  );
};

export default ResponsiveMenu;

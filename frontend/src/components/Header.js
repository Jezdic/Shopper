import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { MdOutlineAccountCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import CartButton from "./CartButton";
import ResponsiveMenu from "./ResponsiveMenu";

import SignUp from "./SignUp";
import CartPreview from "./CartPreview";

const Header = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [cartPreview, setCartPreview] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  const menuItemClass = "text-gray-600 p-4 cursor-pointer hover:text-blue-400";

  return (
    <header className='container mx-auto z-[11] p-5 mb-20 '>
      <nav className='flex items-center justify-between text-center '>
        <Link to='/'>
          <div className='flex items-center md:mb-0 mb-3 justify-center'>
            <img src='/images/logo.jpg' alt='logo' width={50} />
            <h1 className='text-3xl ml-2 text-gray-600'>Shopper</h1>
          </div>
        </Link>
        <div className='hidden md:block'>
          <Link to='/' className={menuItemClass}>
            Home
          </Link>
          <Link to='/products' className={`${menuItemClass} mr-2`}>
            Shop
          </Link>
          {userInfo && userInfo.isAdmin && (
            <Link to='/admindashboard' className={menuItemClass}>
              admin panel
            </Link>
          )}
          <CartButton setCartPreview={setCartPreview} />
          <CartPreview open={cartPreview} close={() => setCartPreview(false)} />
          {userInfo && (
            <Link to='/profile' className='cursor-pointer p-4 text-gray-600'>
              <MdOutlineAccountCircle size={25} className='inline' />
              {userInfo.name}
            </Link>
          )}
          {userInfo && (
            <button
              onClick={handleLogout}
              className='ml-2 cursor-pointer text-gray-600 hover:text-red-500'
            >
              {" "}
              Log out
            </button>
          )}
          {!userInfo && (
            <button
              onClick={() => setSignupOpen(true)}
              className={menuItemClass}
            >
              Log in
            </button>
          )}
        </div>
        <div className='md:hidden relative '>
          <GiHamburgerMenu
            size={40}
            className='md:hidden cursor-pointer text-purple-500'
            onClick={() => setMenuOpen(true)}
          />

          <ResponsiveMenu
            toggle={menuOpen}
            closeMenu={() => setMenuOpen(false)}
            toggleSignup={() => setSignupOpen(true)}
          />
        </div>
      </nav>
      <SignUp open={signupOpen} onClose={() => setSignupOpen(false)} />
    </header>
  );
};

export default Header;

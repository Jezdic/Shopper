import ReactDom from "react-dom";
import { useState } from "react";
import ModalOverlay from "./ModalOverlay";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";

import { AiOutlineUser } from "react-icons/ai";

const SignUp = ({ open, onClose }) => {
  const [register, setRegister] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (userInfo) return null;

  if (!open) return null;
  return ReactDom.createPortal(
    <>
      <ModalOverlay toggle={open} close={onClose} />

      <div className='fixed top-1/2 shadow left-1/2 flex gap-5 flex-col items-center -translate-x-1/2 -translate-y-1/2 md:text-3xl py-10 px-5 md:px-20 rounded-xl text-gray-100  bg-purple-500 z-10'>
        <AiOutlineClose
          className='absolute top-2 right-2 cursor-pointer'
          onClick={onClose}
        />
        <AiOutlineUser size={40} />
        {register ? (
          <RegisterForm toggle={() => setRegister(false)} close={onClose} />
        ) : (
          <LoginForm toggle={() => setRegister(true)} close={onClose} />
        )}
      </div>
    </>,
    document.getElementById("modalPortal")
  );
};

export default SignUp;

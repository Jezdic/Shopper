import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";
import { login } from "../actions/userActions";

const LoginForm = ({ toggle, close }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div className='flex flex-col gap-6 items-center'>
      <h1 className='mb-5'>Log in to start shopping!</h1>
      <form
        className='flex flex-col text-gray-800 placeholder-gray-500 gap-3'
        onSubmit={handleSubmit}
      >
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='p-3 rounded-lg'
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='p-3 rounded-lg'
        />
        {error && <div className='text-red-500 '>{error}</div>}
        <button
          className='mt-4 bg-orange-400 rounded-lg p-3 hover:bg-orange-600 text-white'
          type='submit'
        >
          {loading ? <BeatLoader /> : "Log in"}
        </button>
      </form>
      <p className='text-base'>
        Don't have an account?{" "}
        <span className='underline cursor-pointer' onClick={toggle}>
          Sign up!
        </span>
      </p>
    </div>
  );
};

export default LoginForm;

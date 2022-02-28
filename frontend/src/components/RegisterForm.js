import { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";
import { register } from "../actions/userActions";

const RegisterForm = ({ toggle, close }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password));
  };

  return (
    <div className='flex flex-col gap-6 items-center'>
      <h1 className='mb-5'>Sign up to get started!</h1>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col text-gray-800 placeholder-gray-500 gap-3'
      >
        <input
          type='email'
          required
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='p-3 rounded-lg'
        />
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder='Name'
          className='p-3 rounded-lg'
        />
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
          className='p-3 rounded-lg'
          required
        />
        {error && <div className=' text-sm'>{error}</div>}
        <button
          className='mt-4 bg-orange-400 rounded-lg p-3 hover:bg-orange-600 text-white'
          type='submit'
        >
          Sign up
        </button>
      </form>
      <p className='text-base'>
        Already have an account?{" "}
        <span className='underline cursor-pointer' onClick={toggle}>
          Sign in!
        </span>
      </p>
    </div>
  );
};

export default RegisterForm;

import { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";
import { register } from "../actions/userActions";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");

  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password, passwordConfirm));
  };

  return (
    <div className='mt-40'>
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='email'>Email</label>
        <input
          id='email'
          value={email}
          type='text'
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor='name'>Name</label>
        <input
          id='name'
          value={name}
          type='text'
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor='password'>Password</label>
        <input
          id='password'
          value={password}
          type='password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor='paswordConfirm'>Confirm Password</label>
        <input
          id='paswordConfirm'
          value={passwordConfirm}
          type='password'
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <div className='error'></div>
        <button type='submit'>{loading ? <BeatLoader /> : "Sign up"}</button>
      </form>
      {error && <div className='absolute '>{error}</div>}
      <div>
        ALready have an account?{" "}
        <Link to='/login' className='underline'>
          Log in!
        </Link>
      </div>
    </div>
  );
};

export default Signup;

import { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";
import { login } from "../actions/userActions";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div className='mt-40'>
      <h1>Sign in</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='email'>Email</label>
        <input
          id='email'
          value={email}
          type='text'
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor='password'>Password</label>
        <input
          id='password'
          value={password}
          type='password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className='error'></div>
        <button type='submit'>{loading ? <BeatLoader /> : "Login"}</button>
      </form>
      {error && <div>{error}</div>}
      <div>
        New here?{" "}
        <Link to='/signup' className='underline'>
          Sign up!
        </Link>
      </div>
    </div>
  );
};

export default Login;

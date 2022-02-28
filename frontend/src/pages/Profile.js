import { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BeatLoader } from "react-spinners";
import { getUserDetails, updateUserProfile } from "../actions/userActions";

const Profile = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userUpdate = useSelector((state) => state.userUpdate);
  const { success } = userUpdate;

  useEffect(() => {
    if (!user.name) {
      dispatch(getUserDetails("profile"));
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile({ name, email, password }));
  };

  return (
    <div className='mt-20 mb-[20rem] bg-purple-500 text-white sm:w-2/3 md:w-1/4 mx-auto rounded-xl flex flex-col items-center p-5 lg:p-10 text-xl'>
      <h1 className='text-2xl mb-4'>My profile</h1>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col gap-2 items-center'
      >
        <label htmlFor='email'>Email</label>
        <input
          id='email'
          value={email}
          type='text'
          className='text-black p-1 rounded-md'
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor='name'>Name</label>
        <input
          id='name'
          className='text-black p-1 rounded-md'
          value={name}
          type='text'
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor='password'>Password</label>
        <input
          id='password'
          className='text-black p-1 rounded-md'
          value={password}
          type='password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor='paswordConfirm'>Confirm Password</label>
        <input
          id='paswordConfirm'
          value={passwordConfirm}
          className='text-black p-1 rounded-md'
          type='password'
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <div className='error'>{error}</div>
        {success && <div>Updated successfully</div>}
        <button
          type='submit'
          className='bg-orange-500 px-2 py-1 rounded-md hover:bg-orange-700'
        >
          {loading ? <BeatLoader /> : "Update"}
        </button>
      </form>
    </div>
  );
};

export default Profile;

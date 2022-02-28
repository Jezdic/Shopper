import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BeatLoader } from "react-spinners";
import { getUserDetails, editUser } from "../actions/userActions";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userEdit = useSelector((state) => state.userEdit);
  const { loading: loadingEdit, error: errorEdit, success } = userEdit;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    dispatch(getUserDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (success) {
      dispatch({ type: "USER_EDIT_RESET" });
      return navigate("/admindashboard");
    }

    if (!user) return;
    setName(user.name);
    setEmail(user.email);
    setIsAdmin(user.isAdmin);
  }, [user, dispatch, navigate, success]);

  const handleEdit = (e) => {
    e.preventDefault();

    dispatch(editUser(id, { name, email, isAdmin }));
  };

  return (
    <>
      <Link
        to='/admindashboard'
        className='bg-blue-500 text-white px-2 py-1 rounded-md ml-10'
      >
        Back
      </Link>
      <div className='w-2/5 p-5 text-white bg-blue-500 rounded-xl mx-auto mb-[25rem]'>
        <h1 className='text-3xl border-b-2'>Edit User</h1>
        {loading ? (
          <BeatLoader />
        ) : error ? (
          <div>Something went wrong</div>
        ) : (
          <div>
            <form
              onSubmit={handleEdit}
              className='flex p-2 w-2/3 flex-col gap-2 text-xl'
            >
              Name
              <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='p-1 rounded-md text-black'
              />
              Email
              <input
                type='text'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='p-1 rounded-md text-black'
              />
              <div>
                Admin
                <input
                  className='ml-1'
                  type='checkbox'
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                />
              </div>
              <button
                className='bg-blue-700 mt-2 w-1/3 px-2 py-1 rounded-md hover:bg-blue-800'
                type='submit'
              >
                {loadingEdit ? <BeatLoader /> : "Edit"}
              </button>
            </form>
            {errorEdit && <div>errorEdit</div>}
          </div>
        )}
      </div>
    </>
  );
};

export default EditUser;

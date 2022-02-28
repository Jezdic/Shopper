import { useEffect } from "react";
import { listUsers, deleteUser } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PulseLoader } from "react-spinners";

const UsersPage = () => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;
  const userDelete = useSelector((state) => state.userDelete);
  const { success } = userDelete;

  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch, success]);

  const deleteHandler = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <div>
      {loading ? (
        <PulseLoader />
      ) : error ? (
        <div>Something went wrong</div>
      ) : (
        <div>
          <h1 className='text-3xl ml-4'>Users</h1>
          <table className='min-w-full'>
            <thead className='bg-white border-b'>
              <tr>
                <th className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                  ID
                </th>
                <th className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                  Name
                </th>
                <th className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                  Email
                </th>
                <th className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                  Role
                </th>
                <th className='text-sm font-medium text-gray-900 px-6 py-4 text-left'></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <tr
                  key={user._id}
                  className={`${i % 2 ? "bg-white" : "bg-gray-100"} border-b`}
                >
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                    {user._id}
                  </td>
                  <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                    {user.name}
                  </td>
                  <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                    {user.email}
                  </td>
                  <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                    {user.isAdmin ? "Admin" : "User"}
                  </td>
                  <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                    <Link
                      to={`user/${user._id}`}
                      className='px-2 py-1 bg-blue-600 rounded-md mr-4 text-white'
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteHandler(user._id)}
                      className='px-2 py-1 bg-red-600 rounded-md text-white'
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UsersPage;

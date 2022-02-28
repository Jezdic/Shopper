import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import OrdersList from "../components/OrdersList";

import ProductList from "../components/ProductList";

import UsersPage from "../components/UsersPage";

const Success = () => {
  const [displayed, setDisplayed] = useState(true);
  setTimeout(() => setDisplayed(false), 3000);

  return (
    <>
      {displayed && (
        <div className='p-5 fixed top-0 left-1/2 -translate-x-1/2 bg-green-400 text-white rounded-b-lg '>
          Updated successfully!
        </div>
      )}
    </>
  );
};

const Dashboard = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const success = params.get("success");

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) navigate("/");
  }, [userInfo, navigate]);

  return (
    <div>
      {success && <Success />}
      <ProductList />
      <UsersPage />
      <OrdersList />
    </div>
  );
};

export default Dashboard;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listOrders } from "../actions/orderActions";
import { Link } from "react-router-dom";

import { BeatLoader } from "react-spinners";

const OrdersList = () => {
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listOrders());
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        <BeatLoader />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div>
          <h1 className='text-3xl ml-4 mt-4'>Orders</h1>
          <table className='min-w-full'>
            <thead className='bg-white border-b'>
              <tr>
                <th className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                  ID
                </th>
                <th className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                  User
                </th>
                <th className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                  Payment type
                </th>
                <th className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                  Shipping
                </th>
                <th className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                  Items price
                </th>
                <th className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                  Total price
                </th>
                <th className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                  Payment status
                </th>
                <th className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                  Delivery status
                </th>
                <th className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, i) => (
                <tr
                  key={order._id}
                  className={`${i % 2 ? "bg-white" : "bg-gray-100"} border-b`}
                >
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                    {order._id}
                  </td>
                  <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                    {order.user.name}
                  </td>
                  <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                    {order.paymentType}
                  </td>
                  <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                    ${order.shippingPrice}
                  </td>
                  <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                    ${order.itemsPrice}
                  </td>
                  <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                    ${order.totalPrice}
                  </td>
                  <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                    {order.isPaid ? "Yes" : "No"}
                  </td>
                  <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                    {order.isDelivered ? "Delivered" : "Pending"}
                  </td>
                  <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                    {order.createdAt}
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

export default OrdersList;

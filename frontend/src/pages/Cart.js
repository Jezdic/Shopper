import { isValidElement, useEffect } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { FaTrashAlt } from "react-icons/fa";
import Shipping from "./Shipping";
import Payment from "../components/Payment";

const Cart = () => {
  const { id } = useParams();

  const [searchParams] = useSearchParams();
  const size = searchParams.get("size");

  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.userLogin);

  const total = +cartItems
    .reduce((acc, curr) => acc + curr.price, 0)
    .toFixed(2);

  useEffect(() => {
    if (
      id &&
      !cartItems.some((item) => item.product === id && item.size === size)
    ) {
      dispatch(addToCart(id, size));
    }
  }, [id, dispatch, size]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleRemove = (id, size) => {
    dispatch(removeFromCart(id, size));
  };

  return (
    <div className='mt-40 mb-[25rem] pl-5 lg:mx-auto flex flex-col lg:w-2/3 md:pl-40 lg:scale-[1.1]'>
      <Link
        to='/products'
        className='px-2 py-1 w-[7rem] bg-purple-500 rounded-md hover:bg-purple-700 text-white'
      >
        Back to Shop
      </Link>

      {cartItems.length === 0 ? (
        <h1 className='text-3xl mt-6'>Your Cart is empty!</h1>
      ) : (
        <>
          <h1 className='text-3xl my-8'>
            Your cart: {cartItems.length} item{cartItems.length > 1 && "s"}, $
            {total} total
          </h1>
          <div className='flex text-sm'>
            <div className='flex flex-col md:gap-4 w-3/5'>
              {cartItems.map((item) => (
                <div className='flex gap-8 border-b justify-between pb-2'>
                  <img
                    src={`/img/products/${item.image}`}
                    width={100}
                    alt={item.name}
                  />
                  <span className='w-1/4'>{item.name}</span>
                  <div className='flex gap-5 justify-between sm:flex-row sm:w-2/5 flex-col'>
                    <span>${item.price}</span>
                    <span>{item.size}</span>
                    <FaTrashAlt
                      className='cursor-pointer'
                      onClick={() => handleRemove(item.product, item.size)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          {userInfo ? (
            <div>
              <div className='bg-orange-500 text-white sm:w-1/2 w-2/3 p-2 rounded-md mt-4'>
                {total > 50
                  ? "Free shipping for total above $50"
                  : `You need $${(50 - total).toFixed(
                      2
                    )} more for free shipping!`}
              </div>
              <Shipping />
              {localStorage.getItem("shippingAddress") && <Payment />}
            </div>
          ) : (
            <div className='border md:w-1/2 rounded-xl mt-10 text-xl p-2 md:p-5 bg-red-700 text-white border-red-600 flex justify-center'>
              Please log in to continue with your purchase!
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;

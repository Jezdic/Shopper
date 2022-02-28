import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector } from "react-redux";

const CartIcon = ({ setCartPreview }) => {
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <Link
      to='/cart'
      onMouseEnter={() => setCartPreview && setCartPreview(true)}
      onMouseLeave={() => setCartPreview && setCartPreview(false)}
      onClick={() => setCartPreview && setCartPreview(false)}
      className='text-gray-100 p-2 z-[12] relative bg-purple-500 rounded-full cursor-pointer hover:bg-purple-700'
    >
      <AiOutlineShoppingCart className='inline-block mb-1' /> Cart (
      {cartItems.length})
    </Link>
  );
};

export default CartIcon;

import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";

const Product = ({ product }) => {
  const navigate = useNavigate();
  const [chosenSize, setChosenSize] = useState();
  const [btnText, setBtnText] = useState("Add to cart");

  const handleAddToCart = () => {
    if (chosenSize) return navigate(`/cart/${product._id}?size=${chosenSize}`);
    setBtnText("Choose size");
  };

  return (
    <div className='flex flex-col  gap-2 p-2'>
      <img src={`/img/products/${product.image}`} alt='product' className='' />

      <Link to={`/product/${product._id}`}></Link>
      <div className='h-12'>
        <h1 className='text-sm mb-2 wrap'>{product.name}</h1>
      </div>
      <div className='flex flex-wrap relative'>
        {product.sizes.map((size) => (
          <span
            onClick={() => {
              setChosenSize(size);
              setBtnText("Add to cart");
            }}
            className={`border mr-1 p-1 hover:bg-gray-500 hover:text-white cursor-pointer ${
              chosenSize === size && "bg-gray-500 text-white"
            }`}
          >
            {size}
          </span>
        ))}
      </div>
      <div className='font-medium'>${product.price}</div>
      <button
        onClick={handleAddToCart}
        className={`flex bg-orange-400 justify-center items-center p-1 rounded text-white hover:bg-orange-600 ${
          btnText === "Choose size" && "bg-red-600"
        }`}
      >
        <AiOutlineShoppingCart />
        {btnText}
      </button>
      <Link
        to={`/product/${product._id}`}
        className='bg-purple-500 p-1 rounded text-center text-white hover:bg-purple-700'
      >
        Details
      </Link>
    </div>
  );
};

export default Product;

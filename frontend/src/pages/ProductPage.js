import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { listProductDetails } from "../actions/productActions";
import { useNavigate } from "react-router-dom";

import { BeatLoader } from "react-spinners";
import Message from "../components/Message";
import FeaturedProduct from "../components/FeaturedProduct";

const ProductPage = () => {
  const navigate = useNavigate();
  const [chosenSize, setChosenSize] = useState();

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const { id } = useParams();

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAddToCart = () => navigate(`/cart/${id}?size=${chosenSize}`);

  return (
    <div className='lg:mx-40  sm:ml-20 mb-[30rem]'>
      <Link to='/products'>
        <button className='px-2 py-1 bg-purple-500 rounded-md hover:bg-purple-700 text-white m-10'>
          Go to Shop
        </button>
      </Link>
      {loading ? (
        <BeatLoader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <div className='flex items-center flex-col md:flex-row gap-4 ml-10'>
          <img
            src={`/img/products/${product.image}`}
            alt={product.name}
            width={300}
          />
          <div className='md:w-1/4 flex flex-col gap-4'>
            <h1 className='text-3xl text-gray-500'>{product.name}</h1>
            <div>{product.description}</div>

            <div className='text-xl font-bold'>${product.price}</div>
          </div>
          <div className='border rounded-md self-center p-4'>
            <div className='flex mb-3 justify-between'>
              <span>Brand:</span>
              <span>{product.brand}</span>
            </div>
            <div className='flex mb-3 justify-between'>
              <span>Price:</span>
              <span>${product.price}</span>
            </div>
            <div className='flex flex-col mb-3 gap-2'>
              <span>Choose your size:</span>
              <div>
                {product.sizes.map((size) => (
                  <span
                    onClick={() => setChosenSize(size)}
                    className={`border mr-2 p-1 hover:bg-gray-500 hover:text-white cursor-pointer ${
                      chosenSize === size && "bg-gray-500 text-white"
                    }`}
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={!chosenSize}
              className='px-2 py-1 disabled:bg-gray-500 bg-purple-500 hover:bg-purple-700 text-white rounded-md'
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;

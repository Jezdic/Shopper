import { Link } from "react-router-dom";

const FeaturedProduct = ({ product }) => {
  return (
    <div className='flex flex-col border gap-2 w-full  p-2'>
      <img
        src={`/img/products/${product.image}`}
        alt='product'
        className='w-full'
      />

      <Link to={`/product/${product._id}`}></Link>
      <div className='h-12'>
        <h1 className='text-md mb-2'>{product.name}</h1>
      </div>
      <div className='font-medium'>${product.price}</div>
      <Link
        to={`/product/${product._id}`}
        className='bg-purple-500 p-1 rounded text-center text-white hover:bg-purple-700'
      >
        Details
      </Link>
    </div>
  );
};

export default FeaturedProduct;

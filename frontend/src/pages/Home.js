import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { BeatLoader } from "react-spinners";

import Message from "../components/Message";
import FeaturedProduct from "../components/FeaturedProduct";
import CtaButton from "../components/CtaButton";
import FeaturedItems from "../components/FeaturedItems";
import SubscribePanel from "../components/SubscribePanel";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className='container  mx-auto'>
      {/* Add hero component */}
      <div className='md:flex'>
        <div className='md:w-2/5 text-gray-600 flex flex-col md:ml-0 text-center  justify-center'>
          <h2 className='text-3xl'>Welcome to the store</h2>
          <p>We have really nice products</p>
          <p>Buy some products from us.</p>
          <Link
            to='/products'
            className='self-center bg-purple-500  rounded-full py-2 px-4 text-gray-100 mt-4 cursor-pointer hover:bg-purple-700 text-md '
          >
            SHOP NOW
          </Link>
        </div>
        <div className='md:w-3/5'>
          <img src='/images/heroimg.jpg' alt='banner' />
        </div>
      </div>
      {/* Featured items component */}
      <FeaturedItems />
      <SubscribePanel />
    </div>
    // <div className='px-20 py-5 mt-20'>
    //   <h1 className='text-4xl mb-4'>Newest Items</h1>
    //   {loading ? (
    //     <BeatLoader />
    //   ) : error ? (
    //     <Message>{error}</Message>
    //   ) : (
    //     <div className='flex flex-wrap gap-6'>
    //       {products.map((product) => (
    //         <Product product={product} key={product._id} />
    //       ))}
    //     </div>
    //   )}
    // </div>
  );
};

export default Home;

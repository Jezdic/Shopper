import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import CtaButton from "../components/CtaButton";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";

import FeaturedProduct from "./FeaturedProduct";

import { Pagination, Scrollbar, A11y, Autoplay, Keyboard } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/bundle";

import { listFeaturedItems } from "../actions/productActions";
import { BeatLoader } from "react-spinners";

const FeaturedItems = () => {
  const dispatch = useDispatch();
  const swiperRef = useRef(null);

  const productList = useSelector((state) => state.featuredProducts);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listFeaturedItems());
  }, [dispatch]);

  return (
    <div className='my-20 p-2'>
      <div className='flex justify-between items-end mb-2 '>
        <h2 className='text-xl md:text-3xl text-gray-600'>Featured items</h2>
        <Link
          to='/products'
          className='self-center bg-purple-500  rounded-full py-2 px-4 text-gray-100 mt-4 cursor-pointer hover:bg-purple-700 text-md '
        >
          <div className='flex items-center gap-1'>
            View all <AiOutlineArrowRight />
          </div>
        </Link>
      </div>
      {loading ? (
        <BeatLoader />
      ) : (
        // <div className='flex flex-col md:flex-row md:w-full gap-2 mt-2 py-2 '>
        <>
          <div
            onMouseEnter={() => swiperRef.current.swiper.autoplay.stop()}
            onMouseLeave={() => swiperRef.current.swiper.autoplay.start()}
          >
            <Swiper
              ref={swiperRef}
              modules={[Pagination, Scrollbar, A11y, Autoplay, Keyboard]}
              spaceBetween={15}
              slidesPerView={3}
              keyboard
              pause
              loop
              autoplay={{ delay: 1300 }}
              className='hidden md:block'
              onMouseEnter={() => alert("hi")}
            >
              {products.map((product) => (
                <SwiperSlide key={product._id}>
                  <FeaturedProduct product={product} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className='md:hidden grid grid-flow-row sm:grid-cols-2 gap-2'>
            {products.slice(0, 4).map((product) => (
              <FeaturedProduct key={product._id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FeaturedItems;

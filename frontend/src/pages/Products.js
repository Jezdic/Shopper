import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product";
import { listProducts } from "../actions/productActions";
import { FadeLoader } from "react-spinners";
import { AiOutlineClose } from "react-icons/ai";

import Pagination from "../components/product_filters/Pagination";
import Categories from "../components/product_filters/Categories";
import Brands from "../components/product_filters/Brands";
import Sizes from "../components/product_filters/Sizes";
import Search from "../components/product_filters/Search";
import Prices from "../components/product_filters/Prices";

const Products = () => {
  const dispatch = useDispatch();
  const { products, pages, loading, error } = useSelector(
    (state) => state.productList
  );
  const [toggleFilters, setToggleFilters] = useState(false);
  const [currPage, setCurrPage] = useState(1);
  const [category, setCategory] = useState("");
  const [categoryQuery, setCategoryQuery] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [brandQuery, setBrandQuery] = useState("");
  const [sizeQuery, setSizeQuery] = useState("");
  const [priceQuery, setPriceQuery] = useState("");
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [keyword, setKeyword] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const query = `page=${currPage}${categoryQuery}${sortBy}${brandQuery}${sizeQuery}${priceQuery}${searchQuery}`;

  useEffect(() => {
    dispatch(listProducts(query));
  }, [dispatch, query]);

  useEffect(
    () =>
      category
        ? setCategoryQuery(`&category=${category}`)
        : setCategoryQuery(""),
    [category, setCategoryQuery]
  );

  useEffect(
    () => setCurrPage(1),
    [categoryQuery, sortBy, brandQuery, sizeQuery, priceQuery, searchQuery]
  );

  const handleChangeSort = (e) => {
    setSortBy(e.target.value);
  };

  const handleToggleBrand = (e) => {
    const { value, checked } = e.target;

    if (checked) return setBrandQuery((q) => `${q}${value}`);

    setBrandQuery((q) => q.replace(value, ""));
  };

  const handleToggleSize = (e) => {
    const { value, checked } = e.target;

    if (checked) return setSizeQuery((q) => `${q}${value}`);

    setSizeQuery((q) => q.replace(value, ""));
  };

  const handlePriceQuery = (e) => {
    e.preventDefault();
    if (isNaN(+priceFrom) || isNaN(+priceTo)) return;
    setPriceQuery(
      `${priceFrom && `&price[gte]=${priceFrom}`}${
        priceTo && `&price[lte]=${priceTo}`
      }`
    );
  };

  const resetKeyword = () => {
    setKeyword("");
    setSearchQuery("");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword) setSearchQuery(`&name=${keyword}`);
  };

  const handleChangeKeyword = (e) => {
    setKeyword(e.target.value);
    if (!e.target.value) return setSearchQuery("");
  };

  return (
    <div className='flex p-10 mt-20 xl:ml-20'>
      <div className='w-1/5 p-10 gap-2 hidden lg:flex flex-col border bg-purple-500 rounded-xl text-white'>
        <Search
          handleSearch={handleSearch}
          handleChangeKeyword={handleChangeKeyword}
          keyword={keyword}
          resetKeyword={resetKeyword}
        />
        <Categories
          setCategory={setCategory}
          setCategoryQuery={setCategoryQuery}
          category={category}
        />
        <Prices
          handlePriceQuery={handlePriceQuery}
          setPriceFrom={setPriceFrom}
          setPriceTo={setPriceTo}
          priceFrom={priceFrom}
          priceTo={priceTo}
        />
        <Brands handleToggleBrand={handleToggleBrand} />
        <Sizes handleToggleSize={handleToggleSize} />
      </div>

      {toggleFilters && (
        <div className='fixed top-0 left-0 flex flex-wrap gap-5 items-start md:pl-20  sm:py-40 p-10 overflow-scroll h-screen text-white z-10 w-screen bg-purple-500'>
          <button
            onClick={() => setToggleFilters(false)}
            className='absolute top-10 right-3 bg-orange-500 rounded-md px-2 py-1'
          >
            Save
          </button>
          <Search
            handleSearch={handleSearch}
            handleChangeKeyword={handleChangeKeyword}
            keyword={keyword}
            resetKeyword={resetKeyword}
            mobile
          />
          <Categories
            setCategory={setCategory}
            setCategoryQuery={setCategoryQuery}
            category={category}
          />
          <Prices
            handlePriceQuery={handlePriceQuery}
            setPriceFrom={setPriceFrom}
            setPriceTo={setPriceTo}
            priceFrom={priceFrom}
            priceTo={priceTo}
          />
          <Brands handleToggleBrand={handleToggleBrand} />
          <Sizes handleToggleSize={handleToggleSize} />
        </div>
      )}

      <div className='lg:w-3/5 w-full text-gray-700  relative grid grid-flow-row lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-3 p-4'>
        {loading ? (
          <FadeLoader
            color='#a855f7'
            className='absolute left-1/2 -translate-x-1/2'
          />
        ) : error ? (
          <div>Something went wrong</div>
        ) : (
          <>
            <button
              onClick={() => setToggleFilters(true)}
              className='bg-purple-500 fixed z-2 text-white rounded-md top-20 right-0 lg:hidden p-2'
            >
              Filters
            </button>
            <div className='absolute lg:left-0 lg:-top-10 lg:translate-x-0 left-1/2 -translate-x-1/2 -top-20'>
              <span className='hidden sm:inline'>Sort by : </span>
              <select
                className='p-1'
                value={sortBy}
                onChange={handleChangeSort}
              >
                <option value=''>Newest</option>
                <option value='&sort=-price'>Most expensive</option>
                <option value='&sort=price'>Cheapest</option>
              </select>
            </div>

            <Pagination
              currPage={currPage}
              setCurrPage={setCurrPage}
              pages={pages}
            />

            {products.length === 0 && <div>No products found</div>}
            {products.map((pr) => (
              <Product key={pr._id} product={pr} />
            ))}
            <Pagination
              bottom
              currPage={currPage}
              setCurrPage={setCurrPage}
              pages={pages}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Products;

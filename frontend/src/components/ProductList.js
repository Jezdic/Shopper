import { useEffect, useState } from "react";
import { listProducts, deleteProduct } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BeatLoader, PulseLoader } from "react-spinners";
import Pagination from "./product_filters/Pagination";

const ProductList = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const { loading: loadingDelete, error: errorDelete, success } = productDelete;

  const [currPage, setCurrPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [keyword, setKeyword] = useState("");

  const query = `limit=8&page=${currPage}${searchQuery}`;

  useEffect(() => {
    dispatch(listProducts(query));
  }, [dispatch, query, success]);

  useEffect(() => setCurrPage(1), [searchQuery]);

  const handleChangeKeyword = (e) => {
    setKeyword(e.target.value);
    if (!e.target.value) return setSearchQuery("");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword) setSearchQuery(`&name=${keyword}`);
  };

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you wanna delete this product?"))
      dispatch(deleteProduct(id));
  };

  return (
    <div>
      {loading ? (
        <PulseLoader />
      ) : error ? (
        <div>Something went wrong</div>
      ) : (
        <div className='mb-10 relative'>
          <h1 className='text-3xl ml-4 mb-4'>Products</h1>
          <form onSubmit={handleSearch} className='mb-4'>
            <div className='ml-4'>
              <input
                type='text'
                value={keyword}
                onChange={handleChangeKeyword}
                className='p-1 border border-black rounded-md'
              />
              <button className='bg-blue-500 px-2 py-1 text-white rounded-md ml-2'>
                Search
              </button>
            </div>
          </form>
          <Link
            to='product/new'
            className='ml-4  bg-blue-500 text-white px-2 py-1 rounded-md'
          >
            Create product
          </Link>
          <Pagination
            pages={pages}
            currPage={currPage}
            setCurrPage={setCurrPage}
            bottom
            admin
          />
          <table className='min-w-full'>
            <thead className='bg-white border-b'>
              <tr>
                <th className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                  Image
                </th>
                <th className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                  Name
                </th>
                <th className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                  Brand
                </th>
                <th className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                  Category
                </th>
                <th className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                  Price
                </th>
                <th className='text-sm font-medium text-gray-900 px-6 py-4 text-left'></th>
              </tr>
            </thead>
            <tbody>
              {errorDelete && "Something went wrong."}
              {products.length === 0 && "No products found"}
              {products.map((product, i) => (
                <tr
                  key={product._id}
                  className={`${i % 2 ? "bg-white" : "bg-gray-100"} border-b`}
                >
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                    <img
                      width={100}
                      src={`/img/products/${product.image}`}
                      alt={product.name}
                    />
                  </td>
                  <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                    {product.name}
                  </td>
                  <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                    {product.brand}
                  </td>
                  <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                    {product.category}
                  </td>
                  <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                    ${product.price}
                  </td>
                  <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                    <Link
                      to={`product/${product._id}`}
                      className='px-2 py-1 bg-blue-600 rounded-md mr-4 text-white'
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => deleteHandler(product._id)}
                      className='px-2 py-1 bg-red-600 rounded-md text-white'
                    >
                      {loadingDelete ? <BeatLoader /> : "Delete"}
                    </button>
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

export default ProductList;

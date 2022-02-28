import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BeatLoader } from "react-spinners";
import {
  listProductDetails,
  editProduct,
  createProduct,
} from "../actions/productActions";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productEdit = useSelector((state) => state.productEdit);
  const {
    loading: editLoading,
    error: editError,
    success: editSuccess,
  } = productEdit;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: createLoading,
    error: createError,
    success: createSuccess,
  } = productCreate;

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [sizes, setSizes] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (id === "new") return;

    if (!product || product._id !== id) return dispatch(listProductDetails(id));
    setName(product.name);
    setBrand(product.brand);
    setCategory(product.category);
    setDescription(product.description);
    setPrice(product.price);
    setSizes(product.sizes);
  }, [dispatch, id, product]);

  useEffect(() => {
    if (editSuccess || createSuccess) {
      navigate("/admindashboard?success=true");
      dispatch({ type: "PRODUCT_EDIT_RESET" });
      dispatch({ type: "PRODUCT_CREATE_RESET" });
    }
  }, [editSuccess, createSuccess]);

  useEffect(() => {
    if (!selectedPhoto) return setPreview(undefined);

    const objectUrl = URL.createObjectURL(selectedPhoto);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedPhoto]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0)
      return setSelectedPhoto(undefined);

    setSelectedPhoto(e.target.files[0]);
  };

  console.log(sizes);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleEdit = (e) => {
    e.preventDefault();
    let form = new FormData();
    form.append("name", name);
    form.append("brand", brand);
    form.append("category", category);
    form.append("description", description);
    form.append("price", price);
    form.append("sizes", JSON.stringify(sizes));
    if (selectedPhoto) form.append("photo", selectedPhoto);

    if (id !== "new") return dispatch(editProduct(id, form));

    dispatch(createProduct(form));
  };

  return (
    <>
      <Link
        to='/admindashboard'
        className='bg-blue-500 text-white px-2 py-1 rounded-md ml-10'
      >
        Back
      </Link>
      <div className='w-2/5 p-5 text-white bg-blue-500 rounded-xl mx-auto mb-[25rem]'>
        <h1 className='text-3xl border-b-2'>
          {id === "new" ? "Create product" : "Edit product"}
        </h1>
        {loading && id !== "new" ? (
          <BeatLoader />
        ) : error ? (
          <div>Something went wrong</div>
        ) : (
          <div>
            <form
              onSubmit={handleEdit}
              className='flex p-2 w-2/3 flex-col gap-2 text-xl'
            >
              Name
              <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='p-1 rounded-md text-black'
              />
              <label>
                change photo
                <input type='file' onChange={onSelectFile} />
              </label>
              {selectedPhoto && (
                <div style={{ marginTop: "8px" }}>
                  <img width='20px' src={preview} alt='preview' />
                </div>
              )}
              Brand
              <input
                type='text'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className='p-1 rounded-md text-black'
              />
              Category
              <input
                type='text'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className='p-1 rounded-md text-black'
              />
              Description
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className='p-1 rounded-md text-black'
              />
              Price
              <input
                type='text'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className='p-1 rounded-md text-black'
              />
              Sizes
              <input
                type='text'
                value={sizes}
                onChange={(e) => setSizes(e.target.value.split(","))}
                className='p-1 rounded-md text-black'
              />
              {editError && <div>{editError}</div>}
              {createError && <div>{createError}</div>}
              <button
                className='bg-blue-700 mt-2 w-1/3 px-2 py-1 rounded-md hover:bg-blue-800'
                type='submit'
              >
                {editLoading || createLoading ? (
                  <BeatLoader />
                ) : id === "new" ? (
                  "Create"
                ) : (
                  "Edit"
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default EditProduct;

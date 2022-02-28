import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";

import { MdOutlineLocalShipping } from "react-icons/md";

const Shipping = () => {
  const { shippingAddress } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
  };

  return (
    <div className='mt-10 bg-purple-500 sm:w-3/5 mr-5 text-white rounded-xl p-5 pb-10'>
      <h1 className='text-3xl border-b-4 mb-4 '>
        <MdOutlineLocalShipping className='inline' /> Shipping info
      </h1>
      <form onSubmit={submitHandler} className='flex flex-col gap-2 w-2/3'>
        <label>Address</label>
        <input
          type='text'
          placeholder='Enter address'
          value={address}
          required
          className='text-gray-700 p-2 rounded-md'
          onChange={(e) => setAddress(e.target.value)}
        />

        <label>City</label>
        <input
          type='text'
          placeholder='Enter city'
          value={city}
          required
          className='text-gray-700 p-2 rounded-md'
          onChange={(e) => setCity(e.target.value)}
        ></input>

        <label>Postal Code</label>
        <input
          type='text'
          placeholder='Enter postal code'
          value={postalCode}
          className='text-gray-700 p-2 rounded-md'
          required
          onChange={(e) => setPostalCode(e.target.value)}
        ></input>

        <label>Country</label>
        <input
          type='text'
          placeholder='Enter country'
          value={country}
          className='text-gray-700 p-2 rounded-md'
          required
          onChange={(e) => setCountry(e.target.value)}
        ></input>

        <button
          type='submit'
          className='mt-5 w-1/2 bg-orange-500 hover:bg-orange-700 rounded-md py-1 px-2'
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default Shipping;

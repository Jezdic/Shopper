const Prices = ({
  handlePriceQuery,
  setPriceFrom,
  setPriceTo,
  priceFrom,
  priceTo,
}) => {
  return (
    <div className='flex flex-col items-start'>
      <span className='border-b-4 border-b-orange-500'>Price</span>
      <form className='flex flex-col' onSubmit={handlePriceQuery}>
        From:{" "}
        <input
          type='text'
          className='text-gray-600 w-1/2 p-1 rounded-md'
          value={priceFrom}
          onChange={(e) => setPriceFrom(e.target.value)}
        />
        To:{" "}
        <input
          type='text'
          className='text-gray-600 w-1/2 p-1 rounded-md'
          value={priceTo}
          onChange={(e) => setPriceTo(e.target.value)}
        />
        <button
          type='submit'
          className='self-start mt-2 bg-orange-500 hover:bg-orange-700 px-2 py-1 rounded-md'
        >
          Filter
        </button>
        <button
          className='self-start mt-2 bg-orange-500 hover:bg-orange-700 px-2 py-1 rounded-md'
          onClick={() => {
            setPriceTo("");
            setPriceFrom("");
          }}
        >
          Reset
        </button>
      </form>
    </div>
  );
};

export default Prices;

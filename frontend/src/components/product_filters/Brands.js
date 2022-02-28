const brands = ["Nike", "Adidas", "Converse", "Urban", "Timberland"];

const Brands = ({ handleToggleBrand }) => {
  return (
    <div className='flex flex-col items-start gap-2'>
      <span className='border-b-4 border-b-orange-500'>Brand</span>

      {brands.map((brand) => (
        <div key={brand}>
          <input
            type='checkbox'
            className=' accent-orange-500 mr-1'
            onChange={handleToggleBrand}
            value={`&brand=${brand}`}
          />
          {brand}
        </div>
      ))}
    </div>
  );
};

export default Brands;

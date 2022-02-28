const sizes = ["S", "M", "L", "XL", "XXL"];

const Sizes = ({ handleToggleSize }) => {
  return (
    <div className='flex flex-col items-start gap-0'>
      <span className='border-b-4 border-b-orange-500'>Sizes</span>

      {sizes.map((size) => (
        <div>
          <input
            type='checkbox'
            className=' accent-orange-500 mr-1'
            onChange={handleToggleSize}
            value={`&sizes=${size}`}
          />
          {size}
        </div>
      ))}
    </div>
  );
};

export default Sizes;

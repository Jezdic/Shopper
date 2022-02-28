const Search = ({
  handleSearch,
  keyword,
  handleChangeKeyword,
  resetKeyword,
  mobile,
}) => {
  return (
    <div className='flex flex-col items-start'>
      <span className='border-b-4 mb-2 border-b-orange-500'>
        {mobile ? "Item keyword" : "Seach the store"}
      </span>
      <form onSubmit={handleSearch}>
        <div>
          <input
            type='text'
            className='p-1 rounded-md w-2/3 text-gray-600'
            value={keyword}
            onChange={handleChangeKeyword}
          />
          {keyword && (
            <span className='ml-2 cursor-pointer' onClick={resetKeyword}>
              x
            </span>
          )}
        </div>
        <button className='py-1 px-2 hover:bg-orange-700 bg-orange-500 mt-2 rounded-md'>
          {mobile ? "Apply" : "Search"}
        </button>
      </form>
    </div>
  );
};

export default Search;

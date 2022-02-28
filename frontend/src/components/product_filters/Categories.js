const categories = [
  "Shoes",
  "Shirts",
  "Tracksuits",
  "Boots",
  "Hoodies",
  "Jeans",
];

const Categories = ({ setCategory, setCategoryQuery, category }) => {
  const handleChangeCategory = (e) => setCategory(e.target.innerText);

  return (
    <div className='flex flex-col items-start gap-1'>
      <span className='border-b-4 border-b-orange-500'>Category</span>
      <button
        onClick={() => setCategory("")}
        className={`py-1 px-2 hover:bg-orange-500 rounded-md ${
          !category && " bg-orange-500"
        }`}
      >
        All items
      </button>
      {categories.map((c) => (
        <button
          key={c}
          onClick={handleChangeCategory}
          className={`py-1 px-2 hover:bg-orange-500 rounded-md ${
            category === c && "bg-orange-500"
          }`}
        >
          {c}
        </button>
      ))}
    </div>
  );
};

export default Categories;

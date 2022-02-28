import {
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
} from "react-icons/bs";

const Pagination = ({ pages, setCurrPage, currPage, bottom, admin }) => {
  const position = bottom ? "-bottom-10" : "-top-10";
  const adminArrow = admin && "text-blue-500 hover:text-blue-800";
  const adminClr = admin && "bg-blue-500 hover:bg-blue-800";
  const adminCurrent = admin && "bg-blue-800";

  if (pages < 2) return null;

  return (
    <div
      className={`absolute ${position} left-1/2 -translate-x-1/2 flex items-center`}
    >
      <BsFillArrowLeftSquareFill
        size={30}
        onClick={() => currPage > 1 && setCurrPage((p) => p - 1)}
        className={`inline mr-1 text-purple-500 hover:text-orange-500 ${adminArrow} cursor-pointer ${(() =>
          currPage === 1 &&
          "text-gray-500 hover:text-gray-500 cursor-default")()}`}
      />

      {[...Array(pages).keys()].map((pg) => {
        const className =
          pg === currPage - 1
            ? `bg-orange-500 ${adminCurrent} scale-125`
            : "bg-purple-500";
        return (
          <button
            onClick={() => setCurrPage(pg + 1)}
            className={`${className} text-white py-1 px-2 hover:bg-orange-500 ${adminClr} border rounded-md`}
            key={pg}
          >
            {pg + 1}
          </button>
        );
      })}

      <BsFillArrowRightSquareFill
        onClick={() => currPage < pages && setCurrPage((p) => p + 1)}
        size={30}
        className={`inline ml-1 text-purple-500 hover:text-orange-500 ${adminArrow} cursor-pointer ${(() =>
          currPage === pages &&
          "text-gray-500 hover:text-gray-500 cursor-default")()}`}
      />
    </div>
  );
};

export default Pagination;

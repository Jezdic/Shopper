const CtaButton = ({ children }) => {
  return (
    <a className='self-center bg-purple-500  rounded-full py-2 px-4 text-gray-100 mt-4 cursor-pointer hover:bg-purple-700 text-md '>
      {children}
    </a>
  );
};

export default CtaButton;

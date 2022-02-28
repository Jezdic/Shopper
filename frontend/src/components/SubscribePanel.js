const SubscribePanel = () => {
  return (
    <div className='rounded-lg shadow-lg flex my-20 '>
      <img
        src='/images/subscribe.jpg'
        alt='subscribe'
        className='w-1/2 hidden xl:block rounded-l-lg'
      />
      <div className='bg-gradient-to-r flex xl:from-transparent xl:via-purple-800 from-purple-800 to-black w-full xl:w-1/2 rounded-lg xl:rounded-l-none'>
        <div className='p-14 text-gray-100 lg:pl-40'>
          <h3 className='text-xl font-bold '>Subscribe to our mailing list</h3>
          <p className=' mt-4 mb-10'>
            Want to be the first to receive our latest offers? Sign up with your
            email and enjoy our products!
          </p>
          <div className='flex flex-col'>
            <input
              type='text'
              className='bg-gray-600 mt-4 lg:w-2/3  placeholder-gray-400 px-4 py-3 rounded-lg focus:outline-none mb-4 text-gray-200   '
              placeholder='Enter email'
            />
            <button className='bg-red-500 lg:w-2/3  py-3 px-4 rounded-lg hover:bg-red-700'>
              Subscribe!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscribePanel;

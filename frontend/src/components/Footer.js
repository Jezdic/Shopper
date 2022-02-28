const Footer = () => {
  return (
    <footer className='px-10 md:px-20 justify-center w-screen mt-20 border-t flex flex-col items-center gap-4 md:flex-row md:justify-between py-10'>
      <div className=' flex gap-2'>
        <a>About</a>
        <a>Privacy policy</a>
        <a>Terms of service</a>
      </div>
      <p>&copy; Copyright Shopper All rights reserved</p>
    </footer>
  );
};

export default Footer;

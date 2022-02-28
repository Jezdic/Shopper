import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div className='mt-10 mb-[20rem] md:px-20'>
      <div className='flex flex-col gap-10 items-center'>
        <h1 className='text-2xl p-2 md:text-3xl '>
          Your order was completed successfully!
        </h1>
        <p className='md:text-xl p-2'>
          Thank you so much for shopping with us. Your order should arrive
          within 1 week!
        </p>
        <Link
          to='/'
          className='text-white p-2 rounded-md bg-purple-500 hover:bg-purple-700'
        >
          Back to homepage
        </Link>
      </div>
      <img src='/images/success.jpg' alt='success' />
    </div>
  );
};

export default PaymentSuccess;

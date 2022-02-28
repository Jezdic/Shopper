import { useEffect, useState } from "react";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { BsFillCreditCard2BackFill } from "react-icons/bs";
import { sendPayment } from "../actions/paymentActions";
import { BeatLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51KJg1BLgl6m4SbsLsJnXHsFxtL0dX9tfhfNR0KdMvwKj5rQZY5DqCuzJw2J9RITAevpAF7HiFLKIyB7FS9tgZGl300axTYDohU"
);

const StripeCheckout = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const handleStripe = async () => {
    const order = {
      orderItems: JSON.parse(localStorage.getItem("cartItems")),
      shippingAddress: JSON.parse(localStorage.getItem("shippingAddress")),
      paymentType: "creditCard",
    };

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      const { id: paymentId } = paymentMethod;
      dispatch(sendPayment({ ...order, paymentId }));
    }
  };

  return (
    <>
      <CardElement className='bg-white p-4 mt-2 rounded-md' />
      <button
        onClick={handleStripe}
        className='bg-orange-500 text-white hover:bg-orange-700 p-4 uppercase mt-4 rounded-md'
      >
        Confirm Order
      </button>
    </>
  );
};

const Payment = () => {
  const [paymentType, setPaymentType] = useState("creditCard");
  const [courierInstructions, setCourierInstructions] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const paymentSend = useSelector((state) => state.paymentSend);
  const { loading, error, success } = paymentSend;

  const handleChangeMethod = (e) => setPaymentType(e.target.value);

  const handleOnDelivery = () => {
    const order = {
      orderItems: JSON.parse(localStorage.getItem("cartItems")),
      shippingAddress: JSON.parse(localStorage.getItem("shippingAddress")),
      paymentType,
      courierInstructions,
    };
    dispatch(sendPayment(order));
  };

  useEffect(() => {
    if (success) {
      dispatch({ type: "PAYMENT_SEND_RESET" });
      dispatch({ type: "CART_RESET" });
      navigate("/success");
    }
  }, [success, navigate]);

  return (
    <div className='mt-10 bg-purple-500 sm:w-3/5 mr-5 text-white rounded-xl p-5 pb-10'>
      <h1 className='text-3xl border-b-4 '>Payment</h1>
      <h1 className='mt-4 text-xl mb-2'>Please select your payment type:</h1>
      <div className='flex flex-col gap-1'>
        <label>
          <input
            type='radio'
            name='method'
            value='creditCard'
            checked={paymentType === "creditCard"}
            onChange={handleChangeMethod}
          />
          Credit Card <BsFillCreditCard2BackFill className='inline' />
        </label>
        <label>
          <input
            type='radio'
            name='method'
            value='onDelivery'
            checked={paymentType === "onDelivery"}
            onChange={handleChangeMethod}
          />
          Cash On delivery <MdOutlineDeliveryDining className='inline' />
        </label>
      </div>
      {paymentType === "onDelivery" ? (
        <div className='mt-2'>
          <p>
            You will pay the courier when they deliver your products to your
            address. Please make sure to have close to the exact amount.
          </p>
          <p className='mt-2'>
            If you have any instructions for the courier, please enter them
            bellow.
          </p>
          <textarea
            className='w-2/3 mt-2 text-black p-1 rounded-md'
            value={courierInstructions}
            onChange={(e) => setCourierInstructions(e.target.value)}
          ></textarea>
          <button
            onClick={handleOnDelivery}
            className='bg-orange-500 text-white hover:bg-orange-700 p-4 uppercase mt-4 rounded-md'
          >
            {loading ? <BeatLoader /> : "Confirm order"}
          </button>
        </div>
      ) : (
        <Elements stripe={stripePromise}>
          <StripeCheckout />
        </Elements>
      )}

      {error && <div>{error}</div>}
    </div>
  );
};

export default Payment;

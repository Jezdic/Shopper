export const paymentSendReducer = (state = {}, action) => {
  switch (action.type) {
    case "PAYMENT_SEND_REQUEST":
      return { loading: true };
    case "PAYMENT_SEND_SUCCESS":
      return { loading: false, success: true };
    case "PAYMENT_SEND_FAIL":
      return { loading: false, error: action.payload };
    case "PAYMENT_SEND_RESET":
      return {};
    default:
      return state;
  }
};

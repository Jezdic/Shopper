import axios from "axios";

export const sendPayment = (details) => async (dispatch, getState) => {
  try {
    dispatch({ type: "PAYMENT_SEND_REQUEST" });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.post(`/api/v1/orders`, details, config);

    dispatch({
      type: "PAYMENT_SEND_SUCCESS",
    });
  } catch (error) {
    dispatch({
      type: "PAYMENT_SEND_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

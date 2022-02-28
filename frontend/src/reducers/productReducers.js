import {
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAIL,
  FEATURED_LIST_SUCCESS,
  FEATURED_LIST_REQUEST,
  FEATURED_LIST_FAIL,
} from "../constants/productConstants";

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const featuredProductsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case FEATURED_LIST_REQUEST:
      return { loading: true, products: [] };
    case FEATURED_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case FEATURED_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDetailsReducer = (
  state = { product: {}, loading: true },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case "PRODUCT_CREATE_REQUEST":
      return { loading: true };
    case "PRODUCT_CREATE_SUCCESS":
      return { loading: false, success: true };
    case "PRODUCT_CREATE_FAIL":
      return { loading: false, error: action.payload };
    case "PRODUCT_CREATE_RESET":
      return {};
    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case "PRODUCT_DELETE_REQUEST":
      return { loading: true };
    case "PRODUCT_DELETE_SUCCESS":
      return { loading: false, success: true };
    case "PRODUCT_DELETE_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productEditReducer = (state = {}, action) => {
  switch (action.type) {
    case "PRODUCT_EDIT_REQUEST":
      return { loading: true };
    case "PRODUCT_EDIT_SUCCESS":
      return { loading: false, success: true };
    case "PRODUCT_EDIT_FAIL":
      return { loading: false, error: action.payload };
    case "PRODUCT_EDIT_RESET":
      return {};
    default:
      return state;
  }
};

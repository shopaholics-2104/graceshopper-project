import axios from "axios";
import action from "./actions";

export const _fetchAllProducts = () => {
  return async (dispatch) => {
    const { data } = await axios.get("/api/products");
    dispatch(action.setAllProducts(data));
  };
};

export const _fetchSingleProduct = (productId) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/products/${productId}`);
    dispatch(action.setSingleProduct(data));
  };
};

export const _fetchAllOrders = (userId) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/orders/${userId}`);
    dispatch(action.setAllOrders(data));
  };
};

export const _fetchOpenOrder = (userId) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/orders/open/${userId}`);
    dispatch(action.setOpenOrder(data));
  };
};

export const _addItem = (newItem, userId) => {
  return async (dispatch) => {
    const { data } = await axios.post(`/api/orders/${userId}`, newItem);
    // const { data } = await axios.get(`/api/products/${newItem.productId}`);
    console.log(data);
    dispatch(action.addItem(data));
  };
};

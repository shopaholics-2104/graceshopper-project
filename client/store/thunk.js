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
    dispatch(action.setItems(data.products));
  };
};

export const _addItem = (newItem) => {
  return async (dispatch) => {
    await axios.post(`/api/order_items`, newItem);
    const { data } = await axios.get(`/api/products/${newItem.productId}`);
    dispatch(action.addItem(data));
  };
};

export const _removeCartItem = (productId, userId) => {
  return async (dispatch)=> {
    const { data } = await axios.put(`/api/order_items/${productId}`, {userId});
    dispatch(action.removeItem(data));
  }
}

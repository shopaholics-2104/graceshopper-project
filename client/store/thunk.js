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
    dispatch(action.setItems(data.products || []));
  };
};

export const _updateOrder = (order) => {
  return async (dispatch) => {
    const { data } = await axios.put(`/api/orders/${order.id}`, order);
    dispatch(action.updateOrder(data));
  };
};

export const _addItem = (newItem, userId) => {
  return async (dispatch) => {
    const { data } = await axios.post(`/api/orders/${userId}`, newItem);
    console.log("this is addeditem", data);
    dispatch(action.addItem(data));
  };
};

export const _removeItem = (productId, userId) => {
  return async (dispatch) => {
    const { data } = await axios.put(`/api/order_items/${productId}`, {
      userId,
    });
    dispatch(action.removeItem(data));
  };
};

export const _updateItem = (orderId, productId, quantity) => {
  return async (dispatch) => {
    const { data } = await axios.put(`/api/orders/updateItem/${orderId}`, {
      quantity,
      productId,
    });
    console.log(data);
    dispatch(action.updateItem(data));
  };
};

export const _clearCart = (order) => {
  return async (dispatch) => {
    await axios.delete(`/api/order_items/${order.id}`);
    dispatch(action.clearCart());
  };
};

import axios from "axios";
import action from "./actions";

const ALLORDERS = "allOrders";
const OPENORDER = "openOrder";
const CARTITEMS = "cartItems";

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
    //set allOrders state
    dispatch(action.setAllOrders(data));

    //set openOrder state
    const openOrderObj = data.find((order) => order.status === "New");
    const openOrder = openOrderObj ? openOrderObj : {};
    dispatch(action.setOpenOrder(openOrder));

    //set cartItems state
    const cartItems = openOrder.products ? openOrder.products : [];
    dispatch(action.setItems(cartItems));
  };
};

export const _createOrder = (userId) => {
  return async (dispatch) => {
    const { data } = await axios.post(`/api/orders`, {
      userId,
      status: "New",
      totalAmount: 0.0,
    });
    const existingOrders = JSON.parse(localStorage.getItem("allOrders"));
    localStorage.setItem(
      "allOrders",
      JSON.stringify(existingOrders.push(data))
    );
    dispatch(action.createOrder(data));
    dispatch(action.setOpenOrder(data));
  };
};

export const _addItem = (newItem) => {
  return async (dispatch) => {
    await axios.post(`/api/order_items`, newItem);
    const { data } = await axios.get(`/api/products/${newItem.productId}`);
    dispatch(action.addItem(data));
  };
};

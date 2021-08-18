import axios from "axios";
import action from "./actions";

//User
export const _fetchAllUsers = () => {
  return async (dispatch) => {
    const { data } = await axios.get("/api/users");
    dispatch(action.setAllUsers(data));
  };
};

//Category
export const _fetchAllCategoties = () => {
  return async (dispatch) => {
    const { data } = await axios.get("/api/categories");
    dispatch(action.setAllCategories(data));
  };
};

export const _fetchSingleCategory = (categoryId) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/categories/${categoryId}`);
    dispatch(action.setSingleCategory(data));
  };
};

//Product
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

export const _updateProduct = (productId) => {
  return async (dispatch) => {
    const { data } = await axios.put(
      `/api/products/${productId}`,
      productToUpdate
    );
    dispatch(action.updateProduct(data));
  };
};

export const _deleteProduct = (productId) => {
  return async (dispatch) => {
    await axios.delete(`/api/products/${productId}`);

    dispatch(action.deleteProduct(productId));
  };
};

//Order
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

//Cart
export const _addItem = (userId, newItem) => {
  return async (dispatch) => {
    const { data } = await axios.post(`/api/orders/${userId}`, newItem);

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
    dispatch(action.updateItem(data));
  };
};

export const _clearCart = (order) => {
  return async (dispatch) => {
    await axios.delete(`/api/order_items/${order.id}`);
    dispatch(action.clearCart());
  };
};

//for pagination

export const fetchTotal = () => {
  return async (dispatch) => {
    const response = await axios.get(`/api/products/pagination`);
    console.log(response.data);
    dispatch(action.setTotal(response.data.total));
  };
};

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

export const _createProduct = (newProduct) => {
  return async (dispatch) => {
    const { data } = await axios.post(`/api/products`, newProduct);
    dispatch(action.createProduct(data));
  };
};

export const _updateProduct = (productId, productToUpdate) => {
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

const _addToLocal = async (newItem) => {
  const { data } = await axios.get(`/api/products/${newItem.productId}`);
  if (!localStorage.hasOwnProperty("localCartItems")) {
    window.localStorage.setItem(
      "localCartItems",
      JSON.stringify([
        {
          ...data,
          order_item: { quantity: newItem.quantity, price: newItem.price },
        },
      ])
    );
  } else {
    const localCartItems = JSON.parse(
      window.localStorage.getItem("localCartItems")
    );

    const item = localCartItems.filter(
      (item) => item.id === newItem.productId
    )[0];
    item
      ? (item.order_item.quantity += newItem.quantity)
      : localCartItems.push({
          ...data,
          order_item: { quantity: newItem.quantity, price: newItem.price },
        });
    window.localStorage.setItem(
      "localCartItems",
      JSON.stringify(localCartItems)
    );
    console.log("this is localCartItems--->", localCartItems);
  }
};

export const _addItem = (userId, newItem) => {
  return async (dispatch) => {
    if (userId) {
      const { data } = await axios.post(`/api/orders/${userId}`, newItem);
      dispatch(action.addItem(data));
    } else {
      _addToLocal(newItem);
    }
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
    dispatch(action.setTotal(response.data.total));
  };
};

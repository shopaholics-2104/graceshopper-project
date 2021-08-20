import axios from "axios";
import action from "./actions";

export const LOCALCARTITEMS = "localCartItems";

//nonUser
export const getLocalCartItems = () => {
  return JSON.parse(window.localStorage.getItem(LOCALCARTITEMS));
};
export const setLocalCartItems = (localCartItems) => {
  window.localStorage.setItem(LOCALCARTITEMS, JSON.stringify(localCartItems));
};

export const _fetchLocalCartItems = () => {
  return async (dispatch) => {
    dispatch(action.setItems(getLocalCartItems() || []));
  };
};

export const _addLocalCartItem = (newItem) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/products/${newItem.productId}`);
    if (!localStorage.hasOwnProperty(LOCALCARTITEMS)) {
      window.localStorage.setItem(
        LOCALCARTITEMS,
        JSON.stringify([
          {
            ...data,
            order_item: { quantity: newItem.quantity, price: newItem.price },
          },
        ])
      );
    } else {
      const updatedLocalCartItem = getLocalCartItems();
      const item = updatedLocalCartItem.filter(
        (item) => item.id === newItem.productId
      )[0];
      item
        ? (item.order_item.quantity += newItem.quantity)
        : updatedLocalCartItem.push({
            ...data,
            order_item: { quantity: newItem.quantity, price: newItem.price },
          });

      setLocalCartItems(updatedLocalCartItem);
    }
  };
};

export const _updateLocalCartItems = (productId, quantity) => {
  return async (dispatch) => {
    const itemToUpdate = getLocalCartItems().find(
      (item) => item.id === productId
    );
    itemToUpdate.order_item.quantity = quantity;
    const cartToUpdate = getLocalCartItems().filter(
      (item) => item.id !== productId
    );

    cartToUpdate.push(itemToUpdate);
    setLocalCartItems(cartToUpdate);

    dispatch(action.updateItem(itemToUpdate));
  };
};
export const _removeLocalCartItem = (productId) => {
  return async (dispatch) => {
    const itemToRemove = getLocalCartItems().find(
      (item) => item.id === productId
    );
    setLocalCartItems(
      getLocalCartItems().filter((item) => item.id !== productId)
    );

    dispatch(action.removeItem(itemToRemove));
  };
};

export const _clearLocalCart = () => {
  return async (dispatch) => {
    window.localStorage.removeItem(LOCALCARTITEMS);
    dispatch(action.clearCart());
  };
};

export const _moveLocalCartItemsToCart = (userId) => {
  return async () => {
    if (getLocalCartItems()) {
      const listOfItemsToAdd = getLocalCartItems().reduce((accum, item) => {
        accum.push({
          productId: item.id,
          quantity: item.order_item.quantity,
          price: item.order_item.price,
        });
        return accum;
      }, []);

      const addItem = async (userId, newItem) => {
        const { data } = await axios.post(`/api/orders/${userId}`, newItem);
        dispatch(action.addItem(data));
      };
      await listOfItemsToAdd.map((item) => addItem(userId, item));
      window.localStorage.removeItem(LOCALCARTITEMS);
    }
  };
};
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
    dispatch(action.setTotal(response.data.total));
  };
};

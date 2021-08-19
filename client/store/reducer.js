import axios from "axios";
import type from "./type";

const initState = {
  allUsers: [],
  singleUser: {},
  allProducts: [],
  singleProduct: {},
  allOrders: [],
  openOrder: {},
  cartItems: [],
  total: 0,
};

export const allUsersReducer = (state = initState.allUsers, action) => {
  switch (action.type) {
    case type.SET_ALL_USERS:
      return action.allUsers;
    case type.CREATE_USER:
      return [...state, action.newUser];
    case type.DELETE_USER:
      return state.filter((user) => user.id !== action.userToDelete.id);
    default:
      return state;
  }
};

export const singleUserReducer = (state = initState.singleUser, action) => {
  switch (action.type) {
    case type.SET_SINGLE_USER:
      return action.singleUser;
    case type.UPDATE_USER:
      return action.userToUpdate;
    default:
      return state;
  }
};
export const allProductsReducer = (state = initState.allProducts, action) => {
  switch (action.type) {
    case type.SET_ALL_PRODUCTS:
      return action.allProducts;
    case type.CREATE_PRODUCT:
      return [...state, action.newProduct];
    case type.DELETE_PRODUCT:
      return state.filter(
        (product) => product.id !== action.productToDelete.id
      );
    default:
      return state;
  }
};

//reducer for pagination
export const totalReducer = (state = initState.total, action) => {
  switch (action.type) {
    case type.SET_TOTAL:
      return action.total;
    default:
      return state;
  }
};

export const singleProductReducer = (
  state = initState.singleProduct,
  action
) => {
  switch (action.type) {
    case type.SET_SINGLE_PRODUCT:
      return action.singleProduct;
    case type.UPDATE_PRODUCT:
      return action.productToUpdate;
    default:
      return state;
  }
};

export const orderReducer = (state = initState.allOrders, action) => {
  switch (action.type) {
    case type.SET_ALL_ORDERS:
      return action.allOrders;
    case type.DELETE_ORDER:
      return state.filter((order) => order.id !== action.orderToDelete.id);
    case type.UPDATE_ORDER:
      return state.map((order) =>
        order.id === action.orderToUpdate.id ? action.orderToUpdate : order
      );
    default:
      return state;
  }
};

export const cartReducer = (state = initState.cartItems, action) => {
  switch (action.type) {
    case type.SET_CART_ITEMS:
      return action.cartItems;
    case type.ADD_CART_ITEM:
      return state.filter((item) => item.id === action.newItem.id).length
        ? state.map((item) =>
            item.id === action.newItem.id ? action.newItem : item
          )
        : [...state, action.newItem];
    case type.REMOVE_CART_ITEM:
      return state.filter((item) => item.id !== action.itemToRemove.id);
    case type.UPDATE_CART_ITEM:
      return state.map((item) =>
        item.id === action.itemToUpdate.id ? action.itemToUpdate : item
      );
    case type.CLEAR_CART:
      return [];
    default:
      return state;
  }
};

export const openOrderReducer = (state = initState.openOrder, action) => {
  switch (action.type) {
    case type.SET_OPEN_ORDER:
      return action.openOrder;
    default:
      return state;
  }
};

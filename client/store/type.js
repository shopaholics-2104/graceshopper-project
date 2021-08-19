const type = {
  //admin activities affect user model (admin manage users)
  SET_ALL_USERS: "SET_ALL_USERS",
  SET_SINGLE_USER: "SET_SINGLE_USER",
  CREATE_USER: "CREATE_USER",
  DELETE_USER: "DELETE_USER",
  UPDATE_USER: "UPDATE_USER",

  //admin activities affect product model (admin manage products)
  SET_ALL_PRODUCTS: "SET_ALL_PRODUCTS",
  SET_SINGLE_PRODUCT: "SET_SINGLE_PRODUCT",
  CREATE_PRODUCT: "CREATE_PRODUCT",
  DELETE_PRODUCT: "DELETE_PRODUCT",
  UPDATE_PRODUCT: "UPDATE_PRODUCT",

  //this is for pagination
  SET_TOTAL: "SET_TOTAL",

  // login user activities affect order model (order status)
  SET_ALL_ORDERS: "SET_ALL_ORDERS",
  SET_OPEN_ORDER: "SET_OPEN_ORDER",
  DELETE_ORDER: "DELETE_ORDER",
  UPDATE_ORDER: "UPDATE_ORDER",

  //login user activities affect order_item model (cart activities)
  SET_CART_ITEMS: "SET_CART_ITEMS",
  ADD_CART_ITEM: "ADD_CART_ITEM",
  UPDATE_CART_ITEM: "UPDATE_CART_ITEM",
  REMOVE_CART_ITEM: "REMOVE_CART_ITEM",
  CLEAR_CART: "CLEAR_CART",
};
export default type;

import type from "./type";
const actionCreator = {
  //categories
  setAllCategories: (allCategories) => ({
    type: type.SET_ALL_CATEGORIES,
    allCategories,
  }),

  setSingleCategory: (singleCategory) => ({
    type: type.SET_SINGLE_CATEGORY,
    singleCategory,
  }),

  //users
  setAllUsers: (allUsers) => ({
    type: type.SET_ALL_USERS,
    allUsers,
  }),

  setSingleUser: (singleUser) => ({
    type: type.SET_SINGLE_USER,
    singleUser,
  }),
  createUser: (newUser) => ({
    type: type.CREATE_USER,
    newUser,
  }),
  deleteUser: (UserToDelete) => ({
    type: type.DELETE_User,
    UserToDelete,
  }),
  updateUser: (UserToUpdate) => ({
    type: type.UPDATE_User,
    UserToUpdate,
  }),

  //products
  setAllProducts: (allProducts) => ({
    type: type.SET_ALL_PRODUCTS,
    allProducts,
  }),
  setSingleProduct: (singleProduct) => ({
    type: type.SET_SINGLE_PRODUCT,
    singleProduct,
  }),
  createProduct: (newProduct) => ({
    type: type.CREATE_PRODUCT,
    newProduct,
  }),
  deleteProduct: (productId) => ({
    type: type.DELETE_PRODUCT,
    productId,
  }),
  updateProduct: (productToUpdate) => ({
    type: type.UPDATE_PRODUCT,
    productToUpdate,
  }),

  //orders
  setAllOrders: (allOrders) => ({
    type: type.SET_ALL_ORDERS,
    allOrders,
  }),
  setOpenOrder: (openOrder) => ({
    type: type.SET_OPEN_ORDER,
    openOrder,
  }),

  deleteOrder: (orderToDelete) => ({
    type: type.DELETE_ORDER,
    orderToDelete,
  }),
  updateOrder: (orderToUpdate) => ({
    type: type.UPDATE_ORDER,
    orderToUpdate,
  }),

  //cart Items
  setItems: (cartItems) => ({
    type: type.SET_CART_ITEMS,
    cartItems,
  }),
  addItem: (newItem) => ({
    type: type.ADD_CART_ITEM,
    newItem,
  }),
  updateItem: (itemToUpdate) => ({
    type: type.UPDATE_CART_ITEM,
    itemToUpdate,
  }),
  removeItem: (itemToRemove) => ({
    type: type.REMOVE_CART_ITEM,
    itemToRemove,
  }),
  clearCart: () => ({
    type: type.CLEAR_CART,
  }),
};
export default actionCreator;

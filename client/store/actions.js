import type from "./type";

export const actionCreator = {
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
  deleteProduct: (productToDelete) => ({
    type: type.DELETE_PRODUCT,
    productToDelete,
  }),
  updateProduct: (productToUpdate) => ({
    type: type.UPDATE_ITEM,
    productToUpdate,
  }),

  //
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

  //
  addItem: (newItem) => ({
    type: type.ADD_CART_ITEM,
    newItem,
  }),
  updateItem: (itemToUpdate) => ({
    type: type.UPDATE_CART_ITEM,
    itemToUpdate,
  }),
  deleteItem: (itemToDelete) => ({
    type: type.DELETE_CART_ITEM,
    itemToDelete,
  }),
};
export default actionCreator;

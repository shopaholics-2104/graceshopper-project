const actionCreator = {
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
    type: type.UPDAT,
    productToUpdate,
  }),
};
export default actionCreator;

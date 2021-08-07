import type from "./type";
import action from "./actions";
const initState = { allProducts: [], singleProduct: {} };

export const allProductsReducer = (state = initState.allProducts, action) => {
  switch (action.type) {
    case type.SET_ALL_PRODUCT:
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

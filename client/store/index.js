import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import {
  singleProductReducer,
  allProductsReducer,
  orderReducer,
  cartReducer,
  openOrderReducer,
  totalReducer,
} from "./reducer";

const reducer = combineReducers({
  auth,
  cartItems: cartReducer,
  singleProduct: singleProductReducer,
  allProducts: allProductsReducer,
  allOrders: orderReducer,
  openOrder: openOrderReducer,
  cartItems: cartReducer,
  total: totalReducer,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";

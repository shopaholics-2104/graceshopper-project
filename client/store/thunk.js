import axios from "axios";
import action from "./actions";

export const fetchAllProducts = (dispatch) => {
  return async (dispatch) => {
    const { data } = await axios.get("");
    dispatch(action.setAllProducts(data));
  };
};

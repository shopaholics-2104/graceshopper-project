import React from "react";
import { connect } from "react-redux";
import { _fetchAllProducts } from "../store/thunk";
import { Link } from "react-router-dom";

import Paginate from "./pagination";

class Product extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchAllProducts();
  }

  render() {
    return (
      <div>
        <Paginate {...this.props} />
      </div>
    );
  }
}
const mapState = (state) => ({
  allProducts: state.allProducts,
});
const mapDispatch = (dispatch) => ({
  fetchAllProducts: () => {
    dispatch(_fetchAllProducts());
  },
});
export default connect(mapState, mapDispatch)(Product);

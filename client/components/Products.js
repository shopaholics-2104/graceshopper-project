import React from "react";
import { connect } from "react-redux";
import { _fetchAllProducts } from "../store/thunk";
import { Link } from "react-router-dom";

class Product extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchAllProducts();
  }

  render() {
    const { allProducts } = this.props;
    return (
      <div>
        <h1>Transfiguration Cookies</h1>

        {allProducts.map((product) => (
          <div key={product.id}>
            <Link to={`/products/${product.id}`}>
              {" "}
              <img src={product.imageUrl}></img>
            </Link>
            <div>{product.name}</div> <p>{product.description}</p>
            <span>
              Single Price: {product.single_price} Dozen Price:{" "}
              {product.dozen_price} Status: {product.status}
            </span>
          </div>
        ))}
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

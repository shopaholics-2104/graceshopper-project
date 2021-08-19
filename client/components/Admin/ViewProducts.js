import React, { Fragment } from "react";
import { connect } from "react-redux";
import {
  _fetchAllProducts,
  _deleteProduct,
  _fetchAllCategoties,
} from "../../store/thunk";
import AdminProduct from "./AdminProduct";
import CreateProduct from "./CreateProduct";

class Product extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchAllProducts();
    this.props.fetchAllCategoties();
  }

  render() {
    const { allProducts, deleteProduct, allCategories } = this.props;
    return (
      <Fragment>
        <h2>Products</h2> <CreateProduct allCategories={allCategories} />
        <table className="table table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Edit</th>
              <th scope="col">Remove</th>
            </tr>
          </thead>
          <tbody>
            {allProducts.map((product) => (
              <tr key={`productId&${product.id}`}>
                <th scope="row">{product.id}</th>

                <td>{product.name}</td>
                <td>{product.single_price}</td>
                <td>
                  <AdminProduct
                    product={product}
                    allCategories={allCategories}
                  />
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-dismiss="modal"
                    onClick={() => {
                      deleteProduct(product.id);
                    }}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Fragment>
    );
  }
}
const mapState = (state) => ({
  allProducts: state.allProducts,
  allCategories: state.allCategories,
});
const mapDispatch = (dispatch) => ({
  fetchAllProducts: () => {
    dispatch(_fetchAllProducts());
  },
  deleteProduct: (productId) => {
    dispatch(_deleteProduct(productId));
  },
  fetchAllCategoties: () => {
    dispatch(_fetchAllCategoties());
  },
});
export default connect(mapState, mapDispatch)(Product);

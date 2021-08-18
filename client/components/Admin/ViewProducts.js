import React, { Fragment } from "react";
import { connect } from "react-redux";
import { _fetchAllProducts, _deleteProduct } from "../../store/thunk";
import AdminProduct from "./AdminProduct";

class Product extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchAllProducts();
  }

  render() {
    const { allProducts, deleteProduct } = this.props;
    return (
      <Fragment>
        <h1>Products</h1>

        <table className="table table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Edit</th>
              <th scope="col">Remove</th>
            </tr>
          </thead>
          <tbody>
            {allProducts.map((product) => (
              <tr key={product.id}>
                <th scope="row">{product.id}</th>

                <td>{product.name}</td>
                <td>
                  <AdminProduct product={product} />
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
});
const mapDispatch = (dispatch) => ({
  fetchAllProducts: () => {
    dispatch(_fetchAllProducts());
  },
  deleteProduct: (productId) => {
    dispatch(_deleteProduct(productId));
  },
});
export default connect(mapState, mapDispatch)(Product);

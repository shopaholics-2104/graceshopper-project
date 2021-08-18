import React, { Fragment } from "react";
import { _fetchAllCategoties, _updateProduct } from "../../store/thunk";
import { connect } from "react-redux";

class AdminProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: "",
      description: "",
      single_price: 0.0,
      status: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    console.log(this.state);
  }

  handleSubmit(event) {
    event.preventDefault;
    const { updateProduct, product } = this.props;
    updateProduct(product.id, this.state);
  }

  componentDidMount() {
    const { product } = this.props;
    this.setState(product);
  }
  render() {
    const { imageUrl, description, single_price, status } = this.state;
    const { handleChange, handleSubmit } = this;
    const { product } = this.props;
    return (
      <Fragment>
        <button
          type="button"
          className="btn btn-warning"
          data-toggle="modal"
          data-target={`#ProductId${product.id}`}
        >
          Edit Product
        </button>

        <div className="modal" id={`ProductId${product.id}`}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">{product.name}</h4>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="form-group">
                    <label htmlFor="imageUrl">Product ImageUrl</label>
                    <input
                      name="imageUrl"
                      value={imageUrl}
                      onChange={handleChange}
                      type="url"
                      className="form-control"
                      id="imageUrl"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="single_price">Product single_price</label>
                    <input
                      name="single_price"
                      value={single_price}
                      onChange={handleChange}
                      type="number"
                      className="form-control"
                      id="single_price"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="status">Product Inventory Status</label>
                    <select
                      name="status"
                      value={status}
                      onChange={handleChange}
                      className="form-control"
                      id="status"
                    >
                      <option>out_of_stock</option>
                      <option>in_stock</option>
                      <option>running_low</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Product Description</label>
                    <textarea
                      name="description"
                      value={description}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      id="description"
                    ></textarea>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="submit"
                    className="btn btn-warning"
                    data-dismiss="modal"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapDispatch = (dispatch) => ({
  updateProduct: (productId, productToUpdate) => {
    dispatch(_updateProduct(productId, productToUpdate));
  },
});
export default connect(null, mapDispatch)(AdminProduct);

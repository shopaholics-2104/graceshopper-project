import React, { Fragment } from "react";
import { _createProduct } from "../../store/thunk";
import { connect } from "react-redux";

class CreateProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      imageUrl: "",
      description: "",
      single_price: 0.0,
      status: "",
      categoryId: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault;
    const { createProduct } = this.props;
    createProduct(this.state);
  }

  render() {
    const {
      name,
      imageUrl,
      description,
      single_price,
      status,
      categoryId,
    } = this.state;
    const { handleChange, handleSubmit } = this;
    const { allCategories } = this.props;
    return (
      <Fragment>
        <button
          type="button"
          className="btn btn-warning"
          data-toggle="modal"
          data-target={"#CreateProduct"}
        >
          Create Cookie
        </button>

        <div className="modal" id={"CreateProduct"}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">{name}</h4>
              </div>

              <form>
                <div className="modal-body">
                  <div className="form-group">
                    <label htmlFor="imageUrl">Cookie Name</label>
                    <input
                      name="name"
                      value={name}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      id="name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="imageUrl">Cookie ImageUrl</label>
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
                    <label htmlFor="single_price">Cookie single_price</label>
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
                    <label htmlFor="status">Cookie Inventory Status</label>
                    <select
                      name="status"
                      value={status}
                      onChange={handleChange}
                      className="form-control"
                      id="status"
                    >
                      <option value="out_of_stock">out_of_stock</option>
                      <option value="in_stock">in_stock</option>
                      <option value="running_low">running_low</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="category">Cookie Flavor</label>
                    <select
                      name="categoryId"
                      value={categoryId}
                      onChange={handleChange}
                      className="form-control"
                      id="categoryId"
                    >
                      <option>{"<---Pick a Flavor--->"}</option>
                      {allCategories &&
                        allCategories.map((category) => (
                          <option value={category.id} key={category.id}>
                            {category.flavor}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Cookie Category</label>
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
                    onClick={handleSubmit}
                  >
                    Create
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
  createProduct: (newProduct) => {
    dispatch(_createProduct(newProduct));
  },
});
export default connect(null, mapDispatch)(CreateProduct);

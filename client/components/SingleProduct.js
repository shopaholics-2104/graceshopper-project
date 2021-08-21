import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  _fetchSingleProduct,
  _fetchOpenOrder,
  _addItem,
  _addLocalCartItem,
} from "../store/thunk";

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      price: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { fetchSingleProduct } = this.props;
    const productId = this.props.match.params.productId;
    fetchSingleProduct(productId);
  }

  handleSubmit(event) {
    event.preventDefault();
    const userId = this.props.userId;
    const newItem = {
      productId: Number(this.props.match.params.productId),
      quantity: Number(this.state.quantity),
      price: Number(this.state.price),
    };

    this.props.addItem(userId, newItem);

    this.setState({
      quantity: 1,
      price: 0,
    });
    alert(`"${this.props.singleProduct.name}" is added to the cart`);
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const {
      imageUrl,
      name,
      description,
      single_price,
      status,
      categoryId,
      category,
    } = this.props.singleProduct;
    const { quantity, price } = this.state;

    return (
      <div className="for_Product">
        <img className="product_img" src={imageUrl}></img>
        <div className="product_datail">
          <h1 className="product_title">{name}</h1>
          {category && (
            <Link to={`/categories/${categoryId}`}>{category.flavor}</Link>
          )}
          <p className="product_desc">{description}</p>

          <div className="product_status">Inventory Status: {status}</div>
          <form onSubmit={this.handleSubmit}>
            <select value={price} name="price" onChange={this.handleChange}>
              <option value="">Select a Unit</option>
              <option value={single_price}>single unit</option>
            </select>

            {!price ? (
              <div className="product_status">
                Please Select a Purchase Unit
              </div>
            ) : (
              <div>
                Price: {price}
                <div>
                  <input
                    type="number"
                    value={quantity}
                    onChange={this.handleChange}
                    name="quantity"
                    min="1"
                  ></input>{" "}
                </div>
              </div>
            )}
            <div className="product_btn"></div>

            <button className="button_btn" type="submit">
              Get The Power
            </button>
          </form>
        </div>
      </div>
    );
  }
}
const mapState = (state) => ({
  singleProduct: state.singleProduct,
  userId: state.auth.id,
  cartItems: state.cartItems,
});

const mapDispatch = (dispatch) => ({
  fetchSingleProduct: (productId) => {
    dispatch(_fetchSingleProduct(productId));
  },
  addItem: (userId, newItem) => {
    userId
      ? dispatch(_addItem(userId, newItem))
      : dispatch(_addLocalCartItem(newItem));
  },
});
export default connect(mapState, mapDispatch)(Product);

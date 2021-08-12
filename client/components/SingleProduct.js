const React = require("react");
const { connect } = require("react-redux");
import { _fetchSingleProduct, _fetchOpenOrder, _addItem } from "../store/thunk";
import axios from "axios";

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
    const { fetchSingleProduct, userId, fetchOpenOrder } = this.props;
    const productId = this.props.match.params.productId;
    fetchSingleProduct(productId);
    // !!userId ? fetchOpenOrder(userId) : null;
  }
  // componentDidUpdate(previousProps) {
  //   const { userId, fetchOpenOrder } = this.props;
  //   if (previousProps.userId !== userId) {
  //     fetchOpenOrder(userId);
  //   }
  // }

  handleSubmit(event) {
    event.preventDefault();
    const userId = this.props.userId;
    const productId = Number(this.props.match.params.productId);
    const newItem = {
      productId,
      quantity: Number(this.state.quantity),
      price: Number(this.state.price),
    };
    this.props.addItem(newItem, userId);
    this.setState({
      quantity: 0,
      price: 0,
    });
    alert(`"${this.props.singleProduct.name}" is added to the cart`);
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { imageUrl, name, description, single_price, dozen_price, status } =
      this.props.singleProduct;
    const { quantity, price } = this.state;

    return (
      <div>
        <img src={imageUrl}></img>
        <h1>{name}</h1>
        <p>{description}</p>

        <div>Inventory Status: {status}</div>
        <form onSubmit={this.handleSubmit}>
          <select value={price} name="price" onChange={this.handleChange}>
            <option value="">Buy Single Or Dozen</option>
            <option value={single_price}>single unit</option>
            <option value={dozen_price}>dozen</option>
          </select>

          {!price ? (
            <div>Please Select a Purchase Unit</div>
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

          <button type="submit">Add to Cart</button>
        </form>
      </div>
    );
  }
}
const mapState = (state) => ({
  singleProduct: state.singleProduct,
  userId: state.auth.id,
  openOrder: state.openOrder,
  cartItems: state.cartItems,
});

const mapDispatch = (dispatch) => ({
  fetchSingleProduct: (productId) => {
    dispatch(_fetchSingleProduct(productId));
  },
  fetchOpenOrder: (userId) => {
    dispatch(_fetchOpenOrder(userId));
  },

  addItem: (newItem, userId) => {
    dispatch(_addItem(newItem, userId));
  },
});
export default connect(mapState, mapDispatch)(Product);

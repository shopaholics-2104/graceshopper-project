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
            <option value="">Select a Unit</option>
            <option value={single_price}>single unit</option>
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
  cartItems: state.cartItems,
});

const mapDispatch = (dispatch) => ({
  fetchSingleProduct: (productId) => {
    dispatch(_fetchSingleProduct(productId));
  },
  fetchOpenOrder: (userId) => {
    dispatch(_fetchOpenOrder(userId));
  },

  addItem: (userId, newItem) => {
    dispatch(_addItem(userId, newItem));
  },
});
export default connect(mapState, mapDispatch)(Product);

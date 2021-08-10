import React from "react";
import { connect } from "react-redux";
import { _fetchAllOrders } from "../store/thunk";

const ALLORDERS = "allOrders";
const OPENORDER = "openOrder";
const CARTITEMS = "cartItems";

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchAllOrders(this.props.userId);
  }

  render() {
    const { cartItems, totalAmount } = this.props;
    return (
      <div>
        <h1>Cart Items ({cartItems.length})</h1>

        <table border="2">
          <tbody>
            <tr>
              <td>Item Name</td>
              <td>Item Quantity</td>
              <td>Item Price</td>
              <td>Total Price</td>
            </tr>

            {cartItems.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.order_item.quantity}</td>
                <td>{item.order_item.price}</td>
                <td>
                  {(item.order_item.quantity * item.order_item.price).toFixed(
                    2
                  )}
                </td>
                <td>
                  <button type="button"> remove </button>
                </td>
                <td>
                  <button type="button"> change Qty </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div> Total Amount: {totalAmount && totalAmount.toFixed(2)}</div>

        <button type="button">Check Out</button>
        <button type="button">Clear the Cart</button>
      </div>
    );
  }
}

const mapState = (state) => ({
  userId: state.auth.id,
  cartItems: state.cartItems,
  totalAmount: state.cartItems.reduce(
    (accum, item) => accum + item.order_item.quantity * item.order_item.price,
    0
  ),
});

const mapDispatch = (dispatch) => ({
  fetchAllOrders: (userId) => {
    dispatch(_fetchAllOrders(userId));
  },
});

export default connect(mapState, mapDispatch)(Cart);

import React from "react";
import { connect } from "react-redux";
import { _fetchOpenOrder, _removeItem, _updateItem } from "../store/thunk";
import CheckoutButton from "./CheckoutButton";
import ClearButton from "./ClearButton";

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchOpenOrder(this.props.userId);
  }

  handleSubmit = (ev) => {
    ev.preventDefault();
  };

  onChangeHandler = (ev) => {
    const change = {};
  };

  render() {
    const {
      openOrder,
      totalAmount,
      userId,
      cartItems,
      removeCartItem,
      updateCartItem,
    } = this.props;

    return (
      <div>
        <h1>Cart Items ({cartItems && cartItems.length})</h1>

        <table border="2">
          <tbody>
            <tr>
              <td>Item Name</td>
              <td>Item Quantity</td>
              <td>Item Price</td>
              <td>Total Price</td>
            </tr>

            {cartItems &&
              cartItems.map((item) => (
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
                    <button
                      onClick={() => removeCartItem(item.id, userId)}
                      type="button"
                    >
                      {" "}
                      remove{" "}
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() =>
                        updateCartItem(
                          item.order_item.orderId,
                          item.order_item.productId,
                          item.order_item.quantity + 1
                        )
                      }
                    >
                      {" "}
                      + 1{" "}
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div> Total Amount: {totalAmount}</div>
        <CheckoutButton />
        <ClearButton />
      </div>
    );
  }
}

const mapState = (state) => ({
  userId: state.auth.id,
  // openOrder: state.openOrder,
  cartItems: state.cartItems,
  totalAmount: state.cartItems
    ? state.cartItems.reduce(
        (accum, product) =>
          accum + product.order_item.price * product.order_item.quantity,
        0
      )
    : 0.0,
});

const mapDispatch = (dispatch) => ({
  fetchOpenOrder: (userId) => {
    dispatch(_fetchOpenOrder(userId));
  },
  removeCartItem: (productId, userId) => {
    dispatch(_removeItem(productId, userId));
  },
  updateCartItem: (orderId, productId, quantity) => {
    dispatch(_updateItem(orderId, productId, quantity));
  },
});

export default connect(mapState, mapDispatch)(Cart);

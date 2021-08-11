import React from "react";
import { connect } from "react-redux";
import { _fetchOpenOrder } from "../store/thunk";

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchOpenOrder(this.props.userId);
  }

  render() {
    const { openOrder } = this.props;
    const cartItems = openOrder.products;
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
                    <button type="button"> remove </button>
                  </td>
                  <td>
                    <button type="button"> change Qty </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {/* <div> Total Amount: {openOrder && totalAmount.toFixed(2)}</div> */}

        <button type="button">Check Out</button>
        <button type="button">Clear the Cart</button>
      </div>
    );
  }
}

const mapState = (state) => ({
  userId: state.auth.id,
  openOrder: state.openOrder,
});

const mapDispatch = (dispatch) => ({
  fetchOpenOrder: (userId) => {
    dispatch(_fetchOpenOrder(userId));
  },
});

export default connect(mapState, mapDispatch)(Cart);

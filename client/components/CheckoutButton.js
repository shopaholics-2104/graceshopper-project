import React, { Component } from "react";
import {
  _updateOrder,
  _fetchOpenOrder,
  _createOrder,
  _fetchAllOrders,
} from "../store/thunk";
import { connect } from "react-redux";

class CheckoutButton extends Component {
  handleCheckOut = async () => {
    await this.props.updateOrder({
      ...this.props.openOrder,
      status: "CheckOut",
      comment: "order checked out",
      totalAmount: this.props.totalAmount,
    });
    await this.props.fetchOpenOrder(this.props.userId);
  };

  render() {
    const { handleCheckOut } = this;

    return (
      <button type="button" onClick={handleCheckOut}>
        Check Out
      </button>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateOrder: (order) => dispatch(_updateOrder(order)),
  fetchOpenOrder: (userId) => dispatch(_fetchOpenOrder(userId)),
});

const mapStateToProps = (state) => ({
  userId: state.auth.id,
  cartItems: state.cartItems,
  openOrder: state.openOrder,
  totalAmount: state.cartItems.reduce(
    (accum, item) => accum + item.order_item.quantity * item.order_item.price,
    0
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutButton);

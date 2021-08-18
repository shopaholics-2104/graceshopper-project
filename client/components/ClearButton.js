import React, { Component } from "react";
import { _fetchOpenOrder, _clearCart } from "../store/thunk";
import { connect } from "react-redux";

class ClearButton extends Component {
  handleClear = async () => {
    await this.props.clearCart(this.props.openOrder);
    await this.props.fetchOpenOrder(this.props.userId);
  };

  render() {
    const { handleClear } = this;

    return (
      <button type="button" onClick={handleClear}>
        Clear the Cart
      </button>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  clearCart: (order) => dispatch(_clearCart(order)),
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

export default connect(mapStateToProps, mapDispatchToProps)(ClearButton);

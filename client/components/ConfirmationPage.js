import React from "react";
import { connect } from "react-redux";

const ConfirmationPage = (props) => {
  return (
    <div className="confirm_container">
      {" "}
      <h2 className="confirm_title">Thank you, {props.user.firstName}! </h2>
      <p className="confirm_subtitle">
        We've received your order. You'll receive a confirmation soon via email.
      </p>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth,
  openOrder: state.openOrder,
  cartItems: state.cartItems,
  totalAmount: state.cartItems.reduce(
    (accum, item) => accum + item.order_item.quantity * item.order_item.price,
    0
  ),
});

export default connect(mapStateToProps, null)(ConfirmationPage);

import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { _fetchOpenOrder, _updateOrder } from "../store/thunk";
import { connect } from "react-redux";

import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

const CheckoutForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    console.log(props);
    event.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[error]", error);
      alert("Payment Declined");
    } else {
      console.log("[PaymentMethod]", paymentMethod);

      await props.updateOrder({
        ...props.openOrder,
        status: "CheckOut",
        comment: "order checked out",
        totalAmount: props.totalAmount,
      });
      await props.fetchOpenOrder(props.user.id);
      props.history.push("/confirmation");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <br></br>
      <button className="finalBtn" type="submit" disabled={!stripe}>
        Pay and Checkout
      </button>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => ({
  updateOrder: (order) => dispatch(_updateOrder(order)),
  updateUser: (user) => dispatch(_updateUser(user)),
  fetchOpenOrder: (userId) => dispatch(_fetchOpenOrder(userId)),
});

const mapStateToProps = (state) => ({
  user: state.auth,
  openOrder: state.openOrder,
  cartItems: state.cartItems,
  totalAmount: state.cartItems.reduce(
    (accum, item) => accum + item.order_item.quantity * item.order_item.price,
    0
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm);

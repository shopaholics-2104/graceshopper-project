import React from "react";
import { connect } from "react-redux";
import PlacesAutocomplete from "react-places-autocomplete";
import { _fetchOpenOrder, _updateOrder } from "../store/thunk";
import { _updateUser } from "../store";
import { CardElement } from "@stripe/react-stripe-js";
import CheckoutForm from "./Stripe";
import EditUser from "./EditUser";

class CheckOut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (this.props.user.id) {
      this.setState({
        firstName: this.props.user.firstName,
        lastName: this.props.user.lastName,
        email: this.props.user.email,
        address: this.props.user.address || "",
      });
      this.props.fetchOpenOrder(this.props.user.id);
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.user.id && this.props.user.id) {
      this.setState({
        firstName: this.props.user.firstName,
        lastName: this.props.user.lastName,
        email: this.props.user.email,
        address: this.props.user.address || "",
      });
      this.props.fetchOpenOrder(this.props.user.id);
    }
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleCheckOut = async (event) => {
    // event.preventDefault();

    // const { stripe, elements } = this.props;

    // if (!stripe || !elements) return;

    // const cardElement = elements.getElement(CardElement);

    // const { error, paymentMethod } = await stripe.createPaymentMethod({
    //   type: "card",
    //   card: cardElement,
    // });

    // if (error) {
    //   console.log("[error]", error);
    // } else {
    //   console.log("[PaymentMethod]", paymentMethod);
    // }

    await this.props.updateOrder({
      ...this.props.openOrder,
      status: "CheckOut",
      comment: "order checked out",
      totalAmount: this.props.totalAmount,
    });
    await this.props.fetchOpenOrder(this.props.user.id);
  };

  render() {
    const { firstName, lastName, email, address } = this.state;
    const {
      handleCheckOut,
      handleChange,
      handleAddressChange,
      handleAdressSelect,
    } = this;
    const { totalAmount, cartItems, stripe } = this.props;

    console.log(this.props);

    return (
      <div>
        {/* Cart Items */}
        <h1>Cart</h1>

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
                </tr>
              ))}
          </tbody>
        </table>
        <br></br>
        <div> Total Amount: {totalAmount.toFixed(2)}</div>
        <br></br>

        <h1>Payment</h1>
        <CheckoutForm
          email={email}
          name={`${firstName} ${lastName}`}
          address={address}
          updateOrder={this.props.updateOrder}
          fetchOpenOrder={this.props.fetchOpenOrder}
          history={this.props.history}
          // openOrder={this.props.openOrder}
          // totalAmount={this.props.totalAmount}
        />
      </div>
    );
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(CheckOut);

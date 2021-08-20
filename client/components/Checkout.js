import React from "react";
import { connect } from "react-redux";
import PlacesAutocomplete from "react-places-autocomplete";
import { _fetchOpenOrder, _updateOrder } from "../store/thunk";
import { _updateUser } from "../store";
import { CardElement, ElementsConsumer } from "@stripe/react-stripe-js";
import StripeCheckout from "react-stripe-checkout";
import CheckoutForm from "./Stripe";
import EditUser from "./EditUser";

class CheckOut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
    };
    this.handleChange = this.handleChange.bind(this);
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
    event.preventDefault();

    const { stripe, elements } = this.props;

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }

    await this.props.updateUser({ ...this.props.user, ...this.state });
    await this.props.updateOrder({
      ...this.props.openOrder,
      status: "CheckOut",
      comment: "order checked out",
      totalAmount: this.props.totalAmount,
    });
    await this.props.fetchOpenOrder(this.props.user.id);
  };

  handleAddressChange = (address) => {
    this.setState({ address });
  };

  handleAdressSelect = (address) => {
    this.setState({ address });
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

    return (
      <div>
        {/* Checkout Form */}
        <h1>Checkout</h1>
        <form id="checkout-form" onSubmit={handleCheckOut}>
          <label htmlFor="firstName">First Name: </label>
          <input name="firstName" onChange={handleChange} value={firstName} />
          <label htmlFor="lastName">Last Name: </label>
          <input name="lastName" onChange={handleChange} value={lastName} />
          <label htmlFor="email">Email: </label>
          <input name="email" onChange={handleChange} value={email} />
          <label htmlFor="address">Address: </label>

          {/* Google Places Autocomplete API */}
        <PlacesAutocomplete
            value={address}
            onChange={handleAddressChange}
            onSelect={handleAdressSelect}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps }) => (
              <div style={{ margin: "0rem" }}>
                <input
                  {...getInputProps({ placeholder: "Search Places..." })}
                />
                <div style={{ margin: "0rem" }}>
                  {suggestions.map((suggestion) => {
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {})}
                        key={suggestion.placeId}
                      >
                        {suggestion.description}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
        {/* </form> 
        {/* <EditUser /> */}
        <h1>Payment</h1>
        {/* Stripe Card Element */}
        <label htmlFor="payment"> </label>
        <CheckoutForm
          email={email}
          name={`${firstName} ${lastName}`}
          address={address}
        />

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
        <button type="button" onClick={handleCheckOut}>
          Check Out
        </button>
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

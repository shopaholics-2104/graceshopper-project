import React from "react";
import { connect } from "react-redux";
import { _fetchOpenOrder, _removeItem, _updateItem } from "../store/thunk";
import CheckoutButton from "./CheckoutButton";
import ClearButton from "./ClearButton";

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this.props.fetchOpenOrder(this.props.userId);
  }

  handleChange(event) {
    console.log(event.target.name, event.target.value);

    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const {
      totalAmount,
      userId,
      cartItems,
      removeCartItem,
      openOrder,
      updateCartItem,
    } = this.props;
    const { handleChange } = this;
    console.log(this.state);
    return (
      <div className="cart">
        <div>
          <h3>Shopping Cart ({cartItems && cartItems.length})</h3>
          <p>Items</p>
          <ClearButton />
        </div>
        
        <div className="cartItems">
          {cartItems &&
            cartItems.map((item) => (
              <div key={item.id} className="cart_Items">
                <img
                  className="cart_Items_img"
                  src={item.imageUrl}
                  alt={item.name}
                />
                {/* for details */}
                <div className="cart_Items_details">
                  <p className="details_name">{item.name}</p>
                  <p className="details_desc">{item.description}</p>
                  <p className="details_price">
                    Cost Per Cookie: {item.order_item.price}
                  </p>
                </div>

                {/* for actions */}
                <div className="cart_Items_actions">
                  <div className="cartItem_qty">
                    {/* <label htmlFor="qty"> Quantity </label> */}
                    <span
                      className="material-icons"
                      onClick={() => {
                        updateCartItem(
                          openOrder.id,
                          item.id,
                          item.order_item.quantity + 1
                        );
                      }}
                    >
                      add
                    </span>
                    <div>{item.order_item.quantity}</div>
                    <span
                      className="material-icons"
                      onClick={() => {
                        item.order_item.quantity === 1
                          ? removeCartItem(item.id, userId)
                          : item.order_item.quantity > 0
                          ? updateCartItem(
                              openOrder.id,
                              item.id,
                              item.order_item.quantity - 1
                            )
                          : null;
                      }}
                    >
                      remove
                    </span>
                  </div>
                  {/* for delete button */}
                  <button
                    onClick={() => removeCartItem(item.id, userId)}
                    className="deleteBtn"
                  >
                    <span className="material-icons" style={{ fontSize: 25 }}>
                      delete_outline
                    </span>
                  </button>
                </div>
              </div>
            ))}
        </div>
        <div className="cart_summary">
          <h4 className="summary_title">Cart Summary</h4>
          <div className="summary_price">
            <span>
              TOTAL: (
              {cartItems.reduce((accum, item) => {
                accum += item.order_item.quantity;
                return accum;
              }, 0)}
              )
            </span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
          <div>
            <CheckoutButton />
          </div>
        </div>
      </div>
    );
  }
}
const mapState = (state) => ({
  userId: state.auth.id,
  openOrder: state.openOrder,
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

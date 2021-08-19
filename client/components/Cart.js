import React from "react";
import { connect } from "react-redux";
import { _fetchOpenOrder, _removeItem, _updateItem } from "../store/thunk";
import ClearButton from "./ClearButton";
import { Link } from "react-router-dom";

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: [],
      quantity: [],
    };
    this.handleChange = this.handleChange.bind(this);
  }
  
  componentDidMount() {
    this.props.fetchOpenOrder(this.props.userId);
  }

  componentDidUpdate(preProps) {
    if (preProps.userId !== this.props.userId) {
      this.props.cartItems.map((item) =>
        this.setState({ [item.id]: item.quantity })
      );
    }
  }

  handleChange(event) {
    console.log(event.target.name, event.target.value);
    // this.setState({ [event.target.name]: event.target.value });
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
                    <label htmlFor="qty"> Quantity </label>
                    <input
                      min="1"
                      type="number"
                      id="qty"
                      name={item.id}
                      value={this.state[item.id]}
                      onChange={handleChange}
                    />
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
                  <button
                    onClick={() =>
                      updateCartItem(openOrder.id, item.id, quantity)
                    }
                    className="addBtn"
                  >
                    <span className="material-icons" style={{ fontSize: 25 }}>
                      add_shopping_cart
                    </span>
                  </button>

                  {/* <span>
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

        <div> Total Amount: {totalAmount.toFixed(2)}</div>
        <Link to={`/checkout`}>
          <button type="button">Check Out</button>
        </Link>
        <ClearButton />
                  </span> */}
                </div>
              </div>
            ))}
        </div>
        <div className="cart_summary">
          <h4 className="summary_title">Cart Summary</h4>
          <div className="summary_price">
            <span>TOTAL: ({cartItems.length})</span>
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

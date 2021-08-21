import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  _addItem,
  _fetchAllOrders,
  _moveLocalCartItemsToCart,
} from "../store/thunk";
import EditUser from "./EditUser";
import OrderDetails from "./OrderDetails";

/**
 * COMPONENT
 */
export class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    const { fetchAllOrders, userId, moveLocalCartItemsToCart } = this.props;
    fetchAllOrders(userId);
    moveLocalCartItemsToCart(userId);
  }

  render() {
    const { username, orderHistory, isAdmin, role, user } = this.props;

    return (
      <div>
        <div className="admin_header">
          <h3 className="admin_title">
            Welcome, {role.toUpperCase()} {username}
          </h3>
          <br />
          <br />
          <div>
            <EditUser user={user} />
          </div>
          <br />
          <h4 className="order_history">
            Order History ({orderHistory.length})
          </h4>
        </div>
        <table className="table table-hover">
          <thead className="thead-dark">
            <tr>
              <th className="admin_order_detail" scope="col">
                Order Id
              </th>
              <th className="admin_order_detail" scope="col">
                Purchased Time
              </th>
              <th className="admin_order_detail" scope="col">
                Total Amount
              </th>
              <th className="admin_order_detail" scope="col">
                Order Details
              </th>
            </tr>
          </thead>
          <tbody>
            {orderHistory.map((order) => (
              <tr key={`orderId&${order.id}`}>
                <th scope="row">{order.id}</th>
                <td className="order_history">{order.updatedAt}</td>
                <td className="order_history">{order.totalAmount}</td>
                <td className="admin_order_detail">
                  <OrderDetails order={order} />
                </td>
              </tr>
            ))}
          </tbody>

          <thead className="thead-dark">
            <tr>
              <th className="admin_order_detail" scope="col">
                Total Number of Orders
              </th>
              <th className="admin_order_detail" scope="col"></th>
              <th className="admin_order_detail" scope="col"></th>
              <th className="admin_order_detail" scope="col">
                {orderHistory.length}
              </th>
            </tr>
          </thead>
        </table>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    user: state.auth,
    username: state.auth.username,
    userId: state.auth.id,
    role: state.auth.role,
    isAdmin: state.auth.role === "admin",
    orderHistory: state.allOrders.filter((order) => order.status !== "New"),
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchAllOrders: (userId) => {
      dispatch(_fetchAllOrders(userId));
    },
    moveLocalCartItemsToCart: (userId) => {
      dispatch(_moveLocalCartItemsToCart(userId));
    },
  };
};

export default connect(mapState, mapDispatch)(Home);

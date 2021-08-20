import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { _fetchAllOrders } from "../store/thunk";
import EditUser from "./EditUser";
import OrderDetails from "./OrderDetails";

/**
 * COMPONENT
 */
export class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { fetchAllOrders, userId } = this.props;
    fetchAllOrders(userId);
  }

  render() {
    const { username, orderHistory, isAdmin, role, user } = this.props;

    return (
      <div>
        <div className="admin_header">
          <h3 className="admin_title">
            Welcome, {role.toUpperCase()} {username} <EditUser user={user} />
          </h3>
          {/* {isAdmin && (
          <Link to={{ pathname: "/Admin", state: { isAdmin } }}>
            Admin Page
          </Link>
        )} */}

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
                <td>{order.updatedAt}</td>
                <td>{order.totalAmount}</td>
                <td>
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
  };
};

export default connect(mapState, mapDispatch)(Home);

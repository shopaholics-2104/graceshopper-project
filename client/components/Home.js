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
        <h3>
          Welcome, {role.toUpperCase()} {username}
        </h3>
        <div>
          <EditUser user={user} />
        </div>
        {/* {isAdmin && (
          <Link to={{ pathname: "/Admin", state: { isAdmin } }}>
            Admin Page
          </Link>
        )} */}

        <h4>Order History ({orderHistory.length})</h4>
        <table className="table table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Order Id</th>
              <th scope="col">Purchased Time</th>
              <th scope="col">Total Amount</th>
              <th scope="col">Order Details</th>
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
              <th scope="col">Total Number of Orders</th>
              <th scope="col"></th>
              <th scope="col"></th>
              <th scope="col">{orderHistory.length}</th>
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

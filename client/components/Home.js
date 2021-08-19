import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { _fetchAllOrders } from "../store/thunk";

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
    const { username, orderHistory, isAdmin, role } = this.props;

    return (
      <div>
        <h3>
          Welcome, {role.toUpperCase()} {username}
        </h3>
        {isAdmin && (
          <Link to={{ pathname: "/Admin", state: { isAdmin } }}>
            Admin Page
          </Link>
        )}
        <h4>Order History ({orderHistory.length})</h4>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
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

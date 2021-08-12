import React from "react";
import { connect } from "react-redux";
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
    const { username, orderHistory } = this.props;

    return (
      <div>
        <h3>Welcome, {username}</h3>
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

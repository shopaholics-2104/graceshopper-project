import React, { Fragment } from "react";
import { connect } from "react-redux";
import { _fetchAllUsers } from "../../store/thunk";
import ViewUser from "./AdminUser";

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { fetchAllUsers } = this.props;
    fetchAllUsers();
  }

  render() {
    const { allUsers } = this.props;
    return (
      <Fragment>
        <h1 className="admin_user_title">Users</h1>

        <table className="table table-hover">
          <thead className="thead-dark">
            <tr>
              <th className="admin_order_detail" scope="col">
                Id
              </th>
              <th className="admin_order_detail" scope="col">
                Role
              </th>
              <th className="admin_order_detail" scope="col">
                Username
              </th>
              <th className="admin_order_detail" scope="col">
                User Info
              </th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user) => (
              <tr key={user.id}>
                <th scope="col">{user.id}</th>
                <td>{user.role}</td>
                <td>{user.username}</td>
                <td>
                  <ViewUser user={user} />{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

const mapState = (state) => ({
  allUsers: state.allUsers,
});

const mapDispatch = (dispatch) => ({
  fetchAllUsers: () => {
    dispatch(_fetchAllUsers());
  },
});

export default connect(mapState, mapDispatch)(User);

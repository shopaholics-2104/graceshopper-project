import React from "react";
import { connect } from "react-redux";
import { _fetchAllProducts, _fetchAllUsers } from "../store/thunk";

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { fetchAllUsers, fetchAllProducts } = this.props;
    fetchAllUsers();
    fetchAllProducts();
  }

  render() {
    const { allProducts, allUsers } = this.props;
    return (
      <div>
        <h1>Users</h1>

        <table border="2">
          <tbody>
            <tr>
              <td>Username</td>
              <td>FirstName</td>
              <td>LastName</td>
              <td>Email</td>
              <td>addressLine_1</td>
              <td>addressLine_2</td>
              <td>city</td>
              <td>state</td>
              <td>zipCode</td>
              <td>country</td>
              <td>mobile</td>
              <td>role</td>
            </tr>

            {allUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.addressLine_1}</td>
                <td>{user.addressLine_2}</td>
                <td>{user.city}</td>
                <td>{user.state}</td>
                <td>{user.zipCode}</td>
                <td>{user.country}</td>
                <td>{user.mobile}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        <h1>Products</h1>
        <table border="2">
          <tbody>
            <tr>
              <td>Name</td>
              <td>Description</td>
              <td>Price</td>
              <td>Inventory Status</td>
              <td>Image Url</td>
              <td>Flavor</td>
            </tr>
            {allProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>
                  <p>{product.description}</p>
                </td>
                <td>{product.single_price}</td>
                <td>{product.status}</td>
                <td>{product.imageUrl}</td>
                <td>{product.category.flavor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapState = (state) => ({
  allUsers: state.allUsers,
  allProducts: state.allProducts,
});

const mapDispatch = (dispatch) => ({
  fetchAllProducts: () => {
    dispatch(_fetchAllProducts());
  },
  fetchAllUsers: () => {
    dispatch(_fetchAllUsers());
  },
});

export default connect(mapState, mapDispatch)(Admin);

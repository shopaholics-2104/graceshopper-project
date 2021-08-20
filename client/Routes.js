import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import Cart from "./components/Cart";
import SingleProduct from "./components/SingleProduct";
import Admin from "./components/Admin/Admin";
import Products from "./components/Products";
import Search from "./components/Search";
import { me } from "./store";
import Checkout from "./components/Checkout";
import { fetchTotal } from "./store/thunk";
import Category from "./components/Categories";
import SingleCategory from "./components/SingleCategory";

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn, isAdmin } = this.props;

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route
              path="/products/:productId"
              component={SingleProduct}
              exact
            />
            <Route
              path="/products/pagination/:idx?"
              component={Products}
              exact
            />

            <Route
              path="/categories/:categoryId"
              component={SingleCategory}
              exact
            />
            <Route path="/products" component={Products} exact />
            <Route path="/home" component={Home} />
            <Route path="/cart" component={Cart} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/admin" component={Admin} />

            <Route path="/search" component={Search} />

            <Route path="/admin" component={Admin} />
            <Route path="/categories" component={Category} />

            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route
              path="/products/pagination/:idx?"
              component={Products}
              exact
            />
            {/* <Route path="/" exact component={Login} /> */}
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/checkout" component={Checkout} />

            <Route path="/products" component={Products} exact />
            <Route
              path="/products/:productId"
              component={SingleProduct}
              exact
            />
          </Switch>
        )}
        <Switch></Switch>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
      dispatch(fetchTotal());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));

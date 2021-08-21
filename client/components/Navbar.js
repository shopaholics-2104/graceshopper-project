import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const Navbar = ({ handleClick, isLoggedIn, isAdmin }) => (
  <div className="container">
    {isLoggedIn ? (
      <div className="navbar">
        {/* The navbar will show these links after you log in */}
        <nav className="navbar navbar-expand-md navbar-transparent ">
          <button
            type="button"
            className="navbar-toggler"
            data-toggle="collapse"
            data-target="#navbarCollapse"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div id="navbarCollapse" className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <li className="nav-item">
                <Link to="/home">Home</Link>
              </li>

              <li className="nav-item">
                <Link to="/products">All Cookies</Link>
              </li>

              <li className="nav-item">
                <Link to="/cart">Cart</Link>
              </li>
            </ul>
            <ul className="nav navbar-nav ml-auto">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle " data-toggle="dropdown">
                  MORE
                </a>
                <div className="dropdown-menu dropdown-menu-right">
                  <ul>
                    <li className="dropdown-item">
                      <Link to="/categories">Category</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/search">Search</Link>
                    </li>

                    <li className="dropdown-item">
                      {isAdmin ? <Link to="/admin">Admin</Link> : null}
                    </li>

                    <div className="dropdown-divider"></div>

                    <li className="dropdown-item">
                      <a href="#" onClick={handleClick}>
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    ) : (
      <div className="navbar">
        {/* The navbar will show these links before you log in */}
        <nav>
          <ul>
            <li href="" data-toggle="modal" data-target="#modalLoginForm">
              <Link to="/login">Login</Link>
            </li>

            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/products">All Cookies</Link>
            </li>
            <li>
              <Link to="/search">Search</Link>
            </li>
            <li className="nav-item">
              <Link to="/cart">Cart</Link>
            </li>
          </ul>
        </nav>
      </div>
    )}
  </div>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    isAdmin: state.auth.role === "admin",
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);

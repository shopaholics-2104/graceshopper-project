import React from "react";
import AdminProducts from "./ViewProducts";
import AdminUser from "./ViewUsers";
import { connect } from "react-redux";

const Admin = ({ isAdmin }) => {
  return (
    isAdmin && (
      <div className="admin">
        <AdminUser />
        <br />
        <br />
        <AdminProducts />
      </div>
    )
  );
};
const mapState = (state) => ({
  isAdmin: state.auth.role === "admin",
});

export default connect(mapState, null)(Admin);

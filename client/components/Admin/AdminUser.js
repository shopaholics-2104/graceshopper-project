import React, { Fragment } from "react";

const AdminUser = ({ user }) => {
  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target={`#UserId${user.id}`}
      >
        View More
      </button>

      <div className="modal" id={`UserId${user.id}`}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">
                {user.fullName} {user.role.toUpperCase()}
              </h4>
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
            </div>

            <div className="modal-body">
              <div>
                <label>Order History:</label>
                {user.orders.length}
              </div>
              <div>
                <label>Email:</label>
                {user.email}
              </div>
              <div>
                <label>Mobile:</label>
                {user.mobile}
              </div>
              <div>
                <label>Full Address:</label>
                {user.fullAddress}
              </div>
              <div>
                <label>Open Cart:</label>
                {user.orders.filter((order) => order.status === "New")[0]
                  ? user.orders.filter((order) => order.status === "New")[0].id
                  : "No open cart"}
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AdminUser;

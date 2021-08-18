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
                {user.role.toUpperCase()} {user.username}
              </h4>
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
            </div>

            <div className="modal-body">
              <div class="container">
                <div class="row g-2">
                  <div class="col-6">
                    <label>UserName:</label>
                    <div class="p-3 border bg-light"> {user.username}</div>
                  </div>
                  <div class="col-6">
                    <label>Full Name:</label>
                    <div class="p-3 border bg-light"> {user.fullName}</div>
                  </div>

                  <div class="col-6">
                    <label>Role:</label>
                    <div class="p-3 border bg-light"> {user.role}</div>
                  </div>

                  <div class="col-6">
                    <label>Order History:</label>
                    <div class="p-3 border bg-light">{user.orders.length}</div>
                  </div>
                  <div class="col-6">
                    <label>Email:</label>
                    <div class="p-3 border bg-light">{user.email}</div>
                  </div>
                  <div class="col-6">
                    <label> Mobile:</label>
                    <div class="p-3 border bg-light">{user.mobile}</div>
                  </div>
                  <div class="col-6">
                    <label>Full Address:</label>
                    <div class="p-3 border bg-light">{user.fullAddress}</div>
                  </div>

                  <div class="col-6">
                    <label>Open Cart:</label>
                    <div class="p-3 border bg-light">
                      {user.orders.filter((order) => order.status === "New")[0]
                        ? user.orders.filter(
                            (order) => order.status === "New"
                          )[0].id
                        : "No open cart"}
                    </div>
                  </div>
                </div>
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

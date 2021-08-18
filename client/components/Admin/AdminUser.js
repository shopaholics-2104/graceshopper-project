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
                    <div class="p-3 border bg-light">
                      {" "}
                      <label>UserName:</label>
                      {user.username}
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="p-3 border bg-light">
                      {" "}
                      <label>Full Name:</label>
                      {user.fullName}
                    </div>
                  </div>

                  <div class="col-6">
                    <div class="p-3 border bg-light">
                      {" "}
                      <label>Role:</label>
                      {user.role}
                    </div>
                  </div>

                  <div class="col-6">
                    <div class="p-3 border bg-light">
                      <label>Order History:</label>
                      {user.orders.length}
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="p-3 border bg-light">
                      <label>Email:</label>
                      {user.email}
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="p-3 border bg-light">
                      <label> Mobile:</label>
                      {user.mobile}
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="p-3 border bg-light">
                      {" "}
                      <label>Full Address:</label>
                      {user.fullAddress}
                    </div>
                  </div>

                  <div class="col-6">
                    <div class="p-3 border bg-light">
                      <label>Open Cart:</label>
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

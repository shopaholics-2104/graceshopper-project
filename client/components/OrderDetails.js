import React, { Fragment } from "react";

const OrderDetails = ({ order }) => {
  const { products } = order;
  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target={`#OrderId${order.id}`}
      >
        View More
      </button>

      <div className="modal" id={`OrderId${order.id}`}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Order-{order.id}</h4>
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
            </div>

            <div className="modal-body">
              <div className="container">
                <div className="row g-2">
                  {products.map((product) => (
                    <div className="col-6">
                      <label>Product Name</label>
                      <div className="p-3 border bg-light"> {product.name}</div>
                    </div>
                  ))}
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

export default OrderDetails;

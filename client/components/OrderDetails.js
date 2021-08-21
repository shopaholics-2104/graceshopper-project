import React, { Fragment } from "react";

const OrderDetails = ({ order }) => {
  const { products } = order;
  console.log(order);
  return (
    <Fragment>
      <button
        type="button"
        className="btn"
        data-toggle="modal"
        data-target={`#OrderId${order.id}`}
      >
        View More
      </button>

      <div className="modal" id={`OrderId${order.id}`}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Order: {order.id}</h4>
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
            </div>

            <div className="modal-body">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Subtotal</th>
                  </tr>
                </thead>

                <tbody>
                  {products &&
                    products.map((product) => (
                      <tr key={product.id}>
                        <th scope="row">{product.id}</th>
                        <td>{product.name}</td>
                        <td>${product.order_item.price}</td>
                        <td>{product.order_item.quantity}</td>
                        <td>
                          {(
                            product.order_item.quantity *
                            product.order_item.price
                          ).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {/* <div className="container">
                <div className="row g-2">
                  {products.map((product) => (
                    <div key={product.id}>
                      <div className="col-6">
                        <label>Name</label>
                        <div className="p-3 border bg-light">
                          {" "}
                          {product.name}
                        </div>
                      </div>
                      <div className="col-6">
                        <label>Price</label>
                        <div className="p-3 border bg-light">
                          {" "}
                          ${product.price}
                        </div>
                      </div>

                      <div className="col-6">
                        <label>Quantity</label>
                        <div className="p-3 border bg-light">
                          {" "}
                          {product.quantity}
                        </div>
                      </div>

                      <div className="col-6">
                        <label>Subtotal</label>
                        <div className="p-3 border bg-light">
                          {" "}
                          {(product.quantity * product.price).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div> */}
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

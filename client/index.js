import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import history from "./history";
import store from "./store";
import App from "./App";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51JPGA6HdmiNqjtgjt5WJaGqe2LTzzednyBGq10tQ8AWgPl6JCg2p4wN31zguQisnxFqyuYZz73wi0Dijej1YnmOb00ALlA3StB"
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </Router>
  </Provider>,
  document.getElementById("app")
);

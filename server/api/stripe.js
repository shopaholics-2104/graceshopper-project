const router = require("express").Router();
// This is the test secret API key.
const stripe = require("stripe")(
  "sk_test_51JPGA6HdmiNqjtgjIBcPQtMxQoEO3gMs9nkGdXMcNOUm9geQdZm0QVnhMnqWNy0jBPuxN15juR0H52Yr6H0G2rRo00NvYqxQhc"
);
const {
  models: { Order },
} = require("../db");

// This is your real test secret API key.
const stripe = require("stripe")(
  "sk_test_51JPGA6HdmiNqjtgjIBcPQtMxQoEO3gMs9nkGdXMcNOUm9geQdZm0QVnhMnqWNy0jBPuxN15juR0H52Yr6H0G2rRo00NvYqxQhc"
);
const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};
app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

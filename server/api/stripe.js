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

router.post("/session", async (req, res, next) => {
  try {
    const { token, total } = req.body;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const charge = await stripe.charges.create({
      amount: total * 100,
      currency: "usd",
      customer: customer.id,
      receipt_email: token.email,
      description: "Marvelous Cookies",
      shipping: {
        name: token.card.name,
        address: {
          line1: token.card.address_line1,
          city: token.card.address_city,
          country: token.card.address_country,
          postal_code: token.card.address_zip,
          state: token.card.address_state,
        },
      },
    });

    if (charge) {
      res.sendStatus(200);
    } else {
      const error = new Error("Unable To Charge");
      error.status = 402;
      throw error;
    }
  } catch (ex) {
    next(ex);
  }
});

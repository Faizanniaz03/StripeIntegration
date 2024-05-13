import express from "express";

const app = express();
const port = 3000; //add your port here
const PUBLISHABLE_KEY = "pk_test_51PEnDn2MBG739KhfEycyY780EHLLNu4BJBtRvWbeVDWFxUsVduGIIbBvKlTN1ixBAHZ7zZPdkoKU4qers13n5mE200piTFqCie";
const SECRET_KEY = "sk_test_51PEnDn2MBG739KhfQHxbsmVfWdAGIIK74kuTNi5TaNKfVD2YR9nUdv2iT1AO8casXsBzNAetjejkTEqU4I0bzpjA00dcw0kwTF";
import Stripe from "stripe";

//Confirm the API version from your stripe dashboard
const stripe = Stripe(SECRET_KEY, { apiVersion: "2024-04-10" });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.post("/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1099, //lowest denomination of particular currency
      currency: "usd",
      payment_method_types: ["card"], //by default
    });

    const clientSecret = paymentIntent.client_secret;

    res.json({
      clientSecret: clientSecret,
    });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
});
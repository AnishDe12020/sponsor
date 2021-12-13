/* eslint-disable import/no-anonymous-default-export */
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async (req: any, res: any) => {
  const { amount, email } = req.body;

  const transformedItems = [
    {
      price_data: {
        currency: "inr",
        product_data: {
          name: "Sponsoring Avneesh",
        },
        unit_amount: amount * 100,
      },
      quantity: 1,
    },
  ];

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    billing_address_collection: "auto",
    line_items: transformedItems,
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/",
    metadata: {
      email,
    },
  });

  res.status(200).json({ id: session.id });
};

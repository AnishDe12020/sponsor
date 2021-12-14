const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://sponsor.avneesh.tech";

const handler = async (req: any, res: any) => {
  const { amount } = req.body;

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
    submit_type: "donate",
    line_items: transformedItems,
    mode: "payment",
    success_url:
      process.env.NODE_ENV === "development"
        ? `${URL}/success`
        : `${URL}/success`,
    cancel_url: process.env.NODE_ENV === "development" ? `${URL}` : `${URL}`,
  });

  res.status(200).json({ id: session.id });
};

export default handler;

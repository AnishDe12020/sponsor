const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

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
    line_items: transformedItems,
    mode: "payment",
    success_url:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/success"
        : "https://sponsor.avneesh.tech/success",
    cancel_url:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://sponsor.avneesh.tech",
  });

  res.status(200).json({ id: session.id });
};

export default handler;

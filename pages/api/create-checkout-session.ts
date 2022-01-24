const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import data from "../../public/data.json";

const URL =
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : data.url;

const handler = async (req: any, res: any) => {
  const { amount } = req.body;

  const transformedItems = [
    {
      price_data: {
        currency: data.currency.toLowerCase() || "inr",
        product_data: {
          name: `Sponsoring ${data.name}`,
        },
        unit_amount: amount * 100,
      },
      quantity: 1,
    },
  ];

  const session = await stripe.checkout.sessions.create({
    billing_address_collection: "auto",
    submit_type: "donate",
    line_items: transformedItems,
    mode: "payment",
    success_url: `${URL}/success`,
    cancel_url: URL,
  });

  res.status(200).json({ id: session.id });
};

export default handler;

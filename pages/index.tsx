import Head from "next/head";
import Image from "next/image";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
const stripePromise = loadStripe(
  process.env.stripe_public_key ? process.env.stripe_public_key : ""
);

export default function Home() {
  const [amount, setAmount] = useState<number | null>(null);
  const defaultAmounts = [200, 500, 1000];

  const createCheckOutSession = async () => {
    const stripe = await stripePromise;

    const checkoutSession = await axios.post("/api/create-checkout-session", {
      amount: amount,
      email: "test@gmail.com",
    });

    const result = await stripe?.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result?.error) {
      alert(result?.error.message);
    }
  };

  return (
    <div className="flex flex-col w-screen min-h-screen overflow-x-hidden bg-background justify-center items-center">
      <Head>
        <title>Sponsor Avneesh</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="absolute top-10 left-10">
        <Image
          src="/logo.svg"
          alt="logo"
          width={250}
          height={70}
          objectFit="contain"
        />
      </div>

      <div className="sm:w-[500px] w-[300px] flex flex-col space-y-5 shadow-xl rounded-xl items-center p-5 bg-[#1DC3F0]/50">
        <div className="flex items-center justify-between w-full">
          {defaultAmounts.map(buttonAmount => (
            <button
              className={`${
                amount === buttonAmount ? "bg-background" : "bg-accent"
              }  px-6 py-3 rounded-lg`}
              onClick={() => setAmount(buttonAmount)}
              key={buttonAmount}
            >
              ₹{buttonAmount}
            </button>
          ))}
        </div>
        <input
          type="number"
          value={amount ? amount : ""}
          className="bg-accent px-6 py-3 focus:outline-none rounded-lg w-full"
          placeholder="Custom value (in INR)"
          onChange={e => setAmount(parseInt(e.target.value))}
        />

        <button
          onClick={createCheckOutSession}
          role="link"
          className="bg-accent w-full px-6 py-3 rounded-lg"
        >
          Sponsor
        </button>
      </div>
    </div>
  );
}

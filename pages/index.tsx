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
    <div className="w-screen min-h-screen overflow-x-hidden p-10 bg-[#324069] ">
      <Head>
        <title>Sponsor Avneesh</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex w-full relative h-[90vh] bg-background rounded-lg p-10 justify-evenly items-center">
        <div className="w-full absolute bottom-0 rounded-b-lg h-40 bg-[#172241]"></div>
        <div className="bottom-10">
          <Image
            src="/Illustration.svg"
            alt="logo"
            width={500}
            height={430}
            objectFit="contain"
          />
        </div>

        <div className="flex flex-col items-start">
          <Image
            src="/logo.svg"
            alt="logo"
            width={250}
            height={70}
            objectFit="contain"
          />
          <div className="sm:w-[500px] w-[300px] z-50 mt-10 flex flex-col space-y-5 shadow-xl rounded-md items-center p-5 bg-[#3A4462]">
            <h2 className="font-semibold text-3xl text-accent">
              Love what I do? Feel free to support me with a donation!
            </h2>
            <p className="text-[#E3E3E3]">
              Thanks in advance. Each donation of yours means a lot, however
              little it might be!
            </p>
            <input
              type="number"
              value={amount ? amount : ""}
              className="bg-[#E9F9FA]/30 px-6 py-3 focus:outline-none rounded-lg w-full"
              placeholder="Enter Amount"
              onChange={e => setAmount(parseInt(e.target.value))}
            />
            <div className="flex items-center justify-between w-full">
              {defaultAmounts.map(buttonAmount => (
                <button
                  className={`${
                    amount === buttonAmount ? "bg-accent" : "bg-[#E7EAEA]/70"
                  }  px-6 py-3 rounded-full`}
                  onClick={() => setAmount(buttonAmount)}
                  key={buttonAmount}
                >
                  ₹{buttonAmount}
                </button>
              ))}
            </div>

            <button
              onClick={createCheckOutSession}
              role="link"
              className="bg-accent text-xl mt-4 font-semibold w-full px-6 py-3 rounded-lg"
            >
              Sponsor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

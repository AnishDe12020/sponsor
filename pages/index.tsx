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
    });

    const result = await stripe?.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result?.error) {
      alert(result?.error.message);
    }
  };

  return (
    <div className="flex w-screen flex-col-reverse sm:flex-row relative min-h-screen bg-background sm:p-20 p-10 sm:justify-evenly items-center">
      <Head>
        <title>Sponsor Avneesh</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-screen absolute bottom-0 rounded-b-lg mt-10 h-28 sm:h-40 bg-[#172241]"></div>
      <div className="sm:-mb-24 mb-12 mt-20 sm:mt-0">
        <Image
          src="/Illustration.svg"
          alt="logo"
          width={500}
          height={430}
          objectFit="contain"
        />
      </div>

      <div className="flex flex-col items-center sm:items-start w-screen sm:w-auto sm:h-auto">
        <div className="relative w-60 h-16">
          <Image src="/logo.svg" alt="logo" layout="fill" objectFit="contain" />
        </div>
        <div className="sm:w-[436px] w-[90vw] z-50 mt-10 flex flex-col space-y-5 shadow-xl rounded-md items-center px-5 sm:px-10 p-10 bg-[#3A4462]">
          <h2 className="font-semibold font-ClashDisplay text-3xl text-accent">
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
          <div className="flex items-center space-x-2 w-full">
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
  );
}

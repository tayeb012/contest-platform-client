import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import CheckoutForm from "./CheckoutForm";
import { useParams } from "react-router-dom";

// to do
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);
const Payment = () => {
  const { contestPrice } = useParams();
  console.log("Payment", contestPrice);
  return (
    <div className=" text-center py-32">
      Payment
      <div className="mx-32">
        <Elements stripe={stripePromise}>
          <CheckoutForm contestPrice={contestPrice} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;

import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./checkoutForm";
import axios from "axios";
import Loader from "./Loader";

const stripePromise = loadStripe(
  "pk_test_51OARbWBE05GWCL9eWy2vDqXNLR4L9M1YVtkVExQSkqqQYO8hvUGGjawadvsqIAcXuKX6Aw4tGvqUJQHm2Bf6xNZo00wJQ7LwMh"
);

export default function StripeCheckout({
  wclassid,
  oclassid,
  customerEmail,
  customerName,
  billAmount,
}) {
  const [clientSecret, setClientSecret] = useState("");
  const [err, setErr] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // console.log("name: ", customerName);
    // console.log("email: ", customerEmail);
    if (customerName && customerEmail) {
      let data = {
        name: customerName,
        email: customerEmail,
      };
      axios("https://13.214.85.41/payments/create-checkout", {
        method: "POST",
        data: data,
        headers: { "Content-Type": "application/json" },
        params: {
          amount: billAmount,
        },
      })
        .then((val) => {
          setIsLoading(true);
          setClientSecret(val.data.paymentIntent.client_secret);

          if (val.status === 400) {
            setErr(val.data);
            console.log("val", val);
          }
        })
        .finally(() => {
          setIsLoading(false);
        })
        .catch((error) => {
          // alert(error.message);
          setIsLoading(false);
          console.log(error);
        });
    }
  }, [customerEmail]);

  const options = {
    clientSecret,
  };

  return (
    <div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise} key={clientSecret}>
          <CheckoutForm
            workshopClassId={wclassid}
            onlineClassId={oclassid}
            paymentSecret={clientSecret}
          />
        </Elements>
      )}
    </div>
  );
}

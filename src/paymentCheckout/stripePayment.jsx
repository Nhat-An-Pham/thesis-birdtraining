import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./checkoutForm";
import axios from "axios";
import Loader from "./Loader";
import workshopService from "../services/workshop.service";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
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
    // console.log("get payment ");
    if (customerName && customerEmail) {
      // let data = {
      //   name: customerName,
      //   email: customerEmail,
      // };
      // console.log(data);
      // console.log(billAmount);
      let canCheckOut = true;
      if (wclassid) {
        workshopService
          .getBillingInformation({ wclassId: wclassid })
          .then((res) => {
            canCheckOut = true;
          })
          .catch((e) => (canCheckOut = false));
      }
      if (canCheckOut) {
        axios(process.env.REACT_APP_PAYMENT + "/payments/create-checkout", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          params: {
            amount: billAmount,
          },
          data: JSON.stringify({
            name: customerName,
            email: customerEmail,
          }),
        })
          .then((val) => {
            setIsLoading(true);
            console.log("return: ", val.data.paymentIntent);
            setClientSecret(val.data.paymentIntent.client_secret);

            if (val.status === 400) {
              setErr(val.data);
              console.log("error 400: ", val);
            }
          })
          .finally(() => {
            setIsLoading(false);
          })
          .catch((error) => {
            // alert(error.message);
            setIsLoading(false);
            console.log("error: ", error);
          });
      }
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

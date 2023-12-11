import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Loader from "./Loader";
import WorkshopService from "../services/workshop.service";
import OnlinecourseService from "../services/onlinecourse.service";
import { toast } from "react-toastify";

export default function CheckoutForm({
  workshopClassId,
  onlineClassId,
  paymentSecret,
}) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      setMessage(
        paymentIntent.status === "succeeded"
          ? "Your payment succeeded"
          : "Unexpected error occurred"
      );
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    if (workshopClassId && paymentSecret) {
      WorkshopService.postPurchaseWsClass({ workshopClassId: workshopClassId, paymentCode: paymentSecret})
        .then((res) => {
          toast.success("Successfully Paid", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: 0,
            theme: "colored",
          });
        })
        .catch((err) => {
          console.log(err.response.data);
          toast.error("FAIL TO SUBMIT ORDER");
        });
    }

    if (onlineClassId) {
      OnlinecourseService.postSubmitPayment({courseId: onlineClassId, paymentCode: paymentSecret})
        .then((res) => {
          toast.success("Successfully Paid", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: 0,
            theme: "colored",
          });
        })
        .catch((err) => {
          console.log("False to submit Order: ", err.response);
          toast.error("FAIL TO SUBMIT ORDER");
        });
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/check-out/complete`,
      },
    });

    if (
      error &&
      (error.type === "card_error" || error.type === "validation_error")
    ) {
      setMessage(error.message);
    }

    setIsLoading(false);
  };

  console.log('workshopClassId', workshopClassId)
  console.log('onlineClassId', onlineClassId)

  console.log('paymentSecret', paymentSecret)

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button
        className=" btn bg-black rounded-xl text-white p-2 mt-6 mb-2"
        disabled={isLoading || !stripe || !elements}
      >
        <i class="fa-solid fa-lock"></i> {isLoading ? "Loading..." : "Pay now"}
      </button>
      {message && <div>{message}</div>}
    </form>
  );
}

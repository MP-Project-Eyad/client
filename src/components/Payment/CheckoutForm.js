import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "./style.css";
// import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";


// const MySwal = withReactContent(Swal);

export default function CheckoutForm( ) {
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
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();
   
      // Swal.fire({
      //   position: 'center',
      //   icon: 'success',
      //   title: 'payment successfully ',
      //   showConfirmButton: false,
      //   timer: 6500
      // })
    
    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `http://localhost:3000`,
      },
      
    });
    
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsLoading(false);
  };

  return (
    <div>
     
      <div className="containerPayment">
        <form id="payment-form" className="formPay" onSubmit={handleSubmit} >
          <PaymentElement id="payment-element" />
          <button
          
            className="btnPay"
            disabled={isLoading || !stripe || !elements}
            id="submit"
          >
            <span id="button-text">
              {isLoading ? (
                <div className="spinner" id="spinner"></div>
              ) : (
                "Pay now"
              )}
            </span>
          </button>
          {message && <div id="payment-message">{message}</div>}
        </form>
      </div>
    </div>
  );
}
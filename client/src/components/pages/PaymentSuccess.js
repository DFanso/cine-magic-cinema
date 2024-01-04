import React, { useEffect } from "react";
import "../css/PaymentSucess.css"; // Import your CSS file for styling

import { TailSpin } from "react-loader-spinner";
import { useLoading } from "../LoadingContext.js";

const PaymentSuccess = () => {

  const { loading, setLoading } = useLoading();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 15000); // Set the timeout for 15 seconds

    return () => clearTimeout(timer); // Cleanup the timer
  }, [setLoading]);

  return (
    <div className="main-layout">
      <div className="login-wrapper">
        {loading && (
          <div className="loader-container">
            <TailSpin color="#00BFFF" height={100} width={100} />
          </div>
        )}
        {!loading && ( // Only render this part when not loading
          <div className="payment-success-container">
            <h1 className="payment-success-text">Payment Successful!</h1>
            <p className="payment-success-message">
              Thank you for your payment. Your transaction was successful.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;

import React from 'react';
import '../css/PaymentSucess.css'; // Import your CSS file for styling

const PaymentSuccess = () => {
    return (
        <div className="payment-success-container">
            <h1 className="payment-success-text">Payment Successful!</h1>
            <p className="payment-success-message">
                Thank you for your payment. Your transaction was successful.
            </p>
        </div>
    );
};

export default PaymentSuccess;

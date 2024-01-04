import React from 'react';
import '../css/PaymentSucess.css'; // Import your CSS file for styling

const PaymentSuccess = () => {
    return (
        <div className="payment-success-container">
            <h1 className="payment-success-text">Payment Successful!</h1>
            <p className="payment-success-message">
                Thank you for your payment. Your transaction was successful.
                <div className='success-icon'><img className='yes-img' src="/images/yes.png" alt="Success Icon"></img></div>
            </p>
        </div>
    );
};

export default PaymentSuccess;

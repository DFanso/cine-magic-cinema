import React from 'react';
import '../css/PaymentSucess.css'; // Import your CSS file for styling

const PaymentCancel = () => {
    return (
        <div className="payment-success-container">
            <h1 className="payment-success-text">Payment Canceled!</h1>
            <p className="payment-success-message">
                Your payment has been canceled.
                <div className='cancel-icon'><img className='yes-img' src="/images/no.png" alt="Success Icon"></img></div>
            </p>
        </div>
    );
};

export default PaymentCancel;

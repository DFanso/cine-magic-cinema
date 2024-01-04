import React, { useState } from 'react';
import '../css/Login.css'; // Reusing the same CSS file
import { Link } from 'react-router-dom';

const RegisterPage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Implement your registration logic here
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h1>Register</h1>
                <div className="form-group">
                    <label className='label-name'>First Name:</label><br />
                    <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label className='label-name'>Last Name:</label><br />
                    <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label className='label-name'>Email:</label><br />
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label className='label-name'>Password:</label><br />
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <div className='login-btn-div'>
                    <button type="submit" className="login-button">Register</button>
                </div>
                <Link to="/login"><p className="reg-link">Already have an account? Login</p></Link>
            </form>
        </div>
    );
};

export default RegisterPage;

// Login.js
import React, { useState } from 'react';
import '../css/Login.css'; // Import the CSS file
import { Link } from 'react-router-dom';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Implement your login logic here
        onLogin();
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h1>Login</h1>
                <div className="form-group">
                    <label className='label-name'>Email:</label><br />
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                    <label className='label-name'>Password:</label><br />
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <div className='log-reg-con'>
                    <div className='login-btn-div'>
                        <button type="submit" className="login-button">Login</button>
                    </div>


                    <Link to="/register-page" className="btn-link">
                        <p className="reg-link">Register</p>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Login;

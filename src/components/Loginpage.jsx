import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Assume authentication is successful
        // Redirect based on role
        if (username === 'admin') {
            navigate('/dashboard');
        } else {
            navigate('/dashboard');
        }
    };

    const handleRegisterRedirect = () => {
        navigate('/register');
    };

    return (
        <div className="login-container">
            <form onSubmit={handleLogin} className="login-form">
                <h2 className="text-center">Login</h2>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="input-field"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="input-field"
                />
                <button type="submit" className="login-btn">Login</button>
            </form>
            <div className="register-container">
                <span>Don't have an account?</span>
                <button onClick={handleRegisterRedirect} className="register-btn">
                    Register Now
                </button>
            </div>
        </div>
    );
};

export default LoginPage;

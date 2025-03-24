import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making API calls
import './LoginPage.css';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // The handleSubmit function to handle login via API call
    const handleSubmit = (e) => {
        e.preventDefault();

        // Prepare the data to be sent to the API
        const loginData = {
            username: username,
            password: password
        };

        // API URL for login (replace with actual URL)
        const apiUrl = 'http://127.0.0.1:8000/api/accounts/login/'; // Replace with your login API URL

        // Send the login request to the backend
        axios.post(apiUrl, loginData)
            .then((response) => {
                console.log('Login successful:', response.data);
                // Assuming the response includes user data or a token
                const userRole = response.data.userType; // Assuming the backend sends role data
debugger;
                // Redirect based on role
                if (userRole === 'admin') {
                    navigate('/dashboardAdmin'); // Redirect admin to dashboard
                } else {
                    navigate('/dashboard'); // Redirect student to dashboard (or another page)
                }
            })
            .catch((error) => {
                console.error('Login error:', error.response || error);
                // Handle error (show an error message)
            });
    };

    const handleRegisterRedirect = () => {
        navigate('/register');
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
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

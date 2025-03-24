import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // Import axios
import './RegisterPage.css';

const RegisterPage = () => {
    const [role, setRole] = useState('student');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [department, setDepartment] = useState('');
    const [universityRoll, setUniversityRoll] = useState('');
    const [address, setAddress] = useState('');
    const [staffId, setStaffId] = useState('');
    const [email, setEmail] = useState('');  // Add email state
    const [password, setPassword] = useState('');  // Add password state

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Collect data based on the role (student or admin)
        const formData = {
            username: name,
            phoneNumber: phone,
            department: department,
            address: address,
            userType: role,
            email: email,  // Include email in the payload
            user_Number: role === 'student' ? universityRoll : staffId,
            password: password  // Include password in the payload
        };

        // URL for your registration API (replace with actual URL)
        const apiUrl = 'http://127.0.0.1:8000/api/accounts/register/';

        // Making an API call to register the user
        axios.post(apiUrl, formData)
            .then(response => {
                console.log('User registered successfully:', response.data);
                // Redirect or show success message
                navigate('/');  // You can redirect to login page after successful registration
            })
            .catch(error => {
                console.error('Error registering the user:', error.response || error);
                // Handle error (show an error message)
            });
    };

    const handleBack = () => {
        navigate('/');
    };

    return (
        <div className="register-container1">
            <button className="back-btn" onClick={handleBack}>Back to Login</button>
            <form onSubmit={handleSubmit} className="register-form">
                <h2>{role === 'student' ? 'Student Registration' : 'Admin Registration'}</h2>

                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}  // Handle email change
                    required
                />
                <input
                    type="text"
                    placeholder={role === 'student' ? 'University Roll No.' : 'Staff ID'}
                    value={role === 'student' ? universityRoll : staffId}
                    onChange={(e) => role === 'student' ? setUniversityRoll(e.target.value) : setStaffId(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Department"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    required
                />
                {role === 'student' && (
                    <input
                        type="text"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                )}

                {/* Add the password input field */}
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}  // Handle password change
                    required
                />

                <button type="submit">{role === 'student' ? 'Register as Student' : 'Register as Admin'}</button>
            </form>

            <div className="role-toggle">
                <span
                    onClick={() => setRole(role === 'student' ? 'admin' : 'student')}
                    style={{ cursor: 'pointer', color: '#007bff' }}
                >
                    Switch to {role === 'student' ? 'Admin' : 'Student'} Registration
                </span>
            </div>
        </div>
    );
};

export default RegisterPage;

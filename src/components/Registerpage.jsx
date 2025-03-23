import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';

const RegisterPage = () => {
    const [role, setRole] = useState('student');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [department, setDepartment] = useState('');
    const [universityRoll, setUniversityRoll] = useState('');
    const [address, setAddress] = useState('');
    const [staffId, setStaffId] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted');
        // Logic to register the user (API call or state management)
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

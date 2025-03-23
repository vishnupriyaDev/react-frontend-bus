import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="navbar">
            <div className="navbar-left">
                <h2>School Dashboard</h2>
            </div>
            <div className={`navbar-right ${isMenuOpen ? 'open' : ''}`}>
                <Link to="/bus-list" className="navbar-item">Bus List</Link>
                <Link to="/drivers-list" className="navbar-item">Drivers List</Link>
                <Link to="/payments-dashboard" className="navbar-item">Payments Dashboard</Link>
            </div>
            <div className="navbar-toggle" onClick={toggleMenu}>
                <span className="navbar-toggle-icon">&#9776;</span>
            </div>
        </div>
    );
};

export default Navbar;

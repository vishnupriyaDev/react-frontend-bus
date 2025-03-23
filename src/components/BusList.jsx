import React from 'react';
import { Link } from 'react-router-dom';
import './BusList.css'; // Assuming the CSS is saved in a file called 'BusList.css'

const BusList = () => {
    const buses = [
        { busId: 1, busNumber: 'BUS101', driver: 'John Doe' },
        { busId: 2, busNumber: 'BUS102', driver: 'Jane Doe' },
        { busId: 3, busNumber: 'BUS103', driver: 'Alice Smith' },
        { busId: 4, busNumber: 'BUS104', driver: 'Bob Johnson' },
        { busId: 5, busNumber: 'BUS105', driver: 'Charlie Brown' },
        { busId: 6, busNumber: 'BUS106', driver: 'David Wilson' }
    ];

    return (
        <div className="bus-list">
            <h2>Bus List</h2>
            <div className="bus-cards">
                {buses.map((bus) => (
                    <div key={bus.busId} className="bus-card">
                        <h3>{bus.busNumber}</h3>
                        <p>Driver: {bus.driver}</p>
                        <Link to={`/bus/${bus.busId}`} className="view-details">
                            View Bus Details
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BusList;

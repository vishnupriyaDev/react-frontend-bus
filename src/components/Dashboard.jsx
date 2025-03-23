import React from 'react';
import Navbar from './Navbar';
import './Dashboard.css';

const Dashboard = () => {
    const busList = [
        { id: 1, busNumber: 'Bus 101', capacity: 40, driver: 'John Doe' },
        { id: 2, busNumber: 'Bus 102', capacity: 35, driver: 'Jane Smith' },
        { id: 3, busNumber: 'Bus 103', capacity: 50, driver: 'Mike Johnson' },
    ];

    return (
        <>
            <Navbar />
            <div className="dashboard-container">
                <div className="bus-list">
                    <h3>Available Buses</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Bus Number</th>
                                <th>Capacity</th>
                                <th>Driver</th>
                            </tr>
                        </thead>
                        <tbody>
                            {busList.map(bus => (
                                <tr key={bus.id}>
                                    <td>{bus.busNumber}</td>
                                    <td>{bus.capacity}</td>
                                    <td>{bus.driver}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="school-details">
                    <h4>School Details</h4>
                    <p>School Name: Example School</p>
                    <p>Address: 123 School Street, City, Country</p>
                    <p>Contact: +123 456 7890</p>
                </div>
            </div>
        </>
    );
};

export default Dashboard;

import React from 'react';
import Navbar from './Navbar';
import './Dashboard.css';

const Dashboard = () => {
    const busList = [
        { id: 1, busNumber: 'Bus 101', route: 'Poonjar-college', driver: 'John Doe' },
        { id: 2, busNumber: 'Bus 102', route: 'kajirapally - College', driver: 'Jane Smith' },
        { id: 3, busNumber: 'Bus 103', route: 'Eratupeta - College', driver: 'Mike Johnson' },
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
                                <th>Route</th>
                                <th>Driver</th>
                            </tr>
                        </thead>
                        <tbody>
                            {busList.map(bus => (
                                <tr key={bus.id}>
                                    <td>{bus.busNumber}</td>
                                    <td>{bus.route}</td>
                                    <td>{bus.driver}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="school-details">
                    <h4>College Details</h4>
                    <p>School Name: College Of Engineering Poonjar</p>
                    <p>Address: Poonjar Thekkekara P.O,Kottayam Dt.Kerala-686 582</p>
                    <p>Contact: 9562401737,8547005035</p>
                </div>
            </div>
        </>
    );
};

export default Dashboard;

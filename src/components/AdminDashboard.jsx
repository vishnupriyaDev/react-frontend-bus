import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css';

// Modal component for adding new records (Bus, Driver, Notification)
const Modal = ({ isOpen, closeModal, onSubmit, type, buses }) => {
    const [inputData, setInputData] = useState({ name: '', route: '', license_number: '', phone_number: '', message: '', bus: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(inputData);
        setInputData({ name: '', route: '', phone_number: '', license_number: '', message: '', bus: '' }); // Reset form
        closeModal();
    };

    return isOpen ? (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <h4>Add New {type}</h4>
                <form onSubmit={handleSubmit}>
                    {type === 'Bus' && (
                        <>
                            <input type="text" placeholder="Bus Name" name="name" value={inputData.name} onChange={handleInputChange} required />
                            <input type="text" placeholder="Bus Route" name="route" value={inputData.route} onChange={handleInputChange} required />
                        </>
                    )}
                    {type === 'Driver' && (
                        <>
                            <input type="text" placeholder="Driver Name" name="name" value={inputData.name} onChange={handleInputChange} required />
                            <input type="text" placeholder="License Number" name="license_number" value={inputData.license_number} onChange={handleInputChange} required />
                            <input type="text" placeholder="Phone Number" name="phone_number" value={inputData.phone_number} onChange={handleInputChange} required />
                            {/* Bus Dropdown - populated with bus list */}
                            <select name="bus" value={inputData.bus} onChange={handleInputChange} required>
                                <option value="">Select Bus</option>
                                {buses.map(bus => (
                                    <option key={bus.id} value={bus.id}>{bus.name} - {bus.route}</option>
                                ))}
                            </select>
                        </>
                    )}
                    {type === 'Notification' && (
                        <input type="text" placeholder="Notification Message" name="message" value={inputData.message} onChange={handleInputChange} required />
                    )}
                    <button type="submit">Add {type}</button>
                </form>
            </div>
        </div>
    ) : null;
};

// Bus List Component with Add and Delete functionality
const BusList = () => {
    const [buses, setBuses] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/bus/list/')
            .then(response => {
                setBuses(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError('Error fetching bus data.');
                setLoading(false);
            });
    }, []);

    const handleDeleteBus = (busId) => {
        axios.delete(`http://127.0.0.1:8000/api/bus/delete/${busId}/`)
            .then(() => {
                setBuses(buses.filter(bus => bus.id !== busId));
            })
            .catch(error => {
                console.error('Error deleting bus:', error);
            });
    };

    const handleAddBus = (busData) => {
        axios.post('http://127.0.0.1:8000/api/bus/add/', busData)
            .then(response => {
                setBuses([...buses, response.data]);
            })
            .catch(error => {
                console.error('Error adding bus:', error);
            });
    };

    return (
        <div className="card bus-list">
            <h3>Bus List</h3>
            <button onClick={() => setIsModalOpen(true)} className="add-btn">Add New Bus</button>
            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}
            {!loading && buses.length === 0 && !error && <p>No data available.</p>}
            <table>
                <thead>
                    <tr>
                        <th>Bus Name</th>
                        <th>Bus Route</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {buses.map(bus => (
                        <tr key={bus.id}>
                            <td>{bus.name}</td>
                            <td>{bus.route}</td>
                            <td>
                                <button onClick={() => handleDeleteBus(bus.id)} className="delete-btn">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} onSubmit={handleAddBus} type="Bus" />
        </div>
    );
};

// Driver List Component with Add and Delete functionality
const DriverList = () => {
    const [drivers, setDrivers] = useState([]);
    const [buses, setBuses] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/driver/list/')
            .then(response => {
                setDrivers(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError('Error fetching driver data.');
                setLoading(false);
            });

        axios.get('http://127.0.0.1:8000/api/bus/list/')
            .then(response => {
                setBuses(response.data);
            })
            .catch(error => {
                console.error('Error fetching bus data:', error);
            });
    }, []);

    const handleDeleteDriver = (driverId) => {
        axios.delete(`http://127.0.0.1:8000/api/driver/delete/${driverId}/`)
            .then(() => {
                setDrivers(drivers.filter(driver => driver.id !== driverId));
            })
            .catch(error => {
                console.error('Error deleting driver:', error);
            });
    };

    const handleAddDriver = (driverData) => {
        axios.post('http://127.0.0.1:8000/api/driver/add/', driverData)
            .then(response => {
                setDrivers([...drivers, response.data]);
            })
            .catch(error => {
                console.error('Error adding driver:', error);
            });
    };

    return (
        <div className="card driver-list">
            <h3>Driver List</h3>
            <button onClick={() => setIsModalOpen(true)} className="add-btn">Add New Driver</button>
            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}
            {!loading && drivers.length === 0 && !error && <p>No data available.</p>}
            <table>
                <thead>
                    <tr>
                        <th>Driver Name</th>
                        <th>License Number</th>
                        <th>Phone Number</th>
                        <th>Assigned Bus</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {drivers.map(driver => (
                        <tr key={driver.id}>
                            <td>{driver.name}</td>
                            <td>{driver.license_number}</td>
                            <td>{driver.phone_number}</td>
                            <td>{driver.bus ? driver.bus.name : 'N/A'}</td>
                            <td>
                                <button onClick={() => handleDeleteDriver(driver.id)} className="delete-btn">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} onSubmit={handleAddDriver} type="Driver" buses={buses} />
        </div>
    );
};

// Notifications Component with Add and Delete functionality
const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/notifications/')
            .then(response => {
                setNotifications(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError('Error fetching notifications.');
                setLoading(false);
            });
    }, []);

    const handleDeleteNotification = (notificationId) => {
        axios.delete(`http://127.0.0.1:8000/api/notifications/delete/${notificationId}/`)
            .then(() => {
                setNotifications(notifications.filter(notification => notification.id !== notificationId));
            })
            .catch(error => {
                console.error('Error deleting notification:', error);
            });
    };

    const handleAddNotification = (notificationData) => {
        axios.post('http://127.0.0.1:8000/api/notifications/add/', notificationData)
            .then(response => {
                setNotifications([...notifications, response.data]);
            })
            .catch(error => {
                console.error('Error adding notification:', error);
            });
    };

    return (
        <div className="card notifications">
            <h3>Notifications</h3>
            <button onClick={() => setIsModalOpen(true)} className="add-btn">Add New Notification</button>
            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}
            {!loading && notifications.length === 0 && !error && <p>No data available.</p>}
            <table>
                <thead>
                    <tr>
                        <th>Notification Message</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {notifications.map(notification => (
                        <tr key={notification.id}>
                            <td>{notification.message}</td>
                            <td>
                                <button onClick={() => handleDeleteNotification(notification.id)} className="delete-btn">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} onSubmit={handleAddNotification} type="Notification" />
        </div>
    );
};

// Admin Dashboard Component
const AdminDashboard = () => {
    return (
        <div className="admin-dashboard">
            <h2>Admin Dashboard</h2>
            <BusList />
            <DriverList />
            <Notifications />
        </div>
    );
};

export default AdminDashboard;

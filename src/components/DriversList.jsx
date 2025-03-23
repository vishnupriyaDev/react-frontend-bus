import React from 'react';
import './DriverList.css';  // Make sure to import the CSS for styling

const DriversList = () => {
  // Example static data for drivers
  const drivers = [
    {
      name: 'John Doe',
      bus: 'Bus A',
      address: '123 Main St, Cityville',
      phone: '(555) 123-4567',
    },
    {
      name: 'Jane Smith',
      bus: 'Bus B',
      address: '456 Elm St, Townsville',
      phone: '(555) 987-6543',
    },
    {
      name: 'Jim Brown',
      bus: 'Bus C',
      address: '789 Oak St, Villagetown',
      phone: '(555) 543-2109',
    },
    // Add more drivers here as needed
  ];

  return (
    <div className="drivers-list-container">
      <h1>Drivers List</h1>
      <div className="drivers-cards">
        {drivers.map((driver, index) => (
          <div className="driver-card" key={index}>
            <h2>{driver.name}</h2>
            <p><strong>Bus:</strong> {driver.bus}</p>
            <p><strong>Address:</strong> {driver.address}</p>
            <p><strong>Phone:</strong> {driver.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DriversList;

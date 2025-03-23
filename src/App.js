import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/Loginpage';
import RegisterPage from './components/Registerpage';
import BusList from './components/BusList';
import BusDetails from './components/BusDetails';
import './App.css';
import Dashboard from './components/Dashboard';
import DriversList from './components/DriversList';
import PaymentsDashboard from './components/PaymentsDashboard';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/bus-list" element={<BusList/>} />
        <Route path="/bus/:busId" element={<BusDetails/>} />
       <Route path="/drivers-list" element={<DriversList />} />
         <Route path="/payments-dashboard" element={<PaymentsDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

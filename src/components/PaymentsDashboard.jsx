import React, { useState } from 'react';
import './PaymentsDashboard.css';

const PaymentsDashboard = () => {
  // Sample data (you can fetch this from an API)
  const [students, setStudents] = useState([
    {
      id: 1,
      name: 'John Doe',
      payments: [
        { month: 'January', amount: 100, paid: false },
        { month: 'February', amount: 100, paid: true },
        { month: 'March', amount: 100, paid: false },
      ],
    }
    // Add more students here...
  ]);

  // Handle Payment (mock payment process)
  const handlePayment = (studentId, month) => {
    // Mock API Call - Here you can integrate any payment gateway or method.
    // For now, just change the payment status to 'paid' on button click.
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === studentId
          ? {
              ...student,
              payments: student.payments.map((payment) =>
                payment.month === month
                  ? { ...payment, paid: true }
                  : payment
              ),
            }
          : student
      )
    );
  };

  return (
    <div className="dashboard-container">
      <h1>Payments Dashboard</h1>
      {students.map((student) => (
        <div className="student-card" key={student.id}>
          <h2>{student.name}</h2>
          <table>
            <thead>
              <tr>
                <th>Month</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {student.payments.map((payment, index) => (
                <tr key={index}>
                  <td>{payment.month}</td>
                  <td>${payment.amount}</td>
                  <td>{payment.paid ? 'Paid' : 'Unpaid'}</td>
                  <td>
                    {!payment.paid && (
                      <button
                        className="pay-button"
                        onClick={() => handlePayment(student.id, payment.month)}
                      >
                        Pay
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default PaymentsDashboard;

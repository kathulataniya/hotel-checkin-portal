import React, { useState, useEffect } from 'react'

const Invoice = () => {
  const user = JSON.parse(localStorage.getItem('loggedInUser'))
  const guest = JSON.parse(localStorage.getItem('guest'))
  const [invoiceNo, setInvoiceNo] = useState('')

  useEffect(() => {
    setInvoiceNo(Math.floor(Math.random() * 1000))
  }, [])

  const roomCharges = 3000
  const serviceCharges = 500
  const foodCharges = 1000
  const total = roomCharges + serviceCharges + foodCharges

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="container my-5">
      <div className="card shadow-lg">
        <div className="card-body p-5">
          <div className="text-center mb-4">
            <h1>🏨 HOTEL INVOICE</h1>
            <hr />
          </div>
          <div className="row">
            <div className="col-md-6">
              <p><strong>Guest Name:</strong> {guest?.name || user?.name || '--'}</p>
              <p><strong>Room Number:</strong> {guest?.room || 'No active booking'}</p>
            </div>
            <div className="col-md-6 text-end">
              <p>Invoice No: INV00{invoiceNo}</p>
              <p>Date: {new Date().toLocaleDateString()}</p>
            </div>
          </div>
          <table className="table table-bordered mt-4">
            <thead className="table-primary">
              <tr><th>Description</th><th>Amount</th></tr>
            </thead>
            <tbody>
              <tr><td>Room Charges (per night)</td><td>₹{roomCharges}</td></tr>
              <tr><td>Service Charges</td><td>₹{serviceCharges}</td></tr>
              <tr><td>Food Charges</td><td>₹{foodCharges}</td></tr>
              <tr className="table-success">
                <td><strong>Total</strong></td>
                <td><strong>₹{total}</strong></td>
              </tr>
            </tbody>
          </table>
          <button onClick={handlePrint} className="btn btn-success no-print">
            🖨️ Print Invoice
          </button>
        </div>
      </div>
    </div>
  )
}

export default Invoice
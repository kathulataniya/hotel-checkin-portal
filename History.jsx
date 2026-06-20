import React, { useState, useEffect } from 'react'

const History = () => {
  const [history, setHistory] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    loadHistory()
  }, [])

  const loadHistory = () => {
    let allGuests = []
    let checkedOut = []
    
    try {
      allGuests = JSON.parse(localStorage.getItem('allGuests')) || []
      checkedOut = JSON.parse(localStorage.getItem('checkedOutGuests')) || []
    } catch (e) {
      allGuests = []
      checkedOut = []
    }
    
    // Combine and remove duplicates by id
    const combined = [...allGuests, ...checkedOut]
    const unique = []
    const seen = new Set()
    
    for (const guest of combined) {
      if (!seen.has(guest.id)) {
        seen.add(guest.id)
        unique.push(guest)
      }
    }
    
    // Sort by check-in time (newest first)
    unique.sort((a, b) => new Date(b.checkInTime) - new Date(a.checkInTime))
    
    setHistory(unique)
  }

  const filteredHistory = history.filter(guest =>
    guest.name?.toLowerCase().includes(searchTerm.toLowerCase()) || false
  )

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Stay History</h2>
      <div className="card shadow">
        <div className="card-body">
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search Guest by Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <table className="table table-striped table-hover">
            <thead className="table-primary">
              <tr>
                <th>Name</th>
                <th>Room</th>
                <th>Check-In Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredHistory.length > 0 ? (
                filteredHistory.map((guest) => (
                  <tr key={guest.id}>
                    <td>{guest.name}</td>
                    <td>{guest.room}</td>
                    <td>{guest.date}</td>
                    <td>
                      <span className={`badge ${guest.checkOutTime ? 'bg-secondary' : 'bg-success'}`}>
                        {guest.checkOutTime ? 'Checked Out' : 'Active'}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">No records found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default History
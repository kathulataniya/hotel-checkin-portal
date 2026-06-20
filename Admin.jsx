import React, { useState, useEffect } from 'react'

const Admin = () => {
  const [stats, setStats] = useState({
    totalGuests: 0,
    occupiedRooms: 0,
    availableRooms: 30,
    todayCheckins: 0
  })
  const [recentGuests, setRecentGuests] = useState([])

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    const allGuests = JSON.parse(localStorage.getItem('allGuests')) || []
    const activeGuest = JSON.parse(localStorage.getItem('guest'))
    
    let activeGuests = [...allGuests]
    if (activeGuest && !activeGuests.find(g => g.email === activeGuest.email)) {
      activeGuests.push(activeGuest)
    }

    const today = new Date().toISOString().split('T')[0]
    const todayCount = activeGuests.filter(g => g.date === today).length

    setStats({
      totalGuests: activeGuests.length,
      occupiedRooms: activeGuests.length,
      availableRooms: 30 - activeGuests.length,
      todayCheckins: todayCount
    })

    const recent = [...activeGuests].reverse().slice(0, 5)
    setRecentGuests(recent)
  }

  return (
    <div className="container my-5">
      <div className="row g-4">
        <div className="col-md-3">
          <div className="card dashboard-card bg-primary text-white">
            <div className="card-body text-center">
              <h5>Total Guests</h5>
              <h1>{stats.totalGuests}</h1>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card dashboard-card bg-success text-white">
            <div className="card-body text-center">
              <h5>Occupied Rooms</h5>
              <h1>{stats.occupiedRooms}</h1>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card dashboard-card bg-warning text-dark">
            <div className="card-body text-center">
              <h5>Available Rooms</h5>
              <h1>{stats.availableRooms}</h1>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card dashboard-card bg-danger text-white">
            <div className="card-body text-center">
              <h5>Today's Check-Ins</h5>
              <h1>{stats.todayCheckins}</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow mt-5">
        <div className="card-header bg-dark text-white">Recent Guests</div>
        <div className="card-body">
          <table className="table table-hover">
            <thead>
              <tr><th>Name</th><th>Room</th><th>Status</th></tr>
            </thead>
            <tbody>
              {recentGuests.length > 0 ? (
                recentGuests.map((guest, index) => (
                  <tr key={index}>
                    <td>{guest.name}</td>
                    <td>{guest.room}</td>
                    <td><span className="badge bg-success">Checked In</span></td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="3" className="text-center">No guests yet</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Admin
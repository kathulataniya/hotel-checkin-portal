import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Checkin = () => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('loggedInUser'))

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    guests: '1 Guest'
  })
  const [success, setSuccess] = useState(false)
  const [assignedRoom, setAssignedRoom] = useState(null)

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        date: '',
        guests: '1 Guest'
      })
    }
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const availableRooms = [101, 102, 103, 201, 202, 203, 204, 301, 302, 303]
    
    let existingGuests = []
    try {
      existingGuests = JSON.parse(localStorage.getItem('allGuests')) || []
    } catch (e) {
      existingGuests = []
    }
    
    const existingActive = existingGuests.find(g => g.email === formData.email && !g.checkOutTime)
    
    if (existingActive) {
      alert('⚠️ You already have an active check-in!')
      return
    }
    
    const bookedRooms = existingGuests.map(g => g.room)
    const available = availableRooms.filter(r => !bookedRooms.includes(r))
    const randomRoom = available.length > 0 ? available[0] : 404

    const guest = {
      id: Date.now() + Math.random(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      date: formData.date,
      guests: formData.guests,
      room: randomRoom,
      checkInTime: new Date().toLocaleString(),
      checkOutTime: null
    }

    localStorage.setItem('guest', JSON.stringify(guest))
    
    existingGuests.push(guest)
    localStorage.setItem('allGuests', JSON.stringify(existingGuests))

    setAssignedRoom(randomRoom)
    setSuccess(true)

    setTimeout(() => {
      navigate('/room')
    }, 2000)
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-7">
          <div className="card shadow-lg border-0">
            <div className="card-body p-4">
              <h3 className="mb-4 text-center">Guest Information</h3>
              {success && (
                <div className="alert alert-success">
                  ✅ Check-In Successful!<br />
                  Room Assigned: <strong>{assignedRoom}</strong>
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Guest Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    className="form-control"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Check-In Date</label>
                  <input
                    type="date"
                    name="date"
                    className="form-control"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Number of Guests</label>
                  <select
                    name="guests"
                    className="form-select"
                    value={formData.guests}
                    onChange={handleChange}
                  >
                    <option>1 Guest</option>
                    <option>2 Guests</option>
                    <option>3 Guests</option>
                    <option>4 Guests</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Upload ID Proof</label>
                  <input type="file" className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary w-100">Check In</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkin
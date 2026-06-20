import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Checkout = () => {
  const navigate = useNavigate()
  const [guest, setGuest] = useState(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const storedGuest = JSON.parse(localStorage.getItem('guest'))
    if (storedGuest) {
      setGuest(storedGuest)
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!guest) {
      alert('No active check-in found!')
      return
    }

    // Update guest with checkout time
    const updatedGuest = { ...guest, checkOutTime: new Date().toLocaleString() }
    
    // Update in allGuests
    let allGuests = []
    try {
      allGuests = JSON.parse(localStorage.getItem('allGuests')) || []
    } catch (e) {
      allGuests = []
    }
    
    const index = allGuests.findIndex(g => g.id === guest.id)
    if (index !== -1) {
      allGuests[index] = updatedGuest
      localStorage.setItem('allGuests', JSON.stringify(allGuests))
    }

    // Save to checked out history
    let checkedOut = []
    try {
      checkedOut = JSON.parse(localStorage.getItem('checkedOutGuests')) || []
    } catch (e) {
      checkedOut = []
    }
    checkedOut.push(updatedGuest)
    localStorage.setItem('checkedOutGuests', JSON.stringify(checkedOut))

    // Clear current guest
    localStorage.removeItem('guest')
    setGuest(null)
    setSuccess(true)

    setTimeout(() => {
      navigate('/history')
    }, 2000)
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card shadow-lg">
            <div className="card-header bg-danger text-white text-center">
              <h3>Guest Check-Out</h3>
            </div>
            <div className="card-body p-4">
              {success && (
                <div className="alert alert-success">
                  ✅ Check-Out Successful<br />
                  Thank You For Staying With Us
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Guest Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={guest?.name || 'No active check-in'}
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Room Number</label>
                  <input
                    type="text"
                    className="form-control"
                    value={guest?.room || ''}
                    disabled
                  />
                </div>
                <button type="submit" className="btn btn-danger w-100" disabled={!guest}>
                  Check Out
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
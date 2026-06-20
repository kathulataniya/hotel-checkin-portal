import React, { useState } from 'react'

const DigitalKey = () => {
  const guest = JSON.parse(localStorage.getItem('guest'))
  const [unlocked, setUnlocked] = useState(false)

  const handleUnlock = () => {
    if (guest) {
      setUnlocked(true)
      setTimeout(() => setUnlocked(false), 2000)
    } else {
      alert('Please check in first to unlock door!')
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-5">
          <div className="card shadow-lg mt-5">
            <div className="card-body text-center p-5">
              <div className="display-1">🔑</div>
              <h2>Digital Room Key</h2>
              <hr />
              <h4>Room Number: {guest?.room || 'No active check-in'}</h4>
              <h5>{guest?.name || 'Please check in first'}</h5>
              <button 
                onClick={handleUnlock} 
                className="btn btn-success mt-4 btn-unlock"
                disabled={!guest}
              >
                Unlock Door
              </button>
              {unlocked && (
                <div className="alert alert-success mt-4">
                  Door Unlocked Successfully!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DigitalKey
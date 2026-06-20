import React from 'react'
import { Link } from 'react-router-dom'

const Room = () => {
  const guest = JSON.parse(localStorage.getItem('guest'))

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-lg border-0">
            <div className="card-body p-5">
              <div className="text-center">
                <h2 className="mb-3">🏨 Room <span className="text-primary">{guest?.room || '--'}</span></h2>
                <span className="badge bg-success fs-6">Checked In</span>
              </div>
              <hr className="my-4" />
              <div className="row text-center">
                <div className="col-md-6 mb-3">
                  <div className="card p-3">
                    <h5>Room Type</h5>
                    <p>Deluxe Room</p>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="card p-3">
                    <h5>Guest Name</h5>
                    <p>{guest?.name || 'No active check-in'}</p>
                  </div>
                </div>
              </div>
              <h4 className="mt-4 mb-3">Room Facilities</h4>
              <div className="row">
                <div className="col-md-6"><p>📶 Free WiFi</p></div>
                <div className="col-md-6"><p>❄ Air Conditioning</p></div>
                <div className="col-md-6"><p>🛏 King Size Bed</p></div>
                <div className="col-md-6"><p>📺 Smart TV</p></div>
                <div className="col-md-6"><p>☕ Complimentary Breakfast</p></div>
                <div className="col-md-6"><p>🚿 Hot Water</p></div>
              </div>
              <div className="text-center mt-4">
                <Link to="/key" className="btn btn-success btn-lg">🔑 Open Digital Key</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Room
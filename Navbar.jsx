import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('loggedInUser'))

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser')
    navigate('/')
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
      <div className="container">
        <Link className="navbar-brand" to="/">🏨 Hotel Portal</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {user ? (
              <>
                <li className="nav-item"><Link className="nav-link" to="/checkin">Check-In</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/room">Room</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/key">Digital Key</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/profile">Profile</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/notifications">Notifications</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/invoice">Invoice</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/history">History</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/checkout">Check-Out</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/admin">Admin</Link></li>
                <li className="nav-item">
                  <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
                    🚪 Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/signup">Sign Up</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
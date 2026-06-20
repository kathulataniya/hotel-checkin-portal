import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
      <section className="hero-section">
        <div className="container">
          <h1 className="display-4 fw-bold">Hotel Check-In & Check-Out Portal</h1>
          <p className="lead">
            Experience seamless hotel management with online check-in,
            digital room keys, room booking, and express check-out.
          </p>
          <div className="mt-4">
            <Link to="/login" className="btn btn-light btn-lg me-3">Get Started</Link>
            <Link to="/signup" className="btn btn-outline-light btn-lg">Create Account</Link>
          </div>
        </div>
      </section>
      <section className="features container">
        <div className="feature-card">
          <h3>📋 Online Check-In</h3>
          <p>Guests can complete check-in quickly without waiting at reception.</p>
        </div>
        <div className="feature-card">
          <h3>🔑 Digital Room Key</h3>
          <p>Access your room using a secure digital key system.</p>
        </div>
        <div className="feature-card">
          <h3>🚀 Express Check-Out</h3>
          <p>Checkout instantly and download your invoice PDF.</p>
        </div>
      </section>
    </>
  )
}

export default Home
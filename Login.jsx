import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    let users = []
    try {
      users = JSON.parse(localStorage.getItem('users')) || []
    } catch (e) {
      users = []
    }

    // Find user with matching email and password
    const validUser = users.find(u => u.email === email && u.password === password)

    if (validUser) {
      // Save logged in user with ALL data including gender
      localStorage.setItem('loggedInUser', JSON.stringify({
        id: validUser.id,
        name: validUser.name,
        email: validUser.email,
        phone: validUser.phone,
        gender: validUser.gender || 'other' // ← GENDER PRESERVED
      }))
      
      console.log('✅ User logged in:', {
        name: validUser.name,
        gender: validUser.gender
      })
      
      navigate('/checkin')
    } else {
      setError('Invalid Email or Password!')
      setLoading(false)
    }
  }

  return (
    <div className="form-container">
      <div className="form-box">
        <h2>Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
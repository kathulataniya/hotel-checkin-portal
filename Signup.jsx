import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [gender, setGender] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)
    setLoading(true)

    // Validation
    if (!name || !email || !phone || !gender || !password) {
      setError('Please fill in all fields including gender!')
      setLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match!')
      setLoading(false)
      return
    }

    if (password.length < 4) {
      setError('Password must be at least 4 characters!')
      setLoading(false)
      return
    }

    // Get existing users
    let users = []
    try {
      users = JSON.parse(localStorage.getItem('users')) || []
    } catch (e) {
      users = []
    }

    // Check if email exists
    const userExists = users.find(u => u.email === email)
    if (userExists) {
      setError('Email already registered! Please login.')
      setLoading(false)
      return
    }

    // Create new user with gender
    const newUser = {
      id: Date.now(),
      name: name,
      email: email,
      phone: phone,
      gender: gender, // ← GENDER ADDED
      password: password,
      createdAt: new Date().toISOString()
    }

    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))

    console.log('✅ User created with gender:', newUser)

    setSuccess(true)
    setLoading(false)

    setTimeout(() => {
      navigate('/login')
    }, 1500)
  }

  return (
    <div className="form-container">
      <div className="form-box">
        <h2>Create Account</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">Account created! Redirecting to login...</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          
          {/* GENDER DROPDOWN */}
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '14px',
              marginBottom: '20px',
              border: '1px solid #ccc',
              borderRadius: '8px',
              fontSize: '16px',
              background: 'white'
            }}
          >
            <option value="">Select Gender</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other</option>
          </select>

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Signup
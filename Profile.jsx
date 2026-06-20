import React, { useState, useEffect } from 'react'

const Profile = () => {
  const [user, setUser] = useState(null)
  const [guest, setGuest] = useState(null)

  useEffect(() => {
    const loggedInUser =
      JSON.parse(localStorage.getItem('loggedInUser')) || {}

    const currentGuest =
      JSON.parse(localStorage.getItem('guest')) || {}

    setUser(loggedInUser)
    setGuest(currentGuest)
  }, [])

  const getProfileImage = () => {
    const gender = user?.gender?.toLowerCase()

    if (gender === 'female') {
      return '/female-profile.png'
    }

    if (gender === 'male') {
      return '/male-profile.png'
    }

    return '/default-profile.png'
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-7">

          <div className="card shadow-lg border-0">

            <div className="card-header bg-primary text-white text-center">
              <h3>Guest Profile</h3>
            </div>

            <div className="card-body p-4">

              <div className="text-center mb-4">
                <img
                  src={getProfileImage()}
                  alt="Profile"
                  width="120"
                  height="120"
                  className="rounded-circle border border-3 border-primary"
                  style={{
                    objectFit: 'cover'
                  }}
                />

                <h5 className="mt-3">
                  {user?.name || 'Guest'}
                </h5>
              </div>

              <table className="table table-bordered">
                <tbody>

                  <tr>
                    <th>Name</th>
                    <td>{user?.name || '--'}</td>
                  </tr>

                  <tr>
                    <th>Email</th>
                    <td>{user?.email || '--'}</td>
                  </tr>

                  <tr>
                    <th>Phone</th>
                    <td>{user?.phone || '--'}</td>
                  </tr>

                  <tr>
                    <th>Gender</th>
                    <td>{user?.gender || '--'}</td>
                  </tr>

                  <tr>
                    <th>Room Number</th>
                    <td>{guest?.room || 'Not checked in'}</td>
                  </tr>

                  <tr>
                    <th>Check-In Date</th>
                    <td>{guest?.date || 'Not checked in'}</td>
                  </tr>

                </tbody>
              </table>

            </div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default Profile
import React from 'react'

const Notifications = () => {
  const notifications = [
    { id: 1, message: '✅ Check-In Completed Successfully' },
    { id: 2, message: '🏨 Room Assigned Successfully' },
    { id: 3, message: '📄 Invoice Ready For Download' },
    { id: 4, message: '🔑 Digital Key Activated' },
    { id: 5, message: '💳 Express Check-Out Available' },
  ]

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">🔔 Notifications</h2>
      {notifications.map((notif) => (
        <div key={notif.id} className="card shadow mb-3 notification-card">
          <div className="card-body">{notif.message}</div>
        </div>
      ))}
    </div>
  )
}

export default Notifications
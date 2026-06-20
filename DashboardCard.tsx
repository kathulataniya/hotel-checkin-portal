import React from 'react'

const DashboardCard = ({ title, value, color = 'primary' }) => {
  const bgColors = {
    primary: 'bg-primary',
    success: 'bg-success',
    warning: 'bg-warning text-dark',
    danger: 'bg-danger'
  }

  return (
    <div className={`dashboard-card ${bgColors[color] || bgColors.primary} text-white p-3 rounded`}>
      <div className="text-center">
        <h5>{title}</h5>
        <h1 className="display-4 fw-bold">{value}</h1>
      </div>
    </div>
  )
}

export default React.memo(DashboardCard)
import React from 'react'
import './dashboard.scss'
import Sidebar from '../component/sidebar/Sidebar'


const Dashboard = () => {
  return (
    <>
      <div className='dashboard-container'>
        <Sidebar />
        <div className='dashboard_section-wrapper'>
          <h1>Dashboard</h1>

        </div>
      </div>
    </>
  )
}

export default Dashboard
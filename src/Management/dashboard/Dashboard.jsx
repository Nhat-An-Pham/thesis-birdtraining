import React from 'react'
import './dashboard.scss'
import ReworkSidebar from "../component/sidebar/ReworkSidebar";

const Dashboard = () => {
  return (
    <>
      <div className='dashboard-container'>
        <ReworkSidebar selectTab={0} />
        <div className='dashboard_section-wrapper'>
          <h1>Dashboard</h1>

        </div>
      </div>
    </>
  )
}

export default Dashboard
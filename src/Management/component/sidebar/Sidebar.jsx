import React from 'react'
import './sidebar.scss'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className='sidebar-wrapper'>
            <div className="sidebar-container">
                <ul className="sidebar">
                    <li><Link to="/home"> <span> BirdTraining Management</span></Link></li>
                    <li><Link to="/management"><span><i className="fa"></i></span><span>Dashboard</span></Link></li>
                    <li><Link to="/management/customerreq"><span><i className="fa"></i></span><span>Customer Request</span></Link></li>
                    <li><Link to="/management/timetable"><span><i className="fa"></i></span><span>TimeTable</span></Link></li>
                    <li><Link to="/management/workshop"><span><i className="fa"></i></span><span>Workshop</span></Link></li>
                    <li><Link to="/management/birdacademy"><span><i className="fa"></i></span><span>Bird Academy</span></Link></li>
                    <li><Link to="/management/userdata"><span><i className="fa"></i></span><span>Users</span></Link></li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar
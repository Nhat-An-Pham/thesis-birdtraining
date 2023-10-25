import React from 'react'
import { Link } from 'react-router-dom';

function NavbarMain() {
  return (
    <nav className="navbar">
      <div className='nav_container'>
        <div className='nav_elements nav_elements-logo'>
          {/* <Link to="/home"> */}
            <h1>BirdTrainingCenter</h1>
          {/* </Link> */}
        </div>
        <div className='nav_elements nav_elements-content'>
          <ul>
            <li><a href='/home'>Home</a></li>
            <li><a href='/courses'>Courses</a></li>
            <li><a href='/workshops'>Workshops</a></li>
            <li><a className='nav_dropdown-arrow'>Services</a>
              <ul className='nav_sub-menus'>
                <li><a href='/consultation'>Consultations</a></li>
                <li><a href='/birdacademy'>Bird Training Academy</a></li>
              </ul>
            </li>
          </ul>
        </div>
        <div className='nav_elements nav_elements-sign'>
          <Link to="/login"><button className='button-login'>Login</button></Link>
          <Link to="/signup"><button className="button-signup"><span>Sign Up</span></button></Link>
        </div>
      </div>
    </nav>
  )
}

export default NavbarMain;
import React from 'react'

function NavbarMain() {
  return (
    <nav className="navbar">
      <div className='nav_container'>
        <div className='nav_logo'>

        </div>
        <div className='nav_elements'>
          <ul>
            <li>Home</li>
            <li>Courses</li>
            <li>Workshop</li>
            <li>
              Services
              <ul>
                <li>Consultation</li>
                <li>Bird Training Academy</li>
              </ul>
            </li>
            <li>Login</li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavbarMain;
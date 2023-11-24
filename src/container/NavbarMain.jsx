import { jwtDecode } from 'jwt-decode';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function NavbarMain() {

  const decodeToken = JSON.parse(localStorage.getItem("user-token"));
  const [decodeItemName, setDecodeItemName] = useState();
  const [decodeItemRole, setDecodeItemRole] = useState();
  const navigate = useNavigate();

  //get name from token
  useEffect(() => {
    if (decodeToken !== null) {
      setDecodeItemName(jwtDecode(decodeToken).name)
      setDecodeItemRole(jwtDecode(decodeToken).role)
    }
  }, [])


  //logout
  const handlelogout = () => {
    localStorage.removeItem("user-token");
    navigate('/home');
    alert("logout successfully")
  }

  function checkLogin() {
    //check token exist
    if (decodeToken) {
      return (
        <div className='nav_elements nav_elements-content-afterloggedin'>
          <li><a className='nav_dropdown-arrow'>Hi {decodeItemName} </a>
            <ul className='nav_sub-menus'>
              <li><a onClick={() => handlelogout()}>Logout</a></li>
            </ul>
          </li>
          <li><a className='nav_dropdown-arrow'>Setting</a>
            <ul className='nav_sub-menus'>
              {decodeItemRole === "Customer" ? (
                <></>
              ) : (
                <li><a href='/management'>Management</a></li>
              )}
              <li><a href='/setting'>User Setting</a></li>
            </ul>
          </li>
        </div>
      )
    } else {
      return (
        <div className='nav_elements nav_elements-sign'>
          <Link to="/login"><button className='button-login'>Login</button></Link>
          <Link to="/signup"><button className="button-signup"><span>Sign Up</span></button></Link>
        </div>
      )
    }
  }

  return (
    <nav className="navbar">
      <div className='nav_container'>
        <div className='nav_elements nav_elements-logo'>
          <Link to="/home">
          <h1>BirdTrainingCenter</h1>
          </Link>
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
        {checkLogin()}
      </div>
    </nav >
  )
}

export default NavbarMain;
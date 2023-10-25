import React from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
  return (
    <div className='signuppage'>
            <section className='signup-container'>
                <h1 className='signup_section signup_section-title'>Sign Up</h1>
                <div className='signup_section signup_section-input'>
                    <input placeholder='Enter your Email'></input>
                    <input placeholder='Enter your Name'></input>
                    <input placeholder='Enter your Phone Number'></input>
                    <input type='password' placeholder='Password'></input>
                    <input type='password' placeholder='Confirm your Password'></input>
                </div>
                <div className='signup_section signup_section-button'>Sign Up</div>
                <div className='signup_section signup_section-link'>
                    <p><Link to="/home">Back to home page</Link></p>
                    <p>Already have an account? <Link to="/login"> click here</Link></p>
                </div>
            </section>
        </div>
  )
}

export default SignUp
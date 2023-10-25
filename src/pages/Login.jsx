import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <div className='loginpage'>
            <section className='login-container'>
                <h1 className='login_section login_section-title'>Welcome Back</h1>
                <div className='login_section login_section-input'>
                    <input placeholder='Enter your Email'></input>
                    
                    <input type="password" placeholder='Confirm Password'></input>
                </div>
                <div className='login_section login_section-button'>Login</div>
                <div className='login_section login_section-link'>
                    <p><Link to="/home">Back to home page</Link></p>
                    <p>Doesn't have an account? <Link to="/signup"> click here</Link></p>
                </div>
            </section>
        </div>
    )
}

export default Login
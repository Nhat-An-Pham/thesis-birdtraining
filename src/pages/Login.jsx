import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import authService from '../services/auth.service';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const navigate = useNavigate();
    const [err, setErr] = useState([]);
    //login 
    let onLogin = () => {
        let input = {
            email: email,
            password: password,
        }
        authService.login(input).then(
            ({ data }) => {
                toast.success('Successfully Logged In', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: 0,
                    theme: "colored",
                });
                setTimeout(() => {
                    navigate('/home')
                }, 3000);

            }
        ).catch(e => setErr("WRONG EMAIL OR PASSWORD"));
    }

    useEffect(() => {
        let token = localStorage.getItem('user-token');
        if (token) {
            navigate("/home");
        }
    })


    return (
        <div className='loginpage'>

            {/* Same as */}
            <section className='login-container'>
                <ToastContainer />
                <h1 className='login_section login_section-title'>Welcome Back</h1>
                <div className='login_section login_section-input'>
                    <input id='email' type='text' placeholder='Enter your Email' onChange={(e) => {
                        setEmail(e.target.value)
                    }}></input>

                    <input id='password' type="password" placeholder='Password' onChange={(e) => { setPassword(e.target.value) }} ></input>
                    <h4 className='loginpage-err'>{err}</h4>
                </div>
                <button className='login_section login_section-button' onClick={onLogin}>Login</button>
                <div className='login_section login_section-link'>
                    <p><Link to="/home">Back to home page</Link></p>
                    <p>Doesn't have an account? <Link to="/signup"> click here</Link></p>
                </div>
            </section>
        </div>
    )
}

export default Login
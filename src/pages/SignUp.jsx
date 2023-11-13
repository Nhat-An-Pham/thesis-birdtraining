import { React, useState } from 'react'
import { Link } from 'react-router-dom'
import AuthService from '../services/auth.service';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(true);

    const [err, setErr] = useState("");
    const navigator = useNavigate();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }
    const handleNameChange = (event) => {
        setName(event.target.value);
    }
    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }
    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const confirmPasswordFunction = () => {
        const passwordMatch = password === confirmPassword;
        setPasswordMatch(passwordMatch);
    };

    const handleSave = () => {
        if (password === confirmPassword) {
            AuthService.register({ name: name, password: password, email: email, phoneNumber: phone })
                .then(() => {
                    alert("Successfully Registered")
                    navigator('/home');
                })
                .catch(() => {
                    setErr("Existed Email Or Phone Number")
                });
        }
    }
    return (
        <div className='signuppage'>
            <section className='signup-container'>
                <h1 className='signup_section signup_section-title'>Sign Up</h1>
                <div className='signup_section signup_section-input'>
                    <input placeholder='Enter your Email' value={email} onChange={handleEmailChange} ></input>
                    <input placeholder='Enter your Name' value={name} onChange={handleNameChange}></input>
                    <input placeholder='Enter your Phone Number' value={phone} onChange={handlePhoneChange}></input>
                    <input type='password' placeholder='Password' value={password} onChange={handlePasswordChange}></input>
                    <input type='password' placeholder='Confirm your Password' value={confirmPassword} onChange={handleConfirmPasswordChange}
                        onBlur={confirmPasswordFunction}></input>
                    {!passwordMatch && <p style={{ color: 'red' }}>Passwords do not match.</p>}
                    <p style={{ 'color': 'red' }}>
                        {err}
                    </p>
                </div>
                <button className='signup_section signup_section-button' onClick={() => handleSave()}>Sign Up</button>
                <div className='signup_section signup_section-link'>
                    <p><Link to="/home">Back to home page</Link></p>
                    <p>Already have an account? <Link to="/login"> click here</Link></p>
                </div>
            </section>
        </div>
    )
}

export default SignUp
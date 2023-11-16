import React, { useEffect, useState } from 'react'
import UserService from '../services/user.service'
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

export const UserSettingPage = () => {

    //first
    const [user, setUser] = useState()
    const [inputDisable, setInputDisable] = useState(true);
    const navigate = useNavigate();

    //after update
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [phoneNumber, setPhoneNumber] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState();
    const [err, setErr] = useState();
    const [image, setImage] = useState();


    //FUNCTION
    function UpdateClick() {
        setInputDisable(false);
    }
    function CancelClick() {
        setName(null);
        setEmail(null);
        setPhoneNumber(null);
        setInputDisable(true);
    }
    function HandleImage(e) {
        console.log(e.target.files)
        setImage(e.target.files[0])
    }

    function ClearFields() {
        document.getElementById("fname").value = "";
        document.getElementById("femail").value = "";
        document.getElementById("fphone").value = "";
        document.getElementById("fpassword").value = "";
        document.getElementById("fconfpassword").value = "";
   }

    const handleNameChange = (event) => {
        setName(event.target.value);
    }
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }
    const handlePhoneChange = (event) => {
        setPhoneNumber(event.target.value);
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }
    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };


    //SAVE HANDLER
    const handleSaveProfile = () => {
        if (image) {
            UserService.putProfileImage({avatar: image})
                .then((res) => {
                    console.log('Success Change Avatar: ', res)
                    window.location.reload();
                })
                .catch((e) => {
                    toast.error("Fail Change Avatar:", e.response)
                    console.log("Fail Change Avatar:", e.response)
                })
        }
    }
    const handleSave = () => {
        if (confirmPassword === password) {
            UserService.putUserProfile({ name: name, email: email, phoneNumber: phoneNumber, password: password })
                .then((res) => {
                    // toast.success("Data Saved")
                    window.location.reload();
                })
                .catch(() => {
                    setErr("Existed / Wrong Email Or Phone Number")
                })
        } else {
            setErr("Your Password Are NOT MATCH")
        }
    }

    //API HANDLER
    useEffect(() => {
        UserService.getUserProfile()
            .then((res) => {
                setUser(res.data);
                // console.log(res.data)
            })
            .catch((e) => {
                console.log(e);
            })

    }, [])

    return (
        <div className='usersettingpage'>
            {user ?
                <div className='ustp-wrapper'>

                    <h2 className='ustp-header'>Profile Setting</h2>
                    <div className='ustp-body'>
                        <ToastContainer />
                        <div className='ustp_body-left'>
                            <img alt='profile picture' src={user.avatar}></img>
                            <input type='file' onChange={HandleImage} />
                            <button onClick={handleSaveProfile}>Update Avatar</button>
                        </div>
                        <div className='ustp_body-right'>
                            {inputDisable === true ? <></> : <p style={{ color: "green" }}>You Don't Have To Input All Fields</p>}
                            <label for="fname">Your Name</label>
                            <input type="text" id="fname" placeholder={user.name} disabled={inputDisable} value={name} onChange={handleNameChange}></input>
                            <label for="femail">Your Email</label>
                            <input type="text" id="femail" placeholder={user.email} disabled={inputDisable} value={email} onChange={handleEmailChange}></input>
                            <label for="fphone">Your Phone Number</label>
                            <input type="text" id="fphone" placeholder={`(+84) ${user.phoneNumber}`} disabled={inputDisable} value={phoneNumber} onChange={handlePhoneChange}></input>
                            {inputDisable === true ? null :
                                <>
                                    <label for="fpassword">New Password</label>
                                    <input type="password" id="fpassword" placeholder="New Password (If you need)" disabled={inputDisable} value={password} onChange={handlePasswordChange}></input>
                                    <label for="fconfpassword">Confirm Your New Password</label>
                                    <input type="password" id="fconfpassword" placeholder="Confirm Your New Password" disabled={inputDisable} value={confirmPassword} onChange={handleConfirmPasswordChange}></input>
                                </>
                            }
                            <p>MemberShip: {user.membership ?
                                <span>{user.membership}</span> :
                                <>You have no membership</>}
                            </p>
                            {err ? <p style={{ color: "red" }}>{err}</p> : null}
                            {inputDisable === true ?
                                <div className='ustp-body-button'>
                                    <button className='ustp-body-button-update' onClick={UpdateClick}>Update Your Information</button>
                                </div>
                                :
                                <div className='ustp-body-button'>
                                    <button className='ustp-body-button-save' onClick={handleSave}>SAVE</button>
                                    <button className='ustp-body-button-cancel' onClick={()=>{CancelClick();ClearFields()}}>CANCEL</button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                : null
            }
        </div>
    )
}

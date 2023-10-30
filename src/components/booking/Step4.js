import React, {useState} from "react";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";

function Step4({getFormValues}) {
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [phone, setphoneNumber] = useState(null);
    const [email, setEmail] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [phoneNumberError, setPhoneNumberError] = useState(null);


    const handleEmail = (e) =>{
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(re.test(e.target.value)){
            setEmailError(null);
            setEmail(e.target.value);
        }else{
            setEmailError("invalid email")
        }
    
    }

    const handlePhoneNumber = (e) =>{
        let re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        if (re.test(e.target.value)){
            setPhoneNumberError(null);
            setphoneNumber(e.target.value);
        }
        else{
            setPhoneNumberError("invalid phone number format");
        }
    }

    if(firstName && lastName && phone && email){
        getFormValues(firstName, lastName, phone, email);
    }


    return ( 
        <>
        <FormGroup >
        <TextField onChange={(e) =>{
            setFirstName(e.target.value)
            console.log(firstName)}} id="standard-basic" label="First Name" variant="standard" />
        <TextField  onChange={(e) =>setLastName(e.target.value)}  id="standard-basic" label="Last Name" variant="standard" />
        <TextField error={phoneNumberError ? true: false} helperText={phoneNumberError} onChange={(e) =>handlePhoneNumber(e)}  id="standard-basic" label="phone" variant="standard" />
        <TextField error={emailError? true : false} helperText={emailError}  onChange={(e) => handleEmail(e)}  type="email" id="standard-basic" label="Email" variant="standard" />
        </FormGroup>
        </>
     );
}

export default Step4;
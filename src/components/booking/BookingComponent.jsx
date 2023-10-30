import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import axios from "axios";
import Step4 from './Step4';
import moment from "moment";

import "./booking.scss"

function BookingComponent() {

    /*DATA AMD STATES*/
    const [activeStep, setActiveStep] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState(null)
    const [services, setServices] = useState([]);
    const [selectedServiceName, setSelectedServiceName] = useState(null);
    const [cFirstName, setCFirstName] = useState(null);
    const [cLastName, setCLastName] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedServiceId, setSelectedServiceId] = useState(null);
    const [cPhone, setCPhone] = useState(null);
    const [cEmail, setCEmail] = useState(null);
    const [apptDate, setApptDate] = useState(moment(new Date).format("YYYY-MM-DD"))
    const [selectedServiceLength, setSelectedServiceLength] = useState(null);
    const [businessId, setBusinessId] = useState(null);
    const [duplicateCheck, setDuplicateCheck] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const getBusinessId = (id, itemIndex) => {
        setBusinessId(id);
        setSelectedIndex(itemIndex)
    }

    /*FUNCTIONS*/
    const handleBack = () => {
        setErrorMessage(null);
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        if (activeStep == 1) {
            setBusinessId(null);
            setServices([]);
        }
        if (activeStep == 2) {
            setSelectedServiceName(null);
            setSelectedServiceId(null);

        }
        if (activeStep == 3) {
            setSelectedTime(null);
        }
    };

    const getServiceAndLengthMinutes = (name, serviceId, length) => {
        setSelectedServiceName(name);
        setSelectedServiceId(serviceId);
        setSelectedServiceLength(length);

    }
    const getFormValues = (firstName, lastName, phone, email) => {
        setCFirstName(firstName)
        setCLastName(lastName);
        setCPhone(phone);
        setCEmail(email);
    }
    const getDateTime = (date, time) => {
        setApptDate(date);
        setSelectedTime(time);
    }

    const handleNext = async (index) => {
        if (businessId === null) {
            setErrorMessage("*Please select a service.")
            return;
        }
        if (index === 1 && selectedServiceId == null) {
            setErrorMessage("*Please select a trainer from below.")

            return;
        }
        if (index === 2 && selectedTime == null) {
            setErrorMessage("*Please select a time.");
        }
        else {
            setErrorMessage(null);
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            if (index === 0) {
                // await axios.get(`https://instabookapi.azurewebsites.net/api/business_services/{id}?businessId=${businessId}`)
                //     .then((results) => {
                //         setServices(results.data);
                //     })
            }
            if (index === 3) {
                //axios request to submit appointment
                if (!cFirstName || !cLastName || !cPhone || !cEmail) {
                    setErrorMessage("*Please fill out all fields")
                    setActiveStep(3);
                }
                else {
                    setErrorMessage(null);
                    const newAppt = {
                        firstName: cFirstName,
                        lastName: cLastName,
                        startTime: selectedTime,
                        endTime: "",
                        serviceId: selectedServiceId,
                        confirmed: 1,
                        phoneNumber: cPhone,
                        email: cEmail,
                        apptDate: apptDate,
                        lengthMinutes: selectedServiceLength,
                        businessId: businessId
                    }
                    // try {
                    //     await axios.post("https://instabookapi.azurewebsites.net/api/appt_confirmed", newAppt)
                    //         .then((results) => {
                    //             setDuplicateCheck(results.data);
                    //             console.log(results.data);
                    //         })
                    // } catch (error) {
                    //     console.log(error.response.data);
                    // }
                }
                return;
            }
        }
    };
    const handleReset = () => {
        setActiveStep(0);
        setCFirstName(null);
        setCLastName(null);
        setSelectedTime(null);
        setBusinessId(null);
        setServices([]);
        setSelectedServiceId(null);
    };
    const steps = [
        {
            label: 'Select a service',
            description: <Step1 getBusinessId={getBusinessId} />,
        },
        {
            label: 'Which Trainer would you like to make an appointment with?',
            description: <Step2 businessId={businessId} services={services} getServiceAndLengthMinutes={getServiceAndLengthMinutes} />,
        },
        {
            label: 'Select Date & Time',
            description: <Step3 getDateTime={getDateTime} selectedServiceId={selectedServiceId} selectedServiceLength={selectedServiceLength} selectedServiceName={selectedServiceName} />,
        },
        {
            label: 'Please enter Contact Information',
            description: <Step4 getFormValues={getFormValues} />
        }
    ];


    return (
        <Box sx={{ maxWidth: 400 }}>
            <Typography variant="h6" style={{ color: '#ba000d' }}>{errorMessage}</Typography>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel
                            optional={
                                index === 3 ? (
                                    <Typography variant="caption">Last step</Typography>
                                ) : null
                            }
                        >
                            {step.label}
                        </StepLabel>
                        <StepContent>
                            <Typography>{step.description}</Typography>
                            <Box sx={{ mb: 2 }}>
                                <div>
                                    <Button
                                        variant="contained"
                                        onClick={() => handleNext(index)}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        {index === steps.length - 1 ? 'Confirm' : 'Continue'}
                                    </Button>
                                    <Button
                                        disabled={index === 0}
                                        onClick={handleBack}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        Back
                                    </Button>
                                </div>
                            </Box>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0} sx={{ p: 3 }}>

                    {duplicateCheck == 1 ?
                        <Typography variant="h5" style={{ color: "#009688" }}>You&apos;re appointment on {apptDate} at {selectedTime} for {selectedServiceName} as been confirmed!</Typography> :
                        <Typography variant="h5" style={{ color: "#ba000d" }}>We're sorry, that appointment time slot is taken. Please select another time.</Typography>
                    }
                    <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                        Create Another Appointment
                    </Button>
                </Paper>
            )}
        </Box>
    )
}

export default BookingComponent;

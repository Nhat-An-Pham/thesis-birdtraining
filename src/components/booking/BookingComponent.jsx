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
import Step4 from './Step4';
// import moment from "moment";z
import dayjs from 'dayjs';
import { useEffect } from 'react';

import "./booking.scss"
import ConsultantService from '../../services/consultant.service';

function BookingComponent() {

    /*DATA AMD STATES*/
    //1 and customerID
    const [serviceId, setServiceId] = useState(false);
    const customerId = JSON.parse(localStorage.getItem("user-token"))
    //2
    const [selectedTrainerId, setSelectedTrainerId] = useState(null);

    const [activeStep, setActiveStep] = useState(0);
    //3
    const [apptDate, setApptDate] = useState(dayjs())
    const [slotId, setSlotId] = useState(null);
    //4
    const [consultingType, setConsultingType] = useState(null)
    const [consultingDetail, setConsultingDetail] = useState(null);
    const [address, setAddress] = useState(null);

    //throw
    const [errorMessage, setErrorMessage] = useState(null);

    const [lastMessage, setLastMessage] = useState(null);


    //1
    const getServiceId = (id) => {
        setServiceId(id);
    }
    //2
    const getTrainerId = (id) => {
        setSelectedTrainerId(id);
    }
    //3
    const getAppointmentDate = (appointmentDate) => {
        setApptDate(appointmentDate);
    }
    const getSlotId = (slotId) => {
        setSlotId(slotId)
    }
    //4
    const getConsultingType = (consultingType) => {
        setConsultingType(consultingType);
    }
    const getFormValues = (consultingDetail, address, consultingTypeId) => {
        setConsultingDetail(consultingDetail);
        setAddress(address);
        setConsultingType(consultingTypeId)
    }

    /*FUNCTIONS*/
    const handleBack = () => {
        setErrorMessage(null);
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        if (activeStep == 1) {
            setServiceId(null);
        }
        if (activeStep == 2) {
            setSelectedTrainerId(null);

        }
        if (activeStep == 3) {
            setApptDate(null);
            setSlotId(null);
        }
    };




    const handleNext = async (index) => {
        if (serviceId === null) {
            setErrorMessage("*Please select a service.")
            return;
        }
        if (index === 1 && selectedTrainerId == null) {
            setErrorMessage("*Please Choose A Trainer or let Us Choose For You")
            return;
        }
        if (index === 2 && apptDate == null) {
            setErrorMessage("*Please select a time.");
        }
        else {
            setErrorMessage(null);
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            if (index === 3) {
                //axios request to submit appointment
                if (consultingType === null) {
                    setErrorMessage("*Please fill out all fields")
                    setActiveStep(3);
                }
                else {
                    setErrorMessage(null);
                    const newAppt = {
                        customerId: customerId,
                        onlineOrOffline: serviceId,
                        trainerId: selectedTrainerId,
                        appointmentDate: apptDate,
                        actualSlotStart: slotId,
                        consultingDetail: consultingDetail,
                        consultingTypeId: consultingType,
                        address: address,
                    }
                    try {
                        ConsultantService.CusSendTicket(newAppt)
                            .then((res) => {
                                console.log("Send Ticket Success")
                                setLastMessage("You Have Successfully Booked")
                            }).catch((error) => {
                                console.log("Fail Booking: ", error.response.data)
                                setLastMessage(error.response.data)
                            })
                    } catch (e) {
                    }
                }
                return;
            }
        }
    };

    //Reset Button
    const handleReset = () => {
        setActiveStep(0);
        setServiceId(null);
        setSelectedTrainerId(null);
    };

    //Change Service Name
    const [serviceName, setServiceName] = useState("")
    useEffect(() => {
        if (serviceId === true) {
            setServiceName("(Online Consultation)")
        } else {
            setServiceName("(In-Home Consultation)")
        }
    }, [serviceId])


    const steps = [
        {
            label: `Select a service ${serviceName}`,
            description: <Step1 getServiceId={getServiceId} />,
        },
        {
            label: `Which Trainer would you like to make an appointment with? `,
            description: <Step2 getTrainerId={getTrainerId} />,
        },
        {
            label: 'Select Date & Time',
            description: <Step3 getAppointmentDate={getAppointmentDate} selectedTrainerId={selectedTrainerId} getSlotId={getSlotId} />,
        },
        {
            label: 'Please enter contact information',
            description: <Step4 getFormValues={getFormValues} getConsultingType={getConsultingType} />
        }
    ];


    return (
        <Box sx={{ maxWidth: 600 }}>
            <Stepper activeStep={activeStep} orientation="vertical" >
                {steps.map((step, index) => (
                    <Step key={step.label} >
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
            <Typography variant="h6" style={{ color: '#ba000d', fontSize: "15px", textAlign: "center" }}>{errorMessage}</Typography>
            {lastMessage ?
                <Typography variant="h6" style={{ color: '#ba000d', fontSize: "20px", textAlign: "center", marginTop: "20px" }}>{lastMessage}</Typography>
                : null}
            {activeStep === steps.length && (
                <Paper square elevation={0} sx={{ p: 3 }} >
                    <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                        Create Another Appointment
                    </Button>
                </Paper>
            )}
        </Box>
    )
}

export default BookingComponent;

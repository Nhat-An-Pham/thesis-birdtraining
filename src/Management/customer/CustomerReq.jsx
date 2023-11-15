import React, { useEffect, useState } from 'react'
import ReworkSidebar from "../component/sidebar/ReworkSidebar";
import { ochreTheme } from "../themes/Theme";
import { Table, TableContainer, TableHead, TableBody, TableCell, TableRow, Paper, ThemeProvider, Grid, Button } from "@mui/material";
import './customerReq.scss'
import ConsultantService from '../../services/consultant.service';

export default function CustomerReqComponent() {
    const [renderedIndex, setRenderedIndex] = useState(0); // 0: Detail, 1: Assigned, 2: NotAssigned, 3: Handled

    const [ticketIdForDetail, setTicketIdForDetail] = useState(0);
    const [haveAssignedTrainer, setHaveAssignedTrainer] = useState(1); //1: Assigned, 2: NotAssigned, 3: Handled
    const [assignedTrainer, setAssignedTrainer] = useState(null);

    const AssignTrainer = (trainer, ticketId) => {
        console.log("Trainer ne:::::::::::::::::::::",trainer);
        ConsultantService
            .assignTrainer({ trainerId: trainer, ticketId: ticketId })
            .then((res) => {
                console.log("success Assign Trainer test", res.data);
            })
            .catch((e) => console.log("fail Assign Trainer test", e));
    }


    const [listOfFreeTrainer, setListOfFreeTrainer] = useState([]);


    // useEffect(() => {
    //     ConsultantService
    //         .getFreeTrainerOnSlotDate({ dateValue: dateValue, slotId: slotValue })
    //         .then((res) => {
    //             console.log("success Free Trainer list test", res.data);
    //             setListOfFreeTrainer(res.data);
    //         })
    //         .catch((e) => console.log("fail Free Trainer list test", e));
    // }, []);

    const GetListFreeTrainers = (date, slot) => {
        ConsultantService
            .getFreeTrainerOnSlotDate({ dateValue: date, slotId: slot })
            .then((res) => {
                console.log("success Free Trainer list test", res.data);
                setListOfFreeTrainer(res.data);
            })
            .catch((e) => console.log("fail Free Trainer list test", e));
    }


    const [ticketDetail, setTicketDetail] = useState(null);
    useEffect(() => {
        // console.log(ticketIdForDetail);
        ConsultantService
            .getConsultingTicketDetail({ ticketId: ticketIdForDetail })
            .then((res) => {
                console.log("success Consulting Ticket Detail test", res.data);
                setTicketDetail(res.data);
            })
            .catch((e) => console.log("fail Consulting Ticket Detail test", e));
    }, [ticketIdForDetail]);



    const [listNotAssignedConsultingTicket, setlistNotAssignedConsultingTicket] = useState([]);
    useEffect(() => {
        ConsultantService
            .viewListNotAssignedConsultingTicket()
            .then((res) => {
                // console.log("success Not Assigned Consulting Ticket list test", res.data);
                setlistNotAssignedConsultingTicket(res.data);
            })
            .catch((e) => console.log("fail Not Assigned Consulting Ticket list test", e));
    }, [renderedIndex]);

    const [listAssignedConsultingTicket, setListAssignedConsultingTicket] = useState([]);
    useEffect(() => {
        ConsultantService
            .viewListAssignedConsultingTicket()
            .then((res) => {
                // console.log("success Assigned Consulting Ticket list test", res.data);
                setListAssignedConsultingTicket(res.data);
            })
            .catch((e) => console.log("fail Assigned Consulting Ticket list test", e));
    }, [renderedIndex]);


    const [listHandledConsultingTicket, setListHandledConsultingTicket] = useState([]);
    useEffect(() => {
        ConsultantService
            .viewListHandledConsultingTicket()
            .then((res) => {
                // console.log("success Handled Consulting Ticket list test", res.data);
                setListHandledConsultingTicket(res.data);
            })
            .catch((e) => console.log("fail Handled Consulting Ticket list test", e));
    }, [renderedIndex]);

    return (
        <div className="workshop-container">
            <ThemeProvider theme={ochreTheme}>
                <ReworkSidebar selectTab={1} />
                <Grid container spacing={1} sx={{ margin: "15px" }}>
                    <Grid container item xs={5} justifyContent="flex-start">
                        {renderedIndex === 1 ? (
                            <Button variant="contained" color="ochre" onClick={() => { setRenderedIndex(2); setTicketIdForDetail(0); }}>
                                View UnAssigned Ticket
                            </Button>
                        ) : (
                            <Button variant="contained" color="ochre" onClick={() => { setRenderedIndex(1); setTicketIdForDetail(0); }}>
                                View Assigned Ticket
                            </Button>
                        )}
                    </Grid>

                    <Grid container item spacing={0} xs={5} justifyContent="flex-end">
                        {renderedIndex === 3 ? (
                            <></>
                        ) : (
                            <Button variant="contained" color="ochre" onClick={() => { setRenderedIndex(3); setTicketIdForDetail(0); }}>
                                View Handled Ticket
                            </Button>
                        )}
                    </Grid>

                    <Grid item xs={12}>
                        {renderedIndex === 1 ? (
                            <div>
                                <h3>Requests that have assigned trainers</h3>
                                {<TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Id</TableCell>
                                                <TableCell>Online/Offline</TableCell>
                                                <TableCell>Date</TableCell>
                                                <TableCell>Slot</TableCell>
                                                <TableCell></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {listAssignedConsultingTicket.map((row, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>{row.id}</TableCell>
                                                    <TableCell>{row.onlineOrOffline ? 'Online' : 'Offine'}</TableCell>
                                                    <TableCell>{row.appointmentDate}</TableCell>
                                                    <TableCell>{row.actualSlotStart}</TableCell>
                                                    <TableCell>
                                                        <Button type='button' onClick={() => {
                                                            setTicketIdForDetail(row.id);
                                                            setHaveAssignedTrainer(1);
                                                            setRenderedIndex(0);
                                                        }}>
                                                            Detail
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>}
                            </div>
                        ) : renderedIndex === 2 ? (
                            <div>
                                <h3>Requests that have not assigned trainers</h3>
                                {<TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Id</TableCell>
                                                <TableCell>Online/Offline</TableCell>
                                                <TableCell>Date</TableCell>
                                                <TableCell>Slot</TableCell>
                                                <TableCell></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {listNotAssignedConsultingTicket.map((row, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>{row.id}</TableCell>
                                                    <TableCell>{row.onlineOrOffline ? 'Online' : 'Offine'}</TableCell>
                                                    <TableCell>{row.appointmentDate}</TableCell>
                                                    <TableCell>{row.actualSlotStart}</TableCell>
                                                    <TableCell>
                                                        <Button type='button' onClick={() => {
                                                            setTicketIdForDetail(row.id);
                                                            // setDateValue(row.appointmentDate);
                                                            // setSlotValue(row.actualSlotStart);
                                                            GetListFreeTrainers(row.appointmentDate, row.actualSlotStart);
                                                            setHaveAssignedTrainer(2);
                                                            setRenderedIndex(0);
                                                        }}>
                                                            Detail
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>}
                            </div>
                        ) : renderedIndex === 3 ? (
                            <div>
                                <h3>Requests that have been handled</h3>
                                {<TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Id</TableCell>
                                                <TableCell>Online/Offline</TableCell>
                                                <TableCell>Date</TableCell>
                                                <TableCell>Slot</TableCell>
                                                <TableCell></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {listHandledConsultingTicket.map((row, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>{row.id}</TableCell>
                                                    <TableCell>{row.onlineOrOffline ? 'Online' : 'Offine'}</TableCell>
                                                    <TableCell>{row.appointmentDate}</TableCell>
                                                    <TableCell>{row.actualSlotStart}</TableCell>
                                                    <TableCell>
                                                        <Button type='button' onClick={() => {
                                                            setTicketIdForDetail(row.id);
                                                            setHaveAssignedTrainer(3);
                                                            setRenderedIndex(0);
                                                        }}>
                                                            Detail
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>}
                            </div>
                        ) : renderedIndex === 0 && ticketIdForDetail === 0 ? (
                            setRenderedIndex(1)
                        ) : renderedIndex === 0 && ticketIdForDetail !== 0 && ticketDetail ? (
                            <div>
                                <h3>Ticket Detail</h3>
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Id</TableCell>
                                                <TableCell>Customer Name</TableCell>
                                                <TableCell>Address</TableCell>
                                                <TableCell>Type</TableCell>
                                                <TableCell>Trainer</TableCell>
                                                <TableCell>Detail</TableCell>
                                                <TableCell>Distance</TableCell>
                                                <TableCell>Online/Offline</TableCell>
                                                <TableCell>Date</TableCell>
                                                <TableCell>Slot</TableCell>
                                                <TableCell>Price</TableCell>
                                                <TableCell>Status</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>{ticketDetail.id}</TableCell>
                                                <TableCell>{ticketDetail.customerName}</TableCell>
                                                <TableCell>{ticketDetail.addressDetail}</TableCell>
                                                <TableCell>{ticketDetail.consultingType}</TableCell>
                                                {haveAssignedTrainer === 1 ? (<TableCell>
                                                    {ticketDetail.trainerName}
                                                </TableCell>
                                                ) :
                                                    haveAssignedTrainer === 2 && listOfFreeTrainer ? (<TableCell>
                                                        <select onChange={(e) => setAssignedTrainer(e.target.value)}>
                                                            {listOfFreeTrainer.map((trainer, idx) => (
                                                                <option key={idx} value={trainer.id}>{trainer.name}</option>
                                                            ))}
                                                        </select>
                                                    </TableCell>) :
                                                        haveAssignedTrainer === 3 ? (<TableCell>{ticketDetail.trainerName}</TableCell>) :
                                                            (<></>)
                                                }
                                                <TableCell>{ticketDetail.consultingDetail}</TableCell>
                                                <TableCell>{ticketDetail.distance}</TableCell>
                                                <TableCell>{ticketDetail.onlineOrOffline ? 'Online' : 'Offine'}</TableCell>
                                                <TableCell>{ticketDetail.appointmentDate}</TableCell>
                                                <TableCell>{ticketDetail.actualSlotStart}</TableCell>
                                                <TableCell>{ticketDetail.price}</TableCell>
                                                <TableCell>{ticketDetail.status}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                {haveAssignedTrainer === 1 ? (<><Button>Confirm</Button>
                                    <Button>Cancel</Button></>) :
                                    haveAssignedTrainer === 2 ? (<><Button onClick={() => AssignTrainer(assignedTrainer, ticketIdForDetail)}>Assign</Button>
                                        <Button>Cancel</Button></>) :
                                        haveAssignedTrainer === 3 ? (<></>) :
                                            (<></>)}
                            </div>
                        ) : null}
                    </Grid>
                </Grid>
            </ThemeProvider>
        </div>
    );
}
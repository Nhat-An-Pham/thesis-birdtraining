import { Paper, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import ConsultantService from '../../services/consultant.service';
import addonService from '../../services/addon.service';

const TicketDetailView = ({
    callBackRenderedIndex,
    callBackHaveAssignedTrainer,
    ticketIdForDetail,
}) => {
    const [assignedTrainer, setAssignedTrainer] = useState(null);
    const [ticketDetail, setTicketDetail] = useState({});
    useEffect(() => {
        ConsultantService
            .getConsultingTicketDetail({ ticketId: ticketIdForDetail })
            .then((res) => {
                console.log("success Consulting Ticket Detail test", res.data);
                setTicketDetail(res.data);
            })
            .catch((e) => console.log("fail Consulting Ticket Detail test", e));
    }, []);

    const [listOfFreeTrainer, setListOfFreeTrainer] = useState([]);
    const GetListFreeTrainers = (date, slot) => {
        ConsultantService
            .getFreeTrainerOnSlotDate({ dateValue: date, slotId: slot })
            .then((res) => {
                console.log("success Free Trainer list test", res.data);
                setListOfFreeTrainer(res.data);
            })
            .catch((e) => console.log("fail Free Trainer list test", e));
    }

    const [haveAssignedTrainer, setHaveAssignedTrainer] = useState(callBackHaveAssignedTrainer); //1: Assigned, 2: NotAssigned, 3: Handled

    const handleBackClick = (renderedIndex) => {
        callBackRenderedIndex(renderedIndex)
    }

    const AssignTrainer = (trainer, ticketId) => {
        ConsultantService
            .assignTrainer({ trainerId: trainer, ticketId: ticketId })
            .then((res) => {
                console.log("success Assign Trainer test", res.data);
            })
            .catch((e) => console.log("fail Assign Trainer test", e));
    }

    const CancelTicket = (ticketId) => {
        ConsultantService
            .cancelConsultingTicket({ ticketId })
            .then((res) => {
                console.log("succes Cancel Ticket test", res.data);
            })
            .catch((e) => console.log("fail Cancel Ticket tes", e));
    }

    const ConfirmTicket = (ticketId) => {
        ConsultantService
            .approveConsultingTicket({ ticketId})
            .then((res) => {
                console.log("succes Confirm Ticket test", res.data);
            })
            .catch((e) => console.log("fail Confirm Ticket tes", e));
    }

    return (
        <>
            <Button onClick={() => (handleBackClick(1))}>Back To List Assigned</Button>
            <h2>Ticket Detail</h2>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        {ticketDetail && (
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
                        )}
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>{ticketDetail.id}</TableCell>
                            <TableCell>{ticketDetail.customerName}</TableCell>
                            <TableCell>{ticketDetail.addressDetail}</TableCell>
                            <TableCell>{ticketDetail.consultingType}</TableCell>
                            {haveAssignedTrainer === 1 ? (
                            <TableCell>
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
                            <TableCell>{addonService.formatDate(ticketDetail.appointmentDate)}</TableCell>
                            <TableCell>{ticketDetail.actualSlotStart}</TableCell>
                            <TableCell>{ticketDetail.price}</TableCell>
                            <TableCell>{ticketDetail.status}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            {haveAssignedTrainer === 1 ? (<><Button onClick={() => {ConfirmTicket(ticketIdForDetail); callBackRenderedIndex(1);}}>Confirm</Button>
                <Button onClick={() => { CancelTicket(ticketIdForDetail); callBackRenderedIndex(1)}}>Cancel</Button></>) :
                haveAssignedTrainer === 2 ? (<><Button onClick={() => { AssignTrainer(assignedTrainer, ticketIdForDetail); callBackRenderedIndex(1)}}>Assign</Button>
                    <Button onClick={() => { CancelTicket(ticketIdForDetail); callBackRenderedIndex(1)}}>Cancel</Button></>) :
                    haveAssignedTrainer === 3 ? (<></>) :
                        (<></>)}
        </>
    );
};

export default TicketDetailView;
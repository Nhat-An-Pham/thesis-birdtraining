import { Paper, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import ConsultantService from '../../services/consultant.service';
import addonService from '../../services/addon.service';

const NotAssignedTicketView = ({
    callBackRenderedIndex,
    callbackTicketIdForDetail,
    callBackHaveAssignedTrainer,
}) => {
    const [listNotAssignedConsultingTicket, setlistNotAssignedConsultingTicket] = useState([]);

    useEffect(() => {
        ConsultantService
            .viewListNotAssignedConsultingTicket()
            .then((res) => {
                console.log("success Not Assigned Trainer Consulting Ticket list test", res.data);
                setlistNotAssignedConsultingTicket(res.data);
            })
            .catch((e) => console.log("fail Not Assigned Consulting Ticket list test", e));
    }, []);
    

    const handleDetailClick = (ticketId) => {
        callbackTicketIdForDetail(ticketId);
        callBackHaveAssignedTrainer(2);
        callBackRenderedIndex(0);
    }

    return (
        <>
            <h2>Tickets that have not assigned trainer</h2>
            <TableContainer component={Paper}>
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
                                <TableCell>{addonService.formatDate(row.appointmentDate)}</TableCell>
                                <TableCell>{row.actualSlotStart}</TableCell>
                                <TableCell>
                                    <Button onClick={() => {
                                        handleDetailClick(row.id)
                                    }}>
                                        Detail
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default NotAssignedTicketView;
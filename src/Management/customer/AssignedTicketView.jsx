import { Paper, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import ConsultantService from '../../services/consultant.service';
import addonService from '../../services/addon.service';

const AssignedTicketView = ({
    callBackRenderedIndex,
    callbackTicketIdForDetail,
    callBackHaveAssignedTrainer,
}) => {
    const [listAssignedConsultingTicket, setListAssignedConsultingTicket] = useState([]);

    useEffect(() => {
        ConsultantService
            .viewListAssignedConsultingTicket()
            .then((res) => {
                console.log("success Assigned Trainer Consulting Ticket list test", res.data);
                setListAssignedConsultingTicket(res.data);
            })
            .catch((e) => console.log("fail Assigned Consulting Ticket list test", e));
    }, []);

    const handleDetailClick = (ticketId) => {
        callbackTicketIdForDetail(ticketId);
        callBackHaveAssignedTrainer(1);
        callBackRenderedIndex(0);
    }

    return (
        <>
            <h2>Tickets that have assigned trainer</h2>
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
                        {listAssignedConsultingTicket.map((row, index) => (
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

export default AssignedTicketView;
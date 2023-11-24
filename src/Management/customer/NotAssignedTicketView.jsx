import { Paper, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Table } from "@mui/material";
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
            <h1 style={{color: "red", textAlign:"center", marginBottom:"30px", paddingBottom:"20px", borderBottom:"0.5px grey solid"}}>Tickets that have not assigned trainer</h1>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Ticket Id</TableCell>
                            <TableCell>Service</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Slot</TableCell>
                            <TableCell>Detail</TableCell>
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
                                    <Button
                                        variant="contained"
                                        color="ochre"
                                        onClick={() => { handleDetailClick(row.id) }}>
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
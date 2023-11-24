import { Paper, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Table } from "@mui/material";
import ConsultantService from '../../services/consultant.service';
import addonService from '../../services/addon.service';

const HandledTicketView = ({
    callBackRenderedIndex,
    callbackTicketIdForDetail,
    callBackHaveAssignedTrainer,
}) => {
    const [listHandledConsultingTicket, setListHandledConsultingTicket] = useState([]);

    useEffect(() => {
        ConsultantService
            .viewListHandledConsultingTicket()
            .then((res) => {
                console.log("success Handled Consulting Ticket list test", res.data);
                setListHandledConsultingTicket(res.data);
            })
            .catch((e) => console.log("fail Handled Consulting Ticket list test", e));
    }, []);

    const handleDetailClick = (ticketId) => {
        callbackTicketIdForDetail(ticketId);
        callBackHaveAssignedTrainer(3);
        callBackRenderedIndex(0);
    }

    return (
        <>
            <h1 style={{color: "green", textAlign:"center", paddingBottom:"20px",
            marginBottom:"30px", borderBottom:"0.5px grey solid"}}>Tickets that have handled</h1>

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
                        {listHandledConsultingTicket.map((row, index) => (
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

export default HandledTicketView;
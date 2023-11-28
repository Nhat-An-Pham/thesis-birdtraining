import { Paper, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import consultantService from "../../services/consultant.service";
import addonService from "../../services/addon.service";

const FinishedTicketView = ({
    callBackRenderedIndex
}) => {
    const [listFinishedTicket, setListFinishedTicket] = useState([]);
    useEffect(() => {
        consultantService
            .getFinishedConsultingTicket()
            .then((res) => {
                console.log("success Finished Consulting Ticket list test", res.data);
                setListFinishedTicket(res.data);
            })
            .catch((e) => console.log("fail Finished Consulting Ticket list test", e));
    }, []);

    const handleListAssignCLick = (renderedIndex) => {
        callBackRenderedIndex(renderedIndex)
    }
    return (
        <>
        <Button onClick={() => handleListAssignCLick(1)}>Return to list Assigned</Button>
            <h2>List Finished Ticket</h2>
            {<TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableCell>Id</TableCell>
                        <TableCell>Online/Offline</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Slot</TableCell>
                    </TableHead>
                    <TableBody>
                        {listFinishedTicket.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.onlineOrOffline ? 'Online' : 'Offine'}</TableCell>
                                <TableCell>{addonService.formatDate(row.appointmentDate)}</TableCell>
                                <TableCell>{row.actualSlotStart}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>}
        </>
    );
};

export default FinishedTicketView;
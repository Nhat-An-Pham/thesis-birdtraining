import { Button, Table } from "react-bootstrap";
import consultantService from "../../services/consultant.service";
import { Paper, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";

import addonService from "../../services/addon.service";

const TrainerTicketDetailView = ({
    callBackRenderedIndex,
    ticketIdForDetail
}) => {
    //Lấy ticket detail
    const [ticketDetail, setTicketDetail] = useState({});
    useEffect(() => {
        consultantService
            .getConsultingTicketDetail({ ticketId: ticketIdForDetail })
            .then((res) => {
                console.log("success Consulting Ticket Detail test", res.data);
                setTicketDetail(res.data);
            })
            .catch((e) => console.log("fail Consulting Ticket Detail test", e));
    }, []);

    const [ggMeetLink, setGgMeetLink] = useState('');
    const UpdateTicket = (ticketId, link) => {
        consultantService
            .updateGooglemeetLink({ ticketId: ticketId, ggmeetLink: link })
            .then((res) => {
                console.log("success Update Google Meet Link test", res.data);
            })
            .catch((e) => console.log("fail Update Google Meet Link test", e));
    }

    const handleBackClick = (renderedIndex) => {
        callBackRenderedIndex(renderedIndex)
    }

    return (
        <>
            <Button onClick={() => (handleBackClick(1))}>Back To List Assigned Ticket</Button>
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
                                <TableCell>Detail</TableCell>
                                <TableCell>Distance</TableCell>
                                <TableCell>Online/Offline</TableCell>
                                {ticketDetail.onlineOrOffline === true ? (
                                    <TableCell>Meet Link</TableCell>
                                ) : null}
                                <TableCell>Date</TableCell>
                                <TableCell>Slot</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        )}
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>{ticketDetail.id}</TableCell>
                            <TableCell>{ticketDetail.customerName}</TableCell>
                            <TableCell>{ticketDetail.addressDetail}</TableCell>
                            <TableCell>{ticketDetail.consultingType}</TableCell>
                            <TableCell>{ticketDetail.consultingDetail}</TableCell>
                            <TableCell>{ticketDetail.distance}</TableCell>
                            <TableCell>{ticketDetail.onlineOrOffline ? 'Online' : 'Offine'}</TableCell>
                            {ticketDetail.onlineOrOffline === true ? (
                                <TableCell>{<input type="text" defaultValue={ticketDetail.ggMeetLink} onChange={(e) => setGgMeetLink(e.target.value)} />}</TableCell>
                            ) : null}
                            <TableCell>{addonService.formatDate(ticketDetail.appointmentDate)}</TableCell>
                            <TableCell>{ticketDetail.actualSlotStart}</TableCell>
                            <TableCell>{ticketDetail.price}</TableCell>
                            <TableCell>
                                {ticketDetail.onlineOrOffline === true ? (
                                    <Button onClick={() => UpdateTicket(ticketDetail.id, ggMeetLink)}>Update</Button>
                                ) : null}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Button onClick={() => handleBackClick(2)}>Finish Appointment</Button>
        </>
    );
};

export default TrainerTicketDetailView;
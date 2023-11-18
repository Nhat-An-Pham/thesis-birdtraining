import { useState } from "react";
import consultantService from "../../services/consultant.service";
import { TableBody, TableCell, TableHead } from "@mui/material";
import { Button } from "@coreui/coreui";
import { useEffect } from "react";

export default function TrainerTicket() {
    const [renderedIndex, setRenderedIndex] = useState(1); // 0: Detail, 1: List Assigned
    const [ticketIdForDetail, setTicketIdForDetail] = useState();

    if (userRole === "Trainer") {
        navigate("/trainerTicket");
    } else if (userRole === "Staff" || userRole === "Manager") {
        navigate("/consulting");
    }

    //Lấy list ticket mà Trainer được assign
    const [listAssignedConsultingTicket, setListAssignedConsultingTicket] = useState([]);
    useEffect(() => {
        consultantService
            .getListAssignedConsultingTicket()
            .then((res) => {
                console.log("success Assigned Consulting Ticket list test", res.data);
                setListAssignedConsultingTicket(res.data);
            })
            .catch((e) => console.log("fail Assigned Consulting Ticket list test", e));
    }, []);

    //Lấy ticket detail
    const [ticketDetail, setTicketDetail] = useState(null);
    useEffect(() => {
        consultantService
            .getConsultingTicketDetail({ ticketId: ticketIdForDetail })
            .then((res) => {
                console.log("success Consulting Ticket Detail test", res.data);
                setTicketDetail(res.data);
            })
            .catch((e) => console.log("fail Consulting Ticket Detail test", e));
    }, [ticketIdForDetail]);

    const [ggMeetLink, setGgMeetLink] = useState(null);

    const UpdateGGMeetLink = (ticketId, ggmeetLink) => {
        consultantService
            .updateGooglemeetLink({ ticketId: ticketId, ggmeetLink: ggmeetLink })
        then((res) => {
            console.log("success Update GGMeetLink test", res.data);
        })
            .catch((e) => console.log("fail Update GGMeetLink test", e));
    }

    return (
        <>
            {renderedIndex === 1 ? (
                <div className="timetable-container">
                    <ReworkSidebar />
                    <div className="timetable-wrapper">
                        <h2>List Assigned Ticket</h2>
                        {<TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableCell>Id</TableCell>
                                    <TableCell>Online/Offline</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Slot</TableCell>
                                    <TableCell></TableCell>
                                </TableHead>
                                <TableBody>
                                    {listAssignedConsultingTicket.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{row.id}</TableCell>
                                            <TableCell>{row.onlineOrOffline ? 'Online' : 'Offine'}</TableCell>
                                            <TableCell>{addonService.formatDate(row.appointmentDate)}</TableCell>
                                            <TableCell>{row.actualSlotStart}</TableCell>
                                            <Button type='button' onClick={() => {
                                                setTicketIdForDetail(row.id);
                                                setRenderedIndex(0);
                                            }}>
                                                Detail
                                            </Button>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>}
                    </div>
                </div>
            ) : renderedIndex === 0 ? (
                <div>
                    <Button onClick={() => (setRenderedIndex(1))}>Back To List Assigned</Button>
                    <h2>Ticket Detail</h2>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Id</TableCell>
                                    <TableCell>Customer Name</TableCell>
                                    <TableCell>Address</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell>Detail</TableCell>
                                    <TableCell>Distance</TableCell>
                                    <TableCell>Online/Offline</TableCell>
                                    <TableCell>Meet Link</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Slot</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Update Meet Link</TableCell>
                                </TableRow>
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
                                    <TableCell>{<input type="text" value={ticketDetail.ggMeetLink} onChange={setGgMeetLink(ticketDetail.ggMeetLink)} />}</TableCell>
                                    <TableCell>{addonService.formatDate(ticketDetail.appointmentDate)}</TableCell>
                                    <TableCell>{ticketDetail.actualSlotStart}</TableCell>
                                    <TableCell>{ticketDetail.price}</TableCell>
                                    <TableCell>{<Button type="button" onClick={() => { UpdateGGMeetLink(ticketIdForDetail, ggMeetLink) }}>Update</Button>}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Button onClick={() => (UpdateGGMeetLink(ticketIdForDetail, ggMeetLink))}>Update Meet Link</Button>
                </div>
            ) : null}

        </>
    )
}
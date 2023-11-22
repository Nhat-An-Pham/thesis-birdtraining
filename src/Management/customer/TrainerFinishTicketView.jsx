import { Button, Table } from "react-bootstrap";
import consultantService from "../../services/consultant.service";
import { Paper, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import timetableService from "../../services/timetable.service";

const TrainerFinishTicketView = ({
    callBackRenderedIndex,
    ticketIdForDetail
}) => {
    const [ticketDetail, setTicketDetail] = useState({});
    useEffect(() => {
        consultantService
            .getConsultingTicketDetail({ ticketId: ticketIdForDetail })
            .then((res) => {
                // console.log("success Consulting Ticket Detail test", res.data);
                setTicketDetail(res.data);
            })
            .catch((e) => console.log("fail Consulting Ticket Detail test", e));
    }, []);

    const [selectedSLotTime, setSelectedSlotTime] = useState("");
    const [slotTime, setSlotTIme] = useState({});
    useEffect(() => {
        timetableService
            .getSlotTime()
            .then((res) => {
                console.log("Success Get Time SLot test", res.data);
                setSlotTIme(res.data);
            })
            .catch((e) => console.log("Fail Get Time SLot test", e));
    }, []);

    const handleBackClick = (renderedIndex) => {
        callBackRenderedIndex(renderedIndex)
    }

    const handleFinishClick = (renderedIndex) => {

    }

    const handleFinishOnlineClick = (renderedIndex) => {

    }
    return (
        <>
            <Button onClick={() => (handleBackClick(0))}>Back To Detail Ticket</Button>
            <h2>Finish Appointment</h2>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        {ticketDetail && (
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell>End Slot</TableCell>
                                <TableCell>Evidence</TableCell>
                            </TableRow>
                        )}
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>{ticketDetail.id}</TableCell>
                            <TableCell>{<select onChange={(e) => setSelectedSlotTime(e.value)}>
                                {slotTime.map((slot) => (
                                    <option value={slot.id}>{slot.startTime.slice(0, 5) + " - " + slot.endTime.slice(0, 5)}</option>
                                ))}
                            </select>}
                            </TableCell>
                            {ticketDetail.onlineOrOffline === true ? (
                                <TableCell></TableCell>
                            ) : ticketDetail.onlineOrOffline === false ? (
                                <TableCell></TableCell>
                            ) : null}
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            {ticketDetail.onlineOrOffline === true ? (
                <Button>Finish</Button>
            ) : ticketDetail.onlineOrOffline === false ? (
                <Button>Finish</Button>
            ) : null}

        </>
    );
};

export default TrainerFinishTicketView;
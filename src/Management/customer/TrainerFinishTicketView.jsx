import { Button, Table } from "react-bootstrap";
import consultantService from "../../services/consultant.service";
import { MenuItem, Paper, Select, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import timetableService from "../../services/timetable.service";

const TrainerFinishTicketView = ({
    callBackRenderedIndex,
    ticketIdForDetail
}) => {
    const [onlineEvidence, setOnlineEvidence] = useState(null);
    const [evidence, setEvidence] = useState(null);
    const [submittedEvidence, setSubmittedEvidence] = useState([]);

    const handleFileChange = (e) => {
        const file = Array.from(e.target.file);
        setEvidence(file[0]);
        const evidenceName = file.map((file) => file.name);
        setSubmittedEvidence(evidenceName);
    }

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

    const [selectedSLotTime, setSelectedSlotTime] = useState(-1);
    const [slotTime, setSlotTIme] = useState([]);
    useEffect(() => {
        timetableService
            .getSlotTime()
            .then((res) => {
                console.log("Success Get Time SLot test", res.data);
                setSlotTIme(res.data);
            })
            .catch((e) => console.log("Fail Get Time SLot test", e));
    }, []);

    const FinishTicket = (id, actualEndSlot, evidence) => {
        consultantService
            .finishAppointment({ id: id, actualEndSlot: actualEndSlot, evidence: evidence })
            .then((res) => {
                console.log("Success Finish Ticket test", res.data);
            })
            .catch((e) => console.log("Fail Finish Ticket test", e));
    }

    const FinishOnlineTicket = (id, actualEndSlot, evidence) => {
        console.log("id", id);
        console.log("actualEndSlot", actualEndSlot);
        console.log("evidence", evidence);
        consultantService
            .finishOnlineAppointment({ id: id, actualEndSlot: actualEndSlot, evidence: evidence })
            .then((res) => {
                console.log(("Success Finish Ticket test", res.data));
            })
            .catch((e) => console.log("Fail Finish Ticket test", e));
    }

    const handleBackClick = (renderedIndex) => {
        callBackRenderedIndex(renderedIndex)
    }

    const handleFinishClick = (renderedIndex) => {
        callBackRenderedIndex(renderedIndex)
    }

    const handleFinishOnlineClick = (renderedIndex, id, actualEndSlot, evidence) => {
        FinishOnlineTicket(id, actualEndSlot, evidence);
        callBackRenderedIndex(renderedIndex);
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
                            <TableCell>
                                <Select
                                    onChange={(e) => setSelectedSlotTime(e.target.value)}
                                    value={selectedSLotTime}
                                >
                                    {slotTime.map((slot) => (
                                        <MenuItem value={slot.id}>
                                            {slot.startTime.slice(0, -3)}-{slot.endTime.slice(0, -3)}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </TableCell>
                            {ticketDetail.onlineOrOffline === true ? (
                                <input type="text" onChange={(e) => setOnlineEvidence(e.target.value)} />
                            ) : ticketDetail.onlineOrOffline === false ? (
                                <TableCell>Set Offline Evidence</TableCell>
                            ) : null}
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            {ticketDetail.onlineOrOffline === true ? (
                <Button onClick={() => handleFinishOnlineClick(1, ticketDetail.id, selectedSLotTime, onlineEvidence)}>Finish</Button>
            ) : ticketDetail.onlineOrOffline === false ? (
                <Button onClick={() => handleFinishClick(1)}>Finish</Button>
            ) : null}

        </>
    );
};

export default TrainerFinishTicketView;
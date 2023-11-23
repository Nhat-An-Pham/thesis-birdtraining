import consultantService from "../../services/consultant.service";
import {
  Button,
  FormControl,
  MenuItem,
  Select,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import timetableService from "../../services/timetable.service";
import { UploadComponent } from "../component/upload/Upload";
import { ochreTheme } from "../themes/Theme";

const TrainerFinishTicketView = ({
  callBackRenderedIndex,
  ticketIdForDetail,
}) => {
  const [onlineEvidence, setOnlineEvidence] = useState(null);
  const [evidence, setEvidence] = useState(null);
  const [submittedEvidence, setSubmittedEvidence] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setEvidence(files[0]);

    const evidenceName = files.map((file) => file.name);
    setSubmittedEvidence(evidenceName);
  };

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
    console.log("Evidence: " + evidence);
    consultantService
      .finishAppointment({
        id: id,
        actualEndSlot: actualEndSlot,
        evidence: evidence,
      })
      .then((res) => {
        console.log("Success Finish Ticket test", res.data);
      })
      .catch((e) => console.log("Fail Finish Ticket test", e));
  };

  const FinishOnlineTicket = (id, actualEndSlot, evidence) => {
    console.log("id", id);
    console.log("actualEndSlot", actualEndSlot);
    console.log("evidence", evidence);
    consultantService
      .finishOnlineAppointment({
        id: id,
        actualEndSlot: actualEndSlot,
        evidence: evidence,
      })
      .then((res) => {
        console.log(("Success Finish Ticket test", res.data));
      })
      .catch((e) => console.log("Fail Finish Ticket test", e));
  };

  const handleBackClick = (renderedIndex) => {
    callBackRenderedIndex(renderedIndex);
  };

  const handleFinishClick = (renderedIndex, id, actualEndSlot, evidence) => {
    FinishTicket(id, actualEndSlot, evidence);
    callBackRenderedIndex(renderedIndex);
  };

  const handleFinishOnlineClick = (
    renderedIndex,
    id,
    actualEndSlot,
    evidence
  ) => {
    FinishOnlineTicket(id, actualEndSlot, evidence);
    callBackRenderedIndex(renderedIndex);
  };

  return (
    <ThemeProvider theme={ochreTheme}>
      <Stack
        direction="column"
        justifyContent="space-around"
        alignItems="flex-start"
        spacing={1}
      >
        <Button onClick={() => handleBackClick(0)}>
          Back To Detail Ticket
        </Button>
        <h2>Finish Appointment</h2>
        <Typography>ID: {ticketDetail.id}</Typography>
        <FormControl>
          End SLot:
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
        </FormControl>
        <Typography>
          {ticketDetail.onlineOrOffline === true ? (
            <FormControl>
              Evidence:
              <input
                type="text"
                onChange={(e) => setOnlineEvidence(e.target.value)}
              />
            </FormControl>
          ) : ticketDetail.onlineOrOffline === false ? (
            <FormControl required style={{ marginBottom: 15 }}>
              <Button variant="contained" color="ochre">
                <UploadComponent
                  onChange={handleFileChange}
                  accept="image/*"
                  multiple={false}
                >
                  Upload evidence
                </UploadComponent>
              </Button>
              {/* Display submitted files here */}
              <div>
                {submittedEvidence.map((imageName, index) => (
                  <div key={index}>{imageName}</div>
                ))}
              </div>
            </FormControl>
          ) : null}
        </Typography>
        {ticketDetail.onlineOrOffline === true ? (
          <Button
            onClick={() =>
              handleFinishOnlineClick(
                1,
                ticketDetail.id,
                selectedSLotTime,
                onlineEvidence
              )
            }
          >
            Finish
          </Button>
        ) : ticketDetail.onlineOrOffline === false ? (
          <Button
            onClick={() =>
              handleFinishClick(1, ticketDetail.id, selectedSLotTime, evidence)
            }
          >
            Finish
          </Button>
        ) : null}
      </Stack>
    </ThemeProvider>
  );
};

export default TrainerFinishTicketView;

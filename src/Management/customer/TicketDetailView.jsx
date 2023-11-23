import {
  Button,
  ThemeProvider,
  Typography,
  Stack,
  Select,
  FormControl,
  MenuItem,
} from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import ConsultantService from "../../services/consultant.service";
import addonService from "../../services/addon.service";
import { ochreTheme } from "../themes/Theme";

const TicketDetailView = ({
  callBackRenderedIndex,
  callBackHaveAssignedTrainer,
  ticketIdForDetail,
}) => {
  const [assignedTrainer, setAssignedTrainer] = useState(null);
  const [ticketDetail, setTicketDetail] = useState({});
  useEffect(() => {
    ConsultantService.getConsultingTicketDetail({ ticketId: ticketIdForDetail })
      .then((res) => {
        console.log("success Consulting Ticket Detail test", res.data);
        setTicketDetail(res.data);
      })
      .catch((e) => console.log("fail Consulting Ticket Detail test", e));
  }, []);

  const [listOfFreeTrainer, setListOfFreeTrainer] = useState([]);
  const GetListFreeTrainers = (date, slot) => {
    ConsultantService.getFreeTrainerOnSlotDate({
      dateValue: date,
      slotId: slot,
    })
      .then((res) => {
        console.log("success Free Trainer list test", res.data);
        setListOfFreeTrainer(res.data);
      })
      .catch((e) => console.log("fail Free Trainer list test", e));
  };

  const [haveAssignedTrainer, setHaveAssignedTrainer] = useState(
    callBackHaveAssignedTrainer
  ); //1: Assigned, 2: NotAssigned, 3: Handled

  const handleBackClick = (renderedIndex) => {
    callBackRenderedIndex(renderedIndex);
  };

  const AssignTrainer = (trainer, ticketId) => {
    ConsultantService.assignTrainer({ trainerId: trainer, ticketId: ticketId })
      .then((res) => {
        console.log("success Assign Trainer test", res.data);
      })
      .catch((e) => console.log("fail Assign Trainer test", e));
  };

  const CancelTicket = (ticketId) => {
    ConsultantService.cancelConsultingTicket({ ticketId })
      .then((res) => {
        console.log("succes Cancel Ticket test", res.data);
      })
      .catch((e) => console.log("fail Cancel Ticket tes", e));
  };

  const ConfirmTicket = (ticketId) => {
    ConsultantService.approveConsultingTicket({ ticketId })
      .then((res) => {
        console.log("succes Confirm Ticket test", res.data);
      })
      .catch((e) => console.log("fail Confirm Ticket tes", e));
  };

  return (
    <>
      {GetListFreeTrainers(
        ticketDetail.appointmentDate,
        ticketDetail.slotStartId
      )}
      <ThemeProvider theme={ochreTheme}>
        <Button
          variant="contained"
          color="ochre"
          onClick={() => handleBackClick(1)}
        >
          Back To List Assigned
        </Button>
        <h2>Ticket Detail</h2>
        <Stack
          direction="column"
          justifyContent="space-around"
          alignItems="flex-start"
          spacing={2}
        >
          <Typography>ID: {ticketDetail.id}</Typography>
          <Typography>Customer: {ticketDetail.customerName}</Typography>
          <Typography>Address: {ticketDetail.addressDetail}</Typography>
          <Typography>Type: {ticketDetail.consultingType} </Typography>
          {haveAssignedTrainer === 1 ? (
            <Typography>Trainer: {ticketDetail.trainerName}</Typography>
          ) : haveAssignedTrainer === 2 && listOfFreeTrainer ? (
            <FormControl>
              Trainer:
              <Select
                onChange={(e) => setAssignedTrainer(e.target.value)}
                value={assignedTrainer}
              >
                {listOfFreeTrainer.map((trainer) => (
                  <MenuItem value={trainer.id}>{trainer.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : haveAssignedTrainer === 3 ? (
            <Typography>Trainer: {ticketDetail.trainerName}</Typography>
          ) : (
            <></>
          )}
          <Typography>Detail: {ticketDetail.consultingDetail}</Typography>
          <Typography>Distance: {ticketDetail.distance}</Typography>
          <Typography>
            Online/Offline: {ticketDetail.onlineOrOffline ? "Online" : "Offine"}
          </Typography>
          <Typography>
            Date: {addonService.formatDate(ticketDetail.appointmentDate)}
          </Typography>
          <Typography>Slot: {ticketDetail.actualSlotStart}</Typography>
          <Typography>Price: {ticketDetail.price}</Typography>
          <Typography>Status: {ticketDetail.status}</Typography>

          {haveAssignedTrainer === 1 ? (
            <>
              <Button
                variant="contained"
                color="ochre"
                onClick={() => {
                  ConfirmTicket(ticketIdForDetail);
                  callBackRenderedIndex(1);
                }}
              >
                Confirm
              </Button>
              <Button
                variant="contained"
                color="ochre"
                onClick={() => {
                  CancelTicket(ticketIdForDetail);
                  callBackRenderedIndex(1);
                }}
              >
                Cancel
              </Button>
            </>
          ) : haveAssignedTrainer === 2 ? (
            <>
              <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={2}
              >
                <Button
                  variant="contained"
                  color="ochre"
                  onClick={() => {
                    AssignTrainer(assignedTrainer, ticketIdForDetail);
                    callBackRenderedIndex(1);
                  }}
                >
                  Assign
                </Button>
                <Button
                  variant="contained"
                  color="ochre"
                  onClick={() => {
                    CancelTicket(ticketIdForDetail);
                    callBackRenderedIndex(1);
                  }}
                >
                  Cancel
                </Button>
              </Stack>
            </>
          ) : haveAssignedTrainer === 3 ? (
            <></>
          ) : (
            <></>
          )}
        </Stack>
      </ThemeProvider>
    </>
  );
};

export default TicketDetailView;

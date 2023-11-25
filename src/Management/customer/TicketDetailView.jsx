import {
  Button,
  ThemeProvider,
  Typography,
  Stack,
  Select,
  FormControl,
  MenuItem,
  Grid,
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
  const [dateValue, setDateValue] = useState();
  const [slotValue, setSlotValue] = useState();
  
  const [assignedTrainer, setAssignedTrainer] = useState(null);
  const [ticketDetail, setTicketDetail] = useState({});
  useEffect(() => {
    ConsultantService.getConsultingTicketDetail({ ticketId: ticketIdForDetail })
      .then((res) => {
        console.log("success Consulting Ticket Detail test", res.data);
        setTicketDetail(res.data);
        setDateValue(res.data.appointmentDate);
        setSlotValue(res.data.slotStartId);
      })
      .catch((e) => console.log("fail Consulting Ticket Detail test", e));
  }, []);

  const [listOfFreeTrainer, setListOfFreeTrainer] = useState([]);
    useEffect (() => {
      ConsultantService.getFreeTrainerOnSlotDate({
        dateValue: dateValue,
        slotId: slotValue,
      })
        .then((res) => {
          console.log("success Free Trainer list test", res.data);
          setListOfFreeTrainer(res.data);
        })
        .catch((e) => console.log("fail Free Trainer list test", e));
    }, [slotValue]);

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
      <Button
        variant="contained"
        color="ochre"
        onClick={() => handleBackClick(1)}
      >
        Back To List Assigned
      </Button>

      <h1
        style={{
          color: "#65451F",
          textAlign: "left",
          marginBottom: "30px",
          borderBottom: "0.5px grey solid",
        }}
      >
        Ticket Detail
      </h1>
      <div className="csmanagement-ticketdetail-container">
        <div className="csmanagement-ticketdetail-wrapper">
          <Typography>ID </Typography>
          <Typography>{ticketDetail.id} </Typography>
          <Typography>Customer </Typography>
          <Typography> {ticketDetail.customerName}</Typography>

          <Typography>Slot </Typography>
          <Typography> {ticketDetail.actualSlotStart}</Typography>
          <Typography>Date </Typography>
          <Typography>
            {" "}
            {addonService.formatDate(ticketDetail.appointmentDate)}
          </Typography>
          <Typography>Address </Typography>
          <Typography>{ticketDetail.addressDetail}</Typography>
          <Typography>Type </Typography>
          <Typography> {ticketDetail.consultingType} </Typography>
          <Typography>Price </Typography>
          <Typography>{ticketDetail.price}VND</Typography>
        </div>
        <div className="csmanagement-ticketdetail-wrapper csmanagement-ticketdetail-wrapper-detail">
          <Typography>More Detail</Typography>
          <p>{ticketDetail.consultingDetail}</p>
        </div>
        <div className="csmanagement-ticketdetail-wrapper">
          {haveAssignedTrainer === 1 ? (
            <>
              <Typography>Trainer</Typography>
              <Typography>{ticketDetail.trainerName}</Typography>
            </>
          ) : haveAssignedTrainer === 2 && listOfFreeTrainer ? (
            <>
              <Typography>Trainer</Typography>
              <FormControl>
                <Select
                  onChange={(e) => setAssignedTrainer(e.target.value)}
                  value={assignedTrainer}
                >
                  {listOfFreeTrainer.map((trainer) => (
                    <MenuItem value={trainer.id}>{trainer.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          ) : haveAssignedTrainer === 3 ? (
            <>
              <Typography>Trainer</Typography>
              <Typography>{ticketDetail.trainerName}</Typography>
            </>
          ) : (
            <></>
          )}
          <Typography>Distance</Typography>
          <Typography>{ticketDetail.distance}</Typography>
          <Typography>Service</Typography>
          <Typography>
            {ticketDetail.onlineOrOffline ? "Online" : "Offine"}
          </Typography>
          <Typography style={{ color: "red" }}>Status</Typography>
          {ticketDetail.status === "Approved" ? (
            <Typography style={{ color: "green" }}>
              {ticketDetail.status}
            </Typography>
          ) : (
            <Typography style={{ color: "red" }}>
              {ticketDetail.status}
            </Typography>
          )}
        </div>
      </div>

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
    </>
  );
};

export default TicketDetailView;

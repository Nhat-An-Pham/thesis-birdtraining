import {
  Button,
  Typography,
  Stack,
  Select,
  FormControl,
  MenuItem,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableCell,
  TableBody,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import ConsultantService from "../../services/consultant.service";
import addonService from "../../services/addon.service";
import { Close } from "@mui/icons-material";

const TicketDetailView = ({
  callBackRenderedIndex,
  callBackHaveAssignedTrainer,
  ticketIdForDetail,
  callBackToList,
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
  useEffect(() => {
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
      <AppBar position="static" color="ochre">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
            onClick={callBackToList}
          >
            <Close />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Ticket Detail
          </Typography>
        </Toolbar>
      </AppBar>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableCell>
              <Typography>ID </Typography>
            </TableCell>
            <TableCell>
              <Typography>Customer </Typography>
            </TableCell>
            <TableCell>
              <Typography>Email</Typography>
            </TableCell>
            <TableCell>
              <Typography>Date </Typography>
            </TableCell>
            <TableCell>
              <Typography>Slot </Typography>
            </TableCell>
            <TableCell>
              <Typography>Address </Typography>
            </TableCell>
            <TableCell>
              <Typography>Distance</Typography>
            </TableCell>
          </TableHead>
          <TableBody>
            <TableCell>
              <Typography>{ticketDetail.id} </Typography>
            </TableCell>
            <TableCell>
              <Typography> {ticketDetail.customerName}</Typography>
            </TableCell>
            <TableCell>
              <Typography>{ticketDetail.customerEmail}</Typography>
            </TableCell>
            <TableCell>
              <Typography>
                {addonService.formatDate(ticketDetail.appointmentDate)}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography> {ticketDetail.actualSlotStart}</Typography>
            </TableCell>
            <TableCell>
              <Typography>{ticketDetail.addressDetail}</Typography>
            </TableCell>
            <TableCell>
              <Typography>{ticketDetail.distance}</Typography>
            </TableCell>
          </TableBody>
        </Table>
      </TableContainer>

      <h1></h1>
      <h1></h1>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableCell>
              <Typography>Trainer</Typography>
            </TableCell>
            <TableCell>
              <Typography>More Detail</Typography>
            </TableCell>
            <TableCell>
              <Typography>Type </Typography>
            </TableCell>
            <TableCell>
              <Typography>Online/Offline</Typography>
            </TableCell>
            <TableCell>
              <Typography>Price </Typography>
            </TableCell>
            <TableCell>Status</TableCell>
          </TableHead>
          <TableBody>
            <TableCell>
              {haveAssignedTrainer === 1 || haveAssignedTrainer === 3 ? (
                <Typography>{ticketDetail.trainerName}</Typography>
              ) : haveAssignedTrainer === 2 && listOfFreeTrainer ? (
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
              ) : (
                <></>
              )}
            </TableCell>
            <TableCell>{ticketDetail.consultingDetail}</TableCell>
            <TableCell>
              <Typography> {ticketDetail.consultingType} </Typography>
            </TableCell>
            <TableCell>
              <Typography>
                {ticketDetail.onlineOrOffline ? "Online" : "Offine"}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography>{ticketDetail.price}VND</Typography>
            </TableCell>
            <TableCell>
              {ticketDetail.status === "Approved" ? (
                <Typography style={{ color: "green" }}>
                  {ticketDetail.status}
                </Typography>
              ) : (
                <Typography style={{ color: "red" }}>
                  {ticketDetail.status}
                </Typography>
              )}
            </TableCell>
          </TableBody>
        </Table>
      </TableContainer>

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

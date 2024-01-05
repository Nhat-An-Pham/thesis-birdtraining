import {
  Button,
  Typography,
  Select,
  FormControl,
  MenuItem,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
  Grid,
  Divider,
  TextField,
} from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import ConsultantService from "../../services/consultant.service";
import addonService from "../../services/addon.service";
import { Close } from "@mui/icons-material";
import { toast } from "react-toastify";
import TicketBillView from "./TicketBillView";

const TicketDetailView = ({ ticketIdForDetail, isAssigned, onClose }) => {
  const [openDiv, setOpenDiv] = useState(false);
  const [dateValue, setDateValue] = useState();
  const [slotValue, setSlotValue] = useState();
  const [distanceValue, setDistanceValue] = useState(null);
  const hanldeDistanceChange = (ticketId, distance) => {
    setDistanceValue(distance);
    PreCalculatePrice(ticketId, distance);
  };

  const [newPrice, setNewPrice] = useState(null);
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

  const AssignTrainer = (trainer, ticketId) => {
    ConsultantService.assignTrainer({ trainerId: trainer, ticketId: ticketId })
      .then((res) => {
        console.log("success Assign Trainer test", res.data);
        toast.success("Success Approve Ticket");
        onClose();
      })
      .catch((e) => {
        if (assignedTrainer === null) {
          toast.error("Please choose a Trainer!");
        } else {
          toast.error("Fail Assign Trainer!");
        }
      });
  };

  const CancelTicket = (ticketId) => {
    ConsultantService.cancelConsultingTicket({ ticketId })
      .then((res) => {
        console.log("succes Cancel Ticket test", res.data);
        toast.success("Success Cancel Ticket");
        onClose();
      })
      .catch((e) => console.log("Fail Cancel Ticket tes"));
  };

  const ConfirmTicket = (ticketId, distance) => {
    ConsultantService.approveConsultingTicket({ ticketId, distance })
      .then((res) => {
        console.log("succes Confirm Ticket test", res.data);
        toast.success("Success Approve Ticket");
        onClose();
      })
      .catch((e) => {
        if (distance === null) {
          toast.error("Please fill the distance");
        } else {
          toast.error("Fail Approve Ticket");
        }
      });
  };

  const PreCalculatePrice = (ticketId, distance) => {
    ConsultantService.PreCalculateConsultantPrice({ ticketId, distance })
      .then((res) => {
        console.log("success Calculate Price test", res.data);
        setNewPrice(res.data);
      })
      .catch((e) => console.log("fail Calcuate Price test", e));
  };

  const handleViewBillOnClick = () => {
    setOpenDiv(true);
  };

  const handleCloseDiv = () => {
    setOpenDiv(false);
  };

  const handleFinishBill = () => {
    onClose();
  };

  return (
    <>
      <TicketBillView
        ticketDetail={ticketDetail}
        openDiv={openDiv}
        handleCloseDiv={handleCloseDiv}
        callBackFinishBill={handleFinishBill}
      ></TicketBillView>
      <AppBar position="static" color="ochre">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
            onClick={onClose}
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
      <Divider />
      <Grid container marginTop={3} component={Paper}>
        <Grid container item xs={12} padding={2} spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5"> Basic Information</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography fontWeight={"bold"}>Ticket ID:</Typography>
          </Grid>
          <Grid item xs={3}>
            {ticketDetail.id}
          </Grid>
          <Grid item xs={3}>
            <Typography fontWeight={"bold"}>Service:</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>
              {ticketDetail.onlineOrOffline ? "Online" : "Offine"}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography fontWeight={"bold"}>Date:</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>
              {addonService.formatDate(ticketDetail.appointmentDate)}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography fontWeight={"bold"}>Time:</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography> {ticketDetail.actualSlotStart}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5"> Detail Information</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography style={{ fontWeight: "bold", color: "blue" }}>
              Customer:
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography style={{ color: "blue" }}>
              {ticketDetail.customerName}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography style={{ fontWeight: "bold", color: "blue" }}>
              Phone:
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography style={{ color: "blue" }}>
              {ticketDetail.customerPhone}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography style={{ fontWeight: "bold", color: "blue" }}>
              Email:
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography style={{ color: "blue" }}>
              {ticketDetail.customerEmail}
            </Typography>
          </Grid>
          {ticketDetail.onlineOrOffline ? (
            <></>
          ) : (
            <>
              <Grid item xs={3}>
                <Typography fontWeight={"bold"}>Address:</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography>{ticketDetail.addressDetail}</Typography>
              </Grid>
              {ticketDetail.status === "WaitingForApprove" ? (
                <>
                  <Grid item xs={3}>
                    <Typography fontWeight={"bold"}>Distance:</Typography>
                  </Grid>
                  <Grid>
                    <FormControl>
                      <TextField
                        label={"Km"}
                        type="number"
                        inputProps={{
                          min: 0,
                        }}
                        onChange={(e) =>
                          hanldeDistanceChange(ticketDetail.id, e.target.value)
                        }
                      />
                    </FormControl>
                  </Grid>
                </>
              ) : (
                <>
                  <Grid item xs={3}>
                    <Typography fontWeight={"bold"}>Distance:</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>{ticketDetail.distance}Km</Typography>
                  </Grid>
                </>
              )}
            </>
          )}
          <Grid item xs={3}>
            <Typography fontWeight={"bold"}>More Detail</Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography>{ticketDetail.consultingDetail}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography fontWeight={"bold"}>Trainer:</Typography>
          </Grid>
          <Grid item xs={3}>
            {isAssigned === 1 || isAssigned === 3 ? (
              <Typography>{ticketDetail.trainerName}</Typography>
            ) : isAssigned === 2 && listOfFreeTrainer ? (
              <FormControl>
                <Typography>
                  <Select
                    onChange={(e) => setAssignedTrainer(e.target.value)}
                    value={assignedTrainer}
                  >
                    {listOfFreeTrainer.map((trainer) => (
                      <MenuItem value={trainer.id}>{trainer.name}</MenuItem>
                    ))}
                  </Select>
                </Typography>
              </FormControl>
            ) : (
              <></>
            )}
          </Grid>
          <Grid item xs={3}>
            <Typography fontWeight={"bold"}>Type:</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>{ticketDetail.consultingType}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography fontWeight={"bold"}>Price:</Typography>
          </Grid>
          <Grid item xs={3}>
            {newPrice !== null ? (
              <>
                <Typography>{newPrice}VND</Typography>
              </>
            ) : (
              <>
                <Typography>{ticketDetail.price}VND</Typography>
              </>
            )}
          </Grid>
          <Grid item xs={3}>
            <Typography fontWeight={"bold"}>Status:</Typography>
          </Grid>
          <Grid item xs={3}>
            {ticketDetail.status === "Approved" ? (
              <Typography style={{ color: "green" }}>
                {ticketDetail.status}
              </Typography>
            ) : ticketDetail.status === "Cancelled" ? (
              <Typography style={{ color: "red" }}>
                {ticketDetail.status}
              </Typography>
            ) : (
              <Typography style={{ color: "green" }}>
                {ticketDetail.status}
              </Typography>
            )}
          </Grid>
          {isAssigned === 1 ? (
            <>
              <Grid container item spacing={15}>
                <Grid item xs={8}></Grid>
                <Grid item xs={1}>
                  {ticketDetail.onlineOrOffline === true ? (
                    <Button
                      variant="contained"
                      color="ochre"
                      onClick={() => {
                        ConfirmTicket(ticketIdForDetail, 0);
                      }}
                    >
                      Confirm
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="ochre"
                      onClick={() => {
                        ConfirmTicket(ticketIdForDetail, distanceValue);
                      }}
                    >
                      Confirm
                    </Button>
                  )}
                </Grid>
                <Grid item xs={1}>
                  <Button
                    variant="contained"
                    color="ochre"
                    onClick={() => {
                      CancelTicket(ticketIdForDetail);
                    }}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </>
          ) : isAssigned === 2 ? (
            <>
              <Grid container item spacing={15}>
                <Grid item xs={8}></Grid>
                <Grid item xs={1}>
                  <Button
                    variant="contained"
                    color="ochre"
                    onClick={() => {
                      AssignTrainer(assignedTrainer, ticketIdForDetail);
                    }}
                  >
                    Assign
                  </Button>
                </Grid>
                <Grid item xs={1}>
                  <Button
                    variant="contained"
                    color="ochre"
                    onClick={() => {
                      CancelTicket(ticketIdForDetail);
                    }}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </>
          ) : (
            <></>
          )}

          {ticketDetail.status === "WaitingForApprove" ||
          ticketDetail.status === "Cancelled" ? (
            <></>
          ) : (
            <Grid container item spacing={15}>
               <Grid item xs={9}></Grid>
              <Grid item xs={1}>
                <Button
                  variant="contained"
                  color="ochre"
                  width="100px"
                  onClick={() => handleViewBillOnClick()}
                >
                  View Bill
                </Button>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default TicketDetailView;

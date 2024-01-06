import consultantService from "../../services/consultant.service";
import { Link } from "react-router-dom";
import {
  AppBar,
  IconButton,
  Paper,
  Toolbar,
  Typography,
  Button,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Divider,
  Grid,
  Alert,
} from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import addonService from "../../services/addon.service";
import { Close } from "@mui/icons-material";
import timetableService from "../../services/timetable.service";
import { UploadComponent } from "../component/upload/Upload";
import { toast } from "react-toastify";
import TicketBillView from "./TicketBillView";

const TrainerTicketDetailView = ({ ticketIdForDetail, onClose }) => {
  const [openDiv, setOpenDiv] = useState(false);
  const [onlineEvidence, setOnlineEvidence] = useState(null);
  const [evidence, setEvidence] = useState(null);
  const [submittedEvidence, setSubmittedEvidence] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setEvidence(files);

    const evidenceName = files.map((file) => file.name);
    setSubmittedEvidence(evidenceName);
  };

  const getTicketDetail = () => {
    consultantService
      .getConsultingTicketDetail({ ticketId: ticketIdForDetail })
      .then((res) => {
        // console.log("success Consulting Ticket Detail test", res.data);
        setTicketDetail(res.data);
        console.log("check res: ", res.data);
        GetSlotTime(res.data.actualSlotStart);
      })
      .catch((e) => console.log("fail Consulting Ticket Detail test", e));
  };
  //Lấy ticket detail
  const [ticketDetail, setTicketDetail] = useState({});
  useEffect(() => {
    getTicketDetail();
  }, []);

  const [selectedSLotTime, setSelectedSlotTime] = useState(-1);
  const [slotTime, setSlotTime] = useState([]);
  const GetSlotTime = (actualSlotStart) => {
    consultantService
      .GetAvailableFinishTime({ actualSlotStart })
      .then((res) => {
        console.log("Success Get Available Time SLot test", res.data);
        setSlotTime(res.data);
      })
      .catch((e) => console.log("Fail Get Available Time Slot test", e));
  };

  const UpdateEvidence = (id, actualSlotStart, actualEndSlot, evidence) => {
    const formData = new FormData();
    formData.append("Id", id);
    formData.append("ActualSlotStart", ticketDetail.actualSlotStart);
    formData.append("ActualEndSlot", actualEndSlot);
    evidence.forEach((file, index) => {
      formData.append("Evidence", file);
    });
    consultantService
      .UpdateEvidence(formData)
      .then((res) => {
        console.log("Success Update Evidence");
        toast.success("Update Evidence Successfully");
        getTicketDetail();
      })
      .catch((e) => {
        toast.error("Fail Update Evidence");
      });
  };

  const UpdateRecord = (id, actualSlotStart, actualEndSlot, evidence) => {
    consultantService
      .UpdateRecord({
        id: id,
        actualSlotStart: actualSlotStart,
        actualEndSlot: actualEndSlot,
        evidence: evidence,
      })
      .then((res) => {
        console.log("Success Update Evidence");
        toast.success("Update Evidence Successfully");
        getTicketDetail();
      })
      .catch((e) => toast.error("Fail Update Evidence"));
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
              Email:
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography style={{ color: "blue" }}>
              {ticketDetail.customerEmail}
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
              Address:
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography style={{ color: "blue" }}>
              {ticketDetail.addressDetail}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography fontWeight={"bold"}>Type:</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>{ticketDetail.consultingType}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography fontWeight={"bold"}>More Detail</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>{ticketDetail.consultingDetail}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography fontWeight={"bold"}>Distance:</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>{ticketDetail.distance}Km</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography fontWeight={"bold"}>Status:</Typography>
          </Grid>
          <Grid item xs={3}>
            {ticketDetail.status === "Approved" ? (
              <Typography style={{ color: "green" }}>
                {ticketDetail.status}
              </Typography>
            ) : (
              <Typography style={{ color: "red" }}>
                {ticketDetail.status}
              </Typography>
            )}
          </Grid>
          <Grid item xs={3}>
            <Typography fontWeight={"bold"}>Price:</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>{ticketDetail.price}VND</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">Finish Appointment</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography fontWeight={"bold"}>End Time:</Typography>
          </Grid>
          <Grid item xs={9}>
            {ticketDetail.status === "Finished" ? (
              <Typography>{ticketDetail.actualEndSlot}</Typography>
            ) : (
              <>
                <FormControl>
                  <Select
                    onChange={(e) => setSelectedSlotTime(e.target.value)}
                    value={selectedSLotTime}
                  >
                    {slotTime.map((slot) => (
                      <MenuItem value={slot.id}>
                        {slot.startTime.slice(0, -3)}-
                        {slot.endTime.slice(0, -3)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {ticketDetail.actualEndSlot ? (
                  <Grid item xs={9}>
                    <Typography>Old: {ticketDetail.actualEndSlot}</Typography>
                  </Grid>
                ) : (
                  <></>
                )}
              </>
            )}
          </Grid>
          <Grid item xs={3}>
            <Typography fontWeight={"bold"}>Evidence:</Typography>
          </Grid>
          <Grid
            container
            item
            xs={12}
            justifyContent={"center"}
            alignItems={"center"}
          >
            {ticketDetail.status === "Finished" &&
            ticketDetail.onlineOrOffline === false &&
            ticketDetail.evidence &&
            ticketDetail.evidence.includes(",") ? (
              <>
                <Typography>
                  {ticketDetail.evidence.split(",").map((evidence) => (
                    <Link
                      style={{
                        marginLeft: "20px",
                        padding: "10px",
                        color: "white",
                        textDecoration: "none",
                        backgroundColor: "#C8AE7D",
                      }}
                      to={evidence}
                      target="_blank"
                    >
                      {evidence}
                    </Link>
                  ))}
                </Typography>
              </>
            ) : ticketDetail.status === "Finished" &&
              ticketDetail.onlineOrOffline === false ? (
              <>
                <Typography>
                  <Link
                    style={{
                      marginLeft: "20px",
                      padding: "10px",
                      color: "white",
                      textDecoration: "none",
                      backgroundColor: "#C8AE7D",
                    }}
                    to={ticketDetail.evidence}
                    target="_blank"
                  >
                    {ticketDetail.evidence}
                  </Link>
                </Typography>
              </>
            ) : ticketDetail.status === "Finished" &&
              ticketDetail.onlineOrOffline === true ? (
              <>
                <Typography>
                  <Link
                    style={{
                      marginLeft: "20px",
                      padding: "10px",
                      color: "white",
                      textDecoration: "none",
                      backgroundColor: "#C8AE7D",
                    }}
                    to={ticketDetail.evidence}
                    target="_blank"
                  >
                    {ticketDetail.evidence}
                  </Link>
                </Typography>
              </>
            ) : (
              <>
                {ticketDetail.onlineOrOffline === true ? (
                  <>
                    <FormControl>
                      <TextField
                        label={"Record Link"}
                        type="text"
                        defaultValue={ticketDetail.evidence}
                        onChange={(e) => setOnlineEvidence(e.target.value.trim())}
                      />
                    </FormControl>
                  </>
                ) : ticketDetail.onlineOrOffline === false ? (
                  <FormControl required style={{ marginBottom: 15 }}>
                    <UploadComponent
                      onChange={handleFileChange}
                      accept="image/*"
                      multiple={true}
                    >
                      Upload evidence
                    </UploadComponent>
                    {ticketDetail.evidence ? (
                      <Typography>{ticketDetail.evidence}</Typography>
                    ) : (
                      <></>
                    )}
                    {/* Display submitted files here */}
                  </FormControl>
                ) : null}
              </>
            )}
          </Grid>
          <Grid item xs={1}>
            {ticketDetail.status === "Finished" ? (
              <></>
            ) : (ticketDetail.onlineOrOffline === true &&
                (selectedSLotTime === -1 ||
                  onlineEvidence === null ||
                  onlineEvidence === "")) ||
              (ticketDetail.onlineOrOffline === false &&
                (evidence === null || /^\s*$/.test(evidence)) || evidence === "" ) ? (
              <>
                <Button variant="contained" color="ochre" disabled={true}>
                  Save
                </Button>
              </>
            ) : (
              <>
                {ticketDetail.onlineOrOffline === true &&
                selectedSLotTime &&
                onlineEvidence ? (
                  <Button
                    variant="contained"
                    color="ochre"
                    onClick={() =>
                      UpdateRecord(
                        ticketDetail.id,
                        ticketDetail.actualSlotStart,
                        selectedSLotTime,
                        onlineEvidence
                      )
                    }
                  >
                    Save
                  </Button>
                ) : ticketDetail.onlineOrOffline === false &&
                  selectedSLotTime &&
                  evidence ? (
                  <Button
                    variant="contained"
                    color="ochre"
                    onClick={() =>
                      UpdateEvidence(
                        ticketDetail.id,
                        ticketDetail.actualSlotStart,
                        selectedSLotTime,
                        evidence
                      )
                    }
                  >
                    Save
                  </Button>
                ) : null}
              </>
            )}
          </Grid>
          <Grid item xs={4}>
            {ticketDetail.status === "Finished" ? (
              <></>
            ) : (
              <Alert severity="info">
                Must fill in the EndTime and Evidence
              </Alert>
            )}
          </Grid>
          <Grid item xs={3}>
            {ticketDetail.status === "Finished" ? (
              <Button
                variant="contained"
                color="ochre"
                onClick={() => handleViewBillOnClick()}
              >
                View Bill
              </Button>
            ) : ticketDetail.evidence && ticketDetail.actualEndSlot ? (
              <Button
                variant="contained"
                color="ochre"
                onClick={() => handleViewBillOnClick()}
              >
                View Bill
              </Button>
            ) : (
              <Button variant="contained" color="ochre" disabled="true">
                View Bill
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default TrainerTicketDetailView;

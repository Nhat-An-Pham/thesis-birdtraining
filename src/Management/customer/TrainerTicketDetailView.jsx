import consultantService from "../../services/consultant.service";
import { Link } from "react-router-dom";
import {
  AppBar,
  IconButton,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
  Button,
  Table,
  FormControl,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import addonService from "../../services/addon.service";
import { Close } from "@mui/icons-material";
import timetableService from "../../services/timetable.service";
import { UploadComponent } from "../component/upload/Upload";

const TrainerTicketDetailView = ({
  callBackRenderedIndex,
  ticketIdForDetail,
  callBackToList,
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

  //Lấy ticket detail
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

      <Typography variant="h5"> Basic Infomation</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography>Ticket ID</Typography>
              </TableCell>
              <TableCell>
                <Typography>Service</Typography>
              </TableCell>
              <TableCell>
                <Typography>Date</Typography>
              </TableCell>
              <TableCell>
                <Typography>Time</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <Typography>{ticketDetail.id}</Typography>
              </TableCell>
              <TableCell>
                <Typography>
                  {ticketDetail.onlineOrOffline ? "Online" : "Offine"}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography>
                  {addonService.formatDate(ticketDetail.appointmentDate)}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography> {ticketDetail.actualSlotStart}</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <h1></h1>
      <h1></h1>

      <Typography variant="h5"> Detail Infomation</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            {ticketDetail && (
              <TableRow>
                <TableCell>
                  <Typography>Customer</Typography>
                </TableCell>
                <TableCell>
                  <Typography>Email</Typography>
                </TableCell>
                <TableCell>
                  <Typography>Address</Typography>
                </TableCell>
                <TableCell>
                  <Typography>Type</Typography>
                </TableCell>
                <TableCell>
                  <Typography>More Detail</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableHead>
          <TableBody>
            <TableCell>
              <Typography>{ticketDetail.customerName}</Typography>
            </TableCell>
            <TableCell>
              <Typography>{ticketDetail.customerEmail}</Typography>
            </TableCell>
            <TableCell>
              <Typography>{ticketDetail.addressDetail}</Typography>
            </TableCell>
            <TableCell>
              <Typography>{ticketDetail.consultingType}</Typography>
            </TableCell>
            <TableCell>
              <Typography>{ticketDetail.consultingDetail}</Typography>
            </TableCell>
          </TableBody>
        </Table>
      </TableContainer>

      <h1></h1>
      <h1></h1>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography>Distance</Typography>
              </TableCell>
              {ticketDetail.status === "Finished" ? (
                <TableCell>
                  <Typography>Evidence</Typography>
                </TableCell>
              ) : null}
              <TableCell>
                <Typography>Price</Typography>
              </TableCell>
              <TableCell>
                <Typography>Status</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <Typography>{ticketDetail.distance}</Typography>
              </TableCell>
              {ticketDetail.status === "Finished" ? (
                <>
                  <TableCell>
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
                          download
                        >
                          {evidence.split("/").slice(-1)}
                        </Link>
                      ))}
                    </Typography>
                  </TableCell>
                </>
              ) : null}
              <TableCell>
                <Typography>{ticketDetail.price}VND</Typography>
              </TableCell>
              <TableCell>
                {ticketDetail.status === "Approved" ? (
                  <Typography style={{ color: "green" }}>
                    {ticketDetail.status}
                  </Typography>
                ) : (
                  <Typography style={{ color: "blue" }}>
                    {ticketDetail.status}
                  </Typography>
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <h1></h1>
      <h1></h1>

      {ticketDetail.status === "Finished" ? (
        <></>
      ) : (
        <>
          <Typography variant="h5"> Finish Appointment</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableCell>
                  <Typography>End Time</Typography>
                </TableCell>
                <TableCell>
                  <Typography>Evidence</Typography>
                </TableCell>
              </TableHead>
              <TableBody>
                <TableCell>
                  <Typography>
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
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    {ticketDetail.onlineOrOffline === true ? (
                      <FormControl>
                        <TextField
                        label={"Record"}
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
                </TableCell>
              </TableBody>
            </Table>
          </TableContainer>

          {ticketDetail.onlineOrOffline === true ? (
            <Button
              variant="contained"
              color="ochre"
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
              variant="contained"
              color="ochre"
              onClick={() =>
                handleFinishClick(
                  1,
                  ticketDetail.id,
                  selectedSLotTime,
                  evidence
                )
              }
            >
              Finish
            </Button>
          ) : null}
        </>
      )}
    </>
  );
};

export default TrainerTicketDetailView;

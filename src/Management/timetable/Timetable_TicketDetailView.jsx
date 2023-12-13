import { useEffect, useState } from "react";
import consultantService from "../../services/consultant.service";
import { ochreTheme } from "../themes/Theme";
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
  ThemeProvider,
  Paper,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import addonService from "../../services/addon.service";
import { jwtDecode } from "jwt-decode";

const Timetable_TicketDetailView = ({
  callbackToCalendar,
  ticketIdForDetail,
}) => {
  const accessToken = JSON.parse(localStorage.getItem("user-token"));
  const userRole = jwtDecode(accessToken).role;

  const [ticketDetail, setTicketDetail] = useState();
  useEffect(() => {
    consultantService
      .getConsultingTicketDetail({ ticketId: ticketIdForDetail })
      .then((res) => {
        console.log("Succes Get List Ticket Detail test", res.data);
        setTicketDetail(res.data);
      })
      .catch((e) => console.log("Fail Get List Ticket Detail test", e));
  }, [ticketIdForDetail]);

  const [GoogleMeetLink, setGoogleMeetLink] = useState();
  const UpdateTicket = (ticketId, link) => {
    consultantService
      .updateGooglemeetLink({ ticketId: ticketId, ggmeetLink: link })
      .then((res) => {
        console.log("Success Update GoolgeMeetLink test", res.data);
      })
      .catch((e) => console.log("Fail Update GoogleMeetLink test", e));
  };

  const handleUpdateLinkClick = (ticketId, link) => {
    UpdateTicket(ticketId, link);
  };

  return (
    <>
      <ThemeProvider theme={ochreTheme}>
        <AppBar position="static" color="ochre">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              sx={{ mr: 2 }}
              onClick={callbackToCalendar}
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
            {ticketDetail && (
              <>
                <Grid item xs={12}>
                  <Typography variant="h5"> Basic Infomation</Typography>
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
                <Grid item xs={9}>
                  <Typography style={{ color: "blue" }}>
                    {ticketDetail.customerPhone}
                  </Typography>
                </Grid>
                {ticketDetail.onlineOrOffline ? (
                  <></>
                ) : (
                  <>
                    <Grid item xs={3}>
                      <Typography style={{ fontWeight: "bold", color: "blue" }}>Address:</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography style={{ color: "blue" }}>{ticketDetail.addressDetail}</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography style={{ fontWeight: "bold", color: "blue" }}>Distance:</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography style={{ color: "blue" }}>{ticketDetail.distance}Km</Typography>
                    </Grid>
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
                  <Typography>{ticketDetail.trainerName}</Typography>
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
                  <Typography>{ticketDetail.price}VND</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography fontWeight={"bold"}>Status:</Typography>
                </Grid>
                <Grid item xs={3}>
                  {ticketDetail.status === "Approved" ? (
                    <Typography style={{ color: "green" }}>
                      {ticketDetail.status}
                    </Typography>
                  ) : ticketDetail.status === "Finished" ? (
                    <Typography style={{ color: "green" }}>
                      {ticketDetail.status}
                    </Typography>
                  ) : (
                    <Typography style={{ color: "red" }}>
                      {ticketDetail.status}
                    </Typography>
                  )}
                </Grid>

                {ticketDetail.onlineOrOffline === true &&
                ticketDetail.status !== "Finished" ? (
                  <>
                    <Grid item xs={3}>
                      <Typography fontWeight={"bold"}>
                        Google Meet Link
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography>{ticketDetail.ggMeetLink}</Typography>
                    </Grid>
                  </>
                ) : ticketDetail.status === "Finished" ? (
                  <>
                    <Grid item xs={3}>
                      <Typography fontWeight={"bold"}>Evidence</Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <Typography>{ticketDetail.evidence}</Typography>
                    </Grid>
                  </>
                ) : (
                  <></>
                )}
              </>
            )}
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
};

export default Timetable_TicketDetailView;

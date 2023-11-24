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
} from "@mui/material";
import { Close } from "@mui/icons-material";

const Timetable_TicketDetailView = ({
  callbackToCalendar,
  ticketIdForDetail,
}) => {
  const [ticketDetail, setTicketDetail] = useState();
  useEffect(() => {
    consultantService
      .getConsultingTicketDetail({ ticketId: ticketIdForDetail })
      .then((res) => {
        console.log("Succes Get List Ticket Detail test", res.data);
        setTicketDetail(res.data);
      })
      .catch((e) => console.log("Fail Get List Ticket Detail test", e));
  }, []);

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
      </ThemeProvider>

      {ticketDetail && (
        <>
          <div className="timetable-consulting-trainer-container">
            <div className="timetable-consulting-trainer-wrapper">
              <Typography>ID </Typography>
              <Typography>{ticketDetail.id}</Typography>
              <Typography>Customer </Typography>
              <Typography>{ticketDetail.customerName}</Typography>
              {ticketDetail.onlineOrOffline === false ? (
                <>
                  <Typography>Address </Typography>
                  <Typography>{ticketDetail.addressDetail}</Typography>
                </>
              ) : null}
              <Typography>Type </Typography>
              <Typography>{ticketDetail.consultingType}</Typography>
            </div>
            <div className="timetable-consulting-trainer-wrapper timetable-consulting-trainer-wrapper-detail">
              <p>More Detail{ticketDetail.consultingDetail}</p>
            </div>
            <div className="timetable-consulting-trainer-wrapper">
              {ticketDetail.onlineOrOffline === false ? (
                <>
                  <Typography>Distance</Typography>
                  <Typography>{ticketDetail.distance}km</Typography>
                </>
              ) : null}
              <Typography>Online/Offline: </Typography>
              <Typography>
                {ticketDetail.onlineOrOffline ? "Online" : "Offline"}
              </Typography>
              {ticketDetail.onlineOrOffline ? (
                <>
                  <Typography>Google Meet Link:</Typography>
                  <Typography>
                    {
                      <input
                        type="text"
                        defaultValue={ticketDetail.ggMeetLink}
                        onChange={(e) => setGoogleMeetLink(e.target.value)}
                      />
                    }
                  </Typography>
                </>
              ) : null}
              <Typography>Appointment Date:</Typography>
              <Typography>{ticketDetail.appointmentDate}</Typography>
              <Typography>Slot Start:</Typography>
              <Typography>{ticketDetail.actualSlotStart}</Typography>
              <Typography>Price:</Typography>
              <Typography>{ticketDetail.price}VND</Typography>
            </div>
          </div>

          <ThemeProvider theme={ochreTheme}>
            {ticketDetail.onlineOrOffline ? (
              <Button
                variant="contained"
                color="ochre"
                onClick={() =>
                  handleUpdateLinkClick(ticketDetail.id, GoogleMeetLink)
                }
              >
                Update New GoolgeMeet Link
              </Button>
            ) : null}
          </ThemeProvider>
        </>
      )}
    </>
  );
};

export default Timetable_TicketDetailView;

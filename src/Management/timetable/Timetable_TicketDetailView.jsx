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
        <div className="ticketdetail-consultant-container">
          {ticketDetail && (
            <>
              <div className="ticketdetail-consultant-customerinfo">
                <h3> CUSTOMER INFORMATION</h3>
                <div className="ticketdetail-consultant-customerinfo-detailbox">
                  <div className="ticketdetail-consultant-customerinfo-detailbox-info">
                    <div className="ticketdetail-consultant-detailbox-small">
                      <p style={{ fontWeight: "bold" }}>Name:</p>
                      <p>{ticketDetail.customerName}</p>
                    </div>
                    <div className="ticketdetail-consultant-detailbox-small">
                      <p style={{ fontWeight: "bold" }}>Email:</p>
                      <p>{ticketDetail.customerEmail}</p>
                    </div>
                    <div className="ticketdetail-consultant-detailbox-small">
                      <p style={{ fontWeight: "bold" }}>Phone Number:</p>
                      <p>
                        (+84) {ticketDetail.customerPhone}
                      </p>
                    </div>
                  </div>
                  <div className="ticketdetail-consultant-customerinfo-detailbox-avatar">
                    <img src={ticketDetail.customerAvatar}></img>
                  </div>
                </div>
              </div>
              <div>
                <div className="ticketdetail-consultant-ticketinfo">
                  <h3> TICKET INFORMATION</h3>
                  <div className="ticketdetail-consultant-customerinfo-detailbox">
                    <div className="ticketdetail-consultant-customerinfo-detailbox-info">
                      <div className="ticketdetail-consultant-detailbox-small">
                        <p style={{ fontWeight: "bold" }}>Trainer:</p>
                        <p id="info">{ticketDetail.trainerName}</p>
                      </div>
                      <div className="ticketdetail-consultant-detailbox-small">
                        <p style={{ fontWeight: "bold" }}>Google Meet Link</p>
                        <p id="info">{ticketDetail.ggMeetLink}</p>
                      </div>
                      <div className="ticketdetail-consultant-detailbox-small">
                        <p style={{ fontWeight: "bold" }}>Appoinment Date:</p>
                        <p id="info">{addonService.formatDate(ticketDetail.appointmentDate)}</p>
                      </div>
                      <div className="ticketdetail-consultant-detailbox-small">
                        <p style={{ fontWeight: "bold" }}>More Detail</p>
                        <p id="info">{ticketDetail.consultingDetail}</p>
                      </div>
                    </div>
                    <div className="ticketdetail-consultant-customerinfo-detailbox-info">
                      <div className="ticketdetail-consultant-detailbox-small">
                        <p style={{ fontWeight: "bold" }}>Consulting Type:</p>
                        <p id="info">{ticketDetail.consultingType}</p>
                      </div>
                      {ticketDetail.onlineOrOffline ? (
                        <></>
                      ) : (
                        <>
                          <div className="ticketdetail-consultant-detailbox-small">
                            <p style={{ fontWeight: "bold" }}>Address:</p>
                            <p id="info">{ticketDetail.addressDetail}</p>
                          </div>
                          <div className="ticketdetail-consultant-detailbox-small">
                            <p style={{ fontWeight: "bold" }}>Distance:</p>
                            <p id="info">{ticketDetail.distance}Km</p>
                          </div>
                        </>
                      )}
                      <div className="ticketdetail-consultant-detailbox-small">
                        <p style={{ fontWeight: "bold" }}>Price:</p>
                        <p id="info">{ticketDetail.price}VND</p>
                      </div>
                      <div className="ticketdetail-consultant-detailbox-small">
                        <p style={{ fontWeight: "bold" }}>Status:</p>
                        {ticketDetail.status === "Approved" ? (
                          <p id="info" style={{ color: "green" }}>
                            {ticketDetail.status}
                          </p>
                        ) : ticketDetail.status === "Finished" ? (
                          <p id="info" style={{ color: "green" }}>
                            {ticketDetail.status}
                          </p>
                        ) : (
                          <p id="info" style={{ color: "red" }}>
                            {ticketDetail.status}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  {ticketDetail.status === "Finished" ? (
                    <div className="ticketdetail-consultant-evidence">
                      <h3>Evidence</h3>
                      <p>{ticketDetail.evidence}</p>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </ThemeProvider>
    </>
  );
};

export default Timetable_TicketDetailView;

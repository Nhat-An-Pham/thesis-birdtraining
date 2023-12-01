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
  TableContainer,
  Paper,
  TableHead,
  TableBody,
  TableCell,
  Table,
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

        <Typography variant="h5"> Basic Infomation</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
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
            </TableHead>
            {ticketDetail && (
              <TableBody>
                <TableCell>{ticketDetail.id}</TableCell>
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
                  <Typography>{ticketDetail.actualSlotStart}</Typography>
                </TableCell>
              </TableBody>
            )}
          </Table>
        </TableContainer>

        <h1></h1>
        <h1></h1>

        <Typography variant="h5"> Detail Infomation</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableCell>
                <Typography>Customer </Typography>
              </TableCell>
              <TableCell>
                <Typography>Email</Typography>
              </TableCell>
              <TableCell>
                <Typography>Address </Typography>
              </TableCell>
              <TableCell>
                <Typography>Type </Typography>
              </TableCell>
              <TableCell>
                <Typography>More Detail</Typography>
              </TableCell>
            </TableHead>
            {ticketDetail && (
              <TableBody>
                <TableCell>
                  <Typography> {ticketDetail.customerName}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{ticketDetail.customerEmail}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{ticketDetail.addressDetail}</Typography>
                </TableCell>
                <TableCell>
                  <Typography> {ticketDetail.consultingType} </Typography>
                </TableCell>
                <TableCell>
                  <Typography>{ticketDetail.consultingDetail}</Typography>
                </TableCell>
              </TableBody>
            )}
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
                <Typography>Distance</Typography>
              </TableCell>
              <TableCell>
                <Typography>Price </Typography>
              </TableCell>
              <TableCell>
                <Typography>Status</Typography>
              </TableCell>
            </TableHead>
            {ticketDetail && (
              <TableBody>
                <TableCell>
                  <Typography>{ticketDetail.trainerName}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{ticketDetail.distance}</Typography>
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
            )}
          </Table>
        </TableContainer>

        <h1></h1>
        <h1></h1>

        {userRole === "trainer" ? (
          <TableContainer component={Paper}>
            <Table>
              {ticketDetail && (
                <TableHead>
                  {ticketDetail.onlineOrOffline === true &&
                  ticketDetail.status !== "Finished" ? (
                    <TableCell>
                      <Typography>Google Meet Link</Typography>
                    </TableCell>
                  ) : ticketDetail.status === "Finished" ? (
                    <TableCell>
                      <Typography>Evidence</Typography>
                    </TableCell>
                  ) : null}
                </TableHead>
              )}
              {ticketDetail && (
                <TableBody>
                  <TableCell>
                    {ticketDetail.onlineOrOffline === true &&
                    ticketDetail.status !== "Finished" ? (
                      <Typography>
                        {
                          <input
                            type="text"
                            defaultValue={ticketDetail.ggMeetLink}
                            onChange={(e) => setGoogleMeetLink(e.target.value)}
                          />
                        }
                      </Typography>
                    ) : ticketDetail.status === "Finished" ? (
                      <Typography>{ticketDetail.evidence}</Typography>
                    ) : null}
                  </TableCell>
                </TableBody>
              )}
            </Table>
          </TableContainer>
        ) : (
          <></>
        )}

        {ticketDetail && (
          <>
            {ticketDetail.onlineOrOffline === true &&
            ticketDetail.status !== "Finished" &&
            userRole === "trainer" ? (
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
          </>
        )}
      </ThemeProvider>
    </>
  );
};

export default Timetable_TicketDetailView;

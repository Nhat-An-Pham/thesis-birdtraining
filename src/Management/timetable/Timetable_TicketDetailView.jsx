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
            {ticketDetail && (
              <TableBody>
                <TableCell>{ticketDetail.id}</TableCell>
                <TableCell>{ticketDetail.customerName}</TableCell>
                <TableCell>
                  {addonService.formatDate(ticketDetail.appointmentDate)}
                </TableCell>
                <TableCell>{ticketDetail.actualSlotStart}</TableCell>
                <TableCell>{ticketDetail.addressDetail}</TableCell>
                <TableCell>{ticketDetail.distance}</TableCell>
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
            {ticketDetail && (
              <TableBody>
                <TableCell>
                  <Typography>{ticketDetail.consultingDetail}</Typography>
                </TableCell>
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
            )}
          </Table>
        </TableContainer>

        <h1></h1>
        <h1></h1>

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

        {ticketDetail && (
          <>
            {ticketDetail.onlineOrOffline === true &&
            ticketDetail.status !== "Finished" ? (
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

import { useEffect, useState } from "react";
import consultantService from "../../services/consultant.service";
import { Stack, ThemeProvider } from "react-bootstrap";
import { ochreTheme } from "../themes/Theme";
import { Button, Typography } from "@mui/material";

const Timetable_TicketDetailView = ({
  callBackRenderedIndex,
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

  const handleBackToTimeTableClick = (renderedIndex) => {
    callBackRenderedIndex(renderedIndex);
  };
  return (
    <ThemeProvider theme={ochreTheme}>
      <Button onClick={() => handleBackToTimeTableClick(0)}>
        Back to Timetable
      </Button>
      <Typography variant="h3">Ticket Detail</Typography>
      <Stack
        direction="row"
        justifyContent="space-around"
        alignItems="flex-start"
        spacing={1}
      >
        {ticketDetail && (
          <>
            <Typography>ID: {ticketDetail.id}</Typography>
            <Typography>Customer Name: {ticketDetail.customerName}</Typography>
            {ticketDetail.onlineOrOffline ? (
              <></>
            ) : (
              <Typography>Address: {ticketDetail.addressDetail}</Typography>
            )}
            <Typography>
              Consulting Type: {ticketDetail.consultingType}
            </Typography>
            <Typography>
              Consulting Detail: {ticketDetail.consultingDetail}
            </Typography>
            {ticketDetail.onlineOrOffline ? (
              <></>
            ) : (
              <Typography>Distance: {ticketDetail.distance}km</Typography>
            )}
            <Typography>
              Online/Offline:{" "}
              {ticketDetail.onlineOrOffline ? "Online" : "Offline"}
            </Typography>
            {ticketDetail.onlineOrOffline ? (
              <Typography>
                Google Meet Link:
                {
                  <input
                    type="text"
                    defaultValue={ticketDetail.ggMeetLink}
                    onChange={(e) => setGoogleMeetLink(e.target.value)}
                  />
                }
              </Typography>
            ) : null}
            <Typography>
              Appointment Date: {ticketDetail.appointmentDate}
            </Typography>
            <Typography>Slot Start: {ticketDetail.actualSlotStart}</Typography>
            <Typography>Price: {ticketDetail.price}VND</Typography>
            {ticketDetail.onlineOrOffline ? (
              <Button
                onClick={() =>
                  handleUpdateLinkClick(ticketDetail.id, GoogleMeetLink)
                }
              >
                Update New GoolgeMeet Link
              </Button>
            ) : null}
          </>
        )}
      </Stack>
    </ThemeProvider>
  );
};

export default Timetable_TicketDetailView;

import { useEffect, useState } from "react";
import consultantService from "../../services/consultant.service";
import { Stack, ThemeProvider } from "react-bootstrap";
import { ochreTheme } from "../themes/Theme";
import { Typography } from "@mui/material";

const Timetable_TicketDetailView = ({ ticketIdForDetail }) => {
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

  return (
    <ThemeProvider theme={ochreTheme}>
      <Button>Back to Timetable</Button>
      <Typography variant="h2">Ticket Detail</Typography>
      <Stack
        direction="row"
        justifyContent="space-around"
        alignItems="flex-start"
        spacing={1}
      >
        <Typography>ID: {ticketDetail.id}</Typography>
        <Typography>Customer Name: {ticketDetail.customerName}</Typography>
        <Typography>Consulting Type: {ticketDetail.consultingType}</Typography>
        <Typography>Consulting Detail: {ticketDetail.consultingDetail}</Typography>
        <Typography>Distance: {ticketDetail.distance}km</Typography>
      </Stack>
    </ThemeProvider>
  );
};

export default Timetable_TicketDetailView;

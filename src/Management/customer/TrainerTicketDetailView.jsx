import { Button, Table } from "react-bootstrap";
import consultantService from "../../services/consultant.service";
import { Link } from "react-router-dom";
import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import addonService from "../../services/addon.service";

const TrainerTicketDetailView = ({
  callBackRenderedIndex,
  ticketIdForDetail,
}) => {
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

  const [ggMeetLink, setGgMeetLink] = useState("");
  const UpdateTicket = (ticketId, link) => {
    consultantService
      .updateGooglemeetLink({ ticketId: ticketId, ggmeetLink: link })
      .then((res) => {
        // console.log("success Update Google Meet Link test", res.data);
      })
      .catch((e) => console.log("fail Update Google Meet Link test", e));
  };

  const handleBackClick = (renderedIndex) => {
    callBackRenderedIndex(renderedIndex);
  };

  return (
    <>
      <Button onClick={() => handleBackClick(1)}>
        Back To List Assigned Ticket
      </Button>
      <h2>Ticket Detail</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            {ticketDetail && (
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Detail</TableCell>
                <TableCell>Distance</TableCell>
                <TableCell>Online/Offline</TableCell>
                {ticketDetail.onlineOrOffline === true &&
                ticketDetail.status !== "Finished" ? (
                  <TableCell>Meet Link</TableCell>
                ) : ticketDetail.status === "Finished" ? (
                  <TableCell>Evidence</TableCell>
                ) : null}
                <TableCell>Date</TableCell>
                <TableCell>Slot</TableCell>
                <TableCell>Price</TableCell>
                <TableCell></TableCell>
              </TableRow>
            )}
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{ticketDetail.id}</TableCell>
              <TableCell>{ticketDetail.customerName}</TableCell>
              <TableCell>{ticketDetail.addressDetail}</TableCell>
              <TableCell>{ticketDetail.consultingType}</TableCell>
              <TableCell>{ticketDetail.consultingDetail}</TableCell>
              <TableCell>{ticketDetail.distance}</TableCell>
              <TableCell>
                {ticketDetail.onlineOrOffline ? "Online" : "Offine"}
              </TableCell>
              {ticketDetail.onlineOrOffline === true &&
              ticketDetail.status !== "Finished" ? (
                <TableCell>
                  {
                    <input
                      type="text"
                      defaultValue={ticketDetail.ggMeetLink}
                      onChange={(e) => setGgMeetLink(e.target.value)}
                    />
                  }
                </TableCell>
              ) : ticketDetail.status === "Finished" ? (
                <>
                  <TableCell>
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
                  </TableCell>
                </>
              ) : null}
              <TableCell>
                {addonService.formatDate(ticketDetail.appointmentDate)}
              </TableCell>
              <TableCell>{ticketDetail.actualSlotStart}</TableCell>
              <TableCell>{ticketDetail.price}VND</TableCell>
              <TableCell>
                {ticketDetail.onlineOrOffline === true &&
                ticketDetail.status !== "Finished" ? (
                  <Button
                    onClick={() => UpdateTicket(ticketDetail.id, ggMeetLink)}
                  >
                    Update
                  </Button>
                ) : null}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {ticketDetail.status !== "Finished" ? (
        <Button onClick={() => handleBackClick(2)}>Finish Appointment</Button>
      ) : null}
    </>
  );
};

export default TrainerTicketDetailView;

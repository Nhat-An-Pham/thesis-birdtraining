import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  ThemeProvider,
} from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Table } from "@mui/material";
import ConsultantService from "../../services/consultant.service";
import addonService from "../../services/addon.service";
import TicketDetailView from "./TicketDetailView";

const AssignedTicketView = ({}) => {
  const [renderIndex, setRenderIndex] = useState(1);
  const [ticketIdForDetail, setTicketIdForDetail] = useState("");
  const [haveAssignedTrainer, setHaveAssignedTrainer] = useState(1); //1: Assigned, 2: Not Assgined, 3: Handled

  const [listAssignedConsultingTicket, setListAssignedConsultingTicket] =
    useState([]);

  useEffect(() => {
    ConsultantService.viewListAssignedConsultingTicket()
      .then((res) => {
        console.log(
          "success Assigned Trainer Consulting Ticket list test",
          res.data
        );
        setListAssignedConsultingTicket(res.data);
      })
      .catch((e) =>
        console.log("fail Assigned Consulting Ticket list test", e)
      );
  }, [renderIndex]);

  const handleDetailClick = (ticketId) => {
    setTicketIdForDetail(ticketId);
    setRenderIndex(0);
  };

  const handleCloseDetail = () => {
    setRenderIndex(1);
  };

  return (
    <ThemeProvider theme={"ochreTheme"}>
      {renderIndex === 0 ? (
        <>
          <TicketDetailView
            ticketIdForDetail={ticketIdForDetail}
            isAssigned={haveAssignedTrainer}
            onClose={handleCloseDetail}
          />
        </>
      ) : renderIndex === 1 ? (
        <>
          <h1
            style={{
              color: "green",
              textAlign: "center",
              paddingBottom: "20px",
              marginBottom: "30px",
              borderBottom: "0.5px grey solid",
            }}
          >
            Tickets that have assigned trainer
          </h1>
            <Grid container spacing={2}>
              <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Ticket ID</TableCell>
                      <TableCell>Service</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Time</TableCell>
                      <TableCell>Detail</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {listAssignedConsultingTicket.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.id}</TableCell>
                        <TableCell>
                          {row.onlineOrOffline ? "Online" : "Offine"}
                        </TableCell>
                        <TableCell>
                          {addonService.formatDate(row.appointmentDate)}
                        </TableCell>
                        <TableCell>{row.actualSlotStart}</TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="ochre"
                            onClick={() => {
                              handleDetailClick(row.id);
                            }}
                          >
                            Detail
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </>
      ) : (
        <></>
      )}
    </ThemeProvider>
  );
};

export default AssignedTicketView;

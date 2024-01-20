import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Table,
  Typography,
  ThemeProvider,
  Container,
} from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import consultantService from "../../services/consultant.service";
import addonService from "../../services/addon.service";
import TrainerTicketDetailView from "./TrainerTicketDetailView";

const TrainerTicketListView = ({}) => {
  const [renderIndex, setRenderIndex] = useState(1);
  const [ticketIdForDetail, setTicketIdForDetail] = useState("");

  const [listAssignedConsultingTicket, setListAssignedConsultingTicket] =
    useState([]);
  useEffect(() => {
    consultantService
      .getListAssignedConsultingTicket()
      .then((res) => {
        console.log("success Assigned Consulting Ticket list test", res.data);
        setListAssignedConsultingTicket(res.data);
      })
      .catch((e) =>
        console.log("fail Assigned Consulting Ticket list test", e)
      );
  }, [renderIndex]);

  const sortedlistAssignedConsultingTicket = [
    ...listAssignedConsultingTicket,
  ].sort((a, b) => b.id - a.id);

  const handleDetailClick = (ticketId) => {
    setTicketIdForDetail(ticketId);
    setRenderIndex(0);
  };

  const handleCloseDetail = () => {
    setRenderIndex(1);
  };

  return (
    <ThemeProvider theme={"ochreTheme"}>
      <Container sx={{ padding: 2 }}>
        {renderIndex === 0 ? (
          <TrainerTicketDetailView
            ticketIdForDetail={ticketIdForDetail}
            onClose={handleCloseDetail}
          />
        ) : renderIndex === 1 ? (
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
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedlistAssignedConsultingTicket.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Typography>{row.id}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>
                        {row.onlineOrOffline ? "Online" : "Offine"}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>
                        {addonService.formatDate(row.appointmentDate)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{row.actualSlotStart}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>
                        <Button
                          variant="contained"
                          color="ochre"
                          onClick={() => {
                            handleDetailClick(row.id);
                          }}
                        >
                          Detail
                        </Button>
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <></>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default TrainerTicketListView;

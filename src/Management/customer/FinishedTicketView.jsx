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
} from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import consultantService from "../../services/consultant.service";
import addonService from "../../services/addon.service";

const FinishedTicketView = ({}) => {
  const [renderIndex, setRenderIndex] = useState(1);
  const [ticketIdForDetail, setTicketIdForDetail] = useState("");

  const [listFinishedTicket, setListFinishedTicket] = useState([]);
  useEffect(() => {
    consultantService
      .getFinishedConsultingTicket()
      .then((res) => {
        console.log("success Finished Consulting Ticket list test", res.data);
        setListFinishedTicket(res.data);
      })
      .catch((e) =>
        console.log("fail Finished Consulting Ticket list test", e)
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
    <>
      {
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
              {listFinishedTicket.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Typography>{row.id}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>
                      {row.onlineOrOffline ? "Online" : "Offine"}{" "}
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
      }
    </>
  );
};

export default FinishedTicketView;

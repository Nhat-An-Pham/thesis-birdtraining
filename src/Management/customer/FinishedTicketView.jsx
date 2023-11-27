import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Table,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import consultantService from "../../services/consultant.service";
import addonService from "../../services/addon.service";

const FinishedTicketView = ({
  callBackRenderedIndex,
  callbackTicketIdForDetail,
}) => {
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
  }, []);

  const handleListAssignCLick = (renderedIndex) => {
    callBackRenderedIndex(renderedIndex);
  };

  const handleDetailClick = (ticketId) => {
    callbackTicketIdForDetail(ticketId);
    callBackRenderedIndex(0);
  };
  return (
    <>
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={2}
      >
        <Button
          variant="contained"
          color="ochre"
          onClick={() => handleListAssignCLick(1)}
        >
          Return to list Assigned
        </Button>
        <Typography variant={"h4"}>List Finished Ticket</Typography>
      </Stack>

      {
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableCell>Id</TableCell>
              <TableCell>Online/Offline</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Slot</TableCell>
              <TableCell></TableCell>
            </TableHead>
            <TableBody>
              {listFinishedTicket.map((row, index) => (
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
      }
    </>
  );
};

export default FinishedTicketView;

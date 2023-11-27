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
  Stack,
} from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import consultantService from "../../services/consultant.service";

import addonService from "../../services/addon.service";

const TrainerTicketListView = ({
  callBackRenderedIndex,
  callbackTicketIdForDetail,
}) => {
  //Lấy list ticket mà Trainer được assign
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
  }, []);

  const handleDetailClick = (ticketId) => {
    callbackTicketIdForDetail(ticketId);
    callBackRenderedIndex(0);
  };

  const handleFinishedView = (renderedIndex) => {
    callBackRenderedIndex(renderedIndex);
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
          onClick={() => handleFinishedView(3)}
        >
          View List Finished Ticket
        </Button>
        <Typography variant={"h4"}>List Assigned Ticket</Typography>
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
      }
    </>
  );
};

export default TrainerTicketListView;

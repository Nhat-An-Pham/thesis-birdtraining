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
              {listAssignedConsultingTicket.map((row, index) => (
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
      }
    </>
  );
};

export default TrainerTicketListView;

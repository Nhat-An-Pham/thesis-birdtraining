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
import { Button, Table } from "react-bootstrap";
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
      <Button onClick={() => handleFinishedView(3)}>
        View List Finished Ticket
      </Button>
      <h2>List Assigned Ticket</h2>
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

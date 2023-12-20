import { Button, Dialog, DialogContent, DialogTitle, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import consultantService from "../../services/consultant.service";
import { ToastContainer } from "react-toastify";

const TicketBillView = ({ticketDetail, openDiv, handleCloseDiv}) => {
  const FinishTicket = (id, actualSlotStart, actualEndSlot) => {
    consultantService
      .finishAppointment({
        id: id,
        actualSlotStart: actualSlotStart,
        actualEndSlot: actualEndSlot,
      })
      .then((res) => {
        console.log("Success Finish Ticket test", res.data);
      })
      .catch((e) => console.log("Fail Finish Ticket test", e));
  };

  return (
    <Dialog open={openDiv} onClose={handleCloseDiv}>
      <ToastContainer />
      <DialogTitle style={{ margin: "0px" }}>
        <h3>Consulting Ticket Payment Bill</h3>
      </DialogTitle>
      <DialogContent>
        <section>
          <table>
            <tr>
              <td>Name</td>
              <td>
              {ticketDetail.customerName}
            </td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{ticketDetail.customerEmail}</td>
            </tr>
            <tr>
              <td>Phone</td>
              <td>{ticketDetail.customerPhone}</td>
            </tr>
            <tr>
              <td>Trainer</td>
              <td>{ticketDetail.trainerName}</td>
            </tr>
            <tr>
              <td>Date</td>
              <td>{ticketDetail.appointmentDate}</td>
            </tr>
            {ticketDetail.onlineOrOffline === false ? (
              <>
              <tr>
                <td>Distance</td>
                <td>{ticketDetail.distance} Km</td>
              </tr>
              <tr>
                <td>Distance Price</td>
                <td>{ticketDetail.distancePriceCalculate}</td>
              </tr>
              </>
            ) : (
              <></>
            )}
            <tr>
              <td>Price</td>
              <td>{ticketDetail.price + ticketDetail.discountedPrice}</td>
            </tr>
            <tr>
              <td>Discounted</td>
              <td>{ticketDetail.discountedPrice}</td>
            </tr>
            <tr>
              <td>Final Price</td>
              <td>{ticketDetail.price}</td>
            </tr>
          </table>
          <Button>
            Finish
          </Button>
          <Button>
            Cancel
          </Button>
        </section>
      </DialogContent>
    </Dialog>
  );
};

export default TicketBillView;

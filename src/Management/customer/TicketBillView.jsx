import {
  Button,
  Typography,
  DialogTitle,
  DialogContent,
  Dialog,
  DialogActions,
} from "@mui/material";
import { useEffect, useState } from "react";
import consultantService from "../../services/consultant.service";
import { ToastContainer, toast } from "react-toastify";
import addonService from "../../services/addon.service";

const TicketBillView = ({
  ticketDetail,
  openDiv,
  handleCloseDiv,
  callBackFinishBill,
}) => {
  const FinishTicket = (id) => {
    consultantService
      .finishAppointment({
        id: id,
      })
      .then((res) => {
        console.log("Success Finish Ticket test", res.data);
        toast.success("Success Finish Ticket");
        callBackFinishBill();
      })
      .catch((e) => console.log("Fail Finish Ticket test", e));
  };
  return (
    <>
      {ticketDetail ? (
        <Dialog open={openDiv} onClose={handleCloseDiv}>
          <ToastContainer />
          <DialogTitle style={{ margin: "0px" }}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "block" },
                fontWeight: 700,
              }}
            >
              Consulting Ticket Bill
            </Typography>
          </DialogTitle>
          <DialogContent>
            <section>
              <div style={{ width: "450px" }}>
                <form
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                  onSubmit={FinishTicket}
                  className="form"
                  encType="multipart/form-data"
                >
                  <div
                    style={{
                      borderRadius: 5,
                      width: "90%",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                    }}
                  >
                    <div>
                      <table
                        style={{
                          border: "none",
                          padding: "0px",
                          borderCollapse: "separate",
                          borderSpacing: "1rem 0.5rem",
                          color: "#64645f",
                          fontSize: "1rem",
                          width: "100%",
                        }}
                      >
                        <tr>
                          <td>Ticket Id</td>
                          <td style={{ textAlign: "end" }}>
                            {ticketDetail.id}
                          </td>
                        </tr>
                        <tr>
                          <td>Customer</td>
                          <td style={{ textAlign: "end" }}>
                            {ticketDetail.customerName}
                          </td>
                        </tr>
                        <tr>
                          <td>Service</td>
                          <td style={{ textAlign: "end" }}>
                            {ticketDetail.onlineOrOffline ? "Online" : "Offine"}
                          </td>
                        </tr>
                        <tr>
                          <td>Status</td>
                          <td style={{ textAlign: "end" }}>
                            {ticketDetail.status}
                          </td>
                        </tr>
                        {ticketDetail.onlineOrOffline === false ? (
                          <>
                            <tr>
                              <td>Distance</td>
                              <td style={{ textAlign: "end" }}>
                                {ticketDetail.distance} Km
                              </td>
                            </tr>
                            <tr>
                              <td>Distance Price</td>
                              <td style={{ textAlign: "end" }}>
                                {ticketDetail.distancePriceCalculate === 0
                                  ? 0
                                  : ticketDetail.distancePriceCalculate
                                  ? addonService.formatCurrency(
                                      ticketDetail.distancePriceCalculate
                                    )
                                  : null}{" "}
                                VND
                              </td>
                            </tr>
                          </>
                        ) : (
                          <></>
                        )}
                        <tr>
                          <td>Actual Price</td>
                          <td style={{ textAlign: "end" }}>
                            {ticketDetail.price +
                              ticketDetail.discountedPrice ===
                            0
                              ? 0
                              : ticketDetail.price
                              ? addonService.formatCurrency(
                                  ticketDetail.price +
                                    ticketDetail.discountedPrice
                                )
                              : null}{" "}
                            VND
                          </td>
                        </tr>
                        <tr>
                          <td>Membership Rank</td>
                          <td style={{ textAlign: "end" }}>
                            {ticketDetail.membershipRank}
                          </td>
                        </tr>
                        <tr>
                          <td>Discounted Price</td>
                          <td style={{ textAlign: "end" }}>
                            {ticketDetail.discountedPrice === 0
                              ? 0
                              : ticketDetail.discountedPrice
                              ? addonService.formatCurrency(
                                  ticketDetail.discountedPrice
                                )
                              : null}{" "}
                            VND
                          </td>
                        </tr>
                        <tr style={{ fontSize: "1.4rem", fontWeight: 700 }}>
                          <td>Total Price</td>
                          <td style={{ textAlign: "end" }}>
                            {ticketDetail.price === 0
                              ? 0
                              : ticketDetail.price
                              ? addonService.formatCurrency(ticketDetail.price)
                              : null}{" "}
                            VND
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </form>
              </div>
            </section>
          </DialogContent>
          {ticketDetail.status === "Finished" ? (
            <></>
          ) : (
            <DialogActions>
              <Button
                sx={{ marginBottom: "20px" }}
                variant="contained"
                color="ochre"
                type="submit"
                onClick={() => FinishTicket(ticketDetail.id)}
              >
                Confirm Finish Appointment
              </Button>
            </DialogActions>
          )}
        </Dialog>
      ) : (
        <></>
      )}
    </>
  );
};

export default TicketBillView;

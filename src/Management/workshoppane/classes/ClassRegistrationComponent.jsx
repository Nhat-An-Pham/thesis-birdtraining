import { useEffect, useState } from "react";
import trainerWorkshopService from "../../../services/trainer-workshop.service";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";

const ClassRegistrationComponent = ({ open, handleClose, slotId }) => {
  // const userRole = jwtDecode(JSON.parse(localStorage.getItem('user-token'))).role;
  const [attendanceForm, setAttendanceForm] = useState([]);
  async function fetchList() {
    try {
      let res = await trainerWorkshopService.getListAttendees(slotId);
      console.log("value for slotId: ", slotId, " - ", res.data);
      setAttendanceForm(res.data);
    } catch (error) {}
  }
  useEffect(() => {
    fetchList();

    return () => {};
  }, []);
  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth={"xl"}>
        <DialogTitle>
          <Typography>List attendees</Typography>
        </DialogTitle>
        <DialogContent>
          {attendanceForm ? (
            <>
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="flex-end"
                spacing={2}
                width={"100%"}
              >
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                      <TableRow>
                        <TableCell>No.</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Phone</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {attendanceForm.length > 0 ? (
                        attendanceForm.map((attendee, index) => (
                          <TableRow
                            hover
                            // selected
                            key={attendee}
                          >
                            <TableCell>{index}</TableCell>
                            <TableCell>{attendee.email}</TableCell>
                            <TableCell>{attendee.customerName}</TableCell>
                            <TableCell>+84 {attendee.phoneNumber}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} align="center">
                            Currently no customer register to this slot
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Stack>
            </>
          ) : (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
export default ClassRegistrationComponent;

import { useEffect, useState } from "react";
import trainerWorkshopService from "../../../services/trainer-workshop.service";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
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

const AttendancePaletteComponent = ({ slotId }) => {
  // const userRole = jwtDecode(JSON.parse(localStorage.getItem('user-token'))).role;
  const [attendanceForm, setAttendanceForm] = useState([]);
  const [models, setModels] = useState([]);
  async function fetchList() {
    try {
      let res = await trainerWorkshopService.getListAttendees(slotId);
      console.log(res.data);
      setAttendanceForm(res.data);
      setModels(
        res.data.map((attendee) => ({
          email: attendee.email,
          phoneNumber: attendee.phoneNumber,
          isPresent: attendee.status === "Attended",
        }))
      );
    } catch (error) {}
  }
  const handleCheckboxChange = (index) => {
    // Update the status of the attendee at the specified index
    const updatedAttendanceForm = [...attendanceForm];
    updatedAttendanceForm[index].status =
      updatedAttendanceForm[index].status === "Attended"
        ? "Absent"
        : "Attended";
    setAttendanceForm(updatedAttendanceForm);

    const updatedModels = [...models];
    updatedModels[index].isPresent = !updatedModels[index].isPresent;
    setModels(updatedModels);
  };
  const handleSubmit = async () => {
    try {
      // Make the PUT request to update attendance
      await trainerWorkshopService.updateAttendance(models, slotId);
      // Optional: Notify the user or perform any other actions upon successful update
      toast.success("Submitted!");
    } catch (error) {
      console.error("Error updating attendance:", error);
      // Optional: Handle errors (show error message, log, etc.)
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    fetchList();

    return () => {};
  }, []);
  return (
    <>
      {attendanceForm ? (
        <>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="flex-end"
            margin={5}
            spacing={2}
            width={'100%'}
          >
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>No.</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Status</TableCell>
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
                        <TableCell style={{ width: 0.125 }} align="center">
                          <Checkbox
                            checked={attendee.status === "Attended"}
                            onChange={() => handleCheckboxChange(index)}
                            sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                          />
                          {/* <Typography>
                            {attendee.status === "Attended"
                              ? "Present"
                              : "Not Yet"}
                          </Typography> */}
                        </TableCell>
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
            <Button
              color="ochre"
              variant="contained"
              onClick={handleSubmit}
              sx={{ width: "200px" }}
            >
              Submit Attendance
            </Button>
          </Stack>
        </>
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </div>
      )}
    </>
  );
};
export default AttendancePaletteComponent;

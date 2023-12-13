import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Modal,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useState } from "react";
import classManagementService from "../../../services/class-management.service";
import { toast } from "react-toastify";

export default function ClassModifyComponent({
  selectedClass,
  open,
  handleClose,
  callbackModifyClass,
}) {
  const ideal = dayjs().add(5, "days");
  const [startDate, setStartDate] = useState(dayjs(selectedClass.startTime));
  const [registerEndDate, setRegisterEndDate] = useState(
    dayjs(selectedClass.registerEndDate)
  );
  const [workshopClass, setWorkshopClass] = useState(selectedClass);
  const [location, setLocation] = useState(selectedClass.location);
  async function modifyClass() {
    try {
      let date =
        startDate === dayjs(selectedClass.startTime)
          ? null
          : startDate.format("YYYY-MM-DD");
      let response = await classManagementService.ModifyClass(
        selectedClass.id,
        date,
        location === selectedClass.location ? null : location
      );
      if (response.status === 200) {
        toast.success("Modify successfully!");
        callbackModifyClass();
      } else {
        console.log(response);
        toast.error("An error has occur");
      }
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error("An error has occur");
      }
    }
  }
  const handleChangeDate = (value) => {
    setStartDate(value);
    
  };
  
  const handleModifyClick = async () => {
    await modifyClass();
  };
  const handleReset = () => {
    setLocation(workshopClass.location);
    setStartDate(dayjs(workshopClass.startTime));
  }
  useEffect(() => {
    setRegisterEndDate(startDate.add(5, "day"));
  
    return () => {
      
    }
  }, [startDate]);
  
  return (
    <>
      {selectedClass ? (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Modify class hosted information</DialogTitle>
          <DialogContent>
            <Stack spacing={3} padding={2}>
              <TextField
                label={"Location"}
                type="text"
                defaultValue={location}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  minDate={ideal}
                  label="Expected Open"
                  value={startDate}
                  onChange={(value) => handleChangeDate(value)}
                  sx={{ width: "100%", maxWidth: "200px" }}
                />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Expected Closed"
                  readOnly
                  value={registerEndDate}
                  sx={{ width: "100%", maxWidth: "200px" }}
                />
              </LocalizationProvider>
            </Stack>
          </DialogContent>
          <DialogActions>
          <Button color="warning" variant="contained" onClick={handleReset}>
              Reset
            </Button>
            <Button color="error" variant="contained" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              color="ochre"
              variant="contained"
              onClick={handleModifyClick}
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
        <></>
      )}
    </>
  );
}

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

export default function ClassAddNewComponent({
  selectedWorkshop,
  open,
  handleClose,
  callbackCreateClass,
}) {
  const ideal = dayjs(new Date()).add(5, "day");
  const [startDate, setStartDate] = useState(ideal);
  const [workshop, setWorkshop] = useState(selectedWorkshop);
  const [location, setLocation] = useState("");
  useEffect(() => {
    if (selectedWorkshop) {
      setWorkshop(selectedWorkshop);
    }
    return () => {};
  }, [selectedWorkshop]);
  async function createClass() {
    try {
      let date = startDate.format("YYYY-MM-DD");
      let response = await classManagementService.CreateClass(
        workshop.id,
        date,
        location
      );
      if (response.status === 200) {
        toast.success("Create successfully!");
        toast.info("Please assign trainer to created class!");
        callbackCreateClass();
      } else {
        console.log(response);
        toast.error("An error has occur");
      }
    } catch (error) {
      if(error.response?.data?.message){
        toast.error(error.response?.data?.message);
      } else {
        toast.error("An error has occur");
      }
      
    }
  }
  const handleChangeDate = (value) => {
    setStartDate(value);
  };
  const handleCreateClick = async () => {
    await createClass();
  };
  return (
    <>
      {workshop ? (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            Add new class for workshop: {workshop.title}
          </DialogTitle>
          <DialogContent>
            <Stack spacing={2}>
              <Typography>Enter open registration date for class.</Typography>
              <Alert variant={"standard"} severity={"warning"}>
                All slots must be fulfilled to public the class!
              </Alert>
              <TextField
                required
                label={"Location"}
                type="text"
                onChange={(e) => setLocation(e.target.value)}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  minDate={ideal}
                  label="Date"
                  value={startDate}
                  onChange={(value) => handleChangeDate(value)}
                  sx={{ width: "100%", maxWidth: "200px" }}
                />
              </LocalizationProvider>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button
              color="ochre"
              variant="contained"
              onClick={handleCreateClick}
            >
              Create
            </Button>
            <Button color="ochre" variant="contained" onClick={handleClose}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
        <></>
      )}
    </>
  );
}

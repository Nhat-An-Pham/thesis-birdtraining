import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Button,
  Paper,
  ThemeProvider,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import addOnService from "../../services/addon.service";
import trainingCourseManagementService from "../../../src/services/trainingcourse-management.service";
import timetableService from "../../services/timetable.service";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import RawHTMLRenderer from "../component/htmlRender/htmlRender";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { HistoryOutlined, Label, SaveOutlined } from "@mui/icons-material";
import { Tab } from "@coreui/coreui";
import { ochreTheme } from "../themes/Theme";

const ReportModifyComponent = ({ reportId, birdSkillId, callbackModify }) => {
  const [dateSlot, setDateSlot] = useState(null);
  const [slotTimes, setSlotTimes] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [selectedSlotTime, setSelectedSlotTime] = useState();
  const [selectedTrainer, setSelectedTrainer] = useState();

  async function fetchTrainers() {
    try {
      console.log("BirdSkillId " + birdSkillId);
      let params = {
        birdSkillId: birdSkillId,
      };
      let response =
        await trainingCourseManagementService.getTrainersByBirdSkill(params);
      console.log("trainers: ", response);
      setTrainers(response);
    } catch (error) {
      toast.error(error);
    }
  }
  async function fetchSlot() {
    try {
      let response = await timetableService.getSlotTime();
      setSlotTimes(response.data);
    } catch (e) {
      toast.error(e);
    }
  }
  useEffect(() => {
    fetchSlot();
    fetchTrainers();
  }, [reportId]);

  const handleSaveChanges = async () => {
    try {
      console.log("reportId: " + reportId);
      console.log("selectedTrainer: " + selectedTrainer);
      console.log("selectedSlotTime: " + selectedSlotTime);
      console.log("dateSlot: " + dateSlot);
      let model = {
        reportId: reportId,
        trainerId: selectedTrainer,
        slotId: selectedSlotTime,
        date: dateSlot.format("YYYY-MM-DD"),
      };
      var response = await trainingCourseManagementService.modifyTrainerSlot(
        model
      );
      // console.log(response);
      if (response.status === 200) {
        toast.success("Assign successfully!");
        callbackModify();
      } else {
        toast.error("An error has occured!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
      // console.log(error.response.data);
    }
  };
  const handleCancelChanges = () => {
    callbackModify();
  };

  const handleChangeDate = (selectedDate) => {
    setDateSlot(selectedDate);

    // setSelectedSlotTime(null);
    // setSelectedTrainer(null);
    // setTrainers([]);
  };
  const handleSelectSlotTime = (event) => {
    setSelectedSlotTime(event.target.value);
    // setSelectedTrainer(null);
    // fetchTrainers();
  };
  useEffect(() => {
    fetchTrainers();
    return () => {};
  }, [selectedSlotTime]);

  const handleSelectTrainer = (event) => {
    setSelectedTrainer(event.target.value);
  };

  return (
    <ThemeProvider theme={ochreTheme}>
      <p>Update For Trainer Slot</p>
      <Grid
        container
        item
        direction="row"
        alignItems="center"
        justifyContent="space-evenly"
        spacing={3}
      >
        <Grid item xs={4}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date"
              value={dateSlot}
              onChange={(value) => handleChangeDate(value)}
              sx={{ width: "100%", maxWidth: "200px" }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={4}>
          <FormControl sx={{ width: "100%", maxWidth: "200px" }}>
            <InputLabel id="selectLabel_ChooseSlot">Choose Slot</InputLabel>
            <Select
              labelId="selectLabel_ChooseSlot"
              label="Choose Slot"
              onChange={handleSelectSlotTime}
              value={selectedSlotTime}
            >
              {slotTimes.map((slot) => (
                <MenuItem value={slot.id}>
                  {slot.startTime.slice(0, -3)}-{slot.endTime.slice(0, -3)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl sx={{ width: "100%", maxWidth: "200px" }}>
            <InputLabel id="selectLabel_ChooseTrainer">
              Choose Trainer
            </InputLabel>
            <Select
              labelId="selectLabel_ChooseTrainer"
              label="Choose Trainer"
              // value={selectedTrainer}
              onChange={handleSelectTrainer}
            >
              {trainers.map((trainer) => (
                <MenuItem value={trainer.id}>
                  {trainer.name}: {trainer.email}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid
          container
          item
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <Button
              color="ochre"
              variant="contained"
              style={{ marginRight: "10px" }}
              onClick={handleSaveChanges}
            >
              <SaveOutlined />
              Save
            </Button>
            <Button
              color="ochre"
              variant="contained"
              onClick={() => handleCancelChanges()}
            >
              <SaveOutlined />
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
export default ReportModifyComponent;

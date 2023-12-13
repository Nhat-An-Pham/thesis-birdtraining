import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useState } from "react";
import RawHTMLRenderer from "../../component/htmlRender/htmlRender";
import { HistoryOutlined, Label, SaveOutlined } from "@mui/icons-material";
import { toast } from "react-toastify";
import timetableService from "../../../services/timetable.service";
import classManagementService from "../../../services/class-management.service";

export default function ClassSlotViewComponent( {slot, selectedClass, callbackUpdateSlot }) {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [dateSlot, setDateSlot] = useState(null);
  const [slotTimes, setSlotTimes] = useState([]);
  const [trainers, setTrainers] = useState([]);
  // const [selectedSlotTime, setSelectedSlotTime] = useState(dayjs(slot.selectedClass.startTime));
  const [selectedSlotTime, setSelectedSlotTime] = useState();
  const [selectedTrainer, setSelectedTrainer] = useState();

  async function fetchClassSlot() {
    try {
      let params = {
        workshopClassId: selectedClass.id,
        $filter: `id eq ${slot.id}`,
      };
      let response = await classManagementService.getSlots(params);
      setSelectedSlot(response.data[0]);
      // callbackUpdateSlot(response.data[0]);
      // setSelectedTrainer(response.data[0].trainer.name)
    } catch (error) {
      toast.error(error);
    }
  }


  useEffect(() => {
    fetchClassSlot();
    fetchSlot();
  }, [slot]);
  

  async function fetchSlot() {
    try {
      let response = await classManagementService.getSlotTime()
      setSlotTimes(response.data);

    } catch (e) {
      toast.error(e);
    }
  }


  async function fetchTrainers() {
    try {
      let params = {
        // category: "workshop",
      };
      console.log("selectedSlotTime", selectedSlotTime)
      let date = dateSlot.format("YYYY-MM-DD");
      let response = await timetableService.getFreeTrainerOnSlotDate(
        params,
        date,
        selectedSlotTime
      );
      console.log('trainers: ',response.data)
      setTrainers(response.data);
    } catch (error) {
      toast.error(error);
    }
  }

  const handleSaveChanges = async () => {
    try {
      
      let model = {
        classId: selectedSlot.id,
        trainerId : selectedTrainer,
        slotId: selectedSlotTime,
        date: dateSlot.format("YYYY-MM-DD"),
      }
      var response = await classManagementService.AssignTrainer(model);
      // console.log(response); 
      if (response.status === 200) {
        toast.success('Assign successfully!');
        callbackUpdateSlot();
      } else {
        toast.error('An error has occured!');
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
      // console.log(error.response.data);
    }
  }

  const handleChangeDate = (selectedDate) => {
    setDateSlot(selectedDate);
    
    setSelectedSlotTime(null);
    // setSelectedTrainer(null);
    setTrainers([]);
  };
  const handleSelectSlotTime = (event) => {
    setSelectedSlotTime(event.target.value);
    // setSelectedTrainer(null);
    // fetchTrainers();

  };
  useEffect(() => {
    fetchTrainers();
    return () => {
      
    }
  }, [selectedSlotTime])
  
  const handleSelectTrainer = (event) => {
    setSelectedTrainer(event.target.value);
  };

  return (
    <>
      <p>Update For The Slot</p>
      {selectedSlot ? (
        <>
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
                  minDate={dayjs(selectedClass.registerEndDate).add(1, 'day')}
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
                    <MenuItem value={trainer.id}>{trainer.email}</MenuItem>
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
                <Button color="ochre" variant="contained" onClick={handleSaveChanges}>
                  <SaveOutlined />
                  Save
                </Button>
              </Grid>
            </Grid>
            <Grid
              container
              item
              direction="row"
              justifyContent="flex-end"
              alignItems="flex-start"
            >
              <Grid item xs={2}>
                <Typography>Description</Typography>
              </Grid>
              <Grid item xs={10}>
                <RawHTMLRenderer htmlContent={selectedSlot.detail} />
              </Grid>
            </Grid>
          </Grid>
        </>
      ) : (
        <>No slot selected!</>
      )}
    </>
  );
}

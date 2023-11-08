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

export default function ClassSlotViewComponent(slot) {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [dateSlot, setDateSlot] = useState(null);
  const [slots, setSlots] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [selectedSlotTime, setSelectedSlotTime] = useState(null);
  const [selectedTrainer, setSelectedTrainer] = useState(null);

  async function fetchSlots() {
    try {
      let response = await timetableService.getSlotTime();
      setSlots(response.data);
    } catch (error) {
      toast.error(error);
    }
  }
  async function fetchTrainers() {
    try {
      let params = {
        category: "workshop",
      };
      let date = dateSlot.format("YYYY-MM-DD");
      let response = await timetableService.getFreeTrainerOnSlotDate(
        params,
        date,
        selectedSlotTime
      );
      setTrainers(response.data);
    } catch (error) {
      toast.error(error);
    }
  }
  useEffect(() => {
    if (slot) {
      setSelectedSlot(slot.slot);
      setDateSlot(dayjs(slot.date));
      fetchSlots();
    }

    return () => {};
  }, [slot]);
  useEffect(() => {
    if (selectedSlot) {
      if (slots && slots.length > 0) {
        slots.forEach((slotTime) => {
          if (slotTime.startTime === selectedSlot.startTime) {
            setSelectedSlotTime(slotTime.id);
          }
        });
      }
    }

    return () => {};
  }, [slots]);
  useEffect(() => {
    if(slots && slots.length > 0){
      let slotTime = slots.find((element) => element.id === selectedSlotTime)
      // console.log(slotTime);
      if(slotTime.startTime === selectedSlot.startTime){
        console.log(slotTime.startTime + ' - ' + selectedSlot.startTime);
        console.log(selectedSlot.trainer.id);
        console.log(trainers);
        setSelectedTrainer(selectedSlot.trainer.id);
        // console.log('trainer: '+ selectedSlot.trainer.id);
      }
    }
    
  
    return () => {
      
    }
  }, [trainers])
  
  useEffect(() => {
    fetchTrainers();
    return () => {};
  }, [selectedSlotTime]);
  const handleSaveChanges = async () => {
    try {
      let model = {
        id : selectedSlot.id,
        trainerId : selectedTrainer,
        slotId : selectedSlotTime,
        date : dateSlot.format("YYYY-MM-DD"),
      }
      // console.log(model);
      var response = await classManagementService.AssignTrainer(model);
      console.log(response);
      if(response.status === 200){
        toast.success('Assign successfully!');
      } else {
        toast.error(response.data);
      }
    } catch (error) {
      toast.error(error.response.data);
      console.log(error.response.data);
    }
  }
  const handleResetClick = async () => {
    if (selectedSlot) {
      if (slots && slots.length > 0) {
        slots.forEach((slotTime) => {
          if (slotTime.startTime === selectedSlot.startTime) {
            setSelectedSlotTime(slotTime.id);
          }
        });
      }
    }

  }
  const handleChangeDate = (selectedDate) => {
    setDateSlot(selectedDate);
    setSelectedSlotTime(null);
    setSelectedTrainer(null);
    setTrainers([]);
  };
  const handleSelectSlotTime = (event) => {
    setSelectedSlotTime(event.target.value);
    setSelectedTrainer(null);
    setTrainers([]);
  };
  const handleSelectTrainer = (event) => { 
    setSelectedTrainer(event.target.value);
  };
  return (
    <>
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
                  minDate={dayjs(new Date())}
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
                  {slots.map((slot) => (
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
                  value={selectedTrainer}
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
              <Grid item>
                <Button color="ochre" variant="contained" onClick={handleResetClick}>
                  <HistoryOutlined />
                  Reset
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

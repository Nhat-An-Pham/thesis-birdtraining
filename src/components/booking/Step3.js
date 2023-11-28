import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import axios from 'axios';
import ConsultantService from '../../services/consultant.service';



// STEP 3 IS WHERE WE WILL SELECT A DATE AND THEN HAVE THE AVAILABLE TIMES LIST UPDATE ON CHANGE OF THE DATE
//SO EVERYTIME A NEW DATE IS SELECTED, AN API CALL GETS SENT TO RETRIEVE THE LIST OF TIMES WITH THE NEW PARAMETERS.
export default function Step3({ getAppointmentDate, selectedTrainerId, getSlotId }) {
  const [dateValue, setDateValue] = useState(dayjs(new Date()));
  const [times, setTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');


  const handleChangeTime = (event) => {
    setSelectedTime(event.target.value);
    getAppointmentDate(dateValue, event.target.value);
    getSlotId(event.target.value.id);
  };

  const handleChangeDate = (selectedDate) => {
    //axios request
    // console.log(dayjs(new Date(selectedDate)));
    setDateValue(dayjs(new Date(selectedDate)));

  }
  useEffect(() => {
    ConsultantService.getTrainerFreeSlotOnDate({dateValue: dateValue, selectedTrainerId: selectedTrainerId})
      .then((res) => {
        // console.log(res.data, 'get Trainer Free Slot On Date')
        setTimes(res.data)
      })
  }, [dateValue])

  return (
    <Box sx={{ width: '100%', minWidth: 400, bgcolor: 'background.paper' }}>
      {/* <Typography variant="h5">{selectedServiceName} will be about <b>{selectedServiceLength} minutes</b> in length</Typography> */}
      <br></br>
      <FormControl fullWidth>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MobileDatePicker
            minDate={dayjs(new Date())}
            label="Select Date"
            inputFormat="MM/DD/YYYY"
            value={dateValue}
            onChange={handleChangeDate}
          />
        </LocalizationProvider>
      </FormControl>
      <br></br>
      <br></br>
      {times && <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Time</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedTime}
          label="Time"
          onChange={(event) => handleChangeTime(event)}
        >
          {times.map((time) =>

            <MenuItem value={time}>{time.startTime.slice(0, -3)}</MenuItem>

          )}
        </Select>
      </FormControl>}
    </Box>
  );
}
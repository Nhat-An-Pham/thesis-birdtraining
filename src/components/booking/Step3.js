import React, {useEffect, useState} from 'react';
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
// STEP 3 IS WHERE WE WILL SELECT A DATE AND THEN HAVE THE AVAILABLE TIMES LIST UPDATE ON CHANGE OF THE DATE
//SO EVERYTIME A NEW DATE IS SELECTED, AN API CALL GETS SENT TO RETRIEVE THE LIST OF TIMES WITH THE NEW PARAMETERS.
export default function Step3({getDateTime, selectedServiceName, selectedServiceLength, selectedServiceId}) {
  const [dateValue, setDateValue] = useState(moment(new Date).format("YYYY-MM-DD"));
  const [times, setTimes] = useState([]);
  const[selectedTime, setSelectedTime] = useState('');

  const timeList= (start, end, length, interval, takenAppts) => {

    
    var compareStartTime = start.toLocaleTimeString();

    var list = [compareStartTime];
    var unavailableAppts = takenAppts ? takenAppts : [];
    for(let i = 0 ;i<interval-1 ;i++ ){
    
    list.push(moment(start).add(length, 'm').toDate().toLocaleTimeString())
    start = moment(start).add(length, 'm').toDate()

    if(unavailableAppts.some(e=> e.apptStartTime === start.toLocaleTimeString() && e.length_minutes === length)){
    const index = list.indexOf(start);
    list.splice(index, 1);
    }
    if(unavailableAppts.some(e=> e.apptStartTime === list[0] && e.length_minutes == length)){
    const index = list.indexOf(compareStartTime)
    list.splice(index, 1);
    }
    }
    
    setTimes(list)
    console.log(times);

    }
    



  const handleChangeTime = (event) => {
    setSelectedTime(event.target.value);
    getDateTime(dateValue, event.target.value);
  };

const handleChangeDate = async (selectedDate) =>{
  //axios request
  console.log(moment(new Date(selectedDate)).format("YYYY-MM-DD"));
  setDateValue(moment(new Date(selectedDate)).format("YYYY-MM-DD"));

}
useEffect(() =>{
  axios.get(`https://instabookapi.azurewebsites.net/api/get_times_for_service/serviceDate=${dateValue}&serviceId=${selectedServiceId}`)
    .then((results)=>{
      console.log(results.data[0], 'hereeeeeee')
      timeList( new Date("1970-01-01T" + results.data[0].startTime), new Date("1970-01-01T" + results.data[0].endTime), results.data[0].length, results.data[0].interval, JSON.parse(results.data[0].takenAppts) )
    })
},[dateValue])
  return (
    <Box sx={{ width: '100%', minWidth:400, bgcolor: 'background.paper' }}>
      <Typography variant="h5">{selectedServiceName} will be about <b>{selectedServiceLength} minutes</b> in length</Typography>
      <br></br>
    <FormControl fullWidth>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
       <MobileDatePicker
       minDate={new Date()}
          label="Select Date"
          inputFormat="MM/DD/YYYY"
          value={dateValue}
          onChange={handleChangeDate}
          renderInput={(params) => <TextField {...params} />}
        />
       </LocalizationProvider>
       </FormControl>
       <br></br>
       <br></br>
    {times.length > 1 && <FormControl fullWidth>
       <InputLabel id="demo-simple-select-label">Time</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={selectedTime}
    label="Time"
    onChange={(event) =>handleChangeTime(event)}
  >
    {times.map((time) =>
     
        <MenuItem value={time}>{time}</MenuItem>

    )}
  </Select>
      </FormControl>}
      {times.length === 1 && <h3>Closed</h3>}
    </Box>
  );
}
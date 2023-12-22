import { Button, Grid, ThemeProvider, Autocomplete, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ochreTheme } from '../themes/Theme'
import dashboardService from '../../services/dashboard.service'
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import timetableService from '../../services/timetable.service';
import { toast } from 'react-toastify';


const AddTrainerBusy = ({ renderedIndex }) => {
    const [trainerList, setTrainerList] = useState([])
    const [selectedTrainer, setSelectedTrainer] = useState();
    const [daysOption, setDaysOption] = useState()

    const handleChangeDaysOption = (value) => {
        setDaysOption(value);
    }

    const [inADay, setInADay] = useState({
        selectedDate: null,
        option: "",
        reason: "",
    })

    const [manyDays, setManyDays] = useState({
        from: null,
        to: null,
        reason: "",
    })

    const handleSubmit = () => {
        if (selectedTrainer) {
            if (daysOption === "oneDay" && (inADay.selectedDate !== null && inADay.option !== null && inADay.reason !== null)) {
                const date = inADay.selectedDate.format("YYYY-MM-DD")
                timetableService.postLogInDay({selectedDate: date, option: inADay.option, trainerId: selectedTrainer.id, reason: inADay.reason})
                .then((res)=>{
                    toast.success("Submitted Successfully")
                })
                .catch((e)=>{
                    toast.error("Cannot Submit, Trainer is already busy on this day")
                    console.log(e);
                })
            }
            if(daysOption === "manyDays" && (manyDays.from !== null && manyDays.to !== null && manyDays.reason !== null)){
                const from = manyDays.from.format("YYYY-MM-DD")
                const to = manyDays.to.format("YYYY-MM-DD")
                timetableService.postLogRange({from: from, to: to, trainerId: selectedTrainer.id, reason: manyDays.reason})
                .then((res)=>{
                    toast.success("Submitted Successfully")
                })
                .catch((e)=>{
                    toast.error("Cannot Submit, Trainer is already busy on these day")
                    console.log(e);
                })
            }
        }else{
            toast.error("Please Select Trainer");
        }
    }

    const handleInputInADayChange = (field, value) => {
        setInADay({ ...inADay, [field]: value });
    }
    const handleInputManyDaysChange = (field, value) => {
        setManyDays({ ...manyDays, [field]: value });
    }

    useEffect(() => {
        let param = null;
        dashboardService.GetListTrainers(param)
            .then((res) => {
                setTrainerList(res.data);
            })
            .catch((e) => {
                console.log("Cannot Get Trainer List");
            })
    }, [])

    return (
        <Grid item xs={12} style={{ marginLeft: "20px" }}>
            <ThemeProvider theme={ochreTheme}>
                <h2 style={{ textAlign: "left", marginBottom: "0px" }}>ADD TRAINER BUSY SCHEDULE</h2>
                <Button variant="contained"
                    color="ochre"
                    style={{ marginTop: "10px" }}
                    onClick={() => renderedIndex(0)}>
                    Back
                </Button>
                <div style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}>
                    <Autocomplete
                        value={selectedTrainer}
                        onChange={(event, newValue) => {
                            setSelectedTrainer(newValue);
                        }}
                        // inputValue={inputValue}
                        // onInputChange={(event, newInputValue) => {
                        //     setInputValue(newInputValue);
                        // }}
                        options={trainerList}
                        getOptionLabel={(trainer) => trainer.email}
                        style={{ width: "300px", margin: "0px" }}
                        renderInput={(params) => (
                            <TextField {...params} label="Trainer" />
                        )}
                    />
                    <Select
                        value={daysOption}
                        label="Choose Range"
                        onChange={(e) => handleChangeDaysOption(e.target.value)}
                        sx={{ marginLeft: "20px", width: "200px" }}
                    >
                        <MenuItem value={"oneDay"}>One Day</MenuItem>
                        <MenuItem value={"manyDays"}>Many Days</MenuItem>
                    </Select>
                </div>
                <div className='timetable-addtrainerschedule-box'>
                    {daysOption === "oneDay" ?
                        <div style={{ borderTop: "0.5px grey solid", borderBottom: "0.5px grey solid", padding: "20px" }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    minDate={dayjs()}
                                    label="Date"
                                    value={inADay.selectedDate}
                                    onChange={(value) => handleInputInADayChange("selectedDate", value)}
                                    sx={{ width: "100%", maxWidth: "200px" }}
                                />
                            </LocalizationProvider>
                            <Select
                                value={inADay.option}
                                label="Choose Range"
                                onChange={(e) => handleInputInADayChange("option", e.target.value)}
                                sx={{ marginLeft: "20px", width: "200px" }}
                            >
                                <MenuItem value={"AllDay"}>All Day</MenuItem>
                                <MenuItem value={"HalfDayBeforeNoon"}>Morning</MenuItem>
                                <MenuItem value={"HalfDayAfterNoon"}>Afternoon</MenuItem>
                            </Select>
                            <br />
                            <TextField
                                id="outlined-multiline-static"
                                label="Reason"
                                multiline
                                rows={6}
                                style={{ width: "500px", marginTop: "20px" }}
                                onChange={(e)=> handleInputInADayChange("reason", e.target.value)}
                            />
                            <div className='oneday-submit'>
                                <Button
                                    variant="contained"
                                    color="ochre"
                                    onClick={() => handleSubmit()}
                                >
                                    Submit
                                </Button>
                            </div>
                        </div>
                        : null}
                    {daysOption === "manyDays" ?
                        <div style={{ borderTop: "0.5px grey solid", borderBottom: "0.5px grey solid", padding: "20px" }}>
                            <div style={{ display: "flex" }}>
                                <div>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            minDate={dayjs()}
                                            label="From"
                                            value={manyDays.from}
                                            onChange={(value) => handleInputManyDaysChange("from", value)}
                                            sx={{ width: "100%", maxWidth: "200px" }}
                                        />
                                    </LocalizationProvider>
                                </div>
                                <div style={{ marginLeft: "20px" }}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            minDate={dayjs()}
                                            label="To"
                                            value={manyDays.to}
                                            onChange={(value) => handleInputManyDaysChange("to", value)}
                                            sx={{ width: "100%", maxWidth: "200px" }}
                                        />
                                    </LocalizationProvider>
                                </div>
                            </div>
                            <br />
                            <TextField
                                id="outlined-multiline-static"
                                label="Reason"
                                multiline
                                rows={6}
                                style={{ width: "500px", marginTop: "20px" }}
                                onChange={(e)=> handleInputManyDaysChange("reason", e.target.value)}
                            />
                            <div className='oneday-submit'>
                                <Button
                                    variant="contained"
                                    color="ochre"
                                    onClick={() => handleSubmit()}
                                >
                                    Submit
                                </Button>
                            </div>
                        </div>
                        : null}
                </div>
            </ThemeProvider>
        </Grid>
    )
}

export default AddTrainerBusy
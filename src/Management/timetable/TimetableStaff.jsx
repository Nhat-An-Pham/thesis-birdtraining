import React, { useEffect, useState } from "react";
import "./timetable.scss";
import "../workshoppane/workshoppane.scss";
import ReworkSidebar from "../component/sidebar/ReworkSidebar";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import consultantService from "../../services/consultant.service";
import { Autocomplete, Box, Grid, TextField, Typography } from "@mui/material";
import dashboardService from "../../services/dashboard.service";
import { ToastContainer, toast } from "react-toastify";
import timetableService from "../../services/timetable.service";
import TrainerSlotDetailComponent from "../workshoppane/trainer/TrainerSlotDetailComponent";
import { jwtDecode } from "jwt-decode";

function TimetableStaff() {
  const userRole = jwtDecode(
    JSON.parse(localStorage.getItem("user-token"))
  ).role;
  const localizer = momentLocalizer(moment);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [trainers, setTrainers] = useState([]);
  const [inputValue, setInputValue] = React.useState("");
  const [firstDay, setFirstDay] = useState("");
  const [lastDay, setLastDay] = useState("");
  const [occupied, setOccupied] = useState([]);
  const [selected, setSelected] = useState(null);
  const [renderedIndex, setRenderedIndex] = useState(0);

  const handleSelected = (event) => {
    setSelected(event);
    console.info("[handleSelected - event]", event);

    if (event.typeId === 3) {
      setRenderedIndex(1);
    }
  };
  const onCallbackToCalendar = () => {
    setRenderedIndex(0);
  };
  async function fetchTrainers() {
    try {
      let params = null;
      if (userRole === "Trainer") {
        let trainerId = jwtDecode(
          JSON.parse(localStorage.getItem("user-token"))
        ).id;
        let trainer = {
          id: trainerId,
        }
        setSelectedTrainer(trainer);
      } else {
        let response = await dashboardService.GetListTrainers(params);
        let result = response.data.sort((a, b) => {
          const nameA = a.name.toUpperCase(); // ignore upper and lowercase
          const nameB = b.name.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          // names must be equal
          return 0;
        });
        setTrainers(result);
        setSelectedTrainer(result[0]);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
  const handleRangeChange = (range) => {
    let start = new Date(range[0]);
    let end = new Date(range[range.length - 1]);
    setFirstDay(moment(start).format("YYYY-MM-DD"));
    setLastDay(moment(end).format("YYYY-MM-DD"));
  };
  async function fetchTrainerTimetable() {
    try {
      let response = await timetableService.getTrainerTimetable(
        selectedTrainer.id,
        firstDay,
        lastDay,
        null
      );
      setOccupied(response.data);
      console.log(response.data);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
  const formats = {
    eventTimeRangeFormat: () => {
      return null;
    },
  };
  useEffect(() => {
    fetchTrainers();
    const currentDate = moment();

    // Get the current day of the week (0 is Sunday, 1 is Monday, ..., 6 is Saturday)
    const currentDayOfWeek = currentDate.day();
    // Calculate the difference between the current day and the first day of the week (Sunday)
    const difference = currentDayOfWeek - 0; // Assuming Sunday is the first day of the week
    // Calculate the first day of the week
    const firstDayOfWeek = currentDate.subtract(difference, "day");
    setFirstDay(firstDayOfWeek.format("YYYY-MM-DD"));
    // Calculate the last day of the week
    const lastDayOfWeek = firstDayOfWeek.add(6, "day");
    // Format dates as YYYY-MM-DD
    setLastDay(lastDayOfWeek.format("YYYY-MM-DD"));
    return () => {};
  }, []);
  useEffect(() => {
    fetchTrainerTimetable();
    return () => {};
  }, [selectedTrainer, firstDay, lastDay]);

  const CalendarRender = () => {
    return (
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <Typography variant="h6">TRAINER SCHEDULE</Typography>
        </Grid>
        <Grid item>
          {userRole !== "Trainer" ? (
            <Autocomplete
              value={selectedTrainer}
              onChange={(event, newValue) => {
                setSelectedTrainer(newValue);
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              options={trainers}
              getOptionLabel={(trainer) => trainer.email}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Trainer" />
              )}
            />
          ) : null}
        </Grid>
        <Grid item>
          {selectedTrainer && (
            <Calendar
              localizer={localizer}
              events={occupied}
              defaultView="week"
              views={{
                //   agenda: false,
                //   day: false,
                week: true,
                //   month: false,
                // work_week: true,
              }}
              startAccessor={(event) => {
                return new Date(event.start);
              }}
              endAccessor={(event) => {
                return new Date(event.end);
              }}
              style={{ width: 1000, height: 700 }}
              min={moment()
                .set({ hour: 8, minute: 0, second: 0, millisecond: 0 })
                .toDate()}
              max={moment()
                .set({ hour: 18, minute: 0, second: 0, millisecond: 0 })
                .toDate()}
              onRangeChange={(range) => handleRangeChange(range)}
              onSelectEvent={handleSelected}
              formats={formats}
              //   onNavigate={onNavigate}
            />
          )}
        </Grid>
      </Grid>
    );
  };

  const renderComponents = [
    <CalendarRender />,
    <TrainerSlotDetailComponent
      entityId={selected?.id}
      callbackToCalendar={onCallbackToCalendar}
    />,
  ];
  return (
    <>
      <div className="workshop-container">
        <ReworkSidebar />
        <ToastContainer />
        <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}>
          {renderComponents[renderedIndex]}
        </Box>
      </div>
    </>
  );
}

export default TimetableStaff;

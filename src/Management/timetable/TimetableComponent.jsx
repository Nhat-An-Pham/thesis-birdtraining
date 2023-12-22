import React, { useCallback, useEffect, useState } from "react";
import "./timetable.scss";
import ReworkSidebar from "../component/sidebar/ReworkSidebar";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import { Autocomplete, Box, Button, Grid, TextField, ThemeProvider, Typography } from "@mui/material";
import { ochreTheme } from "../themes/Theme";
import dashboardService from "../../services/dashboard.service";
import { ToastContainer, toast } from "react-toastify";
import timetableService from "../../services/timetable.service";
import { jwtDecode } from "jwt-decode";


import Timetable_TicketDetailView from "./Timetable_TicketDetailView";
import TrainerSlotDetailComponent from "../workshoppane/trainer/TrainerSlotDetailComponent";
import TimetableTrainerSlotDetailComponent from "../birdacademy/TimetableTrainerSlotDetailComponent";
import AddTrainerBusy from "./AddTrainerBusy";
import OffSlotDialogComponent from "./OffSlotDialogComponent";


function TimetableComponent() {
  const userRole = jwtDecode(
    JSON.parse(localStorage.getItem("user-token"))
  ).role;
  const [open, setOpen] = useState(false);
  const localizer = momentLocalizer(moment);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [trainers, setTrainers] = useState([]);
  const [inputValue, setInputValue] = React.useState("");
  // const [firstDay, setFirstDay] = useState("");
  // const [lastDay, setLastDay] = useState("");
  const [occupied, setOccupied] = useState([]);
  const [selected, setSelected] = useState(null);
  const [renderedIndex, setRenderedIndex] = useState(0);

  const handleClose = () => {
     setOpen(false);
  }
  const renderIndexFunction = (event) => {
    setRenderedIndex(event)
  }

  const handleSelected = (event) => {
    setSelected(event);
    console.info("[handleSelected - event]", event);

    if (event.typeId === 3) {
      setRenderedIndex(1);
    } else if (event.typeId === 2) {
      setRenderedIndex(2);
    } else if (event.typeId === 5) {
      setRenderedIndex(3);
    } else if (event.typeId === 7) {
      setOpen(true);
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
        };
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
  const handleRangeChange = useCallback(async (range) => {
  }, []);
  async function fetchTrainerTimetable(from, to) {
    try {
      // console.log("from: ", from);
      // console.log("to: ", to);
      let response = await timetableService.getTrainerTimetable(
        selectedTrainer.id,
        from,
        to,
        null
      );
      // setOccupied(response.data);
      setOccupied(response.data);
      // console.log(response.data);
      // console.log("re-fetch event");
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

    return () => { };
  }, []);
  useEffect(() => {
    const currentDate = moment();

    // Get the current day of the week (0 is Sunday, 1 is Monday, ..., 6 is Saturday)
    const currentDayOfWeek = currentDate.day();
    // Calculate the difference between the current day and the first day of the week (Sunday)
    let difference = currentDayOfWeek - 0; // Assuming Sunday is the first day of the week
    // Calculate the first day of the week
    difference = 200;
    const firstDayOfWeek = currentDate.subtract(difference, "day");
    let from = firstDayOfWeek.format("YYYY-MM-DD");
    // Calculate the last day of the week
    const lastDayOfWeek = firstDayOfWeek.add(difference + 6, "day");
    // Format dates as YYYY-MM-DD
    let to = lastDayOfWeek.format("YYYY-MM-DD");

    // const currentDate = moment();

    // // Calculate from 300 days before the current date
    // const from = currentDate.clone().subtract(3, "days").format("YYYY-MM-DD");

    // // Calculate to 300 days after the current date
    // const to = currentDate.clone().add(3, "days").format("YYYY-MM-DD");
    fetchTrainerTimetable(from, to);
    return () => { };
  }, [selectedTrainer]);

  const CalendarRender = () => {
    return (
      <div className="timetable-container">
        <div className="timetable-title">
          <Typography variant="h6">TRAINER SCHEDULE</Typography>

        </div>
        <div className="timetable-search" >
          {userRole !== "Trainer" ? (
            <Autocomplete
              value={selectedTrainer}
              onChange={(event, newValue) => {
                setSelectedTrainer(newValue);
              }}
              // inputValue={inputValue}
              // onInputChange={(event, newInputValue) => {
              //   setInputValue(newInputValue);
              // }}
              options={trainers}
              getOptionLabel={(trainer) => trainer.email}
              style={{ width: "300px" }}
              renderInput={(params) => (
                <TextField {...params} label="Trainer" />
              )}
            />
          ) : null}
          {userRole === "Manager" ?
            <ThemeProvider theme={ochreTheme}>
              <Button variant="contained"
                color="ochre"
                style={{ marginTop: "20px" }}
                onClick={() => setRenderedIndex(4)}>
                Add Trainer Schedule
              </Button>
            </ThemeProvider>
            : null}
        </div>
        <div className="timetable-calender-container">
          {selectedTrainer && (
            <Calendar
              localizer={localizer}
              events={occupied}
              defaultView="week"
              views={{
                agenda: true,
                day: true,
                week: true,
                month: true,
                // work_week: true,
              }}
              startAccessor={(event) => {
                return new Date(event.start);
              }}
              endAccessor={(event) => {
                return new Date(event.end);
              }}
              style={{ width: "100%", height: 600 }}
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
              eventPropGetter={(event) => {
                return {
                  style: {
                    //3: workshop, 5 training course, 2 consultant, 7: off slot
                    backgroundColor: event.typeId === 3 ? 'ocean' : event.typeId === 2 ? 'orange' : event.typeId === 5 ? 'green' : 'grey',
                    // Add more styles as needed
                    width: "100%",
                  },
                };
              }}
            />
          )}
        </div>
      </div>
    );
  };

  const renderComponents = [
    <CalendarRender />,
    <TrainerSlotDetailComponent
      entityId={selected?.id}
      callbackToCalendar={onCallbackToCalendar}
    />,
    <Timetable_TicketDetailView
      callbackToCalendar={onCallbackToCalendar}
      ticketIdForDetail={selected?.entityId}
    />,
    <TimetableTrainerSlotDetailComponent
      trainerSlotId={selected?.id}
      callBackTimetable={onCallbackToCalendar}
    />,
    <AddTrainerBusy renderedIndex={renderIndexFunction} />
  ];
  return (
    <>
      <div className="workshop-container">
        <ReworkSidebar selectTab={3} />
        <ToastContainer />
        <OffSlotDialogComponent selectedSlot={selected} open={open} handleClose={handleClose}/>
        <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}>
          {renderComponents[renderedIndex]}
        </Box>
      </div>
    </>
  );
}

export default TimetableComponent;

import React, { useState, useEffect } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  Checkbox,
  Alert,
  Grid,
  CircularProgress,
  Drawer,
  Typography,
  Box,
  ThemeProvider,
  AppBar,
  IconButton,
  Toolbar,
  Divider,
  Button,
} from "@mui/material";
import { Img } from "react-image";
import { Close } from "@mui/icons-material";
import addonService from "../../services/addon.service";
import timetableService from "../../services/timetable.service";
import trainingCourseManagementService from "../../services/trainingcourse-management.service";
import { ochreTheme } from "../themes/Theme";
import { ToastContainer, toast } from "react-toastify";
import SkillDoneDialog from "./SkillDoneDialog";
import { jwtDecode } from "jwt-decode";

const TimetableTrainerSlotDetailComponent = ({
  trainerSlotId,
  callBackTimetable,
}) => {
  const userRole = jwtDecode(
    JSON.parse(localStorage.getItem("user-token"))
  ).role;
  const [renderDialog, setRenderDialog] = useState(0);

  const [slotList, setSlotList] = useState([]);
  const [timetableDetail, setTimetableDetail] = useState(null);
  // Simulate fetching bird information based on customerId
  // Replace this with your actual API call or data fetching logic
  const fetchTimetableData = async () => {
    try {
      //console.log(trainerSlotId);
      let params = {
        trainerSlotId: trainerSlotId,
      };
      let res = await trainingCourseManagementService
        .getTimetableReportView(params)
        .then((response) => {
          console.log(response);
          setTimetableDetail(response);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchSlotData = async () => {
    try {
      let res = await timetableService.getSlotTime();
      setSlotList(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchTimetableData();
    fetchSlotData();
  }, [trainerSlotId]);

  const handleMarkSlotDone = (reportId) => {
    console.log(reportId);
    let params = {
      birdTrainingReportId: reportId,
    };
    trainingCourseManagementService
      .markTrainingSlotDone(params)
      .then((response) => {
        console.log("Success:", response);
        if (response.status == 206) {
          toast.success("Training skill have done!");
          setRenderDialog(1);
        }
        if (response.status == 200) {
          toast.success("Mark slot done!");
        }
        //callBackTimetable();
      })
      .catch((error) => {
        // Handle errors
        toast.error(error.response.data.message);
        console.log(error.response);
      });
  };
  function oncallbackDone() {
    setRenderDialog(0);
    callBackTimetable();
  }
  return (
    <ThemeProvider theme={ochreTheme}>
      {renderDialog == 1 && (
        <SkillDoneDialog
          trainingProgressId={timetableDetail?.progressId}
          renderIndex={renderDialog}
          callbackDone={oncallbackDone}
        />
      )}
      <ToastContainer />
      <AppBar
        position="static"
        color="ochre"
        sx={{ borderBottomRightRadius: 20, borderBottomLeftRadius: 20 }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
            onClick={callBackTimetable}
          >
            <Close />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              fontWeight: 700,
            }}
          >
            Training Course Detail
          </Typography>
        </Toolbar>
      </AppBar>
      <div>
        {timetableDetail != null && (
          <>
            <div className="timetable-birdtraining-container">
              <div className="timetable-birdtraining-left">
                <h3>BIRD INFO</h3>
                <div className="timetable-birdtraining-small">
                  <p id="label" >Bird Name:</p>
                  <p id="info">{timetableDetail.birdName}</p>
                </div>
                <div className="timetable-birdtraining-small">
                  <p id="label">Species:</p>
                  <p id="info">{timetableDetail.birdSpeciesName}</p>
                </div>
                <div className="timetable-birdtraining-small">
                  <p id="label">Color:</p>
                  <p id="info">{timetableDetail.birdColor}</p>
                </div>
                <img src={timetableDetail.birdPicture}></img>
              </div>
              <div className="timetable-birdtraining-right">
                <div className="timetable-birdtraining-small">
                  <p id="label">Skill:</p>
                  <p id="info">{timetableDetail.birdSkillName}</p>
                </div>
                <div className="timetable-birdtraining-small">
                  <p id="label">Training Date:</p>
                  <p id="info">{addonService.formatDate(timetableDetail.trainingDate)}</p>
                </div>
                {slotList != null &&
                  slotList
                    .filter((cls) => cls.id == timetableDetail.slotId)
                    .map((cls) => (
                      <>
                        <div className="timetable-birdtraining-small">
                          <p id="label">Start Time:</p>
                          <p id="info">{cls.startTime}</p>
                        </div>
                        <div className="timetable-birdtraining-small">
                          <p id="label">End Time:</p>
                          <p id="info">{cls.endTime}</p>
                        </div>
                      </>
                    ))}
                <div className="timetable-birdtraining-small">
                  <p id="label">Training Description:</p>
                  <p id="info">{timetableDetail.birdSkillDescription}</p>
                </div>
                {timetableDetail.status == "NotYet" && (
                  <ThemeProvider theme={ochreTheme}>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleMarkSlotDone(timetableDetail.id)}
                    >
                      Mark Training Done
                    </Button>
                  </ThemeProvider>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default TimetableTrainerSlotDetailComponent;

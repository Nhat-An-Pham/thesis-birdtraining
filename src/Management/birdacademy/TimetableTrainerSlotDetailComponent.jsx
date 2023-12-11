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

const TimetableTrainerSlotDetailComponent = ({
  trainerSlotId,
  callBackTimetable,
}) => {
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
    <ThemeProvider padding={20} theme={ochreTheme}>
      {renderDialog == 1 && (
        <SkillDoneDialog
          trainingProgressId={timetableDetail?.progressId}
          renderIndex={renderDialog}
          callbackDone={oncallbackDone}
        />
      )}
      <ToastContainer />
      <AppBar position="static" color="ochre">
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
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Training Course Detail
          </Typography>
        </Toolbar>
      </AppBar>
      <Divider />
      <div style={{ margin: "50px" }}>
        {timetableDetail != null && (
          <div>
            <Grid container spacing={1}>
              {slotList != null &&
                slotList
                  .filter((cls) => cls.id == timetableDetail.slotId)
                  .map((cls) => (
                    <>
                      <Grid item xs={1}>
                        <>Start Time</>
                      </Grid>
                      <Grid item xs={1.25}>
                        <>{cls.startTime}</>
                      </Grid>
                      <Grid item xs={1}>
                        <>End Time</>
                      </Grid>
                      <Grid item xs={1.25}>
                        <>{cls.endTime}</>
                      </Grid>
                    </>
                  ))}
              <Grid item xs={2}>
                <>Training Date: </>
              </Grid>
              <Grid item xs={5}>
                <>{addonService.formatDate(timetableDetail.trainingDate)}</>
              </Grid>
              <Grid item xs={2}>
                <>Bird Skill Name: </>
              </Grid>
              <Grid item xs={10}>
                <>{timetableDetail.birdSkillName}</>
              </Grid>
              <Grid item xs={2}>
                <>Bird Skill Description: </>
              </Grid>
              <Grid item xs={10}>
                <>{timetableDetail.birdSkillDescription}</>
              </Grid>
              <Grid item xs={2}>
                <>Bird Name: </>
              </Grid>
              <Grid item xs={10}>
                <>{timetableDetail.birdName}</>
              </Grid>
              <Grid item xs={2}>
                <>Bird Species: </>
              </Grid>
              <Grid item xs={10}>
                <>{timetableDetail.birdSpeciesName}</>
              </Grid>
              <Grid item xs={2}>
                <>Bird Color: </>
              </Grid>
              <Grid item xs={10}>
                <>{timetableDetail.birdColor}</>
              </Grid>
              <Grid item xs={2}>
                <>Bird Picture: </>
              </Grid>
              <Grid item xs={10}>
                <Img
                  src={timetableDetail.birdPicture}
                  alt="Bird Picture"
                  style={{ width: "200px", height: "150px" }}
                />
              </Grid>
            </Grid>
            {timetableDetail.status == "NotYet" && (
              <ThemeProvider theme={ochreTheme}>
                <Button
                  variant="contained"
                  color="ochre"
                  onClick={() => handleMarkSlotDone(timetableDetail.id)}
                >
                  Mark Training Done
                </Button>
              </ThemeProvider>
            )}
          </div>
        )}
      </div>
    </ThemeProvider>
  );
};

export default TimetableTrainerSlotDetailComponent;

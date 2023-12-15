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
<<<<<<< Updated upstream
          <div style={{ padding: "20px 40px" }}>
            <table
              style={{
                border: "none",
                padding: "0px",
                borderCollapse: "separate",
                borderSpacing: "1rem 0.5rem",
                color: "#64645f",
                fontSize: "1rem",
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                {/* show bird details */}
                <div
                  style={{
                    width: "100%",
                  }}
                >
                  <tr>
                    {/* bird skill name */}
                    <td style={{ fontSize: "1rem", fontWeight: 700 }}>
                      <>Bird Skill Name: </>
                    </td>
                    <td item xs={10}>
                      <>{timetableDetail.birdSkillName}</>
                    </td>
                  </tr>

                  <tr>
                    {/* skill describe */}
                    <td style={{ fontSize: "1rem", fontWeight: 700 }}>
                      <>Bird Skill Description: </>
                    </td>
                    <td item xs={10}>
                      <>{timetableDetail.birdSkillDescription}</>
                    </td>
                  </tr>

                  <tr>
                    {/* bird name */}
                    <td style={{ fontSize: "1rem", fontWeight: 700 }}>
                      <>Bird Name: </>
                    </td>
                    <td item xs={10}>
                      <>{timetableDetail.birdName}</>
                    </td>
                  </tr>

                  <tr>
                    {/* species */}
                    <td style={{ fontSize: "1rem", fontWeight: 700 }}>
                      <>Bird Species: </>
                    </td>
                    <td item xs={10}>
                      <>{timetableDetail.birdSpeciesName}</>
                    </td>
                  </tr>

                  <tr>
                    {/* color bird */}
                    <td style={{ fontSize: "1rem", fontWeight: 700 }}>
                      <>Bird Color: </>
                    </td>
                    <td item xs={10}>
                      <>{timetableDetail.birdColor}</>
                    </td>
                  </tr>
                </div>

                {/* show date, time and picture */}
                <div
                  style={{
                    width: "100%",
                  }}
                >
                  {slotList != null &&
                    slotList
                      .filter((cls) => cls.id == timetableDetail.slotId)
                      .map((cls) => (
                        <>
                          <tr>
                            <td style={{ fontSize: "1.2rem", fontWeight: 700 }}>
                              <>Start Time</>
                            </td>
                            <td item xs={1.25}>
                              <>{cls.startTime}</>
                            </td>
                          </tr>

                          <tr>
                            <td style={{ fontSize: "1.2rem", fontWeight: 700 }}>
                              <>End Time</>
                            </td>
                            <td item xs={1.25}>
                              <>{cls.endTime}</>
                            </td>
                          </tr>
                        </>
                      ))}
                  {/* traning date */}
                  <tr>
                    <td style={{ fontSize: "1.2rem", fontWeight: 700 }}>
                      <>Training Date: </>
                    </td>
                    <td item xs={5}>
                      {addonService.formatDate(timetableDetail.trainingDate)}
                    </td>
                  </tr>
                  {/* picture */}
                  <tr
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginLeft: 16,
                    }}
                  >
                    <td
                      style={{
                        fontSize: "1.2rem",
                        fontWeight: 700,
                        marginRight: 40,
                      }}
                    >
                      <>Bird Picture: </>
                    </td>
                    <td>
                      <Img
                        src={timetableDetail.birdPicture}
                        alt="Bird Picture"
                        style={{ width: "200px", height: "150px" }}
                      />
                    </td>
                  </tr>
                </div>
=======
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
>>>>>>> Stashed changes
              </div>
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default TimetableTrainerSlotDetailComponent;

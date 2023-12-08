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
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Button,
  ThemeProvider,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import { Img } from "react-image";
import RawHTMLRenderer from "../../component/htmlRender/htmlRender";
import TrainingCourseManagement from "../../../services/trainingcourse-management.service";
import { AddBoxOutlined, Close, InfoOutlined } from "@mui/icons-material";
import { ochreTheme } from "../../themes/Theme";
import { toast } from "react-toastify";
import CreateTrainingCourseComponent from "./CreateTrainingCourseComponent";
import UpdateTrainingCourseComponent from "./UpdateTrainingCourseComponent";
// import { toast } from 'react-toastify';

const TrainingCourseMng = ({ callBackMainManagement }) => {
  // let BASE_URL = 'https://localhost:7176/api';

  const [renderAllTrainingCourse, setRenderAllTrainingCourse] = useState(true);
  const [renderCreateCourse, setRenderCreateCourse] = useState(false);
  const [renderUpdateCourse, setRenderUpdateCourse] = useState(false);

  //const [selectedTrainingCourse, setSelectedTrainingCourse] = useState(null);
  const [contextMenus, setContextMenus] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState();
  const [trainingCourse, setTrainingCourse] = useState([]);
  const detailClick = (trainingCourse) => {
    setSelectedCourse(trainingCourse);
    setRenderUpdateCourse(true);
    setRenderAllTrainingCourse(false);
    setRenderCreateCourse(false);
  };
  const createCourseClick = () => {
    setRenderCreateCourse(true);
    setRenderAllTrainingCourse(false);
  };
  // Fetch workshops and classes based on the status filter
  async function fetchData() {
    try {
      let params = {
        $orderby: `id desc`,
      };
      let response = await TrainingCourseManagement.getAllTrainingCourse(
        params
      );
      setTrainingCourse(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    fetchData();
    // console.log(workshops);
  }, []);
  useEffect(() => {
    if (trainingCourse) {
      setContextMenus(new Array(trainingCourse.length).fill(null));
    }
    return () => {};
  }, [trainingCourse]);

  const handleActiveCourse = async (trainingCourse) => {
    setSelectedCourse(trainingCourse);
    try {
      console.log(trainingCourse);
      let params = {
        trainingCourseId: trainingCourse.id,
      };
      let response = await TrainingCourseManagement.activeTrainingCourse(
        params
      );
      if (response.status === 200) {
        toast.success("Active successfully!");
        fetchData();
      } else {
        toast.error("An error has occured!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
      // console.log(error.response.data);
    }
  };
  const handleDisableCourse = async (trainingCourse) => {
    setSelectedCourse(trainingCourse);
    try {
      console.log(trainingCourse);
      let params = {
        trainingCourseId: trainingCourse.id,
      };
      let response = await TrainingCourseManagement.disableTrainingCourse(
        params
      );
      if (response.status === 200) {
        toast.success("Disable successfully!");
        fetchData();
      } else {
        toast.error("An error has occured!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
      // console.log(error.response.data);
    }
  };
  const onCallBackTrainingCourseManagement = async (selectedCourse) => {
    fetchData();
    setSelectedCourse(selectedCourse);
    setRenderAllTrainingCourse(true);
    setRenderCreateCourse(false);
    setRenderUpdateCourse(false);
  };
  const onCallBackUpdateSkillManagement = async (selectedCourse) => {
    fetchData();
    setSelectedCourse(selectedCourse);
    setRenderAllTrainingCourse(false);
    setRenderCreateCourse(false);
    setRenderUpdateCourse(true);
  };
  const onCallBackCreateCourse = async (selectedCourse) => {
    fetchData();
    setSelectedCourse(selectedCourse);
    setRenderAllTrainingCourse(false);
    setRenderCreateCourse(false);
    setRenderUpdateCourse(true);
  };
  return (
    <div>
      <ThemeProvider theme={ochreTheme}>
        {/* <AppBar position="static" color="ochre">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              sx={{ mr: 2 }}
              onClick={callBackMainManagement}
            >
              <Close />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              Training Course Management
            </Typography>
          </Toolbar>
        </AppBar> */}
        {renderAllTrainingCourse && (
          <Grid style={{ padding: 20 }} marginTop={1} container spacing={1}>
            <Button
              sx={{ float: "left", margin: "20px" }}
              variant="contained"
              color="ochre"
              onClick={() => createCourseClick()}
            >
              Create new training course
            </Button>
            {/* <Button
              sx={{ float: "right", margin: "20px" }}
              onClick={() => callBackMainManagement()}
            >
              Back
            </Button> */}
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Image</TableCell>
                      <TableCell>Title</TableCell>
                      <TableCell>Bird Species</TableCell>
                      {/* <TableCell>Description</TableCell> */}
                      <TableCell>Total Slot</TableCell>
                      <TableCell>Price (USD)</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {trainingCourse && trainingCourse.length > 0 ? (
                      trainingCourse.map((course, index) => (
                        <TableRow
                          hover
                          // selected
                          key={course.id}
                          className={
                            selectedCourse != null &&
                            course.id === selectedCourse.id
                              ? "Mui-selected"
                              : ""
                          }
                        >
                          <TableCell className="image-cell">
                            <Img
                              src={course.picture.split(",")[0]}
                              unloader={<CircularProgress />}
                            />
                          </TableCell>
                          <TableCell style={{ width: 300 }}>
                            {course.title}
                          </TableCell>
                          <TableCell>{course.birdSpeciesName}</TableCell>
                          {/* <TableCell
                            style={{
                              width: 500,
                              flexGrow: 1,
                            }}
                          >
                            <Typography>
                              <RawHTMLRenderer
                                htmlContent={course.description}
                              />
                            </Typography>
                          </TableCell> */}
                          <TableCell style={{ width: 0.125 }} align="center">
                            {course.totalSlot}
                          </TableCell>
                          <TableCell style={{ width: 0.125 }} align="center">
                            {course.totalPrice}
                          </TableCell>
                          <TableCell style={{ width: 0.125 }} align="center">
                            <Checkbox
                              checked={course.status === "Active"}
                              // onChange={() => switchWorkshopStatus(workshop)}
                              sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                            />
                          </TableCell>
                          {course.status === "Active" && (
                            <TableCell>
                              <Button
                                variant="contained"
                                color="ochre"
                                onClick={() => handleDisableCourse(course)}
                              >
                                Disable
                              </Button>
                            </TableCell>
                          )}
                          {course.status !== "Active" && (
                            <TableCell>
                              <Button
                                variant="contained"
                                color="ochre"
                                onClick={() => handleActiveCourse(course)}
                              >
                                Active
                              </Button>
                            </TableCell>
                          )}
                          <TableCell>
                            <Button
                              variant="contained"
                              color="ochre"
                              onClick={() => detailClick(course)}
                            >
                              View Detail
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} align="center">
                          No record!
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        )}
        {renderCreateCourse && (
          <CreateTrainingCourseComponent
            callbackList={onCallBackTrainingCourseManagement}
            callbackCreateCourse={onCallBackCreateCourse}
          />
        )}
        {renderUpdateCourse && (
          <UpdateTrainingCourseComponent
            trainingCourse={selectedCourse}
            callbackUpdateCourse={onCallBackTrainingCourseManagement}
            callbackUpdateSkil={onCallBackUpdateSkillManagement}
          />
        )}
      </ThemeProvider>
    </div>
  );
};

export default TrainingCourseMng;

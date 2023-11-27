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
} from "@mui/material";
import { Img } from "react-image";
import RawHTMLRenderer from "../../component/htmlRender/htmlRender";
import TrainingCourseManagement from "../../../services/trainingcourse-management.service";
import { AddBoxOutlined, InfoOutlined } from "@mui/icons-material";
import { ochreTheme } from "../../themes/Theme";
import { toast } from "react-toastify";
import CreateTrainingCourseComponent from "./CreateTrainingCourseComponent";
// import { toast } from 'react-toastify';

const TrainingCourseMng = ({ callBackMainManagement }) => {
  // let BASE_URL = 'https://localhost:7176/api';

  const [renderAllTrainingCourse, setRenderAllTrainingCourse] = useState(true);
  const [renderCreateCourse, setRenderCreateCourse] = useState(false);

  const [selectedTrainingCourse, setSelectedTrainingCourse] = useState(null);
  const [contextMenus, setContextMenus] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState();
  const [trainingCourse, setTrainingCourse] = useState([]);

  const handleContextMenuForRow = (event, index) => {
    event.preventDefault();
    const newContextMenus = [...contextMenus];
    newContextMenus[index] = {
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
    };
    setContextMenus(newContextMenus);
  };

  const handleCloseForRow = (index) => {
    const newContextMenus = [...contextMenus];
    newContextMenus[index] = null;
    setContextMenus(newContextMenus);
  };
  const detailClick = (trainingCourse) => {
    setSelectedCourse(trainingCourse);
    setRenderAllTrainingCourse(false);
  };
  const createCourseClick = () => {
    setRenderCreateCourse(true);
    setRenderAllTrainingCourse(false);
  };
  // Fetch workshops and classes based on the status filter
  async function fetchData() {
    try {
      let response = await TrainingCourseManagement.getAllTrainingCourse();
      setTrainingCourse(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    fetchData();
    // console.log(workshops);
  }, [trainingCourse]);
  useEffect(() => {
    if (trainingCourse) {
      setContextMenus(new Array(trainingCourse.length).fill(null));
    }

    return () => {};
  }, [trainingCourse]);

  const handleActiveCourse = async (trainingCourseId) => {
    try {
      console.log(trainingCourseId);
      let params = {
        trainingCourseId: trainingCourseId,
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
  const handleDisableCourse = async (trainingCourseId) => {
    try {
      console.log(trainingCourseId);
      let params = {
        trainingCourseId: trainingCourseId,
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
  const onCallBackCourseManagement = async () => {
    fetchData();
    setRenderAllTrainingCourse(true);
    setRenderCreateCourse(false);
  };
  return (
    <div>
      <ThemeProvider theme={ochreTheme}>
        {renderAllTrainingCourse && (
          <Grid marginTop={1} container spacing={1}>
            <Button
              sx={{ float: "left", margin: "20px" }}
              variant="contained"
              color="ochre"
              onClick={() => createCourseClick()}
            >
              Create new training course
            </Button>
            <Button
              sx={{ float: "right", margin: "20px" }}
              onClick={() => callBackMainManagement()}
            >
              Back
            </Button>
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Image</TableCell>
                      <TableCell>Title</TableCell>
                      <TableCell>Description</TableCell>
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
                          // onClick={() => handleWorkshopClick(workshop)}
                          onContextMenu={(event) =>
                            handleContextMenuForRow(event, index)
                          }
                          style={{ cursor: "context-menu" }}
                          className={
                            course.id === selectedTrainingCourse
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
                          <TableCell
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
                          </TableCell>
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
                                onClick={() => handleDisableCourse(course.id)}
                              >
                                Disable Course
                              </Button>
                            </TableCell>
                          )}
                          {course.status !== "Active" && (
                            <TableCell>
                              <Button
                                variant="contained"
                                color="ochre"
                                onClick={() => handleActiveCourse(course.id)}
                              >
                                Active Course
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
                          <Menu
                            open={contextMenus[index] !== null}
                            onClose={() => handleCloseForRow(index)}
                            anchorReference="anchorPosition"
                            anchorPosition={
                              contextMenus[index] !== null
                                ? {
                                    top: contextMenus[index]?.mouseY,
                                    left: contextMenus[index]?.mouseX,
                                  }
                                : undefined
                            }
                          >
                            <MenuItem>TrainingCourse: {course.title}</MenuItem>
                            <MenuItem
                              onClick={() => {
                                detailClick(course);
                                // handleCloseForRow(index);
                              }}
                            >
                              <ListItemIcon>
                                <InfoOutlined />
                              </ListItemIcon>
                              <ListItemText
                                primary={"Training course detail"}
                              />
                            </MenuItem>
                            <MenuItem
                              onClick={() => {
                                createCourseClick(course);
                                // handleCloseForRow(index);
                              }}
                            >
                              <ListItemIcon>
                                <AddBoxOutlined />
                              </ListItemIcon>
                              <ListItemText primary={"New class"} />
                            </MenuItem>
                          </Menu>
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
            callbackCreateCourse={onCallBackCourseManagement}
          />
        )}
      </ThemeProvider>
    </div>
  );
};

export default TrainingCourseMng;

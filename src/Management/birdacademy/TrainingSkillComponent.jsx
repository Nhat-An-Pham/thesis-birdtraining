import React, { useState, useEffect } from "react";
import "./trainingSkillComponent.scss";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Grid,
} from "@mui/material";
import TrainerListByBirdSkill from "./TrainerListByBirdSkillComponent";
import trainingCourseManagementService from "../../../src/services/trainingcourse-management.service";
import BirdTrainingReportComponent from "./BirdTrainingReportComponent";
import { Close } from "@mui/icons-material";
import { toast } from "react-toastify";

const TrainingSkillComponent = ({ requestedId, callBackMainManagement }) => {
  const [renderTrainer, setRenderTrainer] = useState(false);
  const [renderReport, setRenderReport] = useState(false);
  const [renderProgress, setRenderProgress] = useState(true);

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedBirdSkillId, setSelectedBirdSkillId] = useState(null);
  const [selectedProgressId, setSelectedProgressId] = useState(null);
  const [selectedProgress, setSelectedProgress] = useState(null);
  const handleTrainerAssign = (birdSkillId, progressId) => {
    setSelectedProgressId(progressId);
    console.log("progress " + progressId);
    setSelectedBirdSkillId(birdSkillId);
    console.log("progress " + birdSkillId);
    setRenderTrainer(true);
    setRenderReport(false);
  };
  const handleViewTrainingDetail = (birdSkillId, progressId, item) => {
    console.log(progressId);
    setSelectedProgressId(progressId);
    console.log(birdSkillId);
    setSelectedBirdSkillId(birdSkillId);
    console.log(item);
    setSelectedProgress(item);
    setRenderReport(true);
    setRenderTrainer(false);
    setRenderProgress(false);
  };

  // const [selectedProgress, setSelectedProgress] = useState(null);
  // const handleUserProgressClick = (progressId) => {
  //       setSelectedProgress(progressId);
  //       setSelectedBirdSkillId(null);
  // };

  const [trainingProgress, setTrainingProgress] = useState([]);
  const fetchData = async () => {
    try {
      // Replace this URL with your actual API endpoint //https://localhost:7176
      console.log(requestedId);
      let params = {
        $orderby: "id asc",
        birdTrainingCourseId: requestedId,
      };
      let response =
        await trainingCourseManagementService.getBirdTrainingProgressByRequestId(
          params
        );
      console.log(response);
      setTrainingProgress(response);
    } catch (error) {
      console.error("Error fetching bird trainingProgress data:", error);
    }
  };
  const fetchRequestData = async () => {
    try {
      // Replace this URL with your actual API endpoint //https://localhost:7176
      console.log(requestedId);
      let params = {
        $filter: `id eq ${requestedId}`,
      };
      let response =
        await trainingCourseManagementService.getAllBirdTrainingCourse(params);
      console.log(response);
      setSelectedRequest(response[0]);
    } catch (error) {
      console.error("Error fetching bird trainingProgress data:", error);
    }
  };
  useEffect(() => {
    // Simulate fetching bird information based on customerId
    // Replace this with your actual API call or data fetching logic
    fetchData();
    fetchRequestData();
  }, [requestedId]);
  const onCallbackAssigned = async () => {
    fetchData();
    fetchRequestData();
    setRenderProgress(true);
    setRenderTrainer(false);
    setRenderReport(false);
    console.log("onCallbackAssigned");
    setSelectedProgressId(null);
  };
  function handleCallBackMainButton() {
    callBackMainManagement();
  }
  async function handleCallBackConfirmButton() {
    let param = {
      requestedId: requestedId,
    };
    let res = await trainingCourseManagementService.sendNotiConfirmedRequest(
      param
    );
    if (res.status == 200) {
      toast.success("Send notify email success!");
      callBackMainManagement();
    } else {
      toast.error("An error has occur!");
      console.log(res);
    }
  }
  return (
    <div>
      <Grid sx={{ padding: 2 }}>
        <AppBar position="static" color="ochre" sx={{ borderRadius: 3 }}>
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
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "block" },
                fontWeight: 700,
              }}
            >
              Training Details By BirdSkill
            </Typography>
          </Toolbar>
        </AppBar>
      </Grid>
      {renderProgress && (
        <div style={{ padding: 20 }}>
          <TableContainer
            sx={{
              boxShadow:
                "0px 2px 4px 2px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
              borderRadius: 3,
            }}
            className="table-container"
            component={Paper}
          >
            <Table className="table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>
                    Bird Skill Name
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Trainer Name</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Trainer Email</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>
                    Training Progression
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>
                    Total Training Slot
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {trainingProgress.map((item) => (
                  <TableRow
                    key={item.id}
                    style={{
                      cursor: "pointer",
                      background:
                        selectedProgressId === item.id ? "#f0f0f0" : "white",
                    }}
                  >
                    <TableCell>{item.birdSkillName}</TableCell>
                    <TableCell>{item.trainerName}</TableCell>
                    <TableCell>{item.trainerEmail}</TableCell>
                    <TableCell>
                      <div
                        style={{
                          width: "100%",
                          background: "#eee",
                          padding: "5px",
                          borderRadius: "4px",
                          border: "0.5px solid black",
                        }}
                      >
                        <div
                          style={{
                            width: `${item.trainingProgression * 100}%`,
                            height: "20px",
                            background: "#4caf50",
                            borderRadius: "4px",
                            transition: "width 0.5s",
                          }}
                        ></div>
                      </div>
                      <p>{`${item.trainingProgression * 100}% Complete`}</p>
                    </TableCell>
                    <TableCell sx={{ padding: "16px 16px 16px 70px" }}>
                      {item.totalTrainingSlot}
                    </TableCell>
                    <TableCell>{item.status}</TableCell>
                    {item.status === "WaitingForAssign" && ( //WaitingForAssign
                      <TableCell>
                        <Button
                          onClick={() =>
                            handleTrainerAssign(item.birdSkillId, item.id)
                          }
                        >
                          Assign trainer
                        </Button>
                      </TableCell>
                    )}
                    {item.status === "Assigned" && (
                      <TableCell>
                        <Button
                          onClick={() =>
                            handleTrainerAssign(item.birdSkillId, item.id)
                          }
                        >
                          Re-assign trainer
                        </Button>
                      </TableCell>
                    )}
                    {item.status !== "Assigned" &&
                      item.status !== "WaitingForAssign" && (
                        <TableCell></TableCell>
                      )}

                    <TableCell>
                      <Button
                        onClick={() =>
                          handleViewTrainingDetail(
                            item.birdSkillId,
                            item.id,
                            item
                          )
                        }
                      >
                        View training details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              sx={{
                marginTop: "20px",
                paddingLeft: "35px",
                paddingRight: "35px",
                boxShadow:
                  "0px 2px 4px 2px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
                marginRight: "25px",
              }}
              className="button"
              onClick={() => handleCallBackMainButton()}
            >
              Cancel
            </Button>

            {selectedRequest?.status == "Confirmed" && (
              <Button
                sx={{
                  marginTop: "20px",
                  paddingLeft: "35px",
                  paddingRight: "35px",
                }}
                variant="contained"
                color="success"
                className="button"
                onClick={() => handleCallBackConfirmButton()}
              >
                Send Mail Confirm
              </Button>
            )}
          </div>
        </div>
      )}

      {renderTrainer && (
        <TrainerListByBirdSkill
          selectedProgressId={selectedProgressId}
          birdSkillId={selectedBirdSkillId}
          callbackAssigned={onCallbackAssigned}
        />
      )}
      {renderReport && (
        <BirdTrainingReportComponent
          selectedProgress={selectedProgress}
          birdSkillId={selectedBirdSkillId}
          callbackAssigned={onCallbackAssigned}
        />
      )}
    </div>
  );
};

export default TrainingSkillComponent;

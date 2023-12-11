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
import { jwtDecode } from "jwt-decode";

const TrainerAssignedTrainingSkill = () => {
  const user = trainingCourseManagementService.getCurrentUser();
  const [renderReport, setRenderReport] = useState(false);
  const [renderProgress, setRenderProgress] = useState(true);

  const [selectedBirdSkillId, setSelectedBirdSkillId] = useState(null);
  const [selectedProgressId, setSelectedProgressId] = useState(null);
  const [selectedProgress, setSelectedProgress] = useState(null);
  const handleViewTrainingDetail = (birdSkillId, progressId, item) => {
    console.log(progressId);
    setSelectedProgressId(progressId);
    console.log(birdSkillId);
    setSelectedBirdSkillId(birdSkillId);
    console.log(item);
    setSelectedProgress(item);
    setRenderReport(true);
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
      console.log(user);
      let params = {
        trainerId: user.id,
      };
      let response =
        await trainingCourseManagementService.getBirdTrainingProgressByTrainerId(
          params
        );
      console.log(response);
      setTrainingProgress(response);
    } catch (error) {
      console.error("Error fetching bird trainingProgress data:", error);
    }
  };
  useEffect(() => {
    // Simulate fetching bird information based on customerId
    // Replace this with your actual API call or data fetching logic
    fetchData();
  }, []);
  const onCallbackAssigned = async () => {
    fetchData();
    setRenderProgress(true);
    setRenderReport(false);
    console.log("onCallbackAssigned");
    setSelectedProgressId(null);
  };
  return (
    <div>
      {renderProgress && (
        <>
          <TableContainer
            style={{ padding: 20 }}
            className="table-container"
            component={Paper}
          >
            <Table className="table">
              <TableHead>
                <TableRow>
                  <TableCell>Bird Skill Name</TableCell>
                  <TableCell>Trainer Name</TableCell>
                  <TableCell>Training Progression</TableCell>
                  <TableCell>Total Training Slot</TableCell>
                  <TableCell>Status</TableCell>
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
                    <TableCell>
                      <div
                        style={{
                          width: "100%",
                          background: "#eee",
                          padding: "5px",
                          borderRadius: "4px",
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
                    <TableCell>{item.totalTrainingSlot}</TableCell>
                    <TableCell>{item.status}</TableCell>
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
        </>
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

export default TrainerAssignedTrainingSkill;

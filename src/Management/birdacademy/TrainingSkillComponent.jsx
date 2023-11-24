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
} from "@mui/material";
import TrainerListByBirdSkill from "./TrainerListByBirdSkillComponent";
import trainingCourseManagementService from "../../../src/services/trainingcourse-management.service";
import BirdTrainingReportComponent from "./BirdTrainingReportComponent";

const TrainingSkillComponent = ({ requestedId, callBackMainManagement }) => {
  const [renderTrainer, setRenderTrainer] = useState(false);
  const [renderReport, setRenderReport] = useState(false);
  const [renderProgress, setRenderProgress] = useState(true);

  const [selectedBirdSkillId, setSelectedBirdSkillId] = useState(null);
  const [selectedProgressId, setSelectedProgressId] = useState(null);
  const handleTrainerAssign = (birdSkillId, progressId) => {
    setSelectedProgressId(progressId);
    console.log("progress " + progressId);
    setSelectedBirdSkillId(birdSkillId);
    console.log("progress " + birdSkillId);
    setRenderTrainer(true);
    setRenderReport(false);
  };
  const handleViewTrainingDetail = (progressId) => {
    setSelectedProgressId(progressId);
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
      const response = await fetch(
        `http://13.214.85.41/api/trainingcourse-staff/birdtrainingprogress-requestedId?birdTrainingCourseId=${requestedId}`
      );
      const data = await response.json();
      console.log(data);
      setTrainingProgress(data); // Assuming data is an array of bird information
    } catch (error) {
      console.error("Error fetching bird trainingProgress data:", error);
    }
  };
  useEffect(() => {
    // Simulate fetching bird information based on customerId
    // Replace this with your actual API call or data fetching logic
    fetchData();
  }, [requestedId]);
  const onCallbackAssigned = async () => {
    fetchData();
    setRenderProgress(true);
    setRenderTrainer(false);
    setRenderReport(false);
    console.log("onCallbackAssigned");
  };
  function handleCallBackMainButton() {
    callBackMainManagement();
  }
  return (
    <div>
      {renderProgress && (
        <>
          <TableContainer className="table-container" component={Paper}>
            <Table className="table">
              <TableHead>
                <h2>Training Skill</h2>
                <TableRow>
                  <TableCell>Bird Skill Name</TableCell>
                  <TableCell>Trainer Name</TableCell>
                  <TableCell>Training Progression</TableCell>
                  <TableCell>Total Training Slot</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {trainingProgress.map((item) => (
                  <TableRow key={item.id}>
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
                    {item.status == "WaitingForAssign" && ( //WaitingForAssign
                      <TableCell>
                        <button
                          onClick={() =>
                            handleTrainerAssign(item.birdSkillId, item.id)
                          }
                        >
                          Assign trainer
                        </button>
                      </TableCell>
                    )}
                    {item.status == "Assigned" && (
                      <TableCell>
                        <button
                          onClick={() =>
                            handleTrainerAssign(item.birdSkillId, item.id)
                          }
                        >
                          Re-assign trainer
                        </button>
                      </TableCell>
                    )}
                    <TableCell>
                      <button onClick={() => handleViewTrainingDetail(item.id)}>
                        View training details
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className="main-button-container">
            <button
              className="button"
              onClick={() => handleCallBackMainButton()}
            >
              Confirm
            </button>
            <button
              className="button"
              onClick={() => handleCallBackMainButton()}
            >
              Cancel
            </button>
          </div>
        </>
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
          progressId={selectedProgressId}
          callbackAssigned={onCallbackAssigned}
        />
      )}
    </div>
  );
};

export default TrainingSkillComponent;

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
  ThemeProvider,
} from "@mui/material";
import TrainerListByBirdSkill from "./TrainerListByBirdSkillComponent";
import trainingCourseManagementService from "../../../src/services/trainingcourse-management.service";
import BirdTrainingReportComponent from "./BirdTrainingReportComponent";
import { Close } from "@mui/icons-material";
import { jwtDecode } from "jwt-decode";
import SkillDoneDialog from "./SkillDoneDialog";
import { ochreTheme } from "../themes/Theme";

const TrainerAssignedTrainingSkill = () => {
  const user = trainingCourseManagementService.getCurrentUser();
  const [renderUpload, setRenderUpload] = useState(0);
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
    setRenderUpload(0);
  };
  const handleUpload = (progressId) => {
    setRenderUpload(1);
    setSelectedProgressId(progressId);
  };
  return (
    <div>
      {renderProgress && (
        <ThemeProvider theme={ochreTheme}>
        <div style={{padding: '20px'}}>
          <TableContainer
            className="table-container"
            component={Paper}
            sx={{
              boxShadow:
                "0px 2px 4px 2px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
              borderRadius: 3,
            }}
          >
            <Table className="table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>Bird Skill Name</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Trainer Name</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Training Progression</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Total Training Slot</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
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
                          border: '0.5px solid #404040'
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
                      {(item.status == "Pass" || item.status == "NotPass") && (
                        <Button
                          sx={{ marginRight: 0.5 }}
                          onClick={() => handleUpload(item.id)}
                        >
                          Upload Evidences
                        </Button>
                      )}
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

        </div>
        {renderReport && (
            <BirdTrainingReportComponent
              selectedProgress={selectedProgress}
              birdSkillId={selectedBirdSkillId}
              callbackAssigned={onCallbackAssigned}
            />
          )}
          {renderUpload == 1 && (
            <SkillDoneDialog
              trainingProgressId={selectedProgressId}
              renderIndex={renderUpload}
              callbackDone={onCallbackAssigned}
            />
          )}
        </ThemeProvider>
      )}
      
    </div>
  );
};

export default TrainerAssignedTrainingSkill;

import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Paper,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import addOnService from "../../services/addon.service";
import trainingCourseManagementService from "../../../src/services/trainingcourse-management.service";
import { Tab } from "@coreui/coreui";

const BirdTrainingReportComponent = ({ progressId, callbackAssigned }) => {
  const [reportList, setReportList] = useState([]);

  // Simulate fetching bird information based on customerId
  // Replace this with your actual API call or data fetching logic
  const fetchReportData = async () => {
    try {
      // Replace this URL with your actual API endpoint //https://localhost:7176
      console.log(progressId);
      let params = {
        progressId: progressId,
      };
      let response =
        await trainingCourseManagementService.getBirdTrainingReportByProgressId(
          params
        );
      console.log(response);
      setReportList(response);
    } catch (error) {
      console.error("Error fetching bird trainingProgress data:", error);
    }
  };

  useEffect(() => {
    fetchReportData();
  }, [progressId]);

  function handleCallBackSkillButton() {
    callbackAssigned();
  }
  return (
    <div>
      {reportList != null && reportList.length > 0 && (
        <TableContainer>
          <h2>Bird Training Report {progressId}</h2>
          <Table>
            <TableHead>
              <TableCell>Slot</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Trainer Id</TableCell>
              <TableCell>Trainer Name</TableCell>
              <TableCell>Status</TableCell>
            </TableHead>
            {reportList.map((rsl) => (
              <TableRow key={rsl.reportId}>
                <TableCell>{rsl.slotId}</TableCell>
                <TableCell>{rsl.date}</TableCell>
                <TableCell>{rsl.trainerId}</TableCell>
                <TableCell>{rsl.trainerName}</TableCell>
                <TableCell>{rsl.status}</TableCell>
              </TableRow>
            ))}
          </Table>

          <div className="main-button-container">
            <button
              className="button"
              onClick={() => handleCallBackSkillButton()}
            >
              Back
            </button>
          </div>
        </TableContainer>
      )}
    </div>
  );
};

export default BirdTrainingReportComponent;

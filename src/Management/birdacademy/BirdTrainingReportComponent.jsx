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

const BirdTrainingReportComponent = ({ progressId, callbackAssigned }) => {
  const [reportList, setReportList] = useState([]);

  // Simulate fetching bird information based on customerId
  // Replace this with your actual API call or data fetching logic
  const fetchReportData = async () => {
    try {
      // Replace this URL with your actual API endpoint
      const response = await fetch(
        `http://13.214.85.41/api/trainingcourse-staff/birdtrainingreport-progressid?progressId=${progressId}`
      );
      const data = await response.json();
      setReportList(data); // Assuming data is an array of bird information
    } catch (error) {
      console.error("Error fetching bird data:", error);
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
            </TableHead>
            {reportList.map((rsl) => (
              <TableRow key={rsl.reportId}>
                <TableCell>{rsl.slotId}</TableCell>
                <TableCell>{rsl.date}</TableCell>
                <TableCell>{rsl.trainerId}</TableCell>
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

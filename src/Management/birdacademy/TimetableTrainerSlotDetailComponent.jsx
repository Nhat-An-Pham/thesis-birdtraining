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
} from "@mui/material";
import trainingCourseManagementService from "../../../src/services/trainingcourse-management.service";

const TimetableTrainerSlotDetailComponent = ({
  trainerSlotId,
  callBackTimetable,
}) => {
  const [timetableDetail, setTimetableDetail] = useState(null);

  // Simulate fetching bird information based on customerId
  // Replace this with your actual API call or data fetching logic
  const fetchTimetableData = async () => {
    try {
      let params = {
        trainerSlotId: trainerSlotId,
      };
      let response =
        await trainingCourseManagementService.getTimetableReportView(params);
      setTimetableDetail(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchTimetableData();
  }, [trainerSlotId]);
  return (
    <div>
      {timetableDetail != null && (
        <div>
          <h2>Training slot detail</h2>
          <Grid container spacing={1}>
            <Grid item xs={1}>
              <Item>Slot</Item>
            </Grid>
            <Grid item xs={10}>
              <Item>{timetableDetail.slotId}</Item>
            </Grid>
            <Grid item xs={1}>
              <Item>Training Date</Item>
            </Grid>
            <Grid item xs={10}>
              <Item>{timetableDetail.TrainingDate}</Item>
            </Grid>
            <Grid item xs={1}>
              <Item>Bird Skill Name</Item>
            </Grid>
            <Grid item xs={10}>
              <Item>{timetableDetail.BirdSkillName}</Item>
            </Grid>
            <Grid item xs={1}>
              <Item>Bird Skill Description</Item>
            </Grid>
            <Grid item xs={10}>
              <Item>{timetableDetail.BirdSkillDescription}</Item>
            </Grid>
            <Grid item xs={1}>
              <Item>Bird Name</Item>
            </Grid>
            <Grid item xs={10}>
              <Item>{timetableDetail.BirdName}</Item>
            </Grid>
            <Grid item xs={1}>
              <Item>Bird Species</Item>
            </Grid>
            <Grid item xs={10}>
              <Item>{timetableDetail.BirdSpeciesName}</Item>
            </Grid>
            <Grid item xs={1}>
              <Item>Bird Color</Item>
            </Grid>
            <Grid item xs={10}>
              <Item>{timetableDetail.BirdColor}</Item>
            </Grid>
            <Grid item xs={1}>
              <Item>Bird Picture</Item>
            </Grid>
            <Grid item xs={10}>
              <Img
                src={timetableDetail.BirdPicture}
                alt="Description of the image"
                style={{ width: "200px", height: "150px" }}
              />
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
};

export default TimetableTrainerSlotDetailComponent;

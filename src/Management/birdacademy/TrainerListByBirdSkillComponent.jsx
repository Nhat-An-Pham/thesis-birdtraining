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
} from "@mui/material";
import trainingCourseManagementService from "../../../src/services/trainingcourse-management.service";
import { toast } from "react-toastify";

const TrainerListByBirdSkill = ({
  selectedProgressId,
  birdSkillId,
  callbackAssigned,
}) => {
  //const [assignTrainerParam, setAssignTrainerParam] = useState(assignTrainerProps);
  // console.log(assignTrainerProps);
  // console.log("trainer list " + assignTrainerParam.selectedProgressId);
  // console.log("trainer list " + assignTrainerParam.birdSkillId);
  const [trainers, setTrainersByBirdSkill] = useState([]);
  useEffect(() => {
    // Simulate fetching bird information based on customerId
    // Replace this with your actual API call or data fetching logic
    const fetchData = async () => {
      try {
        // Replace this URL with your actual API endpoint
        //console.log("trainer list" + assignTrainerParam.birdSkillId);
        let params = {
          birdSkillId: birdSkillId,
        };
        const response =
          await trainingCourseManagementService.getTrainersByBirdSkill(params);
        console.log(response);
        setTrainersByBirdSkill(response); // Assuming data is an array of bird information
      } catch (error) {
        console.error("Error fetching trainer by bird skill data:", error);
      }
    };
    fetchData();
  }, [birdSkillId]);

  function handleAssignButton(trainerId) {
    console.log("trainer list " + selectedProgressId);
    console.log("trainerid " + trainerId);
    let params = {
      progressId: selectedProgressId,
      trainerId: trainerId,
    };
    trainingCourseManagementService
      .assignTrainer(params)
      .then((response) => response.data)
      .then((data) => {
        // Handle the response data
        console.log("Success:", data);
        toast.success("Assign trainer success");
        callbackAssigned();
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error.message);
      });
  }
  return (
    <TableContainer component={Paper}>
      <Table className="table">
        <TableHead>
          <h2>Trainer</h2>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {trainers.map((trainer) => (
            <TableRow key={trainer.id}>
              <TableCell>{trainer.name}</TableCell>
              <TableCell>{trainer.email}</TableCell>
              <TableCell>
                <Button onClick={() => handleAssignButton(trainer.id)}>
                  Assign
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TrainerListByBirdSkill;

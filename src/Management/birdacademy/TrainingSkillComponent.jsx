import React, { useState, useEffect } from 'react';
import './trainingSkillComponent.scss';
import { Table, TableContainer, TableHead, TableBody, TableCell, TableRow, Paper, } from "@mui/material";

const TrainingSkillComponent = ({ keyParam }) => { 

const [renderTrainer, setRenderTrainer] = useState(false);

const [birdSkillId, setBirdSkillId] = useState(null);
const handleTrainerAssign = (birdSkillId) => {
      setBirdSkillId(birdSkillId);
      setRenderTrainer(true);
};

const [selectedProgress, setSelectedProgress] = useState(null);
const handleUserProgressClick = (progressId) => {
      setSelectedProgress(progressId);
      setBirdSkillId(null);
};
const [trainingProgress, setTrainingProgress ]= useState([]);
  useEffect(() => {
    // Simulate fetching bird information based on customerId
    // Replace this with your actual API call or data fetching logic
    const fetchData = async () => {
      try {
        // Replace this URL with your actual API endpoint
        const response = await fetch(`http://13.214.85.41/api/trainingcourse-staff/birdtrainingprogress-requestedId?birdTrainingCourseId=${keyParam}`);
        const data = await response.json();
        console.log(data);
        setTrainingProgress(data); // Assuming data is an array of bird information
      } catch (error) {
        console.error('Error fetching bird trainingProgress data:', error);
      }
    };

    fetchData();
  }, [birdSkillId]);
  const [trainers, setTrainersByBirdSkill] = useState([]);
  useEffect(() => {
    // Simulate fetching bird information based on customerId
    // Replace this with your actual API call or data fetching logic
    const fetchData = async () => {
      try {
        // Replace this URL with your actual API endpoint
        const response = await fetch(`http://13.214.85.41/api/trainingcourse-staff/trainer-birdskill?birdSkillId${birdSkillId}`);
        const data = await response.json();
        //console.log(data);
        setTrainersByBirdSkill(data); // Assuming data is an array of bird information
      } catch (error) {
        console.error('Error fetching trainer by bird skill data:', error);
      }
    };

    fetchData();
  }, [birdSkillId]);
  return (
    <div>
    <TableContainer className='table-container' component={Paper}>
    <Table className='table'>
      <TableHead>
      <h2>Training Skill</h2>
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
      {trainingProgress
        .filter((item) => item.birdTrainingCourseId == keyParam)
        .map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.birdSkillName}</TableCell>
                  <TableCell>{item.trainerName}</TableCell>
                  <TableCell>{item.trainingProgression}</TableCell>
                  <TableCell>{item.totalTrainingSlot}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  {item.status == "WaitingForAssign" && <TableCell><button onClick={() => handleTrainerAssign(item.birdSkillId)}>Assign trainer</button></TableCell>}
                  {item.status == "Assigned" && <TableCell><button onClick={() => handleTrainerAssign(item.birdSkillId)}>Re-assign trainer</button></TableCell>}
                </TableRow>
            ))}
      </TableBody>
    </Table>
    {renderTrainer && <Table className='table'>
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
                <TableCell><button>Assign</button></TableCell>
              </TableRow>
          ))}
      </TableBody>
    </Table>}
    </TableContainer>
    <div className="main-button-container">
      <button className="button">Confirm</button>
      <button className="button">Cancel</button>
    </div>
    </div>
  );
};

export default TrainingSkillComponent;

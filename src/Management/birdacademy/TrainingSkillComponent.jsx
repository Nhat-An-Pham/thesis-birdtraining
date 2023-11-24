import React, { useState, useEffect } from 'react';
import './trainingSkillComponent.scss';
import { Table, TableContainer, TableHead, TableBody, TableCell, TableRow, Paper, } from "@mui/material";
import TrainerListByBirdSkill from './TrainerListByBirdSkillComponent';

const TrainingSkillComponent = ({ keyParam }) => { 

const [renderTrainer, setRenderTrainer] = useState(false);
const [renderReport, setRenderReport] = useState(false);

const [selectedBirdSkillId, setSelectedBirdSkillId] = useState(null);
const handleTrainerAssign = (birdSkillId) => {
      setSelectedBirdSkillId(birdSkillId);
      console.log(birdSkillId)
      console.log(selectedBirdSkillId)
      setRenderTrainer(true);
};

const [selectedProgress, setSelectedProgress] = useState(null);
const handleUserProgressClick = (progressId) => {
      setSelectedProgress(progressId);
      setSelectedBirdSkillId(null);
};
const [trainingProgress, setTrainingProgress ]= useState([]);
  useEffect(() => {
    // Simulate fetching bird information based on customerId
    // Replace this with your actual API call or data fetching logic
    const fetchData = async () => {
      try {
        // Replace this URL with your actual API endpoint //https://localhost:7176
        const response = await fetch(`http://13.214.85.41/api/trainingcourse-staff/birdtrainingprogress-requestedId?birdTrainingCourseId=${keyParam}`);
        const data = await response.json();
        setTrainingProgress(data); // Assuming data is an array of bird information
      } catch (error) {
        console.error('Error fetching bird trainingProgress data:', error);
      }
    };

    fetchData();
  }, [keyParam]);
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
        .map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.birdSkillName}</TableCell>
                  <TableCell>{item.trainerName}</TableCell>
                  <TableCell>
                  <div style={{ width: '100%', background: '#eee', padding: '5px', borderRadius: '4px' }}>
                  <div
                  style={{
                    width: `${item.trainingProgression*100}%`,
                    height: '20px',
                    background: '#4caf50',
                    borderRadius: '4px',
                    transition: 'width 0.5s',
                  }}
                  ></div>
                  </div>
                    <p>{`${item.trainingProgression*100}% Complete`}</p>
                  </TableCell>
                  <TableCell>{item.totalTrainingSlot}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  {item.status == "Training" && //WaitingForAssign
                    <TableCell><button onClick={() => handleTrainerAssign(item.birdSkillId)}>Assign trainer</button></TableCell>}
                  {item.status == "Assigned" && <TableCell><button onClick={() => handleTrainerAssign(item.birdSkillId)}>Re-assign trainer</button></TableCell>}
                </TableRow>
            ))}
      </TableBody>
    </Table>
    {renderTrainer && 
      <TrainerListByBirdSkill birdSkillId={selectedBirdSkillId}></TrainerListByBirdSkill>}
    </TableContainer>
    <div className="main-button-container">
      <button className="button">Confirm</button>
      <button className="button">Cancel</button>
    </div>
    </div>
  );
};

export default TrainingSkillComponent;

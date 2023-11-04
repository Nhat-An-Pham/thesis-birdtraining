import React, { useState } from 'react';
import './trainingSkillComponent.scss';
import { Table, TableContainer, TableHead, TableBody, TableCell, TableRow, Paper, } from "@mui/material";

const TrainingSkillComponent = ({ keyParam }) => { 

const [renderTrainer, setRenderTrainer] = useState(false);
const handleTrainerAssign = () => {
  setRenderTrainer(true); // Đảo ngược trạng thái hiển thị danh sách
};

const [birdSkillId, setBirdSkillId] = useState(null);
const handleButtonClick = (birdSkillId) => {
      setBirdSkillId(birdSkillId);
};

const [selectedProgress, setSelectedProgress] = useState(null);
const handleUserProgressClick = (progressId) => {
      setSelectedProgress(progressId);
      setBirdSkillId(null);
};
const trainingProgress = [
    { id: "1", birdTrainingCourseId: "1", birdSkillId: "1", birdSkillName: "Skill 1", status:"waiting for assign", trainerName:""},
    { id: "2", birdTrainingCourseId: "1", birdSkillId: "2", birdSkillName: "SKill 2", status:"assigned", trainerName:""},
    { id: "7", birdTrainingCourseId: "1", birdSkillId: "2", birdSkillName: "SKill 2", status:"assigned", trainerName:""},
    { id: "3", birdTrainingCourseId: "5", birdSkillId: "1", birdSkillName: "Skill 1", status:"training", trainerName:""},
    { id: "4", birdTrainingCourseId: "5", birdSkillId: "4", birdSkillName: "Skill 4", status:"notpass", trainerName:""},
    { id: "5", birdTrainingCourseId: "5", birdSkillId: "5", birdSkillName: "Skill 5", status:"pass", trainerName:""},
    { id: "6", birdTrainingCourseId: "5", birdSkillId: "6", birdSkillName: "Skill 6", status:"cancel", trainerName:""},
    // ... more items
  ];

  const trainers = [
    {id: "1", name: "Trainer 1"},
    {id: "2", name: "Trainer 2"},
    {id: "3", name: "Trainer 3"},
    {id: "4", name: "Trainer 4"},
  ]
  return (
    <div>
    <TableContainer className='table-container' component={Paper}>
    <Table className='table'>
      <TableHead>
      <h2>Training Skill</h2>
        <TableRow>
          <TableCell>Bird Skill Name</TableCell>
          <TableCell>Trainer Name</TableCell>
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
                  <TableCell>{item.status}</TableCell>
                  {item.status == "waiting for assign" && <TableCell><button onClick={handleTrainerAssign}>Assign trainer</button></TableCell>}
                  {item.status == "assigned" && <TableCell><button onClick={handleTrainerAssign}>Re-assign trainer</button></TableCell>}
                </TableRow>
            ))}
      </TableBody>
    </Table>
    {renderTrainer && <Table className='table'>
      <TableHead>
      <h2>Trainer</h2>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
          {trainers.map((trainer) => (
              <TableRow key={trainer.id}>
                <TableCell>{trainer.name}</TableCell>
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

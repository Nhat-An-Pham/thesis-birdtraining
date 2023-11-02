import React, { useEffect } from 'react';
import { Table, TableContainer, TableHead, TableBody, TableCell, TableRow, Paper, } from "@mui/material";

const TrainingSkillComponent = ({ keyParam }) => {
    

const trainingProgress = [
    { id: "1", birdTrainingCourseId: "1", skillName: "Skill 1", status:"waiting for assign", trainerName:""},
    { id: "2", birdTrainingCourseId: "1", skillName: "SKill 2", status:"assigned", trainerName:""},
    { id: "7", birdTrainingCourseId: "1", skillName: "SKill 2", status:"assigned", trainerName:""},
    { id: "3", birdTrainingCourseId: "5", skillName: "Skill 1", status:"training", trainerName:""},
    { id: "4", birdTrainingCourseId: "5", skillName: "Skill 4", status:"notpass", trainerName:""},
    { id: "5", birdTrainingCourseId: "5", skillName: "Skill 5", status:"pass", trainerName:""},
    { id: "6", birdTrainingCourseId: "5", skillName: "Skill 6", status:"cancel", trainerName:""},
    // ... more items
  ];
  useEffect(() => {
    console.log(keyParam);
  },[])
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Skill Name</TableCell>
          <TableCell>Trainer Name</TableCell>
          <TableCell>Status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
      {trainingProgress
        .filter((item) => item.birdTrainingCourseId == keyParam)
        .map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.skillName}</TableCell>
                  <TableCell>{item.trainerName}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  {item.status == "waiting for assign" && <TableCell><button>Assign trainer</button></TableCell>}
                  {item.status == "assigned" && <TableCell><button>Re-assign trainer</button></TableCell>}
                </TableRow>
            ))}
      </TableBody>
    </Table>
  );
};

export default TrainingSkillComponent;

import React, { useEffect } from 'react';
import { Table, TableContainer, TableHead, TableBody, TableCell, TableRow, Paper, } from "@mui/material";

const TrainingSkillComponent = ({ keyParam }) => {
    
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
  useEffect(() => {
    console.log(keyParam);
  },[])
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Bird Skill Name</TableCell>
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

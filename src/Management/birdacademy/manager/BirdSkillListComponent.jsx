import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  Table,
  TableBody,
  TableCell,
  Button,
  InputLabel,
  Input,
  Dialog,
} from "@mui/material";
import { Img } from "react-image";
import TrainingCourseManagement from "../../../services/trainingcourse-management.service";
import ExtendDialog from "./ExtendDialog";

const BirdSkillListComponent = ({ selectedCourse, callbackUpdate }) => {
  const [selectedBirdSkillId, setSelectedBirdSkillId] = useState();
  const [birdSkills, setBirdSkills] = useState([]);
  const [acquirableSkills, setAcquirableSkills] = useState([]);
  const [renderDialog, setRenderDialog] = useState(0); // 0 is close, 1 is add new, 2 is delete
  async function fetchBirdSkills() {
    try {
      let response = await TrainingCourseManagement.getAllBirdSkill();
      console.log(response);
      setBirdSkills(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  async function fetchAcquirableBirdSkills() {
    try {
      console.log(selectedCourse.birdSpeciesId);
      let params = {
        birdSpeciesId: selectedCourse.birdSpeciesId,
      };
      let response =
        await TrainingCourseManagement.getAllAcquirableBirdSkillBySpecies(
          params
        );
      console.log(response);
      setAcquirableSkills(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    fetchBirdSkills();
    fetchAcquirableBirdSkills();
  }, [selectedCourse.birdSkills]);

  const handleAddSkillClick = (selectedBirdSkillId) => {
    console.log(selectedBirdSkillId);
    setSelectedBirdSkillId(selectedBirdSkillId);
    setRenderDialog(1);
  };
  const handleRemoveSkillClick = (selectedBirdSkillId) => {
    console.log(selectedBirdSkillId);
    setSelectedBirdSkillId(selectedBirdSkillId);
    setRenderDialog(2);
  };
  const onCallBackDialog = async (selectedCourse) => {
    setRenderDialog(0);
    callbackUpdate(selectedCourse);
  };
  return (
    <Grid>
      {renderDialog != 0 && (
        <ExtendDialog
          trainingCourse={selectedCourse}
          birdSkillId={selectedBirdSkillId}
          renderIndex={renderDialog}
          callbackUpdate={onCallBackDialog}
        />
      )}
      <Grid marginBottom={5} container spacing={2}>
        <Typography gutterBottom variant="h6">
          Bird Skills in Course
        </Typography>
        <TableContainer margin={3} component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Picture</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Train Slot</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedCourse.birdSkills
                .filter((skill) => skill.name !== "All")
                .map((skill) => (
                  <TableRow>
                    <TableCell className="image-cell">
                      <Img src={skill.picture} alt={skill.name} />
                    </TableCell>
                    <TableCell>{skill.name}</TableCell>
                    <TableCell>{skill.description}</TableCell>
                    <TableCell>{skill.totalSlot}</TableCell>
                    <TableCell>
                      <Button
                        sx={{
                          marginBottom: "20px",
                          marginRight: "10px",
                          width: "100px",
                        }}
                        variant="contained"
                        color="ochre"
                        onClick={() => handleRemoveSkillClick(skill.id)}
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid container spacing={2}>
        <Typography gutterBottom variant="h6">
          Bird Skills out Course
        </Typography>
        <TableContainer margin={3} component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Picture</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {birdSkills
                .filter(
                  (skill) =>
                    skill.name !== "All" &&
                    !selectedCourse.birdSkills.some(
                      (courseSkill) => courseSkill.id == skill.id
                    ) &&
                    acquirableSkills.some(
                      (acquirable) => acquirable.birdSkillId == skill.id
                    )
                )
                .map((skill) => (
                  <TableRow>
                    <TableCell className="image-cell">
                      <Img src={skill.picture} alt={skill.name} />
                    </TableCell>
                    <TableCell>{skill.name}</TableCell>
                    <TableCell>{skill.description}</TableCell>
                    <TableCell>
                      <Button
                        sx={{
                          marginBottom: "20px",
                          marginRight: "10px",
                          width: "100px",
                        }}
                        variant="contained"
                        color="ochre"
                        onClick={() => handleAddSkillClick(skill.id)}
                      >
                        Add
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};
export default BirdSkillListComponent;

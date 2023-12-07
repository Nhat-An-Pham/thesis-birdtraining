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
  console.log(selectedCourse);
  const [selectedBirdSkillId, setSelectedBirdSkillId] = useState();
  const [birdSkills, setBirdSkills] = useState([]);
  const [acquirableSkills, setAcquirableSkills] = useState([]);
  const [renderDialog, setRenderDialog] = useState(0); // 0 is close, 1 is add new, 2 is delete
  async function fetchBirdSkills() {
    try {
      let response = await TrainingCourseManagement.getAllBirdSkill();
      console.log("fetchBirdSkills: ", response);
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
      console.log("fetchAcquirableBirdSkills: ", response);
      setAcquirableSkills(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    fetchBirdSkills();
    fetchAcquirableBirdSkills();
  }, [selectedCourse]);

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
    console.log("turn off dialog");
    setRenderDialog(0);
    callbackUpdate();
  };
  return (
    <Grid padding={20}>
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
              {selectedCourse?.birdSkills
                .filter((skill) => skill.birdSkill.name !== "All")
                .map((skill) => (
                  <TableRow>
                    <TableCell className="image-cell">
                      <Img
                        src={skill.birdSkill.picture}
                        alt={skill.birdSkill.name}
                      />
                    </TableCell>
                    <TableCell>{skill.birdSkill.name}</TableCell>
                    <TableCell>{skill.birdSkill.description}</TableCell>
                    <TableCell>{skill.trainSlot}</TableCell>
                    <TableCell>
                      <Button
                        sx={{
                          marginBottom: "20px",
                          marginRight: "10px",
                          width: "100px",
                        }}
                        variant="contained"
                        color="ochre"
                        onClick={() =>
                          handleRemoveSkillClick(skill.birdSkill.id)
                        }
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
                ?.filter(
                  (skill) =>
                    skill.name !== "All" &&
                    !selectedCourse?.birdSkills?.some(
                      (courseSkill) => courseSkill.birdSkill.id == skill.id
                    ) &&
                    acquirableSkills?.some(
                      (acquirable) => acquirable.birdSkillId == skill.id
                    )
                )
                .map((skill) => (
                  <TableRow key={skill.id}>
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

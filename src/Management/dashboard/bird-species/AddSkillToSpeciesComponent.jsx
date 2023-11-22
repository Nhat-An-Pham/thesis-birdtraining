import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import dashboardService from "../../../services/dashboard.service";
import { useEffect } from "react";

export default function AddSkillToSpeciesComponent({
  open,
  handleClose,
  birdSpecies,
}) {
  const [skillId, setSkillId] = useState("");
  const [skills, setSkills] = useState([]);
  const [existingSkills, setExistingSkills] = useState([]);
  async function fetchSkills() {
    try {
      let params = {};
      let response = await dashboardService.GetListSkills(params);

      let result = response.data.filter(
        (skill) =>
          !existingSkills.some(
            (existingSkill) => existingSkill.birdSkillId === skill.id
          )
      );
      //   console.log("before filter: ", response.data);
      //   console.log("after filter: ", result);
      setSkills(result);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  async function fetchSkillsBySpecies() {
    try {
      let params = {};
      let res = await dashboardService.GetListSkillsBySpeciesId(
        birdSpecies.id,        
        params
      );
      setExistingSkills(res.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  async function addSkillToSpecies() {
    try {
      let model = {
        birdSpeciesId: birdSpecies.id,
        birdSkillId: skillId,
      };
      let res = await dashboardService.AddSkillToSpecies(model);
      if (res.status === 200) {
        toast.success('Add successfully!');
        handleClose();
      } else {
        toast.error("An error has occur");
      }
    } catch (error) {
      toast.error("An error has occur");
    }
  }

  const handleCreateClick = async () => {
    await addSkillToSpecies();
  };
  useEffect(() => {
    fetchSkillsBySpecies();

    return () => {};
  }, [open]);
  useEffect(() => {
    //sort the skills by exclude the existing one
    fetchSkills();

    return () => {};
  }, [existingSkills]);
  const handleChange = (event) => {
    console.log(event.target.value);
    setSkillId(event.target.value);
  };
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add skill to species: {birdSpecies.name}</DialogTitle>
        <DialogContent>
          <FormControl required sx={{ m: 1, minWidth: 200 }}>
            <>
              {skills && skills.length > 0 ? (
                <>
                  <InputLabel id="demo-simple-select-required-label">
                    Skill
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-required-label"
                    id="demo-simple-select-required"
                    label={"Skill *"}
                    value={skillId}
                    onChange={handleChange}
                  >
                    {skills.map((skill) => (
                      <MenuItem value={skill.id}>{skill.name}</MenuItem>
                    ))}
                  </Select>
                </>
              ) : (
                <Typography>
                  This species is currently able to be trained any skill
                </Typography>
              )}
            </>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button color="ochre" variant="contained" onClick={handleCreateClick}>
            Confirm
          </Button>
          <Button color="ochre" variant="contained" onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

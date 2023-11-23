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

export default function AddSkillToTrainerComponent({
  open,
  handleClose,
  trainer,
}) {
  const [skillId, setSkillId] = useState("");
  const [skills, setSkills] = useState([]);
  const [existingSkills, setExistingSkills] = useState([]);
  async function fetchTrainableSkills() {
    try {
      let params = {
        $filter: `id eq ${trainer.id}`
      };
      let res = await dashboardService.GetListTrainableSkills(
        params
      );
      setExistingSkills(res.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  async function fetchTrainerSkills() {
    try {
      let params = {
        // $filter: `birdSkillId ne ${birdSkill.id}`
      };
      let res = await dashboardService.GetLisTrainerSkills(
        params
      );
      let result = res.data.filter(
        (skill) =>
          !existingSkills.some(
            (existingSkill) => existingSkill.skillId === skill.id
          )
      );
      setSkills(result);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  async function addTrainableSkill() {
    try {
      let model = {
        skillId: skillId,
        trainerId: trainer.id,
      };
      let res = await dashboardService.AddTrainableSkillToBirdSkill(model);
      if (res.status === 200) {
        handleClose();
      } else {
        toast.error("An error has occur");
      }
    } catch (error) {
      toast.error("An error has occur");
    }
  }

  const handleCreateClick = async () => {
    await addTrainableSkill();
  };
  useEffect(() => {
    fetchTrainableSkills();
    return () => {};
  }, [open]);
  useEffect(() => {
    fetchTrainerSkills();
  
    return () => {
      
    }
  }, [existingSkills]);
  
  const handleChange = (event) => {
    console.log(event.target.value);
    setSkillId(event.target.value);
  };
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add trainer skill to this bird skill: {trainer.name}</DialogTitle>
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
                  This skill is currently able to be trained by any trainer skill
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

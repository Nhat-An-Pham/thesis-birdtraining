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
  async function fetchExistingSkills() {
      try {
        let params = {
          trainerId: trainer.id,
        };
  
        let res = await dashboardService.GetListTrainerSkillsByTrainer(params);
        console.log(res);
        setExistingSkills(res.data);
      } catch (error) {
        toast.error(error.response.data.message);
      }
  }

  async function fetchTrainerSkills() {
    try {
      let params = {
        // $filter: `trainerId ne ${trainer.id}`
      };
      let res = await dashboardService.GetListTrainerSkills(
        params
      );
      let result = res.data
      .filter(
        (skill) =>
          !existingSkills.some(
            (existingSkill) => existingSkill.skillId === skill.id
          )
      );
      
      result = result.sort((a, b) => {
        const nameA = a.name.toUpperCase(); // ignore upper and lowercase
        const nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      });
      setSkills(result);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  async function addTrainerSkill() {
    try {
      let model = {
        skillId: skillId,
        trainerId: trainer.id,
      };
      let res = await dashboardService.AddTrainerSkillToTrainer(model);
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
    await addTrainerSkill();
  };
  useEffect(() => {
    fetchExistingSkills();
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
        <DialogTitle>Add trainer skill to: {trainer.name}</DialogTitle>
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

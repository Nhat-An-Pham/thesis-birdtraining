import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import dashboardService from "../../../services/dashboard.service";
import { useEffect } from "react";

export default function TrainerSkillUpdateComponent({
  open,
  handleClose,
  trainerSkillId,
}) {
  const [skill, setSkill] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState(null);
  async function fetchTrainerSkill() {
    try {
      let params = {
        $filter: `id eq ${trainerSkillId}`,
      };
      let response = await dashboardService.GetListTrainerSkills(params);
      setName(response.data[0].name);
      setDescription(response.data[0].description);
      setSkill(response.data[0]);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  async function updateSpecies() {
    try {
      let model = {
        id: trainerSkillId,
        name: name,
        description: description,
      };
      console.log('update model: ', model);
      let res = await dashboardService.UpdateTrainerSkill(model);
      if (res.status === 200) {
        toast.success('Update successfully!');        
        handleClose();
      } else {
        toast.error("An error has occur");
      }
    } catch (error) {
      toast.error("An error has occur");
    }
  }
  const handleResetClick = () => {
    setName(skill.name);
    setDescription(skill.description);
  }
  const handleUpdateClick = async () => {
    await updateSpecies();
  };
  useEffect(() => {
    fetchTrainerSkill();

    return () => {};
  }, [trainerSkillId, open]);

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Modify: {name}</DialogTitle>
        <DialogContent>
          <Stack spacing={3}>
            <FormControl sx={{ paddingTop: "5px" }}>
              <TextField
                label="Name"
                multiline={false}
                value={name}
                fullWidth
                disabled={false}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </FormControl>
            <FormControl>
              <TextField
                label="Description"
                multiline={true}
                rows={2}
                maxRows={3}
                fullWidth
                disabled={false}
                value={description}
                inputProps={{ maxLength: 100 }}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
        <Button color="ochre" variant="contained" onClick={() => handleResetClick()}>
            Reset
          </Button>
          <Button color="ochre" variant="contained" onClick={() => handleUpdateClick()}>
            Confirm
          </Button>
          <Button color="ochre" variant="contained" onClick={() => handleClose()}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

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

export default function BirdSpeciesAddComponent({ open, handleClose }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState(null);
  async function addSpecies() {
    try {
      let model = {
        name: name,
        shortDetail: description,
      };
      let res = await dashboardService.AddSpecies(model);
      if (res.status === 200) {
        handleClose();
      } else {
        toast.error("An error has occur!");
      }
    } catch (error) {
      toast.error("Detail is too long!");
    }
  }
  const handleCreateClick = async () => {
    await addSpecies();
  };
  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Add new bird species</DialogTitle>
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
                inputProps={{ maxLength: 200 }}
                maxRows={3}
                fullWidth
                disabled={false}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button color="ochre" variant="contained" onClick={handleCreateClick}>
            Add
          </Button>
          <Button color="ochre" variant="contained" onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

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

export default function BirdSpeciesUpdateComponent({
  open,
  handleClose,
  birdSpeciesId,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState(null);
  async function fetchBirdSpecies() {
    try {
      let params = {
        $filter: `id eq ${birdSpeciesId}`,
      };
      let response = await dashboardService.GetListSpecies(params);
      setName(response.data[0].name);
      setDescription(response.data[0].shortDetail);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  async function updateSpecies() {
    try {
      let model = {
        id: birdSpeciesId,
        name: name,
        shortDetail: description,
      };
      console.log('update model: ', model);
      let res = await dashboardService.UpdateSpecies(model);
      console.log('update ocmponent: ', res);
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
  
  const handleUpdateClick = async () => {
    await updateSpecies();
  };
  useEffect(() => {
    fetchBirdSpecies();

    return () => {};
  }, [birdSpeciesId]);

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
          <Button color="ochre" variant="contained" onClick={handleUpdateClick}>
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

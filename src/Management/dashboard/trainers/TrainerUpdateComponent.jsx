import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import dashboardService from "../../../services/dashboard.service";
import { useEffect } from "react";
import { UploadComponent } from "../../component/upload/Upload";

export default function BirdSkillUpdateComponent({
  open,
  handleClose,
  birdSkillId,
}) {
  const [birdSkill, setBirdSkill] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState(null);
  const [picture, setPicture] = useState(null);
  const [submittedImages, setSubmittedImages] = useState([]);

  async function fetchBirdSkill() {
    try {
      let params = {
        $filter: `id eq ${birdSkillId}`,
      };
      let response = await dashboardService.GetListSkills(params);
      setName(response.data[0].name);
      setDescription(response.data[0].description);
      setBirdSkill(response.data[0]);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setPicture(files[0]);
    // Create an array of image names from the selected files
    const imageNames = files.map((file) => file.name);
    setSubmittedImages(imageNames);
  };
  useEffect(() => {
    fetchBirdSkill();

    return () => {};
  }, [birdSkillId]);

  const handleReset = async (e) => {
    setName(birdSkill.name);
    setDescription(birdSkill.description);
    setPicture(null);
    setSubmittedImages([]);
  }
  
  const handleSubmit = async () => {
    // e.preventDefault();
    // Create a FormData object to hold the form data
    const formData = new FormData();
    formData.append("Id", birdSkillId);
    formData.append("Name", name);
    formData.append("Description", description);
    if(picture){
      formData.append("Picture", picture);
    }    
    try {
      let res = await dashboardService.UpdateBirdSkill(formData);
      if(res.status === 200){
        toast.success("Update successfully!");
        handleClose();
      } else {
        toast.error("An error has occur!");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

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
                fullWidth
                disabled={false}
                value={description}
                inputProps={{ maxLength: 100 }}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </FormControl>
            <FormControl required style={{ marginBottom: 15 }}>
              <Typography variant="subtitle1" gutterBottom>
                Pictures
              </Typography>
              <Button variant="contained" color="ochre">
                <UploadComponent onChange={handleFileChange} accept="image/*" multiple={false}>
                  Upload image(s)
                </UploadComponent>
              </Button>
              {/* Display submitted files here */}
              <div>
                {submittedImages.map((imageName, index) => (
                  <div key={index}>{imageName}</div>
                ))}
              </div>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
        <Button color="ochre" variant="contained" onClick={() => handleReset()}>
            Clear
          </Button>
          <Button color="ochre" variant="contained" onClick={() => handleSubmit()}>
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

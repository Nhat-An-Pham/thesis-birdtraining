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
import { UploadComponent } from "../../component/upload/Upload";

export default function BirdSkillAddComponent({ open, handleClose }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState(null);
  const [picture, setPicture] = useState(null);
  const [submittedImages, setSubmittedImages] = useState([]);

  const handleSubmit = async () => {
    // e.preventDefault();
    // Create a FormData object to hold the form data
    const formData = new FormData();
    formData.append("Name", name);
    formData.append("Description", description);
    if(picture){
      formData.append("Picture", picture);
    }    
    try {
      let res = await dashboardService.AddBirdSkill(formData);
      if(res.status === 200){
        toast.success("Add successfully!");
        handleClose();
      } else {
        toast.error("An error has occur!");
      }
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
  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Add new bird skill</DialogTitle>
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
            <FormControl required style={{ marginBottom: 15 }}>
              <Typography variant="subtitle1" gutterBottom>
                Pictures
              </Typography>
              <Button variant="contained" color="ochre">
                <UploadComponent onChange={handleFileChange} accept="image/*" multiple={false}>
                  Upload image
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
          <Button color="ochre" variant="contained" onClick={handleSubmit}>
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

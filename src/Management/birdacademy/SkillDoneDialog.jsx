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
  DialogTitle,
  DialogContent,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { Img } from "react-image";
import TrainingCourseManagement from "../../services/trainingcourse-management.service";
import { ToastContainer, toast } from "react-toastify";
import { UploadComponent } from "../component/upload/Upload";

const SkillDoneDialog = ({ trainingProgressId, renderIndex, callbackDone }) => {
  const [selectedStatus, setSelectedStatus] = useState();

  const [videos, setVideos] = useState([]);
  const [submittedVideos, setSubmittedVideos] = useState([]);
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setVideos(files);

    // Create an array of image names from the selected files
    const imageNames = files.map((file) => file.name);
    setSubmittedVideos(imageNames);
  };
  const handleSelectStatus = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    // Create a FormData object to hold the form data
    let check = true;
    if (!videos || videos.length < 1) {
      check = false;
      toast.error("Please provide evidences video");
    }
    if (selectedStatus == null) {
      check = false;
      toast.error("Please select training status");
    }
    if (check) {
      const formData = new FormData();
      formData.append("Id", trainingProgressId);
      formData.append("Status", selectedStatus);

      // Append each file separately
      videos.forEach((video, index) => {
        formData.append(`Evidences`, video);
      });
      try {
        console.log(formData);
        let response = await TrainingCourseManagement.markTrainingSkillDone(
          formData
        );
        console.log(response);
        if (response.status === 500) {
          toast.error("An error has occured!");
        } else {
          toast.success("Upload successfully!");
          callbackDone();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Dialog open={renderIndex} onClose={callbackDone}>
      <ToastContainer />
      <DialogTitle>
        {renderIndex == 1 ? <>Upload training done evidences video</> : <></>}
      </DialogTitle>
      <DialogContent>
        <div style={{ margin: 2 }}>
          <form onSubmit={handleConfirm} encType="multipart/form-data">
            <FormControl
              sx={{
                width: 500,
                maxWidth: 610,
                padding: 3,
              }}
              required
            >
              <InputLabel id="selectLabel_ChooseStatus">
                Choose Status
              </InputLabel>
              <Select
                labelId="selectLabel_ChooseStatus"
                label="Choose Species"
                value={selectedStatus}
                onChange={handleSelectStatus}
              >
                <MenuItem value={"Pass"}>Pass</MenuItem>
                <MenuItem value={"NotPass"}>Not Pass</MenuItem>
              </Select>
            </FormControl>
            <FormControl required style={{ marginBottom: 15 }}>
              <Typography variant="h6" gutterBottom>
                Videos
              </Typography>
              <Button variant="contained" color="ochre">
                <UploadComponent onChange={handleFileChange} accept="video/*">
                  Upload video(s)
                </UploadComponent>
              </Button>
              {/* Display submitted files here */}
              <div>
                {submittedVideos.map((videoName, index) => (
                  <div key={index}>{videoName}</div>
                ))}
              </div>
            </FormControl>
            <br />
            <Button
              sx={{ float: "right", marginBottom: "20px" }}
              variant="contained"
              color="ochre"
              type="submit"
            >
              Confirm
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default SkillDoneDialog;

import React, { useState } from "react";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  Stack,
  Typography,
} from "@mui/material";
import trainingCourseManagementService from "../../../src/services/trainingcourse-management.service";
import { UploadComponent } from "../component/upload/Upload";

const ReceivedBirdComponent = ({ requestedId, callBackMainManagement }) => {
  const [birdTrainingCourseId, setBirdTrainingCourseId] = useState(requestedId);
  const [receiveNote, setReceiveNote] = useState("");
  const [pictures, setPictures] = useState([]);
  const [submittedImages, setSubmittedImages] = useState([]);

  const handleEditorChange = (value) => {
    setReceiveNote(value);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setPictures(files);

    // Create an array of image names from the selected files
    const imageNames = files.map((file) => file.name);
    setSubmittedImages(imageNames);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Create a FormData object to hold the form data
    const formData = new FormData();
    formData.append("BirdTrainingCourseId", birdTrainingCourseId);
    formData.append("ReceiveNote", receiveNote);

    // Append each file separately
    pictures.forEach((picture, index) => {
      formData.append(`Pictures`, picture);
    });

    trainingCourseManagementService
      .receiveBirdForm(formData)
      .then((response) => response.data)
      .then((data) => {
        // Handle the response data
        console.log("Success:", data);
        callBackMainManagement();
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <h2>Receive bird form</h2>
      <div className="form-container">
        <form
          onSubmit={handleSubmit}
          className="form"
          encType="multipart/form-data"
        >
          <Typography variant="h6" gutterBottom>
            General information
          </Typography>
          <Stack spacing={3} direction="row" sx={{ marginBottom: 4 }}>
            <FormControl fullWidth required style={{ marginBottom: 10 }}>
              <InputLabel htmlFor="receiveNote">ReceiveNote</InputLabel>
              <Input
                type="text"
                onChange={(e) => setReceiveNote(e.target.value)}
              />
            </FormControl>
          </Stack>
          <FormControl required style={{ marginBottom: 15 }}>
            <Typography variant="h6" gutterBottom>
              Pictures
            </Typography>
            <Button variant="contained" color="ochre">
              <UploadComponent onChange={handleFileChange} accept="image/*">
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
          <br />
          <Button
            sx={{ float: "right", marginBottom: "20px" }}
            variant="contained"
            color="ochre"
            type="submit"
          >
            Submit Receive Bird Form
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ReceivedBirdComponent;

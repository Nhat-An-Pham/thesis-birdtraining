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
import Editor from "../component/text-editor/Editor";

const ReturnBirdComponent = ({ requestedId, callBackMainManagement }) => {
  const [birdTrainingCourseId, setBirdTrainingCourseId] = useState(requestedId);
  const [returnNote, setReturnNote] = useState("");
  const [pictures, setPictures] = useState([]);
  const [submittedImages, setSubmittedImages] = useState([]);

  const handleCancelClick = () => {
    callBackMainManagement();
  };

  const handleEditorChange = (value) => {
    setReturnNote(value);
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
    formData.append("ReturnNote", returnNote);

    // Append each file separately
    pictures.forEach((picture, index) => {
      formData.append(`ReturnPictures`, picture);
    });

    trainingCourseManagementService
      .returnBirdForm(formData)
      .then((response) => {
        // Handle the response data
        console.log("Success:", response);
        callBackMainManagement();
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <h2>Create return bird form</h2>
      <div className="form-container">
        <form
          onSubmit={handleSubmit}
          className="form"
          encType="multipart/form-data"
        >
          <Typography variant="h6" gutterBottom>
            Return bird form
          </Typography>
          <FormControl fullWidth required style={{ marginBottom: 10 }}>
            <Typography variant="h6" gutterBottom>
              Return Note
            </Typography>
            <Editor
              onGetHtmlValue={handleEditorChange}
              htmlValue={returnNote}
            />
          </FormControl>
          <FormControl required style={{ marginBottom: 15 }}>
            <Typography variant="h6" gutterBottom>
              Pictures
            </Typography>
            <button variant="contained" color="ochre">
              <UploadComponent onChange={handleFileChange} accept="image/*">
                Upload image(s)
              </UploadComponent>
            </button>
            {/* Display submitted files here */}
            <div>
              {submittedImages.map((imageName, index) => (
                <div key={index}>{imageName}</div>
              ))}
            </div>
          </FormControl>
          <br />
          <button
            sx={{ float: "right", marginBottom: "20px" }}
            variant="contained"
            color="ochre"
            type="submit"
          >
            Create return bird form
          </button>

          <button
            sx={{ float: "right", marginBottom: "20px" }}
            color="ochre"
            onClick={() => handleCancelClick()}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReturnBirdComponent;

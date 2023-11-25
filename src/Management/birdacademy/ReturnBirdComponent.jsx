import React, { useState } from "react";
import {
  Button,
  FormControl,
  Grid,
  Input,
  InputLabel,
  Stack,
  ThemeProvider,
  Typography,
} from "@mui/material";
import trainingCourseManagementService from "../../../src/services/trainingcourse-management.service";
import { UploadComponent } from "../component/upload/Upload";
import Editor from "../component/text-editor/Editor";
import { ochreTheme } from "../themes/Theme";
import { useEffect } from "react";

const ReturnBirdComponent = ({ requestedId, callBackMainManagement }) => {
  const [birdTrainingCourseId, setBirdTrainingCourseId] = useState(requestedId);
  const [birdTrainingCourse, setBirdTrainingCourse] = useState(null);
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
  async function fetchRequestedData() {
    try {
      let params = {
        $filter: `id eq ${requestedId}`,
      };
      let response =
        await trainingCourseManagementService.getAllBirdTrainingCourse(params);
      setBirdTrainingCourse(response[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    fetchRequestedData();
  }, [requestedId]);
  return (
    <ThemeProvider theme={ochreTheme}>
      <div>
        {birdTrainingCourse != null && (
          <Grid container spacing={1}>
            <Grid item xs={2}>
              <>Requested Id: </>
            </Grid>
            <Grid item xs={10}>
              <>{birdTrainingCourse.id}</>
            </Grid>
          </Grid>
        )}
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
              Create return bird form
            </Button>

            <Button
              sx={{ float: "right", marginBottom: "20px" }}
              color="ochre"
              onClick={() => handleCancelClick()}
            >
              Cancel
            </Button>
          </form>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default ReturnBirdComponent;

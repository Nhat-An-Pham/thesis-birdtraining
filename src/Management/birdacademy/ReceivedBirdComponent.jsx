import React, { useState } from "react";
import {
  AppBar,
  Button,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  Stack,
  ThemeProvider,
  Toolbar,
  Typography,
  Grid,
} from "@mui/material";
import trainingCourseManagementService from "../../../src/services/trainingcourse-management.service";
import { UploadComponent } from "../component/upload/Upload";
import Editor from "../component/text-editor/Editor";
import { ochreTheme } from "../themes/Theme";
import { toast } from "react-toastify";
import { Close } from "@mui/icons-material";
const ReceivedBirdComponent = ({ requestedId, callBackMainManagement }) => {
  const [birdTrainingCourseId, setBirdTrainingCourseId] = useState(requestedId);
  const [receiveNote, setReceiveNote] = useState("");
  const [tmpNote, setTmpNote] = useState("");
  const [pictures, setPictures] = useState([]);
  const [submittedImages, setSubmittedImages] = useState([]);

  const handleCancelClick = () => {
    callBackMainManagement();
  };

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
    let check = true;
    if (!pictures || pictures.length < 1) {
      check = false;
      toast.error("Please provide receive image");
    }
    if (!receiveNote || receiveNote.length < 1) {
      check = false;
      toast.error("Please provide receive note");
    }
    if (check) {
      const formData = new FormData();
      formData.append("BirdTrainingCourseId", birdTrainingCourseId);
      formData.append("ReceiveNote", receiveNote);

      // Append each file separately
      pictures.forEach((picture, index) => {
        formData.append(`ReceivePictures`, picture);
      });

      trainingCourseManagementService
        .receiveBirdForm(formData)
        .then((response) => {
          // Handle the response data
          console.log("Success:", response);
          toast.success("Check-in successfully!");

          callBackMainManagement();
        })
        .catch((error) => {
          // Handle errors
          console.error("Error:", error);
          toast.error("An error has occured!");
        });
    }
  };

  return (
    <ThemeProvider theme={ochreTheme}>
      <div>
        <Grid sx={{ padding: 2 }}>
          <AppBar position="static" color="ochre">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                sx={{ mr: 2 }}
                onClick={callBackMainManagement}
              >
                <Close />
              </IconButton>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
              >
                Receive Bird Form
              </Typography>
            </Toolbar>
          </AppBar>
        </Grid>
        <div className="form-container">
          <form
            onSubmit={handleSubmit}
            className="form"
            encType="multipart/form-data"
          >
            {/* <Typography variant="h6" gutterBottom>
            Receive bird form
          </Typography> */}
            <FormControl fullWidth required style={{ marginBottom: 10 }}>
              <Typography variant="h6" gutterBottom>
                Receive Note
              </Typography>
              <Editor onGetHtmlValue={handleEditorChange} htmlValue={tmpNote} />
            </FormControl>
            <FormControl required style={{ marginBottom: 15, maxWidth: 650 }}>
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
              Confirm check in
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

export default ReceivedBirdComponent;

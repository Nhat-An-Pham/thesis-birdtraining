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
          callBackMainManagement();
        })
        .catch((error) => {
          // Handle errors
          console.error("Error:", error);
        });
    }
  };

  return (
    <ThemeProvider theme={ochreTheme}>
      <div>
        <Grid sx={{ padding: 2 }}>
          <AppBar position="static" color="ochre" sx={{ borderRadius: 3 }}>
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
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", sm: "block" },
                  fontWeight: 700,
                }}
              >
                Receive Bird Form
              </Typography>
            </Toolbar>
          </AppBar>
        </Grid>
        <div
          className="form-container"
          style={{
            display: "flex",
            minHeight: "auto",
          }}
        >
          <form
            onSubmit={handleSubmit}
            className="form"
            encType="multipart/form-data"
            style={{
              width: "100%",
              padding: 20,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                padding: "0 10px",
              }}
            >
              <FormControl
                fullWidth
                required
                style={{ marginBottom: 20, marginTop: 20 }}
              >
                <Typography
                  style={{ fontWeight: 700 }}
                  variant="h6"
                  gutterBottom
                >
                  Return Note
                </Typography>
                <Editor
                  stylePropContainer={{ width: "90%" }}
                  stylePropEditor={{ height: "80%" }}
                  onGetHtmlValue={handleEditorChange}
                  htmlValue={tmpNote}
                />
              </FormControl>

              <FormControl required style={{ marginBottom: 15, width: "100%" }}>
                <Typography variant="h6" gutterBottom>
                  Pictures
                </Typography>
                <UploadComponent onChange={handleFileChange} accept="image/*">
                  Upload image(s)
                </UploadComponent>
                {/* Display submitted files here */}
                <div>
                  {submittedImages.map((imageName, index) => (
                    <div key={index}>{imageName}</div>
                  ))}
                </div>
              </FormControl>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", padding: '0 20px' }}>
              <Button
                sx={{
                  marginRight: 2,
                  padding: "5px 25px 5px 25px",
                  boxShadow:
                    "0px 2px 4px 2px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
                  borderRadius: "4px",
                }}
                onClick={() => handleCancelClick()}
              >
                Cancel
              </Button>
              <Button
                sx={{
                  boxShadow:
                    "0px 2px 4px 2px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
                  borderRadius: "4px",
                }}
                variant="contained"
                color="ochre"
                type="submit"
              >
                Confirm check in
              </Button>
            </div>
          </form>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default ReceivedBirdComponent;

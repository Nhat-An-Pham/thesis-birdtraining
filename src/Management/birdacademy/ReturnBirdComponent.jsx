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
  Box,
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
      let response =
        await trainingCourseManagementService.getAllBirdTrainingCourse();
      console.log(response);
      setBirdTrainingCourse(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    fetchRequestedData();
  }, [requestedId]);
  return (
    <ThemeProvider theme={ochreTheme}>
      <h2>Create return bird form</h2>
      <div>
        {birdTrainingCourse != null &&
          birdTrainingCourse
            .filter((request) => request.id == requestedId)
            .map((request) => (
              <Box sx={{ flexGrow: 1, p: 2 }}>
                <Grid
                  container
                  spacing={1}
                  sx={{
                    "--Grid-borderWidth": "1px",
                    borderTop: "var(--Grid-borderWidth) solid",
                    borderLeft: "var(--Grid-borderWidth) solid",
                    borderColor: "divider",
                    "& > div": {
                      borderRight: "var(--Grid-borderWidth) solid",
                      borderBottom: "var(--Grid-borderWidth) solid",
                      borderColor: "divider",
                    },
                  }}
                >
                  <Grid item xs={1}>
                    <>Requested Id: </>
                  </Grid>
                  <Grid item xs={1.5}>
                    <>{request.id}</>
                  </Grid>
                  <Grid item xs={1}>
                    <>Bird Name: </>
                  </Grid>
                  <Grid item xs={1.5}>
                    <>{request.birdName}</>
                  </Grid>
                  <Grid item xs={2}>
                    <>Customer Name: </>
                  </Grid>
                  <Grid item xs={5}>
                    <>{request.customerName}</>
                  </Grid>
                  <Grid item xs={1.5}>
                    <>Training course title: </>
                  </Grid>
                  <Grid item xs={10.5}>
                    <>{request.trainingCourseTitle}</>
                  </Grid>
                  <Grid item xs={1}></Grid>
                  <Grid item xs={1.5}>
                    <>Registered Date: </>
                  </Grid>
                  <Grid item xs={1.5}>
                    <>{request.registeredDate}</>
                  </Grid>
                  <Grid item xs={1.5}>
                    <>Start training Date: </>
                  </Grid>
                  <Grid item xs={1.5}>
                    <>{request.startTrainingDate}</>
                  </Grid>
                  <Grid item xs={1.5}>
                    <>Done training Date: </>
                  </Grid>
                  <Grid item xs={3}>
                    <>{request.trainingDoneDate}</>
                  </Grid>
                  <Grid margin-top={"1px"} item xs={2}>
                    <>Base training price: </>
                  </Grid>
                  <Grid item xs={10}>
                    <>{request.totalPrice}</>
                  </Grid>
                  <Grid item xs={2}>
                    <>Training price apply member: </>
                  </Grid>
                  <Grid item xs={10}>
                    <>{request.discountedPrice}</>
                  </Grid>
                  <Grid item xs={2}>
                    <>Membership Rank: </>
                  </Grid>
                  <Grid item xs={10}>
                    <>{request.membershipRank}</>
                  </Grid>
                  <Grid item xs={2}>
                    <>Status: </>
                  </Grid>
                  <Grid item xs={10}>
                    <>{request.status}</>
                  </Grid>
                  <Grid item xs={2}>
                    <>Total payment: </>
                  </Grid>
                  <Grid item xs={10}>
                    <>{request.actualPrice}</>
                  </Grid>
                </Grid>
              </Box>
            ))}
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
              Confirm check out
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

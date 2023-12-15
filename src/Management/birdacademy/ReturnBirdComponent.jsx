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
  Card,
  CardContent,
  Select,
  MenuItem,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import trainingCourseManagementService from "../../../src/services/trainingcourse-management.service";
import { UploadComponent } from "../component/upload/Upload";
import Editor from "../component/text-editor/Editor";
import { ochreTheme } from "../themes/Theme";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Close } from "@mui/icons-material";

const ReturnBirdComponent = ({ requestedId, callBackMainManagement }) => {
  const [trainingPricePolicies, setTrainingPricePolicies] = useState([]);
  const [selectedPolicyId, setSelectedPolicyId] = useState();
  const [actualPrice, setActualPrice] = useState(null);

  const [birdTrainingCourse, setBirdTrainingCourse] = useState(null);
  const [returnNote, setReturnNote] = useState("");
  const [tmpNote, setTmpNote] = useState("");
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
    // Create a FormData object to hold the form datalet check = true;
    let check = true;
    if (!pictures || pictures.length < 1) {
      check = false;
      toast.error("Please provide return image");
    }
    if (!returnNote || returnNote.length < 1) {
      check = false;
      toast.error("Please provide return note");
    }

    if (check) {
      const formData = new FormData();
      formData.append("BirdTrainingCourseId", requestedId);
      formData.append("ReturnNote", returnNote);
      if (birdTrainingCourse?.status == "TrainingDone") {
        console.log("training done mac dinh 3");
        formData.append("TrainingPricePolicyId", 3);
      } else {
        console.log("not training done ");
        formData.append("TrainingPricePolicyId", selectedPolicyId);
      }

      // Append each file separately
      pictures.forEach((picture, index) => {
        formData.append(`ReturnPictures`, picture);
      });

      console.log(formData);

      try {
        let response = await trainingCourseManagementService.returnBirdForm(
          formData
        );
        if (response.status == 200) {
          toast.success("Submit return form success!");
          callBackMainManagement();
        }
      } catch (error) {
        console.log(error);
        toast.error("Error return form!");
      }
    }
  };
  async function fetchRequestedData() {
    try {
      let params = {
        $filter: `id eq ${requestedId}`,
      };
      let response =
        await trainingCourseManagementService.getAllBirdTrainingCourse(params);
      console.log(response[0]);
      setBirdTrainingCourse(response[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  async function fetchPolicyData() {
    try {
      let params = {
        $filter: `status eq 'Active'`,
      };
      let response =
        await trainingCourseManagementService.getAllTrainingPricePolicies(
          params
        );
      console.log(response);
      setTrainingPricePolicies(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    fetchRequestedData();
    fetchPolicyData();
  }, [requestedId]);
  // useEffect(() => {
  //   if (birdTrainingCourse != null) {
  //     const current = birdTrainingCourse.find((e) => e.id == requestedId);
  //     console.log(current);
  //     if (current != null) {
  //       setActualPrice(current.actualPrice);
  //       if (current.status == "TrainingDone") {
  //         setSelectedPolicyId(3);
  //       }
  //     }
  //   }
  // }, [birdTrainingCourse]);
  const handleSelectPolicy = (event) => {
    console.log(event.target.value);
    setSelectedPolicyId(event.target.value);
    // const finalPrice =
    //   birdTrainingCourse.find((e) => e.id == requestedId).discountedPrice *
    //   event.target.value.chargeRate;
    const chargeRate = trainingPricePolicies.find(
      (e) => e.id == event.target.value
    );
    const finalPrice =
      birdTrainingCourse.discountedPrice * chargeRate.chargeRate;
    console.log(finalPrice);
    setActualPrice(finalPrice);
  };
  return (
    <ThemeProvider theme={ochreTheme}>
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
              Return Bird Form
            </Typography>
          </Toolbar>
        </AppBar>
      </Grid>
      <div
        style={{
          padding: "10px 40px",
        }}
      >
        <div
          className="form-container"
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <form
            style={{ width: "100%", display: "flex" }}
            onSubmit={handleSubmit}
            className="form"
            encType="multipart/form-data"
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "10px 0 0 0",
                width: "100%",
              }}
            >
              {/* billing */}
              {birdTrainingCourse != null && (
                // birdTrainingCourse
                //   .filter((request) => request.id == requestedId)
                //   .map((request) => (
                <div
                  style={{
                    boxShadow:
                      "0px 2px 4px 2px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
                    borderRadius: 5,
                    width: "90%",
                    height: "100%",
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  <div
                    style={{
                      fontSize: "1.6rem",
                      textAlign: "left",
                      fontWeight: 700,
                    }}
                  >
                    Billing Details
                  </div>
                  <div>
                    <table
                      style={{
                        border: "none",
                        padding: "0px",
                        borderCollapse: "separate",
                        borderSpacing: "1rem 0.5rem",
                        color: "#64645f",
                        fontSize: "1rem",
                        width: "100%",
                      }}
                    >
                      <tr>
                        <td>Requested Id </td>
                        <td style={{ textAlign: "end" }}>
                          {birdTrainingCourse.id}
                        </td>
                      </tr>
                      <tr>
                        <td>Customer</td>
                        <td style={{ textAlign: "end" }}>
                          {birdTrainingCourse.customerName}
                        </td>
                      </tr>
                      <tr>
                        <td>Course</td>
                        <td style={{ textAlign: "end" }}>
                          {birdTrainingCourse.trainingCourseTitle}
                        </td>
                      </tr>
                      <tr>
                        <td>Status</td>
                        <td style={{ textAlign: "end" }}>
                          {birdTrainingCourse.status}
                        </td>
                      </tr>
                      <tr>
                        <td>Actual Price</td>
                        <td style={{ textAlign: "end" }}>
                          {birdTrainingCourse.totalPrice.toFixed(2)}
                        </td>
                      </tr>
                      <tr>
                        <td>Membership Rank</td>
                        <td style={{ textAlign: "end" }}>
                          {birdTrainingCourse.membershipRank}
                        </td>
                      </tr>
                      <tr>
                        <td>Discounted Price</td>
                        <td style={{ textAlign: "end" }}>
                          {birdTrainingCourse.discountedPrice.toFixed(2)}
                        </td>
                      </tr>
                      <tr style={{ fontSize: "1.4rem", fontWeight: 700 }}>
                        <td>Total Price</td>
                        <td style={{ textAlign: "end" }}>
                          {actualPrice != null
                            ? actualPrice
                            : birdTrainingCourse.actualPrice.toFixed(2)}
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              )}

              {/* return note report */}
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
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                maxWidth: "600px",
              }}
            >
              {/* status policy return  */}
              {birdTrainingCourse?.status !== "TrainingDone" && (
                <FormControl
                  sx={{
                    marginTop: 4,
                    marginBottom: 3,
                    width: 600,
                    maxWidth: 610,
                  }}
                >
                  <InputLabel id="selectLabel_ChoosePolicy">
                    Choose Policy
                  </InputLabel>
                  <Select
                    labelId="selectLabel_ChoosePolicy"
                    label="Choose Policy"
                    value={selectedPolicyId}
                    // readOnly={
                    //   birdTrainingCourse?.status == "TrainingDone" ? true : false
                    // }
                    onChange={handleSelectPolicy}
                  >
                    {trainingPricePolicies
                      .filter((policy) => policy.name != "Success Requested")
                      .map((policy) => (
                        <MenuItem value={policy.id}>
                          {policy.name}: {policy.chargeRate * 100}%
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              )}

              {/* upload image */}
              <FormControl required style={{ marginBottom: 15 }}>
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

              {/* group button */}
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  sx={{
                    marginRight: 2,
                    marginBottom: "20px",
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
                  sx={{ marginBottom: "20px" }}
                  variant="contained"
                  color="ochre"
                  type="submit"
                >
                  Confirm check out
                </Button>
              </div>
            </div>

            <br />
          </form>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default ReturnBirdComponent;

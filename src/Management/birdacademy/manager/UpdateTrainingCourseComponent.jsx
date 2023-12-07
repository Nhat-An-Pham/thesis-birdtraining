import React, { useEffect, useState } from "react";
import {
  AppBar,
  Button,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Toolbar,
  Typography,
  Grid,
} from "@mui/material";
import { Img } from "react-image";
import Editor from "../../component/text-editor/Editor";
import { UploadComponent } from "../../component/upload/Upload";
import TrainingCourseManagement from "../../../services/trainingcourse-management.service";
import { toast } from "react-toastify";
import BirdSkillListComponent from "./BirdSkillListComponent";
import { Close } from "@mui/icons-material";

const UpdateTrainingCourseComponent = ({
  trainingCourse,
  callbackUpdateCourse,
}) => {
  const [selectedTrainingCourse, setSelectedTrainingCourse] = useState(null);
  const [birdSpecies, setBirdSpecies] = useState([]);

  const [selectedSpecies, setSelectedSpecies] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tmpDesc, setTmpDesc] = useState("");
  const [pictures, setPictures] = useState([]);
  const [submittedImages, setSubmittedImages] = useState([]);
  const [price, setPrice] = useState(0.0);
  const [slot, setSlot] = useState(0.0);

  const handleEditorChange = (value) => {
    setDescription(value);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setPictures(files);

    // Create an array of image names from the selected files
    const imageNames = files.map((file) => file.name);
    setSubmittedImages(imageNames);
  };
  const handleSelectSpecies = (event) => {
    setSelectedSpecies(event.target.value);
  };
  async function fetchTrainingCourse() {
    try {
      console.log(trainingCourse.id);
      let params = {
        courseId: trainingCourse.id,
      };
      let response = await TrainingCourseManagement.getTrainingCourseById(
        params
      );
      console.log(response);
      setSelectedTrainingCourse(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  const onCallbackUpdateSkill = async () => {
    console.log("re-fetch training course");
    fetchTrainingCourse();
  };
  // async function fetchBirdSpecies() {
  //   try {
  //     let response = await TrainingCourseManagement.getAllBirdSpecies();
  //     console.log(response);
  //     setBirdSpecies(response);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // }
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Create a FormData object to hold the form data
    let check = true;
    // if (!pictures || pictures.length < 1) {
    //   check = false;
    //   toast.error("Please provide course image");
    // }
    if (!title || title.length < 1) {
      check = false;
      toast.error("Please provide course title");
    }
    if (!description || description.length < 1) {
      check = false;
      toast.error("Please provide course description");
    }
    if (check) {
      const formData = new FormData();
      formData.append("Id", selectedTrainingCourse.id);
      formData.append("BirdSpeciesId", selectedSpecies);
      formData.append("Title", title);
      formData.append("Description", description);
      formData.append("TotalPrice", price);

      // Append each file separately
      console.log(pictures);
      if (pictures != null && pictures.length > 0) {
        pictures.forEach((picture, index) => {
          formData.append(`Pictures`, picture);
        });
      } else {
        formData.append(`Pictures`, null);
      }
      try {
        let res = await TrainingCourseManagement.editTrainingCourse(formData);
        if (res.status === 200) {
          toast.success("Update successfully!");
          await fetchTrainingCourse();
          // callbackUpdateCourse(trainingCourse);
        } else {
          toast.error("An error has occured!");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    fetchTrainingCourse();
  }, []);
  useEffect(() => {
    // fetchTrainingCourse();
    //fetchBirdSpecies();
    if (selectedTrainingCourse != null) {
      // Lấy thông tin từ selectedTrainingCourse và gán cho các biến tương ứng
      setSelectedSpecies(selectedTrainingCourse.birdSpeciesId);
      setTitle(selectedTrainingCourse.title);
      setTmpDesc(selectedTrainingCourse.description);
      //setPictures(selectedTrainingCourse.picture);
      //setSubmittedImages(selectedTrainingCourse.submittedImages);
      setPrice(selectedTrainingCourse.totalPrice);
      setSlot(selectedTrainingCourse.totalSlot);
    }
  }, [selectedTrainingCourse]);
  return (
    <div>
      <Grid sx={{ padding: 2 }}>
        <AppBar position="static" color="ochre">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              sx={{ mr: 2 }}
              onClick={callbackUpdateCourse}
            >
              <Close />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              Training Course Detail
            </Typography>
          </Toolbar>
        </AppBar>
      </Grid>
      {selectedTrainingCourse ? (
        <>
          <div>
            <div className="form-container">
              <form
                onSubmit={handleSubmit}
                className="form"
                encType="multipart/form-data"
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  style={{ marginBottom: 35 }}
                >
                  General information
                </Typography>
                <FormControl
                  required
                  fullWidth
                  sx={{
                    marginBottom: "25px",
                    width: "100%",
                  }}
                >
                  <InputLabel id="selectLabel_ChooseSpecies">
                    Bird Species Name
                  </InputLabel>
                  {/* <Select
              labelId="selectLabel_ChooseSpecies"
              label="Choose Species"
              value={selectedTrainingCourse.birdSpeciesId}
              onChange={handleSelectSpecies}
            >
              {birdSpecies.map((speciy) => (
                <MenuItem value={speciy.id}>{speciy.name}</MenuItem>
              ))}
            </Select> */}
                  <Input
                    type="text"
                    value={selectedTrainingCourse?.birdSpeciesName}
                    readOnly
                  ></Input>
                </FormControl>
                <FormControl fullWidth required style={{ marginBottom: 20 }}>
                  <InputLabel htmlFor="title">Title</InputLabel>
                  <Input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </FormControl>
                <FormControl
                  fullWidth
                  required
                  variant="outlined"
                  style={{ marginBottom: 20 }}
                >
                  <InputLabel>Price</InputLabel>
                  <Input
                    type="number"
                    step="0.01"
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    value={price}
                  />
                </FormControl>
                <FormControl
                  fullWidth
                  required
                  variant="outlined"
                  style={{ marginBottom: 20 }}
                >
                  <InputLabel>Slot</InputLabel>
                  <Input
                    type="number"
                    step="0.01"
                    required
                    value={slot}
                    readOnly
                  />
                </FormControl>
                <FormControl fullWidth required style={{ marginBottom: 20 }}>
                  <Typography variant="h6" gutterBottom>
                    Description
                  </Typography>
                  <Editor
                    onGetHtmlValue={handleEditorChange}
                    htmlValue={tmpDesc}
                  />
                </FormControl>
                <FormControl required style={{ marginBottom: 15 }}>
                  <Typography variant="h6" gutterBottom>
                    Pictures
                  </Typography>
                  <Img
                    src={selectedTrainingCourse?.picture}
                    alt="BirdPicture"
                    style={{ width: "200px", height: "150px", margin: "20px" }}
                  />
                  <Button variant="contained" color="ochre">
                    <UploadComponent
                      onChange={handleFileChange}
                      accept="image/*"
                    >
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
                  Confirm update course
                </Button>
                <Button
                  sx={{
                    float: "right",
                    marginBottom: "20px",
                    marginRight: "10px",
                  }}
                  variant="contained"
                  color="ochre"
                  onClick={() => callbackUpdateCourse(trainingCourse)}
                >
                  Cancel
                </Button>
              </form>
            </div>
            <BirdSkillListComponent
              selectedCourse={selectedTrainingCourse}
              callbackUpdate={onCallbackUpdateSkill}
            />
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default UpdateTrainingCourseComponent;

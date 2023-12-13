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
import Editor from "../../component/text-editor/Editor";
import { UploadComponent } from "../../component/upload/Upload";
import TrainingCourseManagement from "../../../services/trainingcourse-management.service";
import { toast } from "react-toastify";
import { Close } from "@mui/icons-material";

const CreateTrainingCourseComponent = ({
  callbackCreateCourse,
  callbackList,
}) => {
  const [birdSpecies, setBirdSpecies] = useState([]);

  const [selectedSpecies, setSelectedSpecies] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tmpDes, setTmpDes] = useState("");
  const [pictures, setPictures] = useState([]);
  const [submittedImages, setSubmittedImages] = useState([]);
  const [price, setPrice] = useState(0.0);

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
  async function fetchBirdSpecies() {
    try {
      let response = await TrainingCourseManagement.getAllBirdSpecies();
      console.log(response);
      setBirdSpecies(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  async function fetchCreatedData(id) {
    try {
      let params = {
        $filter: `id eq ${id}`,
      };
      let response = await TrainingCourseManagement.getAllTrainingCourse(
        params
      );
      console.log(response[0]);
      return response[0];
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Create a FormData object to hold the form data
    let check = true;
    if (!pictures || pictures.length < 1) {
      check = false;
      toast.error("Please provide course image");
    }
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
      formData.append("BirdSpeciesId", selectedSpecies);
      formData.append("Title", title);
      formData.append("Description", description);
      formData.append("TotalPrice", price);

      // Append each file separately
      pictures.forEach((picture, index) => {
        formData.append(`Pictures`, picture);
      });
      try {
        let response = await TrainingCourseManagement.createTrainingCourse(
          formData
        );
        console.log(response);
        if (response.status === 200) {
          let courseCreated = await fetchCreatedData(response.data);
          toast.success("Create successfully!");
          callbackCreateCourse(courseCreated);
        } else {
          toast.error("An error has occured!");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    fetchBirdSpecies();
  }, []);
  return (
    <div>
      <Grid sx={{ padding: 2 }}>
        <AppBar position="static" color="ochre" sx={{ borderRadius: 3 }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              sx={{ mr: 2 }}
              onClick={callbackList}
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
              Create Training Course
            </Typography>
          </Toolbar>
        </AppBar>
      </Grid>
      <div
        className="form-container"
        style={{
          display: "flex",
          width: "100%",
          padding: "20px",
          minHeight: 'auto'
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
              width: "55%",
              maxWidth: "610px",
            }}
          >
            {/* general infor */}
            <Typography variant="h6" gutterBottom>
              General information
            </Typography>
            {/* label selector */}
            <FormControl
              sx={{
                margin: 2,
                width: "90%",
                maxWidth: 610,
              }}
            >
              <InputLabel id="selectLabel_ChooseSpecies">
                Choose Species
              </InputLabel>
              <Select
                labelId="selectLabel_ChooseSpecies"
                label="Choose Species"
                value={selectedSpecies}
                onChange={handleSelectSpecies}
              >
                {birdSpecies.map((speciy) => (
                  <MenuItem value={speciy.id}>{speciy.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* input title */}
            <FormControl
              fullWidth
              required
              style={{
                margin: "10px 20px",
                width: "90%",
              }}
            >
              <InputLabel htmlFor="title">Title</InputLabel>
              <Input type="text" onChange={(e) => setTitle(e.target.value)} />
            </FormControl>
            {/* input price */}
            <FormControl
              fullWidth
              required
              variant="outlined"
              style={{ margin: "10px 20px", width: "90%" }}
            >
              <InputLabel>Price</InputLabel>
              <Input
                type="number"
                step="0.01"
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </FormControl>
            {/* describe */}
            <FormControl
              fullWidth
              required
              style={{ margin: "10px 20px", width: "90%" }}
            >
              <Typography variant="h6" gutterBottom>
                Description
              </Typography>
              <Editor
                stylePropEditor={{ height: "80%" }}
                onGetHtmlValue={handleEditorChange}
                htmlValue={tmpDes}
              />
            </FormControl>
          </div>

          {/* upload picture */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "55%",
              maxWidth: "610px",
            }}
          >
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
                onClick={() => callbackList()}
              >
                Cancel
              </Button>
              <Button
                sx={{ marginBottom: "20px" }}
                variant="contained"
                color="ochre"
                type="submit"
              >
                Confirm create course
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTrainingCourseComponent;

import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import Editor from "../../component/text-editor/Editor";
import { UploadComponent } from "../../component/upload/Upload";
import TrainingCourseManagement from "../../../services/trainingcourse-management.service";
import { toast } from "react-toastify";

const CreateTrainingCourseComponent = ({ callbackCreateCourse }) => {
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

      TrainingCourseManagement.createTrainingCourse(formData)
        .then((response) => {
          if (response.status === 200) {
            toast.success("Create successfully!");
            callbackCreateCourse();
          } else {
            toast.error("An error has occured!");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  useEffect(() => {
    fetchBirdSpecies();
  }, []);
  return (
    <div>
      <h2>Create Training Course</h2>
      <div className="form-container">
        <form
          onSubmit={handleSubmit}
          className="form"
          encType="multipart/form-data"
        >
          <Typography variant="h6" gutterBottom>
            General information
          </Typography>
          <FormControl
            sx={{
              margin: "5px",
              marginBottom: "25px",
              width: "100%",
              maxWidth: "350px",
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
          <FormControl
            fullWidth
            required
            style={{ margin: 10, marginBottom: 10 }}
          >
            <InputLabel htmlFor="title">Title</InputLabel>
            <Input type="text" onChange={(e) => setTitle(e.target.value)} />
          </FormControl>
          {/* <FormControl fullWidth required variant="outlined">
              <InputLabel>Total Slot</InputLabel>
              <Input
                type="number"
                step="1"
                onChange={(e) => setTotalSlot(e.target.value)}
                required
              />
            </FormControl>
          </Stack>
          <Stack spacing={3} direction="row" sx={{ marginBottom: 4 }}>
            <FormControl fullWidth required variant="outlined">
              <InputLabel>Register End</InputLabel>
              <Input
                type="number"
                onChange={(e) => setRegisterEnd(e.target.value)}
                required
              />
            </FormControl> */}
          <FormControl
            fullWidth
            required
            variant="outlined"
            style={{ margin: 10, marginBottom: 25 }}
          >
            <InputLabel>Price</InputLabel>
            <Input
              type="number"
              step="0.01"
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </FormControl>
          <FormControl fullWidth required style={{ marginBottom: 10 }}>
            <Typography variant="h6" gutterBottom>
              Description
            </Typography>
            <Editor onGetHtmlValue={handleEditorChange} htmlValue={tmpDes} />
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
            Confirm create course
          </Button>
          <Button
            sx={{ float: "right", marginBottom: "20px", marginRight: "10px" }}
            color="ochre"
            onClick={() => callbackCreateCourse()}
          >
            Cancel
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateTrainingCourseComponent;
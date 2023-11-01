import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  Stack,
  Typography,
} from "@mui/material";
import "./create-workshop.scss";
import Editor from "../../component/text-editor/Editor";
import { getWorkshops } from "../workshopService";
import { UploadComponent } from "../../component/upload/Upload";

const CreateWorkshopComponent = ({callbackCreateWorkshop}) => {
  const [title, setTitle] = useState("");
  const [totalSlot, setTotalSlot] = useState(0);
  const [registerEnd, setRegisterEnd] = useState(0);
  const [price, setPrice] = useState(0.0);
  const [description, setDescription] = useState("");
  const [pictures, setPictures] = useState([]);
  const [submittedImages, setSubmittedImages] = useState([]);
  
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
  async function fetchCreatedData(id) {
    try {
      let params = {
        $filter: `id eq ${id}`,
      };
      let response = await getWorkshops(params);
      return response[0];
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    let ACCESS_TOKEN =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUiLCJlbWFpbCI6InRydW5nYWRtaW5AbWFpbCIsInJvbGUiOiJNYW5hZ2VyIiwibmFtZSI6IlRydW5nIEAkbWluaXN0cmF0b3IiLCJhdmF0YXIiOiIiLCJleHAiOjE2OTgyMDQ4Mzh9.W9HI8eNKb6MNSQERttmbUWPXSvVZf3tpkdbl65rZXYY"; // Replace with your actual token
    let apiUrl = "http://54.179.55.17/api/workshop/create";    
    const token = ACCESS_TOKEN;

    // Create a FormData object to hold the form data
    const formData = new FormData();
    formData.append("Title", title);
    formData.append("Description", description);
    formData.append("RegisterEnd", registerEnd);
    formData.append("Price", price);
    formData.append("TotalSlot", totalSlot);

    // Append each file separately
    pictures.forEach((picture, index) => {
      formData.append(`Pictures`, picture);
    });
    try {
      const response = await axios.post(apiUrl, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        let id = response.data;
        let workshop = await fetchCreatedData(id);
        callbackCreateWorkshop(workshop);
      } else {
        // Handle error responses here
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Create Workshop</h2>
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
              <InputLabel htmlFor="title">Title</InputLabel>
              <Input type="text" onChange={(e) => setTitle(e.target.value)} />
            </FormControl>
            <FormControl fullWidth required variant="outlined">
              <InputLabel>Total Slot</InputLabel>
              <Input type="number" step="1" onChange={(e) => setTotalSlot(e.target.value)} required />
            </FormControl>
          </Stack>
          <Stack spacing={3} direction="row" sx={{ marginBottom: 4 }}>
            <FormControl fullWidth required variant="outlined">
              <InputLabel>Register End</InputLabel>
              <Input type="number" onChange={(e) => setRegisterEnd(e.target.value)} required />
            </FormControl>
            <FormControl fullWidth required variant="outlined">
              <InputLabel>Price</InputLabel>
              <Input type="number" step="0.01" onChange={(e) => setPrice(e.target.value)} required />
            </FormControl>
          </Stack>
          <FormControl fullWidth required style={{ marginBottom: 10 }}>
            <Typography variant="h6" gutterBottom>
              Description
            </Typography>
            <Editor onGetHtmlValue={handleEditorChange} htmlValue={description} />
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
            sx={{ float: "right", marginBottom: '20px' }}
            variant="contained"
            color="ochre"
            type="submit"
          >
            Create Workshop
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateWorkshopComponent;

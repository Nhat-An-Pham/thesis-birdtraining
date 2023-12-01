import React, { useState } from "react";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  Stack,
  Typography,
} from "@mui/material";
import "./create-workshop.scss";
import Editor from "../../../component/text-editor/Editor";
import { UploadComponent } from "../../../component/upload/Upload";
import workshopManagementService from "../../../../services/workshop-management.service";
import { toast } from "react-toastify";

const CreateWorkshopComponent = ({ callbackCreateWorkshop }) => {
  const [title, setTitle] = useState("");
  const [totalSlot, setTotalSlot] = useState(0);
  const [registerEnd, setRegisterEnd] = useState(0);
  const [price, setPrice] = useState(0.0);
  const [description, setDescription] = useState("");
  const [tempDesc, setTempDesc] = useState("");
  const [pictures, setPictures] = useState([]);
  const [submittedImages, setSubmittedImages] = useState([]);

  const handleEditorChange = (value) => {
    setTempDesc(value);
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
      let response = await workshopManagementService.getWorkshops(params);
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
      toast.error("Please provide workshop image");
    }
    if(!tempDesc || tempDesc.length < 1){
      check = false;
      toast.error("Please provide workshop description");
    }
    if (check) {
      const formData = new FormData();
      formData.append("Title", title);
      formData.append("Description", tempDesc);
      formData.append("RegisterEnd", registerEnd);
      formData.append("Price", price);
      formData.append("TotalSlot", totalSlot);

      // Append each file separately
      pictures.forEach((picture, index) => {
        formData.append(`Pictures`, picture);
      });

      workshopManagementService
        .createWorkshop(formData)
        .then((response) => {
          let id = response.data;
          fetchCreatedData(id).then((workshop) => {
            toast.success("Create successfully!");
            callbackCreateWorkshop(workshop);
          });
        })
        .catch((error) => {
          console.log(error);
        });
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
            </FormControl>
            <FormControl fullWidth required variant="outlined">
              <InputLabel>Price</InputLabel>
              <Input
                type="number"
                step="0.01"
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </FormControl>
          </Stack>
          <FormControl fullWidth required style={{ marginBottom: 10 }}>
            <Typography variant="h6" gutterBottom>
              Description
            </Typography>
            <Editor
              onGetHtmlValue={handleEditorChange}
              htmlValue={description}
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
            Create Workshop
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateWorkshopComponent;

import React, { useState } from "react";
import {
  AppBar,
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputLabel,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import "./create-workshop.scss";
import Editor from "../../../component/text-editor/Editor";
import { UploadComponent } from "../../../component/upload/Upload";
import workshopManagementService from "../../../../services/workshop-management.service";
import { toast } from "react-toastify";
import { ArrowBackIosOutlined } from "@mui/icons-material";

const CreateWorkshopComponent = ({ callbackCreateWorkshop, callbackBack }) => {
  const [title, setTitle] = useState("");
  const [totalSlot, setTotalSlot] = useState(0);
  const [registerEnd, setRegisterEnd] = useState(0);
  const [price, setPrice] = useState(0.0);
  const [location, setLocation] = useState('');
  const [minAmount, setMinAmount] = useState(0);
  const [maxAmount, setMaxAmount] = useState(0);
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
    if (!tempDesc || tempDesc.length < 1) {
      check = false;
      toast.error("Please provide workshop description");
    }
    if (check) {
      const formData = new FormData();
      formData.append("Title", title);
      formData.append("Description", tempDesc);
      formData.append("RegisterEnd", registerEnd);
      formData.append("Price", price);
      formData.append("Location", location);
      formData.append("MinimumRegistration", minAmount);
      formData.append("MaximumRegistration", maxAmount);
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
  const onBack = () => {
    callbackBack();
  };
  return (
    <div>
      <AppBar position="static" color="ochre">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
            onClick={onBack}
          >
            <ArrowBackIosOutlined />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Create new workshop
          </Typography>
        </Toolbar>
      </AppBar>
      <Divider />
      <Container sx={{ padding: 2 }}>
        <form
          onSubmit={handleSubmit}
          className="form"
          encType="multipart/form-data"
        >
          <Grid container spacing={2}>
            <Grid container item xs={6} spacing={3}>
              <Grid container item spacing={0}>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    General information
                  </Typography>
                </Grid>
                <Grid container item xs={12} spacing={3}>
                  <Grid item>
                    <FormControl required>
                      <InputLabel htmlFor="title">Title</InputLabel>
                      <Input
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl required variant="outlined">
                      <InputLabel>Total Slot</InputLabel>
                      <Input
                        type="number"
                        step="1"
                        onChange={(e) => setTotalSlot(e.target.value)}
                        required
                      />
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl required variant="outlined">
                      <InputLabel>Price (VND)</InputLabel>
                      <Input
                        type="number"
                        step="1000"
                        onChange={(e) => setPrice(e.target.value)}
                        required
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container item spacing={0}>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Registration information
                  </Typography>
                </Grid>
                <Grid container item xs={12} spacing={3}>
                  <Grid item>
                    <FormControl required>
                      <InputLabel htmlFor="location">Location</InputLabel>
                      <Input
                        id="location"
                        type="text"
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl required>
                      <InputLabel htmlFor="registerEnd">Register Period</InputLabel>
                      <Input
                        id="registerEnd"
                        type="number"
                        step="1"
                        min="1"
                        onChange={(e) => setRegisterEnd(e.target.value)}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl required variant="outlined">
                      <InputLabel>Minimum amount</InputLabel>
                      <Input
                        type="number"
                        step="1"
                        onChange={(e) => setMinAmount(e.target.value)}
                        required
                      />
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl fullWidth required variant="outlined">
                      <InputLabel>Maximum amount</InputLabel>
                      <Input
                        type="number"
                        step="1"
                        onChange={(e) => setMaxAmount(e.target.value)}
                        required
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container item spacing={0}>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Pictures
                  </Typography>
                </Grid>
                <FormControl required style={{ marginBottom: 15 }}>
                  {/* <Button variant="contained" color="ochre">
                    <UploadComponent
                      onChange={handleFileChange}
                      accept="image/*"
                    >
                      Upload image(s)
                    </UploadComponent>
                  </Button> */}
                  <UploadComponent onChange={handleFileChange} accept="image/*">
                    Upload image(s)
                  </UploadComponent>
                  {/* Display submitted files here */}
                  {/* <div>
                    {submittedImages.map((imageName, index) => (
                      <div key={index}>{imageName}</div>
                    ))}
                  </div> */}
                </FormControl>
              </Grid>
            </Grid>
            <Grid container item xs={6} spacing={0}>
              <Grid item xs={12}>
                <Typography variant="h6">Description</Typography>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <Editor
                    onGetHtmlValue={handleEditorChange}
                    htmlValue={description}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid container item xs={12} justifyContent={'flex-end'}>
              <Button
                // sx={{ float: "right", marginBottom: "20px" }}
                variant="contained"
                color="ochre"
                type="submit"
              >
                Create Workshop
              </Button>
            </Grid>
          </Grid>

          {/* <Stack spacing={3} direction="row" sx={{ marginBottom: 4 }}>
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
              <InputLabel>Register Period</InputLabel>
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
          </Stack> */}
          {/* <FormControl fullWidth required style={{ marginBottom: 10 }}>
            <Typography variant="h6" gutterBottom>
              Description
            </Typography>
            <Editor
              onGetHtmlValue={handleEditorChange}
              htmlValue={description}
            />
          </FormControl> */}

          {/* <br />
          <Button
            sx={{ float: "right", marginBottom: "20px" }}
            variant="contained"
            color="ochre"
            type="submit"
          >
            Create Workshop
          </Button> */}
        </form>
      </Container>
    </div>
  );
};

export default CreateWorkshopComponent;

import React, { useState } from "react";
import {
  AppBar,
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  IconButton,
  TextField,
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
  const [location, setLocation] = useState("");
  const [minAmount, setMinAmount] = useState(0);
  const [maxAmount, setMaxAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [tempDesc, setTempDesc] = useState("");
  const [pictures, setPictures] = useState([]);
  const [errors, setErrors] = useState({
    totalSlot: {
      message: "Must be positive number!",
      value: false,
    },
    price: {
      message: "Must be positive number!",
      value: false,
    },
    registerEnd: {
      message: "Must be positive number!",
      value: false,
    },
    minAmount: {
      message: "Must be positive number!",
      value: false,
    },
    maxAmount: {
      message: "Must be positive number!",
      value: false,
    },
  });

  const handleEditorChange = (value) => {
    setTempDesc(value);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setPictures(files);
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
    if (errors.totalSlot.value) {
      check = false;
      toast.error(errors.totalSlot.message);
    } else if (errors.registerEnd.value) {
      check = false;
      toast.error(errors.registerEnd.message);
    } else if (errors.minAmount.value) {
      check = false;
      toast.error(errors.minAmount.message);
    } else if (errors.maxAmount.value) {
      check = false;
      toast.error(errors.maxAmount.message);
    } else if (errors.price.value) {
      check = false;
      toast.error(errors.price.message);
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
  const handleInputChange = (fieldName, value) => {
    // Validate if the value is a positive number
    const isValid = !isNaN(value) && parseFloat(value) > 0;

    // Update the errors state based on validation result
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: {
        ...prevErrors[fieldName],
        value: !isValid,
      },
    }));
    if (!isValid) {
      throw isValid;
    }
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
                  <Typography variant="h6" fontWeight={"bold"} gutterBottom>
                    General information
                  </Typography>
                </Grid>
                <Grid container item xs={12} spacing={3}>
                  <Grid item>
                    <TextField
                      required
                      label={"Title"}
                      type="text"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      label={"Total Slot"}
                      type="number"
                      step="1"
                      onChange={(e) => {
                        try {
                          handleInputChange("totalSlot", e.target.value);
                          setTotalSlot(e.target.value);
                        } catch (error) {}
                      }}
                      required
                      error={errors.totalSlot.value}
                      helperText={
                        errors.totalSlot.value ? errors.totalSlot.message : null
                      }
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      label={"Price (VND)"}
                      type="number"
                      onChange={(e) => {
                        try {
                          handleInputChange("price", e.target.value);
                          setPrice(e.target.value);
                        } catch (error) {}
                      }}
                      required
                      error={errors.price.value}
                      helperText={
                        errors.price.value ? errors.price.message : null
                      }
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid container item spacing={0}>
                <Grid item xs={12}>
                  <Typography variant="h6" fontWeight={"bold"} gutterBottom>
                    Registration information
                  </Typography>
                </Grid>
                <Grid container item xs={12} spacing={3}>
                  <Grid item>
                    <TextField
                      required
                      label={"Location"}
                      id="location"
                      type="text"
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </Grid>
                  <Grid item>
                    <FormControl required>
                      <TextField
                        required
                        label={"Register Period"}
                        id="registerEnd"
                        type="number"
                        onChange={(e) => {
                          try {
                            handleInputChange("registerEnd", e.target.value);
                            setRegisterEnd(e.target.value);
                          } catch (error) {}
                        }}
                        error={errors.registerEnd.value}
                        helperText={
                          errors.registerEnd.value
                            ? errors.registerEnd.message
                            : null
                        }
                      />
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <TextField
                      type="number"
                      label={"Minimum Registered"}
                      onChange={(e) => {
                        try {
                          handleInputChange("minAmount", e.target.value);
                          setMinAmount(e.target.value);
                        } catch (error) {}
                      }}
                      required
                      error={errors.minAmount.value}
                      helperText={
                        errors.minAmount.value ? errors.minAmount.message : null
                      }
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      type="number"
                      label={"Maximum Registered"}
                      onChange={(e) => {
                        try {
                          handleInputChange("maxAmount", e.target.value);
                          setMaxAmount(e.target.value);
                        } catch (error) {}
                      }}
                      required
                      error={errors.maxAmount.value}
                      helperText={
                        errors.maxAmount.value ? errors.maxAmount.message : null
                      }
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid container item spacing={0}>
                <Grid item xs={12}>
                  <Typography variant="h6" fontWeight={"bold"} gutterBottom>
                    Description
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
                  {/* <UploadComponent onChange={handleFileChange} accept="image/*">
                    Upload image(s)
                  </UploadComponent> */}
                  <FormControl fullWidth required>
                    <Editor
                      onGetHtmlValue={handleEditorChange}
                      htmlValue={description}
                    />
                  </FormControl>
                  {/* Display submitted files here */}
                  {/* <div>
                    {submittedImages.map((imageName, index) => (
                      <div key={index}>{imageName}</div>
                    ))}
                  </div> */}
                </FormControl>
              </Grid>
            </Grid>
            <Grid
              container
              item
              xs={6}
              spacing={2}
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
            >
              <Grid item>
                <Typography variant="h6" fontWeight={"bold"}>
                  Pictures
                </Typography>
              </Grid>
              <UploadComponent onChange={handleFileChange} accept="image/*">
                Upload image(s)
              </UploadComponent>
            </Grid>
            <Grid container item xs={12} justifyContent={"flex-end"}>
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

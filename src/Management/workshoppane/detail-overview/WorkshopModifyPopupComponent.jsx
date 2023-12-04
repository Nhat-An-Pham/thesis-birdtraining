import React, { useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import "../workshop/create-workshop/create-workshop.scss";
import { toast } from "react-toastify";
import workshopManagementService from "../../../services/workshop-management.service";
import Editor from "../../component/text-editor/Editor";

const WorkshopModifyPopupComponent = ({
  workshopId,
  callbackModifyWorkshop,
  callbackBack,
  open,
  handleClose,
}) => {
  const [workshop, setWorkshop] = useState(null);
  const [title, setTitle] = useState("");
  const [totalSlot, setTotalSlot] = useState(0);
  const [registerEnd, setRegisterEnd] = useState(0);
  const [price, setPrice] = useState(0.0);
  const [location, setLocation] = useState("");
  const [minAmount, setMinAmount] = useState(0);
  const [maxAmount, setMaxAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [tempDesc, setTempDesc] = useState("");
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
  const fetchWorkshopData = async () => {
    try {
      let params = {
        $filter: `id eq ${workshopId}`,
      };
      let response = await workshopManagementService.getWorkshops(params);
      setWorkshop(response[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchWorkshopData();

    return () => {};
  }, [workshopId]);

  const handleEditorChange = (value) => {
    setTempDesc(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Create a FormData object to hold the form data
    let check = true;
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

      try {
        toast.success("Modify successfully!");
        callbackModifyWorkshop();
      } catch (error) {
        if (error.response?.data?.message) {
          toast.error(error.response?.data?.message);
        } else {
          toast.error("An error has occured!");
        }
      }
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
    <>
      {workshop ? (
        <Dialog
          open={open}
          onClose={handleClose}
          sx={{
            "& .MuiDialog-container": {
              "& .MuiPaper-root": {
                width: "100%",
                maxWidth: 530, // Set your width here
              },
            },
          }}
        >
          <DialogTitle>Modify workshop: {workshop.title}</DialogTitle>
          <DialogContent>
            <form
              onSubmit={handleSubmit}
              className="form"
              encType="multipart/form-data"
            >
              <Grid container spacing={2}>
                <Grid container item spacing={0}>
                  <Grid item xs={12}>
                    <Typography variant="h6" fontWeight={"bold"} gutterBottom>
                      General information
                    </Typography>
                  </Grid>
                  <Grid
                    container
                    item
                    xs={12}
                    spacing={3}
                    justifyContent={"space-between"}
                  >
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        multiline={true}
                        maxRows={2}
                        rows={2}
                        required
                        label={"Title"}
                        type="text"
                        value={workshop.title}
                        onChange={(e) =>
                          setWorkshop((prevState) => ({
                            ...prevState,
                            title: e.target.value,
                          }))
                        }
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
                        defaultValue={workshop.totalSlot}
                        value={workshop.totalSlot}
                        error={errors.totalSlot.value}
                        helperText={
                          errors.totalSlot.value
                            ? errors.totalSlot.message
                            : null
                        }
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        label={"Price (VND)"}
                        type="number"
                        defaultValue={workshop.price}
                        value={workshop.price}
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
                  <Grid
                    container
                    item
                    xs={12}
                    spacing={3}
                    justifyContent={"space-between"}
                  >
                    <Grid item>
                      <TextField
                        required
                        label={"Location"}
                        id="location"
                        type="text"
                        value={workshop.location}
                        onChange={(e) =>
                          setWorkshop((prevState) => ({
                            ...prevState,
                            location: e.target.value,
                          }))
                        }
                      />
                    </Grid>
                    <Grid item>
                      <FormControl required>
                        <TextField
                          required
                          label={"Register Period"}
                          id="registerEnd"
                          value={workshop.registerEnd}
                          type="number"
                          onChange={(e) => {
                            try {
                              handleInputChange("registerEnd", e.target.value);
                              setWorkshop((prevState) => ({
                                ...prevState,
                                registerEnd: e.target.value,
                              }));
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
                        defaultValue={workshop.minimumRegistration}
                        value={workshop.minimumRegistration}
                        onChange={(e) => {
                          try {
                            handleInputChange("minAmount", e.target.value);
                            setWorkshop((prevState) => ({
                              ...prevState,
                              minimumRegistration: e.target.value,
                            }));
                          } catch (error) {}
                        }}
                        required
                        error={errors.minAmount.value}
                        helperText={
                          errors.minAmount.value
                            ? errors.minAmount.message
                            : null
                        }
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        type="number"
                        label={"Maximum Registered"}
                        defaultValue={workshop.maximumRegistration}
                        value={workshop.maximumRegistration}
                        onChange={(e) => {
                          try {
                            handleInputChange("maxAmount", e.target.value);
                            setWorkshop((prevState) => ({
                              ...prevState,
                              maximumRegistration: e.target.value,
                            }));
                          } catch (error) {}
                        }}
                        required
                        error={errors.maxAmount.value}
                        helperText={
                          errors.maxAmount.value
                            ? errors.maxAmount.message
                            : null
                        }
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container item xs={12}>
                  <Grid item xs={12}>
                    <Typography variant="h6" fontWeight={"bold"} gutterBottom>
                      Description
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl required style={{ marginBottom: 15 }}>
                      <FormControl fullWidth required>
                        <Editor
                          onGetHtmlValue={handleEditorChange}
                          htmlValue={workshop.description}
                        />
                      </FormControl>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid
                  container
                  item
                  xs={12}
                  justifyContent={"flex-end"}
                  spacing={2}
                >
                  <Grid item>
                    <Button
                      // sx={{ float: "right", marginBottom: "20px" }}
                      variant="contained"
                      color="success"
                      type="submit"
                    >
                      Confirm
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      // sx={{ float: "right", marginBottom: "20px" }}
                      variant="contained"
                      color="error"
                      onClick={handleClose}
                    >
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </DialogContent>
        </Dialog>
      ) : (
        <>
          <CircularProgress />
        </>
      )}
    </>
  );
};

export default WorkshopModifyPopupComponent;

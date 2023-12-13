import React, { useEffect, useState } from "react";
import {
  AppBar,
  Button,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import TrainingCourseManagement from "../../../services/trainingcourse-management.service";
import { toast } from "react-toastify";
import { Close } from "@mui/icons-material";

const CreatePricePolicyComponent = ({ callbackCreatePolicy }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0.0);

  async function fetchCreatedData(id) {
    try {
      let params = {
        $filter: `id eq ${id}`,
      };
      // let params = {
      //   $orderby: `id desc`,
      // };
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
    if (!title || title.length < 1) {
      check = false;
      toast.error("Please provide course title");
    }
    if (check) {
      const model = {
        name: title,
        chargeRate: price,
      };
      console.log(model);

      try {
        let response = await TrainingCourseManagement.createTrainingPricePolicy(
          model
        );
        console.log(response);
        if (response.status === 200) {
          let courseCreated = await fetchCreatedData(response.data);
          toast.success("Create successfully!");
          callbackCreatePolicy(courseCreated);
        } else {
          toast.error("An error has occured!");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {}, []);
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
              onClick={callbackCreatePolicy}
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
              Create Training Price Policy
            </Typography>
          </Toolbar>
        </AppBar>
      </Grid>
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
            fullWidth
            required
            style={{ margin: 10, marginBottom: 10 }}
          >
            <InputLabel htmlFor="title">Name</InputLabel>
            <Input type="text" onChange={(e) => setTitle(e.target.value)} />
          </FormControl>
          <FormControl
            fullWidth
            required
            variant="outlined"
            style={{ margin: 10, marginBottom: 25 }}
          >
            <InputLabel>Charge rate</InputLabel>
            <Input
              type="number"
              step="0.01"
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </FormControl>
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
              onClick={() => callbackCreatePolicy()}
            >
              Cancel
            </Button>
            <Button
              sx={{ marginBottom: "20px" }}
              variant="contained"
              color="ochre"
              type="submit"
            >
              Confirm create policy
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePricePolicyComponent;

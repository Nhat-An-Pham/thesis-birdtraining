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

const DetailPricePolicyComponent = ({
  trainingPolicy,
  callbackUpdatePolicy,
}) => {
  const [selectedTrainingPolicy, setSelectedTrainingPolicy] = useState(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0.0);

  async function fetchTrainingPolicy() {
    try {
      console.log(trainingPolicy.id);
      let params = {
        $filter: `id eq ${trainingPolicy.id}`,
      };
      let response = await TrainingCourseManagement.getAllTrainingPricePolicies(
        params
      );
      console.log(response[0]);
      setSelectedTrainingPolicy(response[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
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
    let check = true;
    if (!title || title.length < 1) {
      check = false;
      toast.error("Please provide course title");
    }
    if (check) {
      const model = {
        id: trainingPolicy.id,
        name: title,
        chargeRate: price,
      };
      console.log(model);
      try {
        let res = await TrainingCourseManagement.editTrainingPricePolicy(model);
        if (res.status === 200) {
          toast.success("Update successfully!");
          await fetchTrainingPolicy();
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
    fetchTrainingPolicy();
  }, []);
  useEffect(() => {
    // fetchTrainingCourse();
    //fetchBirdSpecies();
    if (selectedTrainingPolicy != null) {
      setTitle(selectedTrainingPolicy.name);
      setPrice(selectedTrainingPolicy.chargeRate);
    }
  }, [selectedTrainingPolicy]);
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
              onClick={callbackUpdatePolicy}
            >
              <Close />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              Training Price Policy Detail
            </Typography>
          </Toolbar>
        </AppBar>
      </Grid>
      {selectedTrainingPolicy ? (
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
                <FormControl fullWidth required style={{ marginBottom: 20 }}>
                  <InputLabel htmlFor="title">Name</InputLabel>
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
                  <InputLabel>Charge rate</InputLabel>
                  <Input
                    type="number"
                    step="0.01"
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    value={price}
                  />
                </FormControl>
                <br />
                <Button
                  sx={{ float: "right", marginBottom: "20px" }}
                  variant="contained"
                  color="ochre"
                  type="submit"
                >
                  Confirm update policy
                </Button>
                <Button
                  sx={{
                    float: "right",
                    marginBottom: "20px",
                    marginRight: "10px",
                  }}
                  variant="contained"
                  color="ochre"
                  onClick={() => callbackUpdatePolicy(trainingPolicy)}
                >
                  Cancel
                </Button>
              </form>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default DetailPricePolicyComponent;

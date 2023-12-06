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
import { Img } from "react-image";
import Editor from "../../component/text-editor/Editor";
import { UploadComponent } from "../../component/upload/Upload";
import TrainingCourseManagement from "../../../services/trainingcourse-management.service";
import { toast } from "react-toastify";

const DetailPricePolicyComponent = ({
  trainingPolicy,
  callbackUpdatePolicy,
}) => {
  const [selectedTrainingPolicy, setSelectedTrainingPolicy] = useState(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0.0);

  async function fetchTrainingPolicy() {
    try {
      console.log(trainingCourse.id);
      let params = {
        $filter: `id eq ${trainingPolicy.id}`,
      };
      let response = await TrainingCourseManagement.getTrainingCourseById(
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
      const formData = new FormData();
      formData.append("Id", selectedTrainingPolicy.id);
      formData.append("Name", title);
      formData.append("ChargeRate", price);

      try {
        let res = await TrainingCourseManagement.editTrainingPricePolicy(
          formData
        );
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
    <>
      {selectedTrainingPolicy ? (
        <>
          <div padding={20}>
            <h2>Training Course Detail</h2>
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
    </>
  );
};

export default DetailPricePolicyComponent;

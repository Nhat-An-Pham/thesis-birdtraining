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

const CreatePricePolicyComponent = ({ callbackCreatePolicy }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0.0);

  async function fetchCreatedData(id) {
    try {
      // let params = {
      //   $filter: `id eq ${id}`,
      // };
      let params = {
        $orderby: `id desc`,
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
    if (!title || title.length < 1) {
      check = false;
      toast.error("Please provide course title");
    }
    if (check) {
      const formData = new FormData();
      formData.append("Name", title);
      formData.append("ChargeRate", price);

      try {
        let response = await TrainingCourseManagement.createTrainingPricePolicy(
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
  useEffect(() => {}, []);
  return (
    <div padding={20}>
      <h2>Create Training Policy</h2>
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
          <Button
            sx={{ float: "right", marginBottom: "20px" }}
            variant="contained"
            color="ochre"
            type="submit"
          >
            Confirm create policy
          </Button>
          <Button
            sx={{ float: "right", marginBottom: "20px", marginRight: "10px" }}
            color="ochre"
            onClick={() => callbackCreatePolicy()}
          >
            Cancel
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreatePricePolicyComponent;

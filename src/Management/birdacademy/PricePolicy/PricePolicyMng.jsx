import React, { useState, useEffect } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  Checkbox,
  Alert,
  Grid,
  CircularProgress,
  Drawer,
  Typography,
  Box,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Button,
  ThemeProvider,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import { Img } from "react-image";
import RawHTMLRenderer from "../../component/htmlRender/htmlRender";
import TrainingCourseManagement from "../../../services/trainingcourse-management.service";
import { AddBoxOutlined, Close, InfoOutlined } from "@mui/icons-material";
import { ochreTheme } from "../../themes/Theme";
import { toast } from "react-toastify";
import CreatePricePolicyComponent from "./CreatePricePolicyComponent";
import DetailPricePolicyComponent from "./DetailPricePolicyComponent";
// import { toast } from 'react-toastify';

const PricePolicyMng = () => {
  // let BASE_URL = 'https://localhost:7176/api';

  const [renderAllPolicies, setRenderAllPolicies] = useState(true);
  const [renderCreatePolicy, setRenderCreatePolicy] = useState(false);
  const [renderUpdatePolicy, setRenderUpdatePolicy] = useState(false);

  const [contextMenus, setContextMenus] = useState([]);
  const [selectedPolicy, setSelectedPolicy] = useState();
  const [trainingPolicies, setTrainingPolicies] = useState([]);
  const detailClick = (trainingPolicy) => {
    console.log(trainingPolicy);
    setSelectedPolicy(trainingPolicy);
    setRenderUpdatePolicy(true);
    setRenderAllPolicies(false);
    setRenderCreatePolicy(false);
  };
  const createCourseClick = () => {
    setRenderCreatePolicy(true);
    setRenderAllPolicies(false);
  };
  // Fetch workshops and classes based on the status filter
  async function fetchData() {
    try {
      let params = {
        $orderby: `id desc`,
      };
      let response = await TrainingCourseManagement.getAllTrainingPricePolicies(
        params
      );
      setTrainingPolicies(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    fetchData();
    // console.log(workshops);
  }, []);
  useEffect(() => {
    if (trainingPolicies) {
      setContextMenus(new Array(trainingPolicies.length).fill(null));
    }
    return () => {};
  }, [trainingPolicies]);

  const handleActiveCourse = async (trainingPolicy) => {
    setSelectedPolicy(trainingPolicy);
    try {
      console.log(trainingPolicy);
      let params = {
        policyId: trainingPolicy.id,
      };
      let response = await TrainingCourseManagement.activeTrainingPricePolicy(
        params
      );
      if (response.status === 200) {
        toast.success("Active successfully!");
        fetchData();
      } else {
        toast.error("An error has occured!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
      // console.log(error.response.data);
    }
  };
  const handleDisableCourse = async (trainingPolicy) => {
    setSelectedPolicy(trainingPolicy);
    try {
      console.log(trainingPolicy);
      let params = {
        policyId: trainingPolicy.id,
      };
      let response = await TrainingCourseManagement.disableTrainingPricePolicy(
        params
      );
      if (response.status === 200) {
        toast.success("Disable successfully!");
        fetchData();
      } else {
        toast.error("An error has occured!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
      // console.log(error.response.data);
    }
  };
  const onCallBackTrainingCourseManagement = async (selectedPolicy) => {
    fetchData();
    setSelectedPolicy(selectedPolicy);
    setRenderUpdatePolicy(false);
    setRenderAllPolicies(true);
    setRenderCreatePolicy(false);
  };
  return (
    <div>
      <ThemeProvider theme={ochreTheme}>
        {/* <AppBar position="static" color="ochre">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              sx={{ mr: 2 }}
              onClick={callBackMainManagement}
            >
              <Close />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              Training Course Price Policies Management
            </Typography>
          </Toolbar>
        </AppBar> */}
        {renderAllPolicies && (
          <Grid style={{ padding: 20 }} marginTop={1} container spacing={1}>
            <Button
              sx={{ float: "left", margin: "20px" }}
              variant="contained"
              color="ochre"
              onClick={() => createCourseClick()}
            >
              Create new training policy
            </Button>
            {/* <Button
              sx={{ float: "right", margin: "20px" }}
              onClick={() => callBackMainManagement()}
            >
              Back
            </Button> */}
            <Grid item xs={12}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Charge rate</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {trainingPolicies && trainingPolicies.length > 0 ? (
                      trainingPolicies.map((policy, index) => (
                        <TableRow
                          hover
                          // selected
                          key={policy.id}
                          className={
                            selectedPolicy != null &&
                            policy.id === selectedPolicy.id
                              ? "Mui-selected"
                              : ""
                          }
                        >
                          <TableCell style={{ width: 300 }}>
                            {policy.name}
                          </TableCell>
                          <TableCell>{policy.chargeRate}</TableCell>
                          <TableCell style={{ width: 0.125 }} align="center">
                            <Checkbox
                              checked={policy.status === "Active"}
                              // onChange={() => switchWorkshopStatus(workshop)}
                              sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                            />
                          </TableCell>
                          <TableCell>
                            {policy.status === "Active" && (
                              <Button
                                variant="contained"
                                color="ochre"
                                onClick={() => handleDisableCourse(policy)}
                              >
                                Disable
                              </Button>
                            )}
                            {policy.status !== "Active" && (
                              <Button
                                variant="contained"
                                color="ochre"
                                onClick={() => handleActiveCourse(policy)}
                              >
                                Active
                              </Button>
                            )}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              color="ochre"
                              onClick={() => detailClick(policy)}
                            >
                              View Detail
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} align="center">
                          No record!
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        )}
        {renderCreatePolicy && (
          <CreatePricePolicyComponent
            callbackCreatePolicy={onCallBackTrainingCourseManagement}
          />
        )}
        {renderUpdatePolicy && (
          <DetailPricePolicyComponent
            trainingPolicy={selectedPolicy}
            callbackUpdatePolicy={onCallBackTrainingCourseManagement}
          />
        )}
      </ThemeProvider>
    </div>
  );
};

export default PricePolicyMng;

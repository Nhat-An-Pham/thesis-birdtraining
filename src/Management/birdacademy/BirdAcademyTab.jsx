import React, { useEffect } from "react";
//import "./dashboard.scss";
import ReworkSidebar from "../component/sidebar/ReworkSidebar";
import { Box, Divider, Grid, Tab, Tabs } from "@mui/material";
import { WidthFullOutlined } from "@mui/icons-material";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import BirdAcademyMng from "./BirdAcademyMng";
import TrainingCourseMng from "./manager/TrainingCourseMng";
import PricePolicyMng from "./PricePolicy/PricePolicyMng";
import "../workshoppane/workshoppane.scss";
import TrainerAssignedTrainingSkill from "./TrainerAssignedTrainingSkill";
const BirdAcademyTab = () => {
  //Check ROLE
  const userRole = jwtDecode(
    JSON.parse(localStorage.getItem("user-token"))
  ).role;
  const [value, setValue] = React.useState(0);
  useEffect(() => {
    if (userRole != null && userRole == "Trainer") {
      setValue(3);
    }
  }, [userRole]);

  const handleChange = (event, newValue) => {
    console.log("change tab: ", newValue);
    setValue(newValue);
  };
  const tabs = [
    {
      label: "Academy Management",
      component: <BirdAcademyMng />,
      roles: ["Manager", "Staff"],
    },
    {
      label: "Training Course Management",
      component: <TrainingCourseMng />,
      roles: ["Manager"],
    },
    {
      label: "Price Policy Management",
      component: <PricePolicyMng />,
      roles: ["Manager"],
    },
    {
      label: "Assigned Training Skill",
      component: <TrainerAssignedTrainingSkill />,
      roles: ["Trainer"],
    },
  ];
  const tabsFull = [
    { label: "Academy Management", component: <BirdAcademyMng /> },
    { label: "Training Course Management", component: <TrainingCourseMng /> },
    { label: "Price Policy Management", component: <PricePolicyMng /> },
  ];

  return (
    <>
      <div className="workshop-container">
        <ReworkSidebar selectTab={5} />
        <ToastContainer />
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              TabIndicatorProps={{
                style: {
                  backgroundColor: "#c8ae7d",
                },
              }}
              sx={{
                ".Mui-selected": {
                  color: "rgb(200, 174, 125)",
                },
              }}
              scrollButtons
              allowScrollButtonsMobile
              aria-label="scrollable force tabs example"
            >
              {tabs.map((tab) =>
                tab.roles.includes(userRole) ? <Tab label={tab.label} /> : <></>
              )}
              {/* {userRole === "Staff" &&
                tabs.map((tab) => <Tab label={tab.label} />)}
              {userRole === "Manager" &&
                tabsFull.map((tab) => <Tab label={tab.label} />)} */}
            </Tabs>
          </Box>

          {tabs[value].component}
        </Box>
      </div>
    </>
  );
};

export default BirdAcademyTab;

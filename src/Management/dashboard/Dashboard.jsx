import React, { useEffect } from "react";
import "./dashboard.scss";
import ReworkSidebar from "../component/sidebar/ReworkSidebar";
import { Box, Divider, Grid, Tab, Tabs } from "@mui/material";
import BirdSpeciesManagementComponent from "./bird-species/BirdSpeciesManagementComponent";
import BirdSkillManagementComponent from "./bird-skills/BirdSkillManagementComponent";
import { WidthFullOutlined } from "@mui/icons-material";
import { ToastContainer } from "react-toastify";
import TrainerSkillManagementComponent from "./trainer-skills/TrainerSkillManagementComponent";

import TrainerManagementComponent from "./trainers/TrainerManagementComponent";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Dashboard = () => {

  //Check ROLE
  const userRole = jwtDecode(JSON.parse(localStorage.getItem("user-token"))).role
  const navigator = useNavigate();
  useEffect(() => {
    if (userRole === "Administrator") {
      console.log(userRole)
      navigator("/management/userdata")
    }
  }, [])


  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const tabs = [
    { label: "Bird Species", component: <BirdSpeciesManagementComponent /> },
    { label: "Bird Skill", component: <BirdSkillManagementComponent /> },
    { label: "Trainer Skill", component: <TrainerSkillManagementComponent /> },
    { label: "Trainer", component: <TrainerManagementComponent /> },
  ];
  return (
    <>
      <div className="dashboard-container">
        <ReworkSidebar selectTab={0} />
        <ToastContainer />
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
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
              {tabs.map((tab) => (
                <Tab label={tab.label} />
              ))}
            </Tabs>
          </Box>

          {tabs[value].component}
        </Box>

      </div>
    </>
  );
};

export default Dashboard;

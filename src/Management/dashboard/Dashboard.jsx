import React from "react";
import "./dashboard.scss";
import ReworkSidebar from "../component/sidebar/ReworkSidebar";
import { Box, Divider, Grid, Tab, Tabs } from "@mui/material";
import BirdSpeciesManagementComponent from "./bird-species/BirdSpeciesManagementComponent";
import BirdSkillManagementComponent from "./bird-skills/BirdSkillManagementComponent";
import { WidthFullOutlined } from "@mui/icons-material";
import { ToastContainer } from "react-toastify";
import TrainerSkillManagementComponent from "./trainer-skills/TrainerSkillManagementComponent";

const Dashboard = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const tabs = [
    { label: "Bird Species", component: <BirdSpeciesManagementComponent /> },
    { label: "Bird Skill", component: <BirdSkillManagementComponent /> },
    { label: "Trainer Skill", component: <TrainerSkillManagementComponent /> },
  ];
  return (
    <>
      <div className="dashboard-container">
        <ReworkSidebar selectTab={0} />
        <ToastContainer/>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' , width: '100%'}}>
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

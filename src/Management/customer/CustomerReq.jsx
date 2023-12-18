import { Box, Button, Tabs, ThemeProvider, Tab } from "@mui/material";
import { ochreTheme } from "../themes/Theme";
import ReworkSidebar from "../component/sidebar/ReworkSidebar";
import AssignedTicketView from "./AssignedTicketView";
import NotAssignedTicketView from "./NotAssignedTicketView";
import HandledTicketView from "./HandledTicketView";
import TicketDetailView from "./TicketDetailView";
import { jwtDecode } from "jwt-decode";
import "./customerReq.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Grid } from "@mui/material";
import { useEffect } from "react";
import PricePolicyView from "./PricePolicyView";
import { ToastContainer } from "react-toastify";
import ConsultingTypeView from "./ConsultingTypeView";

export default function CustomerReqComponent() {
  const navigate = useNavigate();
  const accessToken = JSON.parse(localStorage.getItem("user-token"));
  const userRole = jwtDecode(accessToken).role;

  useEffect(() => {
    if (userRole === "Trainer") {
      navigate("/management/trainerticket");
    }
  }, []);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabs = [
    { label: "List Not Assigned", component: <NotAssignedTicketView /> },
    { label: "List Assigned", component: <AssignedTicketView /> },
    { label: "List Handled", component: <HandledTicketView /> },
    { label: "Price Policy", component: <PricePolicyView /> },
    { label: "Consultant Type", component: <ConsultingTypeView /> },
  ];

  return (
    <div className="workshop-container">
      <ThemeProvider theme={ochreTheme}>
        <ReworkSidebar selectTab={1} />
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
              {tabs.map((tab) => (
                <Tab label={tab.label} />
              ))}
            </Tabs>
          </Box>

          {tabs[value].component}
        </Box>
      </ThemeProvider>
    </div>
  );
}

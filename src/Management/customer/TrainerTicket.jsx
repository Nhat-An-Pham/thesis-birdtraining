import { useState } from "react";
import { Box, Grid, Tab, Tabs, ThemeProvider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import ReworkSidebar from "../component/sidebar/ReworkSidebar";
import TrainerTicketDetailView from "./TrainerTicketDetailView";
import TrainerTicketListView from "./TrainerTicketListView";
import { ochreTheme } from "../themes/Theme";
import TrainerFinishTicketView from "./TrainerFinishTicketView";
import FinishedTicketView from "./FinishedTicketView";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

export default function TrainerTicketComponent() {
  const [renderedIndex, setRenderedIndex] = useState(1); // 0: Detail, 1: List Assigned, 2: Finish Ticket, 3: Finished View
  const [ticketIdForDetail, setTicketIdForDetail] = useState();

  const navigate = useNavigate();
  const accessToken = JSON.parse(localStorage.getItem("user-token"));
  const userRole = jwtDecode(accessToken).role;

  useEffect(() => {
    if (userRole === "Staff" || userRole === "Manager") {
      navigate("/management/customerreq");
    }
  }, []);
  const handleTicketIdForDetail = (ticketId) => {
    setTicketIdForDetail(ticketId);
  };
  const onRenderedIndexSelect = (renderedIndex) => {
    setRenderedIndex(renderedIndex);
  };

  const handleCallBackToDetail = () => {
    setRenderedIndex(0);
  };

  const handleCallBackToList = () => {
    setRenderedIndex(1);
  };

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabs = [
    {
      label: "List Assigned",
      component: <TrainerTicketListView />,
    },
    {
      label: "List Finished",
      component: <FinishedTicketView />,
    },
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

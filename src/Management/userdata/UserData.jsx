import { React, useState, useEffect } from "react";
import ReworkSidebar from "../component/sidebar/ReworkSidebar";
import "./userdata.scss";
import users from "../../assets/fakedb/users";
import { ochreTheme } from "../themes/Theme";
import { Button, Drawer, Grid, ThemeProvider } from "@mui/material";
import { Box, Divider, Tab, Tabs } from "@mui/material";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Paper,
} from "@mui/material";
import userService from "../../services/user.service";
import { ToastContainer } from "react-toastify";
import ViewUsers from "./component/ViewUsers";
import UserDetail from "./component/UserDetail";
import AddNewUser from "./component/AddNewUser";
import ViewFunction from "./component/ViewFunction";

const UserData = () => {
  const [pageRenderIndex, setPageRenderIndex] = useState(1);
  const [renderIndex, setRenderIndex] = useState(0);
  const [selectedUser, setSelectedUser] = useState(null);
  //Event Handler
  const SelectedUserIndex = (e) => {
    setSelectedUser(e);
    setRenderIndex(2);
  };

  const [tabChose, setTabChose] = useState(0);

  const handleChange = (event, newValue) => {
    if (newValue === 5 ) {
      setPageRenderIndex(2);
    } else {
      setPageRenderIndex(1);
    }
    setTabChose(newValue);
  };

  const tabs = [
    { label: "Customer" },
    { label: "Trainer" },
    { label: "Staff" },
    { label: "Manager" },
    { label: "Administrator" },
    { label: "Function" },
  ];

  let renderedComponents = [
    <ViewUsers
      setSelectedUserCallBack={SelectedUserIndex}
      renderIndex={renderIndex}
      tablabel={tabs[tabChose]}
    />,
    <AddNewUser />,
    <ViewFunction />,
  ];

  return (
    <>
      <div className="userdata-container">
        <ToastContainer />
        <ThemeProvider theme={ochreTheme}>
          <ReworkSidebar selectTab={6} />
          <Box sx={{ width: "100%" }}>
            <Box
              sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}
            >
              <Tabs
                value={tabChose}
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

              {pageRenderIndex === 1 ? (
                <Grid
                  container
                  spacing={1}
                  style={{ padding: "20px", marginTop: "20px" }}
                >
                  <Grid container item xs={6} justifyContent="flex-start">
                    {renderIndex === 0 ? (
                      <Button
                        variant="contained"
                        color="ochre"
                        onClick={() => setRenderIndex(1)}
                      >
                        Add new user
                      </Button>
                    ) : (
                      <Button
                        color="ochre"
                        variant="contained"
                        onClick={() => setRenderIndex(0)}
                      >
                        Back
                      </Button>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    {renderedComponents[renderIndex]}
                  </Grid>
                </Grid>
              ) : pageRenderIndex === 2 ? (
                <Grid
                  container
                  spacing={1}
                  style={{ padding: "20px", marginTop: "20px" }}
                >
                  <Grid item xs={12}>
                    {renderedComponents[2]}
                  </Grid>
                </Grid>
              ) : (
                <></>
              )}
            </Box>
          </Box>
        </ThemeProvider>
      </div>
    </>
  );
};

export default UserData;

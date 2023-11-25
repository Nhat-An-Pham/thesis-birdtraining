import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link, useHref } from "react-router-dom";
import {
  DateRangeOutlined,
  FeedOutlined,
  PeopleAltOutlined,
  SchoolOutlined,
  SpaceDashboardOutlined,
  SupportAgentOutlined,
} from "@mui/icons-material";
import { Avatar, Grid, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { groundTheme } from "../../themes/Theme";
import { jwtDecode } from "jwt-decode";

let token = localStorage.getItem("user-token");
let userRole = null;
if (token) {
  userRole = jwtDecode(JSON.parse(token)).role;
}
const drawerWidth = 250;
const elements = [
  {
    route: "/management",
    icon: <SpaceDashboardOutlined />,
    name: "Dashboard",
    role: ["Trainer", "Staff", "Manager"],
  },
  {
    route: "/management/customerreq",
    icon: <SupportAgentOutlined />,
    name: "Consultant",
    role: ["Trainer", "Staff", "Manager"],
  },
  {
    route: "/management/onlinecourse",
    icon: <SupportAgentOutlined />,
    name: "Online Course",
    role: ["Staff", "Manager"],
  },
  {
    route: "/management/timetable",
    icon: <DateRangeOutlined />,
    name: "Timetable",
    role: ["Trainer", "Staff", "Manager"],
  },
  {
    route: "/management/workshop",
    icon: <SchoolOutlined />,
    name: "Workshop",
    role: ["Staff", "Manager"],
  },
  {
    route: "/management/birdacademy",
    icon: <FeedOutlined />,
    name: "Academy",
    role: ["Trainer", "Staff", "Manager"],
  },
  {
    route: "/management/userdata",
    icon: <PeopleAltOutlined />,
    name: "Admin",
    role: ["Administrator"],
  },
];
export default function ReworkSidebar({ selectTab }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  useEffect(() => {
    return () => {
      setSelectedIndex(selectTab);
    };
  }, [selectTab]);

  return (
    <ThemeProvider theme={groundTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: groundTheme.palette.ground.main,
              // justifyContent: "center", // Center horizontally
              // alignItems: "center", // Center vertically
              border: "4px outset #4a2a2a",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar sx={{ width: "100%" }}>
            <Link
              to={"/home"}
              style={{
                textDecoration: "none",
                color: groundTheme.palette.ground.Link,
                width: "100%",
              }}
            >
              {/* <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
              > */}
              {/* <Avatar
                alt="logo"
                src={require("../../../assets/icons/Logo.jpeg")}
                sx={{ alignSelf: 'center', justifySelf: 'center', width: '100%', height: '100%' }}
                variant="rounded"
              >
              </Avatar> */}
              <h1
                style={{
                  width: "100%",
                  fontWeight: "bold",
                  fontSize: "30px",
                  textAlign: "center",
                }}
              >
                Bird Training Center Management
              </h1>
              {/* <Typography sx={{ textDecoration: "none" }}>
                  Bird Training
                </Typography> */}
              {/* </Grid> */}
            </Link>
          </Toolbar>

          <List style={{ marginTop: "20px" }}>
            <Divider />
            {elements.map((element, index) => (
              <>
                {(!element.role && userRole) ||
                element.role.includes(userRole) ? (
                  <>
                    <ListItem
                      disablePadding
                      style={{ borderBottom: "1px grey solid" }}
                    >
                      <ListItemButton
                        selected={selectedIndex === index ? true : false}
                        style={{ padding: "0px" }}
                      >
                        <Link
                          to={element.route}
                          style={{
                            textDecoration: "none",
                            color: groundTheme.palette.ground.Link,
                            width: "100%",
                            height: "100%",
                            padding: "10px",
                          }}
                        >
                          <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={0}
                          >
                            <ListItemIcon>{element.icon}</ListItemIcon>
                            <ListItemText primary={element.name} />
                          </Grid>
                        </Link>
                      </ListItemButton>
                    </ListItem>
                    <Divider />
                  </>
                ) : null}
              </>
            ))}
          </List>
        </Drawer>
      </Box>
    </ThemeProvider>
  );
}

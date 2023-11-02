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
import { Avatar, Grid, ThemeProvider, createTheme } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";

export const groundTheme = createTheme({
  palette: {
    ground: {
      main: "#C8AE7D",
      Link: "black",
    },
  },
});
const logo =
  "https://storage.googleapis.com/birdtrainingcentersystem.appspot.com/images/birdlogo.png";
const drawerWidth = 200;
const elements = [
  { route: "/management", icon: <SpaceDashboardOutlined />, name: "Dashboard" },
  {
    route: "/management/customerreq",
    icon: <SupportAgentOutlined />,
    name: "Consultant",
  },
  {
    route: "/management/timetable",
    icon: <DateRangeOutlined />,
    name: "Timetable",
  },
  { route: "/management/workshop", icon: <SchoolOutlined />, name: "Workshop" },
  {
    route: "/management/birdacademy",
    icon: <FeedOutlined />,
    name: "Academy",
  },
  {
    route: "/management/userdata",
    icon: <PeopleAltOutlined />,
    name: "Admin",
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
              justifyContent: "center", // Center horizontally
              alignItems: "center", // Center vertically
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar>
            <Link
              to={"/home"}
              style={{
                textDecoration: "none",
                color: groundTheme.palette.ground.Link,
              }}
            >
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                <Avatar
                  alt="logo"
                  src={logo}
                  sx={{ width: 100, height: 100 }}
                  variant="rounded"
                >
                  B
                </Avatar>
                <Typography sx={{ textDecoration: "none" }}>
                  Bird Training
                </Typography>
              </Grid>
            </Link>
          </Toolbar>
          <Divider />
          <List>
            {elements.map((element, index) => (
              <>
                <ListItem disablePadding>
                  <ListItemButton
                    selected={selectedIndex === index ? true : false}                    
                  >
                    <Link
                      to={element.route}
                      style={{
                        textDecoration: "none",
                        color: groundTheme.palette.ground.Link,
                      }}
                    >
                      <Grid container
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={0}>
                        <ListItemIcon>{element.icon}</ListItemIcon>
                        <ListItemText primary={element.name} />
                      </Grid>
                    </Link>
                  </ListItemButton>
                </ListItem>
                <Divider />
              </>
            ))}
          </List>
        </Drawer>
      </Box>
    </ThemeProvider>
  );
}

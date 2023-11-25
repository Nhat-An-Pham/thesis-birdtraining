import React, { useState, useEffect } from "react";
import "../../workshoppane.scss";
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
} from "@mui/material";
import { Img } from "react-image";
import RawHTMLRenderer from "../../../component/htmlRender/htmlRender";
import WorkshopManagementService from "../../../../services/workshop-management.service";
import { AddBoxOutlined, InfoOutlined } from "@mui/icons-material";
// import { toast } from 'react-toastify';

const WorkshopPane = ({
  statusFilter = "Active",
  onDetailRequest,
  onClassesRequest,
  onCreateClassRequest,
}) => {
  // let BASE_URL = 'https://localhost:7176/api';
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [contextMenus, setContextMenus] = useState([]);
  const handleContextMenuForRow = (event, index) => {
    event.preventDefault();
    const newContextMenus = [...contextMenus];
    newContextMenus[index] = {
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
    };
    setContextMenus(newContextMenus);
  };

  const handleCloseForRow = (index) => {
    const newContextMenus = [...contextMenus];
    newContextMenus[index] = null;
    setContextMenus(newContextMenus);
  };
  const [workshops, setWorkshops] = useState([]);
  const detailClick = (workshop) => {
    onDetailRequest(workshop);
  };
  const classClick = (workshop) => {
    onClassesRequest(workshop);
  };
  const createClassClick = (workshop) => {
    onCreateClassRequest(workshop);
  };
  useEffect(() => {
    // Fetch workshops and classes based on the status filter
    async function fetchData(statusFilter) {
      try {
        let params = {
          $filter: `status eq '${statusFilter}'`,
        };
        let response = await WorkshopManagementService.getWorkshops(params);
        setWorkshops(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData(statusFilter);
    // console.log(workshops);
  }, [statusFilter]);
  useEffect(() => {
    if (workshops) {
      setContextMenus(new Array(workshops.length).fill(null));
    }

    return () => {};
  }, [workshops]);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: 0.125 }} align="center">
                    Image
                  </TableCell>
                  <TableCell style={{ width: 0.125 }}>Title</TableCell>
                  <TableCell style={{ width: 0.25 }}>Description</TableCell>
                  <TableCell style={{ width: 0.125 }} align="center">
                    Register period
                  </TableCell>
                  <TableCell style={{ width: 0.125 }} align="center">
                    Total Slot
                  </TableCell>
                  <TableCell style={{ width: 0.125 }} align="center">
                    Price (USD)
                  </TableCell>
                  <TableCell style={{ width: 0.125 }} align="center">
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {workshops && workshops.length > 0 ? (
                  workshops.map((workshop, index) => (
                    <TableRow
                      hover
                      // selected
                      key={workshop.id}
                      // onClick={() => onDetailRequest(workshop)}
                      onContextMenu={(event) =>
                        handleContextMenuForRow(event, index)
                      }
                      style={{ cursor: "context-menu" }}
                      className={
                        workshop.id === selectedWorkshop ? "Mui-selected" : ""
                      }
                    >
                      <TableCell className="image-cell">
                        <Img
                          src={workshop.picture.split(",")[0]}
                          unloader={<CircularProgress />}
                        />
                      </TableCell>
                      <TableCell style={{ width: 0.125 }}>
                        {workshop.title}
                      </TableCell>
                      <TableCell
                        style={{
                          width: 0.25,
                          flexGrow: 1,
                          overflow: "hidden",
                          px: 3,
                        }}
                      >
                        <Typography>
                          <RawHTMLRenderer htmlContent={workshop.description} />
                        </Typography>
                      </TableCell>
                      <TableCell style={{ width: 0.125 }} align="center">
                        {workshop.registerEnd}
                      </TableCell>
                      <TableCell style={{ width: 0.125 }} align="center">
                        {workshop.totalSlot}
                      </TableCell>
                      <TableCell style={{ width: 0.125 }} align="center">
                        {workshop.price}
                      </TableCell>
                      <TableCell style={{ width: 0.125 }} align="center">
                        <Checkbox
                          checked={workshop.status === "Active"}
                          // onChange={() => switchWorkshopStatus(workshop)}
                          sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                        />
                      </TableCell>
                      <Menu
                        open={contextMenus[index] !== null}
                        onClose={() => handleCloseForRow(index)}
                        anchorReference="anchorPosition"
                        anchorPosition={
                          contextMenus[index] !== null
                            ? {
                                top: contextMenus[index]?.mouseY,
                                left: contextMenus[index]?.mouseX,
                              }
                            : undefined
                        }
                      >
                        <MenuItem>Workshop: {workshop.title}</MenuItem>
                        <MenuItem
                          onClick={() => {
                            detailClick(workshop);
                            // handleCloseForRow(index);
                          }}
                        >
                          <ListItemIcon>
                            <InfoOutlined />
                          </ListItemIcon>
                          <ListItemText primary={"Workshop detail"} />
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            classClick(workshop);
                            // handleCloseForRow(index);
                          }}
                        >
                          <ListItemIcon>
                            <InfoOutlined />
                          </ListItemIcon>
                          <ListItemText primary={"Classes"} />
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            createClassClick(workshop);
                            // handleCloseForRow(index);
                          }}
                        >
                          <ListItemIcon>
                            <AddBoxOutlined />
                          </ListItemIcon>
                          <ListItemText primary={"New class"} />
                        </MenuItem>
                      </Menu>
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
    </div>
  );
};

export default WorkshopPane;

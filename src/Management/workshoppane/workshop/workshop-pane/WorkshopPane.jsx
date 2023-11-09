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
} from "@mui/material";
import { Img } from "react-image";
import RawHTMLRenderer from "../../../component/htmlRender/htmlRender";
import WorkshopManagementService from "../../../../services/workshop-management.service";
// import { toast } from 'react-toastify';

const WorkshopPane = ({
  callbackSelectWorkshop,
  statusFilter = "Active",
  onRowClick,
}) => {
  // let BASE_URL = 'https://localhost:7176/api';
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);

  const handleWorkshopClick = (workshop) => {
    // console.log(workshop);
    // setSelectedWorkshop(workshop);
    setSelectedWorkshop(workshop);
    callbackSelectWorkshop(workshop);
    onRowClick();
  };
  const [workshops, setWorkshops] = useState([]);

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
                  workshops.map((workshop) => (
                    <TableRow
                      hover
                      // selected
                      key={workshop.id}
                      onClick={() => handleWorkshopClick(workshop)}
                      // style={{
                      //     // cursor: 'pointer',
                      //     background: selectedWorkshop === workshop.id ? '#f0f0f0' : 'white',
                      // }}
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
                        <Typography><RawHTMLRenderer htmlContent={workshop.description}/></Typography>
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

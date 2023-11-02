import {
  Checkbox,
  CircularProgress,
  Grid,
  ImageList,
  ImageListItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import RawHTMLRenderer from "../../component/htmlRender/htmlRender";
import WorkshopManagementService from "../../../services/workshop-management.service";

export default function WorkshopViewComponent({ workshopId }) {
  const [pictures, setPictures] = useState([]);
  const [workshop, setWorkshop] = useState();
  const fetchWorkshopData = async () => {
    try {
      let params = {
        $filter: `id eq ${workshopId}`,
      };
      let response = await WorkshopManagementService.getWorkshops(params);
      setWorkshop(response[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchWorkshopData();
  }, [workshopId]);
  const switchStatus = async (workshop) => {
    try {
      let result = await WorkshopManagementService.switchWorkshopStatus(
        workshop
      );
      if (result) {
        await fetchWorkshopData();
      }
    } catch (error) {
      console.error("Error update staus:", error);
    }
  };
  useEffect(() => {
    if (workshop) {
      setPictures(workshop.picture.split(","));
    }
  }, [workshop]);

  if (!workshop) {
    return <CircularProgress />; // You can add a loader here
  }
  return (
    <div>
      <Grid container>
        <Grid container item justifyContent="center" xs={12}>
          <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
            {pictures.map((picture) => (
              <ImageListItem key={picture}>
                <img
                  srcSet={`${picture}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  src={`${picture}?w=164&h=164&fit=crop&auto=format`}
                  alt="error"
                  loading={<CircularProgress />}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
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
                <TableRow>
                  <TableCell style={{ width: 0.125 }}>
                    {workshop.title}
                  </TableCell>
                  <TableCell style={{ width: 0.25 }}>
                    <RawHTMLRenderer htmlContent={workshop.description} />
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
                      onChange={() => switchStatus(workshop)}
                      sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
}

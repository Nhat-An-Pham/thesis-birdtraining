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
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import RawHTMLRenderer from "../../component/htmlRender/htmlRender";
import WorkshopManagementService from "../../../services/workshop-management.service";
import { toast } from "react-toastify";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import addonService from "../../../services/addon.service";

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
      } else {
        toast.error("Cannot change this workshop's status");
      }
    } catch (error) {
      console.error("Error update staus:", error);
      toast.error(error?.response?.data?.message);
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
        <Grid container item justifyContent="center" xs={6}>
          <Carousel width={500} autoPlay swipeable showThumbs={true}>
            {pictures?.map((picture) => (
              <div style={{ height: 300 }}>
                <img
                  // srcSet={`${picture}`}
                  src={`${picture}`}
                  alt="error"
                  style={{ height: "100%" }}
                  loading={<CircularProgress />}
                />
              </div>
            ))}
          </Carousel>
        </Grid>
        <Grid container xs={6} spacing={2} component={Paper}>
          <Grid container item xs={12}>
            <Grid item xs={2}>
              <Typography fontWeight={"bold"}>Title:</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography>{workshop.title}</Typography>
            </Grid>
          </Grid>

          <Grid item xs={4}>
            <Typography fontWeight={"bold"}>Description:</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography>
              <RawHTMLRenderer htmlContent={workshop.description} />
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography fontWeight={"bold"}>Register period:</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography>{workshop.registerEnd} day(s)</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography fontWeight={"bold"}>Total Slot:</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography>{workshop.totalSlot} slot(s)</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography fontWeight={"bold"}>Price:</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography>
              {addonService.formatCurrency(workshop.price)} VND
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography fontWeight={"bold"}>Status</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography>
              <Checkbox
                checked={workshop.status === "Active"}
                onChange={() => switchStatus(workshop)}
                sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
              />
              {workshop.status}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

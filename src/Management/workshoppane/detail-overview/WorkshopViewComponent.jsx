import {
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import RawHTMLRenderer from "../../component/htmlRender/htmlRender";
import WorkshopManagementService from "../../../services/workshop-management.service";
import { toast } from "react-toastify";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import WorkshopModifyPopupComponent from "./WorkshopModifyPopupComponent";
import { ochreTheme } from "../../themes/Theme";
import WorkshopModifyPictureComponent from "./WorkshopModifyPictureComponent";
import { jwtDecode } from "jwt-decode";
export default function WorkshopViewComponent({ workshopId }) {
  const userRole = jwtDecode(
    JSON.parse(localStorage.getItem("user-token"))
  ).role;
  const [pictures, setPictures] = useState([]);
  const [workshop, setWorkshop] = useState();
  const [open, setOpen] = useState(false);
  const [openPictureUpload, setOpenPictureUpload] = useState(false);
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
  const handleCallbackModifyWorkshop = async () => {
    fetchWorkshopData();
    setOpen(false);
    setOpenPictureUpload(false);
  };
  const switchStatus = async (workshop) => {
    if (userRole !== "Manager") {
      toast.error("Manager is authorized to do this function");
    }
    try {
      let result = await WorkshopManagementService.switchWorkshopStatus(
        workshop
      );
      if (result) {
        await fetchWorkshopData();
        toast.success("Apply change!");
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
      <ThemeProvider theme={ochreTheme}>
        <WorkshopModifyPopupComponent
          callbackBack={() => {
            setOpen(false);
          }}
          open={open}
          workshopId={workshop.id}
          handleClose={() => setOpen(false)}
          callbackModifyWorkshop={handleCallbackModifyWorkshop}
        />
        <WorkshopModifyPictureComponent
          callbackBack={() => {
            setOpenPictureUpload(false);
          }}
          open={openPictureUpload}
          workshopId={workshop.id}
          handleClose={() => setOpenPictureUpload(false)}
          callbackModifyWorkshop={handleCallbackModifyWorkshop}
        />
        <Grid container padding={2} component={Paper}>
          <Grid
            container
            item
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
            xs={6}
          >
            <Grid
              container
              item
              xs={12}
              justifyContent={"center"}
              alignItems={"center"}
            >
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
            {userRole === "Manager" ? (
              <Grid item>
                <Button
                  color="ochre"
                  variant="contained"
                  onClick={() => setOpenPictureUpload(true)}
                >
                  Upload new image(s)
                </Button>
              </Grid>
            ) : null}
          </Grid>
          <Grid container item xs={6} spacing={2} component={Paper}>
            <Grid container item xs={12} spacing={3}>
              <Grid container item xs={6} justifyContent={"center"}>
                <Grid
                  container
                  item
                  xs={4}
                  justifyContent={"flex-start"}
                  alignItems={"center"}
                >
                  <Typography fontWeight={"bold"}>Title:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    fullWidth
                    label={"Workshop Title"}
                    type={"text"}
                    multiline
                    maxRows={2}
                    defaultValue={workshop.title}
                    value={workshop.title}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  {/* <Typography>{workshop.title}</Typography> */}
                </Grid>
              </Grid>
              <Grid container item xs={6}>
                <Grid
                  container
                  item
                  xs={4}
                  justifyContent={"flex-start"}
                  alignItems={"center"}
                >
                  <Typography fontWeight={"bold"}>Total Slot:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    label={"Slot(s)"}
                    type={"number"}
                    defaultValue={workshop.totalSlot}
                    value={workshop.totalSlot}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid container item xs={12} spacing={3}>
              <Grid container item xs={6} justifyContent={"center"}>
                <Grid
                  container
                  item
                  xs={6}
                  justifyContent={"flex-start"}
                  alignItems={"center"}
                >
                  <Typography fontWeight={"bold"}>Register Period:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label={"Day(s)"}
                    type={"number"}
                    defaultValue={workshop.registerEnd}
                    value={workshop.registerEnd}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  {/* <Typography>{workshop.title}</Typography> */}
                </Grid>
              </Grid>
              <Grid container item xs={6} justifyContent={"center"}>
                <Grid
                  container
                  item
                  xs={4}
                  justifyContent={"flex-start"}
                  alignItems={"center"}
                >
                  <Typography fontWeight={"bold"}>Price:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    label={"VND"}
                    type={"number"}
                    defaultValue={workshop.price}
                    value={workshop.price}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  {/* <Typography>{workshop.title}</Typography> */}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid container item xs={12} spacing={3}>
              <Grid item xs={12}>
                <Typography fontWeight={"bold"}>Registered Amount:</Typography>
              </Grid>
              <Grid container item xs={6}>
                <Grid
                  container
                  item
                  xs={4}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Typography>Minimum:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label={"Minimum Registered"}
                    type={"number"}
                    defaultValue={workshop.minimumRegistration}
                    value={workshop.minimumRegistration}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container item xs={6}>
                <Grid
                  container
                  item
                  xs={4}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Typography>Maximum:</Typography>
                </Grid>
                <Grid container item xs={6}>
                  <TextField
                    label={"Maximum Registered"}
                    type={"number"}
                    defaultValue={workshop.maximumRegistration}
                    value={workshop.maximumRegistration}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid container item xs={12}>
              <Grid container item xs={2} alignItems={'flex-start'}>
                <Typography fontWeight={"bold"}>Description:</Typography>
              </Grid>
              <Grid item xs={9} >
                <Typography mt={0}>
                  <RawHTMLRenderer htmlContent={workshop.description} />
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid
              container
              item
              xs={12}
              justifyContent={"space-between"}
              alignItems={"center"}
              padding={2}
            >
              <Grid
                container
                item
                xs={4}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Grid item xs={4}>
                  <Typography fontWeight={"bold"}>Status:</Typography>
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
              {userRole === "Manager" ? (
                <Grid item>
                  <Button
                    color={"ochre"}
                    variant="contained"
                    onClick={() => setOpen(true)}
                  >
                    Edit workshop information
                  </Button>
                </Grid>
              ) : null}
            </Grid>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
}

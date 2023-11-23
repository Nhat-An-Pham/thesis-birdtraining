import { useEffect } from "react";
import { useState } from "react";
import trainerWorkshopService from "../../../services/trainer-workshop.service";
import { toast } from "react-toastify";
import {
  AppBar,
  Box,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import addonService from "../../../services/addon.service";
import RawHTMLRenderer from "../../component/htmlRender/htmlRender";
import AttendancePaletteComponent from "./AttendancePalette";
import { Close } from "@mui/icons-material";
import { ochreTheme } from "../../themes/Theme";

const TrainerSlotDetailComponent = ({ entityId, callbackToCalendar }) => {
  const [slotDetail, setSlotDetail] = useState(null);

  async function fetchSlot() {
    try {
      let response = await trainerWorkshopService.getTrainerSlotByEntityId(
        entityId
      );
      console.log(response.data);
      setSlotDetail(response.data);
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
        callbackToCalendar();
      } else {
        toast.error("An error has occured!");
      }
    }
  }
  useEffect(() => {
    fetchSlot();

    return () => {};
  }, []);

  return (
    <>
      <ThemeProvider theme={ochreTheme}>
      <AppBar position="static" color="ochre">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              sx={{ mr: 2 }}
              onClick={callbackToCalendar}
            >
              <Close />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              Workshop class detail
            </Typography>
          </Toolbar>
        </AppBar>
        <Divider />
        <Grid container spacing={2}>
          {slotDetail ? (
            <>
              <Grid container item margin={2}>
                <Grid container item spacing={3}>
                  <Grid container item xs={12}>
                    <Grid item xs={1}>
                      <Typography>Title:</Typography>
                    </Grid>
                    <Grid item xs={10}>
                      <Typography>{slotDetail.title}</Typography>
                    </Grid>
                  </Grid>
                  <Grid container item xs={12}>
                    <Grid item xs={1}>
                      <Typography>Date:</Typography>
                    </Grid>
                    <Grid item xs={10}>
                      <Typography>
                        {addonService.formatDate(slotDetail.date)}
                      </Typography>
                  </Grid>
                  </Grid>
                  <Grid container item xs={12}>
                    <Grid item xs={1}>
                      <Typography>From:</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography>{slotDetail.startTime}</Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography>To:</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography>{slotDetail.endTime}</Typography>
                    </Grid>
                  </Grid>
                  <Grid container item xs={12}>
                    <Grid item xs={1}>
                      <Typography>Detail:</Typography>
                    </Grid>
                    <Grid item xs={10} justifyContent={"center"}>
                      <RawHTMLRenderer htmlContent={slotDetail.detail} />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Divider />
              <Grid container item>
                <AttendancePaletteComponent slotId={entityId} />
              </Grid>
            </>
          ) : (
            <CircularProgress sx={{ justifyContent: "centers" }} />
          )}
        </Grid>
      </ThemeProvider>
    </>
  );
};
export default TrainerSlotDetailComponent;

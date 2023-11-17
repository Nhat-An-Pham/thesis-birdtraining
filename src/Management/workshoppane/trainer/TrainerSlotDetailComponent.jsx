import { useEffect } from "react";
import { useState } from "react";
import trainerWorkshopService from "../../../services/trainer-workshop.service";
import { toast } from "react-toastify";
import { CircularProgress, Divider, Grid, Typography } from "@mui/material";
import addonService from "../../../services/addon.service";
import RawHTMLRenderer from "../../component/htmlRender/htmlRender";
import AttendancePaletteComponent from "./AttendancePalette";

const TrainerSlotDetailComponent = ({ entityId }) => {
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
      toast.error("An error has occured!");
    }
  }
  useEffect(() => {
    fetchSlot();

    return () => {};
  }, []);

  return <>{slotDetail ? <>
    <Grid container spacing={3}>
        <Grid item xs={2}>
            <Typography>Title:</Typography>
        </Grid>
        <Grid item xs={10}>
            <Typography>{slotDetail.title}</Typography>
        </Grid>
        <Grid item xs={2}>
            <Typography>Date:</Typography>
        </Grid>
        <Grid item xs={10}>
            <Typography>{addonService.formatDate(slotDetail.date)}</Typography>
        </Grid>
        <Grid container item xs={12}>
            <Grid item xs={2}>
                    <Typography>From:</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography>{slotDetail.startTime}</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography>To:</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography>{slotDetail.endTime}</Typography>
                </Grid>
        </Grid>
            <Grid item xs={2}>
                <Typography>Detail:</Typography>
            </Grid>
            <Grid item xs={6} justifyContent={'center'}>
                <RawHTMLRenderer htmlContent={slotDetail.detail}/>
            </Grid>
            
    </Grid>
    <Divider/>
    <AttendancePaletteComponent slotId={entityId}/>
  </> : <CircularProgress sx={{justifyContent: 'centers'}}/>}</>;
};
export default TrainerSlotDetailComponent;

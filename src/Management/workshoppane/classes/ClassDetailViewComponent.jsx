import { useState } from "react";
import classManagementService from "../../../services/class-management.service";
import { toast } from "react-toastify";
import { useEffect } from "react";
import ClassSlotsPaneComponent from "./ClassSlotsPaneComponent";
import ClassSlotViewComponent from "./ClassSlotViewComponent";
import {
  Button,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import addonService from "../../../services/addon.service";
import { ochreTheme } from "../../themes/Theme";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
export default function ClassDetailViewComponent({ selectedClassId }) {
  const [selectedClass, setSelectedClass] = useState();
  const [slot, setSlot] = useState();
  const [slots, setSlots] = useState([]);
  const [updateTrainerSlot, setUpdateTrainerSlot] = useState(false);
  async function fetchClass() {
    try {
      let response = await classManagementService.GetClassById(selectedClassId);
      console.log("Check for fetchClass: ", response.data);
      setSelectedClass(response.data);
    } catch (error) {
      toast.error(JSON.stringify(error));
    }
  }
  async function fetchSlots() {
    try {
      console.log(selectedClassId);
      let params = {
        workshopClassId: selectedClassId,
      };
      let response = await classManagementService.getSlots(params);
      setSlots(response.data);
    } catch (error) {
      toast.error(error);
    }
  }
  const onCallbackSlotSelect = (callbackSlot) => {
    console.log("reset slot");
    console.log(callbackSlot);
    setSlot(callbackSlot);
  };
  const onCallbackUpdateTrainerSlot = () => {
    console.log("update trainer slot");
    setUpdateTrainerSlot(!updateTrainerSlot);
  };
  useEffect(() => {
    fetchClass();
    fetchSlots();
    return () => {};
  }, [selectedClassId]);
  useEffect(() => {
    fetchClass();
    fetchSlots();
    return () => {};
  }, [updateTrainerSlot]);
  function formatRegistrationAmount(inVal) {
    return `${inVal.registered}/${inVal.maximum}`;
  }
  async function OnClickCloseRegistration() {
    let id = selectedClass.id;
    try {
      await classManagementService.SetClassClosedRegistration(id);
      fetchClass();
      toast.success("Successfully!");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  async function OnClickSetOngoing() {
    let id = selectedClass.id;
    try {
      await classManagementService.SetClassOngoing(id);
      fetchClass();
      toast.success("Successfully!");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  async function OnClickSetComplete() {
    let id = selectedClass.id;
    try {
      await classManagementService.SetClassComplete(id);
      fetchClass();
      toast.success("Successfully!");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  async function OnClickCancelClass() {
    let id = selectedClass.id;
    try {
      await classManagementService.SetClassCancelled(id);
      fetchClass();
      toast.success("Successfully!");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  function loadClass() {
    return (
      <>
        <Grid container item xs={12} alignItems={"center"}>
          <Grid container item xs={12}>
            <Grid container item xs={6} padding={5} spacing={2}>
              <Grid item xs={4}>
                Expected Open Registration:
              </Grid>
              <Grid item xs={8}>
                {addonService.formatDate(selectedClass.startTime)}
              </Grid>
              <Grid item xs={4}>
                Expected Closed Registration:
              </Grid>
              <Grid item xs={8}>
                {addonService.formatDate(selectedClass.registerEndDate)}
              </Grid>
              <Grid item xs={4}>
                Registered Amount
              </Grid>
              <Grid item xs={8}>
                {formatRegistrationAmount(selectedClass.registrationAmount)}
              </Grid>
              <Grid item xs={4}>
                Status:
              </Grid>
              <Grid item xs={8}>
                {selectedClass.status}
              </Grid>
            </Grid>
            <Grid
              container
              item
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              xs={6}
              my={2}
              padding={5}
              spacing={3}
            >
              <Grid item>
                <Button
                  color="ochre"
                  variant="contained"
                  onClick={() => OnClickCloseRegistration()}
                >
                  Close Registration
                </Button>
              </Grid>
              <Grid item>
                <Button
                  color="ochre"
                  variant="contained"
                  onClick={() => OnClickSetOngoing()}
                >
                  Set OnGoing
                </Button>
              </Grid>
              <Grid item>
                <Button
                  color="ochre"
                  variant="contained"
                  onClick={() => OnClickSetComplete()}
                >
                  Set Complete
                </Button>
              </Grid>
              <Grid item>
                <Button
                  color="ochre"
                  variant="contained"
                  onClick={() => OnClickCancelClass()}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Divider />
          <Grid container item xs={12} padding={5} alignItems="center">
            <Grid item xs={1} justifyItems={"flex-end"}>
              <Typography fontWeight={"bold"}>Slot Date:</Typography>
            </Grid>
            <Grid item xs={2} justifyItems={"flex-start"}>
              {slot?.date ? (
                <>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Date"
                      value={dayjs(slot?.date)}
                      disabled
                      sx={{ width: "100%", maxWidth: "200px" }}
                    />
                  </LocalizationProvider>
                </>
              ) : (
                <>
                  <Typography>Not picked</Typography>
                </>
              )}
            </Grid>
            <Grid item xs={1}>
              <Typography fontWeight={"bold"}>Slot Time:</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography>
                {slot && slot.startTime ? (
                  slot.startTime.slice(0, -3)
                ) : (
                  <>
                    <Typography>Not picked</Typography>
                  </>
                )}
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography fontWeight={"bold"}>Trainer:</Typography>
            </Grid>
            <Grid item xs={2}>
              {slot && slot.trainer ? (
                slot.trainer.email
              ) : (
                <Typography>Not picked</Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Divider/>
        <Grid padding={5}>
          <Grid container item spacing={3}>
            <Grid item xs={3}>
              <ClassSlotsPaneComponent
                passedSlots={slots}
                callbackSelectSlot={(s) => onCallbackSlotSelect(s)}
              />
            </Grid>
            <Grid item xs={9}>
              <ClassSlotViewComponent
                slot={slot}
                selectedClass={selectedClass}
                callbackUpdateSlot={onCallbackUpdateTrainerSlot}
              />
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  }

  return (
    <>
      {selectedClass ? (
        <>{loadClass()}</>
      ) : (
        <>
          <CircularProgress />
        </>
      )}
    </>
  );
}

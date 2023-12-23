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
  TextField,
  Typography,
} from "@mui/material";
import addonService from "../../../services/addon.service";
import { ochreTheme } from "../../themes/Theme";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import ClassModifyComponent from "./ClassModifyComponent";
import ClassRegistrationComponent from "./ClassRegistrationComponent";
export default function ClassDetailViewComponent({ selectedClassId }) {
  const [selectedClass, setSelectedClass] = useState();
  const [open, setOpen] = useState(false);
  const [slot, setSlot] = useState();
  const [slots, setSlots] = useState([]);
  const [updateTrainerSlot, setUpdateTrainerSlot] = useState(false);
  const [openModify, setOpenModify] = useState(false);
  async function fetchClass() {
    try {
      let response = await classManagementService.GetClassById(selectedClassId);
      // console.log("Check for fetchClass: ", response.data);
      setSelectedClass(response.data);
    } catch (error) {
      toast.error(JSON.stringify(error));
    }
  }
  const onHandleClose = () => {
    setOpen(false);
  }
  const onCallbackCloseModify = async () => {
    setOpenModify(false);
    await fetchClass();
    await fetchSlots();
  };
  async function fetchSlots() {
    try {
      console.log(selectedClassId);
      let params = {
        workshopClassId: selectedClassId,
      };
      let response = await classManagementService.getSlots(params);
      console.log(response.data);
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
        <ClassModifyComponent
          handleClose={onCallbackCloseModify}
          open={openModify}
          selectedClass={selectedClass}
          callbackModifyClass={onCallbackCloseModify}
        />
        <ClassRegistrationComponent handleClose={onHandleClose} open={open} slotId={slots[0]?.slotId}/>
        <Grid container item xs={12} alignItems={"center"}>
          <Grid container item xs={12} my={3}>
            <Grid container item xs={5} padding={3} spacing={2}>
              <Grid item xs={4}>
                <Typography fontWeight={"bold"}>Open Registration:</Typography>
              </Grid>
              <Grid item xs={8}>
                {/* {addonService.formatDate(selectedClass.startTime)} */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Date"
                    value={dayjs(selectedClass.startTime)}
                    readOnly
                    sx={{ width: "100%", maxWidth: "200px" }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={4}>
                <Typography fontWeight={"bold"}>
                  Closed Registration:
                </Typography>
              </Grid>
              <Grid item xs={8}>
                {/* {addonService.formatDate(selectedClass.registerEndDate)} */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    readOnly
                    label="Date"
                    value={dayjs(selectedClass.registerEndDate)}
                    sx={{ width: "100%", maxWidth: "200px" }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={4}>
                <Typography fontWeight={"bold"}>Hosted Location:</Typography>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  InputProps={{
                    readOnly: true,
                  }}
                  label={"Location"}
                  type="text"
                  value={selectedClass.location}
                  fullWidth
                />
              </Grid>
              <Grid container item justifyContent={"flex-end"}>
                <Button
                  color="ochre"
                  variant="contained"
                  onClick={() => setOpenModify(true)}
                  disabled={selectedClass.status === "Completed" || selectedClass.status === "Cancelled"}
                >
                  Modify
                </Button>
              </Grid>
            </Grid>
            <Grid container item xs={1} justifyContent={"center"}>
              <Divider orientation={"vertical"} />
            </Grid>
            <Grid
              container
              item
              direction="row"
              justifyContent="center"
              alignItems="flex-end"
              xs={6}
              padding={3}
              spacing={2}
            >
              <Grid container item xs={12} spacing={3}>
                <Grid item xs={12}>
                  <Typography fontWeight={"bold"}>
                    Registered Limitation:
                  </Typography>
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
                      defaultValue={selectedClass.minimumRegistration}
                      value={selectedClass.minimumRegistration}
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
                  <Grid item xs={6}>
                    <TextField
                      label={"Maximum Registered"}
                      type={"number"}
                      defaultValue={selectedClass.maximumRegistration}
                      value={selectedClass.maximumRegistration}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4}>
                <Typography fontWeight={"bold"}>Registered Amount:</Typography>
              </Grid>
              <Grid container item  xs={1} alignItems={'center'}>
                {formatRegistrationAmount(selectedClass.registrationAmount)}
              </Grid>
              <Grid item xs={7}>
                <Button  variant="outlined" onClick={() => setOpen(true)}>
                  View List
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Typography fontWeight={"bold"}>Status:</Typography>
              </Grid>
              <Grid item xs={8}>
                {selectedClass.status}
              </Grid>
              <Grid container item xs={12} spacing={2} alignItems={"flex-end"}>
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
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
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
            {/* <Divider orientation="vertical" flexItem /> */}
            <Grid item xs={1} >
              <Typography fontWeight={"bold"}>Slot Time:</Typography>
            </Grid>
            <Grid item xs={1}>
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
        <Divider />
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

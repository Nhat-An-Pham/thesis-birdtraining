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
} from "@mui/material";
import addonService from "../../../services/addon.service";
import { ochreTheme } from "../../themes/Theme";

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
    console.log('reset slot');
    console.log(callbackSlot);
    setSlot(callbackSlot);
  };
  const onCallbackUpdateTrainerSlot =  () => {
    console.log('update trainer slot');
    setUpdateTrainerSlot(!updateTrainerSlot);
  }
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
      toast.success('Successfully!');
    } catch (error) {
      toast.error(error.response.data.message);
    }
    
  }
  async function OnClickSetOngoing() {
    let id = selectedClass.id;
    try {
      await classManagementService.SetClassOngoing(id);
      fetchClass();
      toast.success('Successfully!');
    } catch (error) {
      toast.error(error.response.data.message);
    }
    
  }
  async function OnClickSetComplete() {
    let id = selectedClass.id;
    try {
      await classManagementService.SetClassComplete(id);
      fetchClass();
      toast.success('Successfully!');
    } catch (error) {
      toast.error(error.response.data.message);
    }
    
  }
  async function OnClickCancelClass(){
    let id = selectedClass.id;
    try {
      await classManagementService.SetClassCancelled(id);
      fetchClass();
      toast.success('Successfully!');
    } catch (error) {
      toast.error(error.response.data.message);
    }
    
  }
  function loadClass() {
    return (
      <>
        <Grid container item xs={12} alignItems={"center"}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Expected Open Registration</TableCell>
                  <TableCell align="center">Expected Closed Registration</TableCell>
                  <TableCell align="center">Slot Date Happen</TableCell>
                  <TableCell align="center">Slot Start Time</TableCell>
                  <TableCell align="center">Trainer</TableCell>
                  <TableCell align="center">Registered</TableCell>
                  <TableCell align="center">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="center">
                    {addonService.formatDate(selectedClass.startTime)}
                  </TableCell>
                  <TableCell align="center">
                    {addonService.formatDate(selectedClass.registerEndDate)}
                  </TableCell>
                  <TableCell align="center">
                    {slot && slot.date
                      ? addonService.formatDate(slot.date)
                      : null}
                  </TableCell>
                  <TableCell align="center">
                    {slot && slot.startTime
                      ? slot.startTime.slice(0, -3)
                      : null}
                  </TableCell>
                  <TableCell align="center">
                    {slot && slot.trainer ? slot.trainer.email : null}
                  </TableCell>
                  <TableCell align="center">
                    <>
                      {formatRegistrationAmount(
                        selectedClass.registrationAmount
                      )}
                    </>
                  </TableCell>
                  <TableCell align="center">{selectedClass.status}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid
          container
          item
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          my={2}
          spacing={2}
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
              onClick={() => OnClickCancelClass()}
            >
              Cancel
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
        </Grid>
        <Divider/>
        <div style={{ marginTop: "10px" }}>
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
        </div>
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

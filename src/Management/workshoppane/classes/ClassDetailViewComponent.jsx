import { useState } from "react";
import classManagementService from "../../../services/class-management.service";
import { toast } from "react-toastify";
import { useEffect } from "react";
import ClassSlotsPaneComponent from "./ClassSlotsPaneComponent";
import ClassSlotViewComponent from "./ClassSlotViewComponent";
import {
  CircularProgress,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  selectClasses,
} from "@mui/material";
import addonService from "../../../services/addon.service";

export default function ClassDetailViewComponent({ selectedClassId }) {

  const [selectedClass, setSelectedClass] = useState();
  const [slot, setSlot] = useState();


  async function fetchClass() {
    try {
      let response = await classManagementService.GetClassById(selectedClassId);
      console.log("Check for fetchClass: ", response.data);
      setSelectedClass(response.data);
    } catch (error) {
      toast.error(JSON.stringify(error));
    }
  }
  const onCallbackSlotSelect = (slot) => {
    setSlot(slot);
  };
  useEffect(() => {
    fetchClass();
    return () => { };
  }, [selectedClassId]);
  function formatRegistrationAmount(inVal) {
    return `${inVal.registered}/${inVal.maximum}`;
  }

  function loadClass() {
    return (
      <>
        <Grid container item xs={12} alignItems={"center"}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Created Date</TableCell>
                  <TableCell align="center">Closed Registration</TableCell>
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
                    {slot && slot.date ?
                      addonService.formatDate(slot.date) : null
                    }
                  </TableCell>
                  <TableCell align="center">
                    {slot && slot.startTime ?
                      (slot.startTime.slice(0, -3)) : null
                    }
                  </TableCell>
                  <TableCell align="center">
                    {slot && slot.trainer ?
                      (slot.trainer.email) : null
                    }
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
        <div style={{marginTop: "10px"}}>
          <Grid container item spacing={3} >
            <Grid item xs={3}>
              <ClassSlotsPaneComponent
                selectedClassId={selectedClassId}
                callbackSelectSlot={onCallbackSlotSelect}
              />
            </Grid>
            <Grid item xs={9}>
              <ClassSlotViewComponent slot={slot} selectedClass={selectedClass} callbackUpdateSlot={onCallbackSlotSelect}/>
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

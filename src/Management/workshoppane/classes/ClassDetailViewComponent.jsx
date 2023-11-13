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
} from "@mui/material";
import addonService from "../../../services/addon.service";

export default function ClassDetailViewComponent({ selectedClassId }) {
  const [selectedClass, setSelectedClass] = useState();
  const [slot, setSlot] = useState();
  async function fetchClass() {
    try {
      let response = await classManagementService.GetClassById(selectedClassId);
      console.log(response);
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
    return () => {};
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
                  <TableCell align="center">Registration</TableCell>
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
                    <>
                      {formatRegistrationAmount(
                        selectedClass.registered
                      )}
                    </>
                  </TableCell>
                  <TableCell align="center">{selectedClass.status}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid container item spacing={3}>
          <Grid item xs={3}>
            <ClassSlotsPaneComponent
              selectedClassId={selectedClassId}
              callbackSelectSlot={onCallbackSlotSelect}
            />
          </Grid>
          <Grid item xs={9}>
            <ClassSlotViewComponent slot={slot}  selectedClassId={selectedClassId}/>
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

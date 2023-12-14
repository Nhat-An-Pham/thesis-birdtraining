import { useEffect, useState } from "react";
import timetableService from "../../../services/timetable.service";
import membershipService from "../../../services/membership.service";
import {
  Button,
  Divider,
  Grid,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import "../userdata.scss";
import { toast } from "react-toastify";

const ViewFunction = ({ renderIndex, tablabel }) => {
  const [listSlot, setListSlot] = useState([]);
  useEffect(() => {
    GetListSlot();
  }, [renderIndex, tablabel]);

  const GetListSlot = () => {
    timetableService
      .getSlotTime()
      .then((res) => {
        console.log("Success Get List SLot test", res.data);
        setListSlot(res.data);
      })
      .catch((e) => console.log("Fail Get List Slot test", e));
  };

  const [listMembership, setListMembership] = useState([]);
  useEffect(() => {
    membershipService
      .getListMembership()
      .then((res) => {
        console.log("Success Get List Membership test", res.data);
        setListMembership(res.data);
      })
      .catch((e) => console.log("Fail Get List Membership test", e));
  }, [renderIndex, tablabel]);

  const [changedMinute, setChangedMinute] = useState("");

  const handleUpdateSlotClick = () => {
    timetableService
      .updateSlot(changedMinute)
      .then((res) => {
        console.log("Success Update Slot Time");
        toast.success("Successfully Update Slot Time");
        GetListSlot();
      })
      .catch((e) => {
        toast.error("Fail Update Slot Time")
        console.log(e);
      });
  };

  const handleMembershipClick = (row) => {};

  return (
    <>
      <h1 style={{ borderBottom: "0.5px grey solid" }}> Function</h1>
      <Grid container direction="row" spacing={2}>
        <Grid container item xs={6} spacing={2}>
          <Grid item xs={12}>
            <h2 style={{ borderBottom: "0.5px grey solid" }}>Slot</h2>
          </Grid>
          <Grid item xs={4}>
            Slot
          </Grid>
          <Grid item xs={4}>
            Start time
          </Grid>
          <Grid item xs={4}>
            End Time
          </Grid>
          {listSlot.map((row, index) => (
            <Grid container item xs={12} direction="row" spacing={2}>
              <Grid item xs={4}>
                {row.id}
              </Grid>
              <Grid item xs={4}>
                {row.startTime}
              </Grid>
              <Grid item xs={4}>
                {row.endTime}
              </Grid>
            </Grid>
          ))}
          <Grid container item xs={12}>
            <Grid
              container
              item
              xs={1}
              justifyContent={"center"}
              alignContent={"center"}
            >
              <Grid item xs={12}>
                Duration:
              </Grid>
            </Grid>
            <Grid item xs={7}>
              <TextField
                label={"Minute"}
                type="number"
                inputProps={{
                  min: 30,
                  max: 60,
                  step: 5,
                }}
                onChange={(e) => setChangedMinute(e.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <Button color="ochre" variant="contained" onClick={() => handleUpdateSlotClick()}>
                Update
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid container item xs={6}>
          <Grid item xs={12}>
            <h2 style={{ borderBottom: "0.5px grey solid" }}>
              Membership Rank
            </h2>
          </Grid>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Discount</TableCell>
                  <TableCell>Requirement</TableCell>
                </TableRow>
              </TableHead>
              {listMembership.map((row, index) => (
                <TableBody>
                  <TableRow
                    key={index}
                    hover
                    style={{ cursor: "pointer" }}
                    onClick={() => handleMembershipClick(row)}
                  >
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.discount}</TableCell>
                    <TableCell>{row.requirement}</TableCell>
                  </TableRow>
                </TableBody>
              ))}
            </TableContainer>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ViewFunction;

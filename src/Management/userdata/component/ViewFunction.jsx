import { useEffect, useState } from "react";
import timetableService from "../../../services/timetable.service";
import membershipService from "../../../services/membership.service";
import {
  Button,
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
import "../userdata.scss";
import { toast } from "react-toastify";
import MembershipDetail from "./MembershipDetail";

const ViewFunction = ({ renderIndex, tablabel }) => {
  const [openDiv, setOpenDiv] = useState(0);

  useEffect(() => {
    GetListSlot();
    GetListMembership();
  }, [renderIndex, tablabel]);

  const [listSlot, setListSlot] = useState([]);
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
  const GetListMembership = () => {
    membershipService
      .getListMembership()
      .then((res) => {
        console.log("Success Get List Membership test", res.data);
        setListMembership(res.data);
      })
      .catch((e) => console.log("Fail Get List Membership test", e));
  };

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
        toast.error("Fail Update Slot Time");
        console.log(e);
      });
  };

  const [selectedMembership, setSelectedMembership] = useState();

  const handleCloseDiv = () => {
    setOpenDiv(0);
    GetListMembership();
  };

  const handleMembershipClick = (row) => {
    setOpenDiv(1);
    setSelectedMembership(row);
  };

  return (
    <>
      {selectedMembership ? (
        <MembershipDetail
          selectedMembership={selectedMembership}
          openDiv={openDiv}
          handleCloseDiv={handleCloseDiv}
        ></MembershipDetail>
      ) : (
        <></>
      )}
      <h1 style={{ borderBottom: "0.5px grey solid" }}> Function</h1>
      <Grid
        container
        spacing={2}
        justifyContent={"flex-start"}
        alignItems={"flex-start"}
      >
        <Grid container item xs={6} spacing={2}>
          <Grid item xs={12}>
            <h2 style={{ borderBottom: "0.5px grey solid" }}>
              Slot
            </h2>
          </Grid>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Slot</TableCell>
                  <TableCell>Start Time</TableCell>
                  <TableCell>End Time</TableCell>
                </TableRow>
              </TableHead>
              {listSlot.map((row, index) => (
                <TableBody>
                  <TableRow key={index}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.startTime}</TableCell>
                    <TableCell>{row.endTime}</TableCell>
                  </TableRow>
                </TableBody>
              ))}
            </Table>
          </TableContainer>
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
              <Button
                color="ochre"
                variant="contained"
                onClick={() => handleUpdateSlotClick()}
              >
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
          <Grid
            container
            item
            xs={12}
            justifyContent={"flex-start"}
            alignItems={"flex-start"}
          >
            `
            <TableContainer component={Paper}>
              <Table>
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
              </Table>
            </TableContainer>
            `
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ViewFunction;

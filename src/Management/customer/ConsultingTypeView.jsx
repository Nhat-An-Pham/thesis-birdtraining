import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import consultantService from "../../services/consultant.service";
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
  Container,
  Button,
} from "@mui/material";
import { ochreTheme } from "../themes/Theme";
import { toast } from "react-toastify";

const ConsultingTypeView = () => {
  const accessToken = JSON.parse(localStorage.getItem("user-token"));
  const userRole = jwtDecode(accessToken).role;

  const [updateRenderIndex, setUpdateRenderIndex] = useState(0); // 0: Default, 1: Update

  const [selectedTypeId, setSelectedTypeId] = useState("");
  const [changedName, setChangedName] = useState("");

  const [listConsultingType, setListConsultingType] = useState([]);
  useEffect(() => {
    consultantService
      .getConsultingType()
      .then((res) => {
        console.log("Success Consulting Type list test", res.data);
        setListConsultingType(res.data);
      })
      .catch((e) => console.log("Fail Consulting Type list test", e));
  }, [updateRenderIndex]);
  const sortedList = [...listConsultingType].sort((a, b) => a.id - b.id);

  const UpdateConsultingType = () => {
    consultantService
      .UpdateConsultingType({ id: selectedTypeId, name: changedName })
      .then((res) => {
        console.log("Success Consulting Type Update test", res.data);
        toast.success("Update Consultant Type Success");
        setUpdateRenderIndex(0);
      })
      .catch((e) => toast.error(e));
  };

  const handleUpdateOnClick = (id, name) => {
    setSelectedTypeId(id);
    setChangedName(name);
    setUpdateRenderIndex(1);
  };

  const handleConfirmUpdateOnClick = () => {
    UpdateConsultingType();
  };

  const handleCancelUpdateOnClick = () => {
    setUpdateRenderIndex(0);
  };

  return (
    <ThemeProvider theme={ochreTheme}>
      <Container sx={{ padding: 2 }}>
        <h1
          style={{
            textAlign: "center",
            paddingBottom: "20px",
            marginBottom: "30px",
            borderBottom: "0.5px grey solid",
          }}
        >
          Consultant Type
        </h1>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={12}>
            {sortedList && (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Typography>No.</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>Name</Typography>
                      </TableCell>
                      {userRole === "Manager" ? <TableCell></TableCell> : <></>}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sortedList.map((row) => (
                      <TableRow>
                        <TableCell>
                          <Typography>
                            {sortedList.indexOf(row) + 1}
                          </Typography>
                        </TableCell>
                        {updateRenderIndex === 1 &&
                        selectedTypeId === row.id ? (
                          <TableCell>
                            <TextField
                              type="text"
                              defaultValue={row.name}
                              onChange={(e) => {
                                setChangedName(e.target.value);
                              }}
                            />
                          </TableCell>
                        ) : (
                          <TableCell>
                            <TextField
                              type="text"
                              defaultValue={row.name}
                              value={row.name}
                              InputProps={{ readOnly: true }}
                            />
                          </TableCell>
                        )}
                        {updateRenderIndex === 1 &&
                        selectedTypeId === row.id &&
                        userRole === "Manager" ? (
                          <TableCell>
                            <Button
                              variant="contained"
                              color="ochre"
                              onClick={() => {
                                handleConfirmUpdateOnClick();
                              }}
                            >
                              Confirm
                            </Button>
                            <Button
                              variant="contained"
                              color="ochre"
                              onClick={() => {
                                handleCancelUpdateOnClick();
                              }}
                            >
                              Cancel
                            </Button>
                          </TableCell>
                        ) : userRole === "Manager" ? (
                          <TableCell>
                            <Button
                              variant="contained"
                              color="ochre"
                              onClick={() => {
                                handleUpdateOnClick(row.id, row.name);
                              }}
                            >
                              Update
                            </Button>
                          </TableCell>
                        ) : (
                          <></>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default ConsultingTypeView;

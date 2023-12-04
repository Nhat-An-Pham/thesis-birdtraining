import { useEffect } from "react";
import { useState } from "react";
import consultantService from "../../services/consultant.service";
import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Typography,
  Table,
  TableRow,
  ThemeProvider,
  Container,
  Grid,
  Button,
  FormControl,
  TextField,
} from "@mui/material";
import { ochreTheme } from "../themes/Theme";
import { toast } from "react-toastify";

const PricePolicyView = () => {
  const [selectedPriceId, setSelectedPriceId] = useState(null);
  const [selectedDistanceId, setSelectedDistanceId] = useState(null);

  const [changeConsultantPrice, setChangeConsultantPrice] = useState(null);
  const [changeDistancePrice, setChangeDistancePrice] = useState(null);

  const [renderConsultantPriceIndex, setRenderConsultantPriceIndex] =
    useState(0); // 0: Default, 1: Update
  const [renderDistancePriceIndex, setRenderDistancePriceIndex] = useState(0); // 0: Default, 1: Update

  const [listConsultantPricePolicy, setListConsultantPricePolicy] = useState(
    []
  );
  useEffect(() => {
    consultantService
      .GetConsultingTicketPricePolicy()
      .then((res) => {
        console.log("Success Get Consultant Price Policy list test", res.data);
        setListConsultantPricePolicy(res.data);
      })
      .catch((e) =>
        console.log("Fail Get Consultant Price Policy list test", e)
      );
  }, [renderConsultantPriceIndex]);

  const [listDistancePricePolicy, setListDistancePricePolicy] = useState([]);
  useEffect(() => {
    consultantService
      .GetDistnacePricePolicy()
      .then((res) => {
        console.log("Success Get Disntace Price Policy list test", res.data);
        setListDistancePricePolicy(res.data);
      })
      .catch((e) => console.log("Fail Get Distance Price Policy list test", e));
  }, [renderDistancePriceIndex]);

  const handleUpdateConsultantOnClick = (rowId) => {
    setSelectedPriceId(rowId);
    setRenderConsultantPriceIndex(1);
  };

  const handleConfirmUpdateConsultantOnClick = () => {
    UpdateConsultantPricePolicy();
  };

  const handleCancelUpdatePricePolicyOnClick = () => {
    setRenderConsultantPriceIndex(0);
  };

  const handleUpdateDistanceOnClick = (rowId) => {
    setSelectedDistanceId(rowId);
    setRenderDistancePriceIndex(1);
  };

  const handleConfirmUpdateDistanceOnCLick = () => {};

  const handleCancelUpdateDistanceOnClick = () => {
    setRenderDistancePriceIndex(0);
  };

  const UpdateConsultantPricePolicy = () => {
    consultantService
      .UpdateConsultantPricePolicy({
        id: selectedPriceId,
        price: changeConsultantPrice,
      })
      .then((res) => {
        toast.success("Update Successfully");
        setRenderConsultantPriceIndex(0);
      })
      .catch((e) => toast.error(e.response.data.message));
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
          Consultant Price Policy
        </h1>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={12}>
            {listConsultantPricePolicy && (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableCell>
                      <Typography>No.</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>Online/Offline</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>Price Per Slot</Typography>
                    </TableCell>
                    <TableCell></TableCell>
                  </TableHead>
                  <TableBody>
                    {listConsultantPricePolicy.map((row) => (
                      <TableRow>
                        <TableCell>
                          <Typography>{row.id}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography>
                            {row.onlineOrOffline ? "Online" : "Offine"}
                          </Typography>
                        </TableCell>
                        {renderConsultantPriceIndex === 1 &&
                        selectedPriceId === row.id ? (
                          <TableCell>
                            <FormControl>
                              <TextField
                                label={"VND"}
                                type="number"
                                defaultValue={row.price}
                                onChange={(e) => {
                                  setChangeConsultantPrice(e.target.value);
                                }}
                              />
                            </FormControl>
                          </TableCell>
                        ) : (
                          <TableCell>
                            <TextField
                              label={"VND"}
                              type="number"
                              defaultValue={row.price}
                              value={row.price}
                              InputProps={{ readOnly: true }}
                            />
                          </TableCell>
                        )}
                        {renderConsultantPriceIndex === 1 &&
                        selectedPriceId === row.id ? (
                          <TableCell>
                            <Button
                              variant="contained"
                              color="ochre"
                              onClick={() => {
                                handleConfirmUpdateConsultantOnClick();
                              }}
                            >
                              Confirm
                            </Button>
                            <Button
                              variant="contained"
                              color="ochre"
                              onClick={() => {
                                handleCancelUpdatePricePolicyOnClick();
                              }}
                            >
                              Cancel
                            </Button>
                          </TableCell>
                        ) : (
                          <TableCell>
                            <Button
                              variant="contained"
                              color="ochre"
                              onClick={() => {
                                handleUpdateConsultantOnClick(row.id);
                              }}
                            >
                              Update
                            </Button>
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Grid>
        </Grid>

        <h1
          style={{
            textAlign: "center",
            paddingBottom: "20px",
            marginBottom: "30px",
            borderBottom: "0.5px grey solid",
          }}
        >
          Distance Price Policy
        </h1>

        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item xs={12}>
            {listDistancePricePolicy && (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableCell>
                      <Typography>No.</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>Distance</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>Price Per Kilometer</Typography>
                    </TableCell>
                    <TableCell></TableCell>
                  </TableHead>
                  <TableBody>
                    {listDistancePricePolicy.map((row) => (
                      <TableRow>
                        <TableCell>
                          <Typography>{row.id}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography>
                            {row.from} - {row.to}Km
                          </Typography>
                        </TableCell>
                        {renderDistancePriceIndex === 1 &&
                        selectedDistanceId === row.id ? (
                          <TableCell>
                            <FormControl>
                              <TextField
                                label={"VND"}
                                type="number"
                                defaultValue={row.pricePerKm}
                                onChange={(e) => {
                                  setChangeDistancePrice(e.target.value);
                                }}
                              />
                            </FormControl>
                          </TableCell>
                        ) : (
                          <TableCell>
                            <TextField
                              label={"VND"}
                              type="number"
                              defaultValue={row.pricePerKm}
                              value={row.pricePerKm}
                              InputProps={{ readOnly: true }}
                            />
                          </TableCell>
                        )}
                        {renderDistancePriceIndex === 1 &&
                        selectedDistanceId === row.id ? (
                          <TableCell>
                            <Button
                              variant="contained"
                              color="ochre"
                              onClick={() => {
                                handleConfirmUpdateDistanceOnCLick();
                              }}
                            >
                              Confirm
                            </Button>
                            <Button
                              variant="contained"
                              color="ochre"
                              onClick={() => {
                                handleCancelUpdateDistanceOnClick();
                              }}
                            >
                              Cancel
                            </Button>
                          </TableCell>
                        ) : (
                          <TableCell>
                            <Button
                              variant="contained"
                              color="ochre"
                              onClick={() => {
                                handleUpdateDistanceOnClick(row.id);
                              }}
                            >
                              Update
                            </Button>
                          </TableCell>
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

export default PricePolicyView;

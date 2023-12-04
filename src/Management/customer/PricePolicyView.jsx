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
  const [listConsultantPricePolicy, setListConsultantPricePolicy] = useState(
    []
  );

  const [selectedId, setSelectedId] = useState(null);
  const [changePrice, setChangePrice] = useState(null);
  const [renderIndex, setRenderIndex] = useState(0); //0: Default, 1: ConsultantPrice, 2: DistancePrice

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
  }, [renderIndex]);

  const [listDistancePricePolicy, setListDistancePricePolicy] = useState([]);

  useEffect(() => {
    consultantService
      .GetDistnacePricePolicy()
      .then((res) => {
        console.log("Success Get Disntace Price Policy list test", res.data);
        setListDistancePricePolicy(res.data);
      })
      .catch((e) => console.log("Fail Get Distance Price Policy list test", e));
  }, [renderIndex]);

  const handleUpdateOnClick = (rowId) => {
    setSelectedId(rowId);
    setRenderIndex(1);
  };

  const handleUpdateConsultantOnClick = () => {
    UpdateConsultantPricePolicy();
  };

  const UpdateConsultantPricePolicy = () => {
    consultantService
      .UpdateConsultantPricePolicy({ id: selectedId, price: changePrice })
      .then((res) => {
        toast.success("Update Successfully");
        setRenderIndex(0);
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
                        {renderIndex === 1 && selectedId === row.id ? (
                          <TableCell>
                            <FormControl>
                              <TextField
                               label={'VND'}
                                type="number"
                                defaultValue={row.price}
                                // value={row.price}
                                onChange={(e) => {
                                  setChangePrice(e.target.value);
                                  // row.price = e.target.value;
                                }}
                              />
                            </FormControl>
                          </TableCell>
                        ) : (
                          <TableCell>
                            {/* <Typography>{row.price}VND</Typography> */}
                            <TextField
                              label={'VND'}
                              type="number"
                              defaultValue={row.price}
                              value={row.price}
                              InputProps={{ readOnly: true }}
                            />
                          </TableCell>
                        )}
                        {renderIndex === 1 && selectedId === row.id ? (
                          <TableCell>
                            <Button
                              variant="contained"
                              color="ochre"
                              onClick={() => {
                                handleUpdateConsultantOnClick();
                              }}
                            >
                              Confirm
                            </Button>
                            <Button variant="contained" color="ochre">
                              Cancel
                            </Button>
                          </TableCell>
                        ) : (
                          <TableCell>
                            <Button
                              variant="contained"
                              color="ochre"
                              onClick={() => {
                                handleUpdateOnClick(row.id);
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
                        <TableCell>
                          <Typography>{row.pricePerKm}VND</Typography>
                        </TableCell>
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

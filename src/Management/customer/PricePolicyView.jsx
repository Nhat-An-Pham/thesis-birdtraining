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
} from "@mui/material";
const PricePolicyView = () => {
  const [listConsultantPricePolicy, setListConsultantPricePolicy] = useState(
    []
  );

  useEffect(() => {
    consultantService
      .GetConsultingTicketPricePolicy()
      .then((res) => {
        console.log("Success Get Consul;tant Price Policy list test", res.data);
        setListConsultantPricePolicy(res.data);
      })
      .catch((e) =>
        console.log("Fail Get Consultant Price Policy list test", e)
      );
  }, []);

  const [listDistancePricePolicy, setListDistancePricePolicy] = useState([]);

  useEffect(() => {
    consultantService
      .GetDistnacePricePolicy()
      .then((res) => {
        console.log("Success Get Disntace Price Policy list test", res.data);
        setListDistancePricePolicy(res.data);
      })
      .catch((e) => console.log("Fail Get Distance Price Policy list test", e));
  }, []);

  return (
    <ThemeProvider theme={"ochreTheme"}>
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
                        <TableCell>
                          <Typography>{row.price}VND</Typography>
                        </TableCell>
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

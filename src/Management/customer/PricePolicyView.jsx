import { useEffect } from "react";
import { useState } from "react";
import consultantService from "../../services/consultant.service";
import {
  AppBar,
  IconButton,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Toolbar,
  Typography,
  Table,
  TableRow,
} from "@mui/material";
import { Close } from "@mui/icons-material";

const PricePolicyView = ({ callBackRenderedIndex, callBackToList }) => {
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
    <>
      <AppBar position="static" color="ochre">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
            onClick={callBackToList}
          >
            <Close />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Consultant Price Table
          </Typography>
        </Toolbar>
      </AppBar>

      <h3>Consultant Price Policy</h3>
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

      <h3>Distance Price Policy</h3>
      {listDistancePricePolicy && (
        <TableContainer>
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
                    <Typography>{row.from} - {row.to}Km</Typography>
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
    </>
  );
};

export default PricePolicyView;

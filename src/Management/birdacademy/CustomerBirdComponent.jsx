import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Grid,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import BirdSkillReceivedComponent from "./BirdSkillReceivedComponent";
import { ArrowCircleLeftOutlined, Close } from "@mui/icons-material";

const CustomerBirdComponent = ({ customerId, callBackMainManagement }) => {
  const [birdList, setBirdList] = useState([]);
  const [selectedBird, setSelectedBird] = useState(null);

  const handleButtonBirdSkillReceivedClick = (key) => {
    setSelectedBird(key);
  };

  useEffect(() => {
    // Simulate fetching bird information based on customerId
    // Replace this with your actual API call or data fetching logic
    const fetchData = async () => {
      try {
        // Replace this URL with your actual API endpoint
        const response = await fetch(
          `http://13.214.85.41/api/trainingcourse-customer/customer-bird?customerId=${customerId}`
        );
        const data = await response.json();
        setBirdList(data); // Assuming data is an array of bird information
      } catch (error) {
        console.error("Error fetching bird data:", error);
      }
    };

    fetchData();
  }, [customerId]);

  function handleCallBackMainButton() {
    callBackMainManagement();
  }
  return (
    <div>
      <Grid sx={{ padding: 2 }}>
        <AppBar position="static" color="ochre" sx={{ borderRadius: 3 }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              sx={{ mr: 3 }}
              onClick={callBackMainManagement}
            >
              <Close />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } , fontWeight: 700}}
            >
              Customer Bird
            </Typography>
          </Toolbar>
        </AppBar>
      </Grid>
      <TableContainer style={{ padding: 20 }}>
        {/* <h2>Bird Information for Customer {customerId}</h2> */}
        <TableContainer style={{ padding: 20 }}>
          <Table>
            <TableHead>
              <TableCell sx={{ fontWeight: 700 }}>Bird Name</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Customer Name</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Bird Species Name</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Bird Color</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Bird Description</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Bird Picture</TableCell>
              <TableCell></TableCell>
            </TableHead>
            {birdList.map((bird) => (
              <TableRow key={bird.id}>
                <TableCell>{bird.name}</TableCell>
                <TableCell>{bird.customerName}</TableCell>
                <TableCell>{bird.birdSpeciesName}</TableCell>
                <TableCell>{bird.color}</TableCell>
                <TableCell>{bird.description}</TableCell>
                <TableCell>
                  <a
                    href={bird.picture}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={bird.picture}
                      alt="Bird avatar"
                      style={{ width: "200px", height: "150px" }}
                    />
                  </a>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleButtonBirdSkillReceivedClick(bird.id)}
                  >
                    View received bird skills
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </Table>
        </TableContainer>

        {selectedBird != null && (
          <BirdSkillReceivedComponent birdId={selectedBird} />
        )}
        <Button
          style={{
            marginTop: 10,
            paddingLeft: 35,
            paddingRight: 35,
            marginRight: 20,
          }}
          sx={{ float: "right" }}
          variant="contained"
          color="ochre"
          onClick={() => handleCallBackMainButton()}
        >
          Back
        </Button>
      </TableContainer>
    </div>
  );
};

export default CustomerBirdComponent;

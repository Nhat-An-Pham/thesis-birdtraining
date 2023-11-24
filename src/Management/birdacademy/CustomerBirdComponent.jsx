import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Paper,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import BirdSkillReceivedComponent from "./BirdSkillReceivedComponent";

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
      <TableContainer>
        <h2>Bird Information for Customer {customerId}</h2>
        <Table>
          <TableHead>
            <TableCell>Bird Name</TableCell>
            <TableCell>Customer Name</TableCell>
            <TableCell>Bird Species Name</TableCell>
            <TableCell>Bird Color</TableCell>
            <TableCell>Bird Description</TableCell>
            <TableCell>Bird Picture</TableCell>
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
                    alt="Description of the image"
                    style={{ width: "200px", height: "150px" }}
                  />
                </a>
              </TableCell>
              <TableCell>
                <button
                  onClick={() => handleButtonBirdSkillReceivedClick(bird.id)}
                >
                  View received bird skills
                </button>
              </TableCell>
            </TableRow>
          ))}
          <Table>
            {selectedBird != null && (
              <BirdSkillReceivedComponent birdId={selectedBird} />
            )}
          </Table>
        </Table>
      </TableContainer>
      <div className="main-button-container">
        <button className="button" onClick={() => handleCallBackMainButton()}>
          Back
        </button>
      </div>
    </div>
  );
};

export default CustomerBirdComponent;

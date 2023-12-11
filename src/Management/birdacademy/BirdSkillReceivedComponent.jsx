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
import addOnService from "../../services/addon.service";

const BirdSkillReceivedComponent = ({ birdId }) => {
  const [birdSkillList, setBirdSkillList] = useState([]);

  useEffect(() => {
    // Simulate fetching bird information based on customerId
    // Replace this with your actual API call or data fetching logic
    const fetchData = async () => {
      try {
        // Replace this URL with your actual API endpoint
        const response = await fetch(
          `http://13.214.85.41/api/trainingcourse-customer/birdskillreceived-bird?birdId=${birdId}`
        );
        const data = await response.json();
        setBirdSkillList(data); // Assuming data is an array of bird information
      } catch (error) {
        console.error("Error fetching bird data:", error);
      }
    };

    fetchData();
  }, [birdId]);
  return (
    <>
      {birdSkillList != null && birdSkillList.length > 0 && (
        <TableContainer style={{padding: 20}}>
          <h2>Bird Skill Received For Bird {birdId}</h2>
          <Table>
            <TableHead>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.95rem' }}>Bird Name</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.95rem' }}>Bird Skill Name</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.95rem' }}>Bird Skill Description</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.95rem' }}>Received Date</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.95rem' }}>Bird Skill Picture</TableCell>
            </TableHead>
            {birdSkillList.map((rsl) => (
              <TableRow key={rsl.id}>
                <TableCell>{rsl.birdName}</TableCell>
                <TableCell>{rsl.birdSkillName}</TableCell>
                <TableCell>{rsl.birdSkillDescription}</TableCell>
                <TableCell>
                  {addOnService.formatDate(rsl.receivedDate)}
                </TableCell>
                <TableCell>
                  <a
                    href={rsl.birdSkillPicture}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={rsl.birdSkillPicture}
                      alt="Description"
                      style={{ width: "200px", height: "150px" }}
                    />
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default BirdSkillReceivedComponent;

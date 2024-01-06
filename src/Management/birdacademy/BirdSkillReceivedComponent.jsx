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
import trainingcourseManagementService from "../../../src/services/trainingcourse-management.service";

const BirdSkillReceivedComponent = ({ birdId }) => {
  const [birdSkillList, setBirdSkillList] = useState([]);
  const fetchData = async () => {
    try {
      let params = {
        birdId: birdId,
      };
      let response =
        await trainingcourseManagementService.getBirdSkillReceivedByBirdId(
          params
        );
      //console.log(response);
      setBirdSkillList(response);
    } catch (error) {
      console.error("Error fetching bird skill receive data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [birdId]);
  return (
    <>
      {birdSkillList != null && birdSkillList.length > 0 && (
        <TableContainer style={{ padding: 20 }}>
          <h2>Bird Skill Received For Bird {birdId}</h2>
          <Table>
            <TableHead>
              <TableCell sx={{ fontWeight: 700, fontSize: "0.95rem" }}>
                Bird Name
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: "0.95rem" }}>
                Bird Skill Name
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: "0.95rem" }}>
                Bird Skill Description
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: "0.95rem" }}>
                Received Date
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: "0.95rem" }}>
                Bird Skill Picture
              </TableCell>
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

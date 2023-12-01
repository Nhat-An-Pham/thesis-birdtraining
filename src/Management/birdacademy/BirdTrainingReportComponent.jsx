import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Button,
  Paper,
  ThemeProvider,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import addOnService from "../../services/addon.service";
import trainingCourseManagementService from "../../../src/services/trainingcourse-management.service";
import { Tab } from "@coreui/coreui";
import { ochreTheme } from "../themes/Theme";
import ReportModifyComponent from "./ReportModifyComponent";

const BirdTrainingReportComponent = ({
  selectedProgress,
  birdSkillId,
  callbackAssigned,
}) => {
  const [reportList, setReportList] = useState([]);
  const [selectedReport, setSelectedReport] = useState();
  const [renderModifyReport, setRenderModifyReport] = useState(false);

  // Simulate fetching bird information based on customerId
  // Replace this with your actual API call or data fetching logic
  const fetchReportData = async () => {
    try {
      // Replace this URL with your actual API endpoint //https://localhost:7176
      console.log(selectedProgress);
      let params = {
        progressId: selectedProgress.id,
      };
      let response =
        await trainingCourseManagementService.getBirdTrainingReportByProgressId(
          params
        );
      console.log(response);
      setReportList(response);
    } catch (error) {
      console.error("Error fetching bird trainingProgress data:", error);
    }
  };
  useEffect(() => {
    fetchReportData();
  }, [selectedProgress]);

  function handleCallBackSkillButton() {
    callbackAssigned();
  }

  const handleModifyClick = (reportId) => {
    console.log("mod click");
    console.log("reportId: " + reportId);
    setSelectedReport(reportId);
    setRenderModifyReport(true);
  };

  const onCallbackModify = async () => {
    console.log("call back mod");
    fetchReportData();
    setRenderModifyReport(false);
    setSelectedReport(null);
  };
  return (
    <div>
      <ThemeProvider padding={20} theme={ochreTheme}>
        {reportList != null && reportList.length > 0 && (
          <TableContainer>
            <h2>Bird Training Report {selectedProgress.id}</h2>
            <Table>
              <TableHead>
                <TableCell>Slot</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Trainer Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableHead>
              {reportList.map((rsl) => (
                <TableBody>
                  <TableRow
                    key={rsl.reportId}
                    style={{
                      cursor: "pointer",
                      background:
                        selectedReport === rsl.reportId ? "#f0f0f0" : "white",
                    }}
                  >
                    <TableCell>{rsl.slotId}</TableCell>
                    <TableCell>{addOnService.formatDate(rsl.date)}</TableCell>
                    <TableCell>{rsl.trainerName}</TableCell>
                    <TableCell>{rsl.status}</TableCell>
                    {rsl.status == "NotYet" && (
                      <Button
                        sx={{ float: "right", marginBottom: "20px" }}
                        variant="contained"
                        color="ochre"
                        onClick={() => handleModifyClick(rsl.reportId)}
                      >
                        Modify
                      </Button>
                    )}
                  </TableRow>
                </TableBody>
              ))}
            </Table>

            <div className="main-button-container">
              <Button
                className="button"
                onClick={() => handleCallBackSkillButton()}
              >
                Back
              </Button>
            </div>
          </TableContainer>
        )}
      </ThemeProvider>
      {renderModifyReport && (
        <ReportModifyComponent
          reportId={selectedReport}
          birdSkillId={birdSkillId}
          callbackModify={onCallbackModify}
        />
      )}
    </div>
  );
};

export default BirdTrainingReportComponent;

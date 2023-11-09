import React, { useState } from 'react'
import ReworkSidebar from "../component/sidebar/ReworkSidebar";
import { ochreTheme } from "../themes/Theme";
import { Table, TableContainer, TableHead, TableBody, TableCell, TableRow, Paper, ThemeProvider, Grid, Button} from "@mui/material";
import './customerReq.scss'
import { Link } from 'react-router-dom';

export default function CustomerReqComponent() {
    const [renderedIndex, setRenderedIndex] = useState(0);

    const onAssignedView = () => {
        setRenderedIndex(0);
    }

    const onNotAssignedView = () => {
        setRenderedIndex(1);
    }

    const onHandledView = () => {
        setRenderedIndex(2);
    }

    const notAssignedConsultingTicketTableData = [
        {
            TicketId: 1,
            Name: "Pham Nhat An",
            Address: "17 Pasteur",
            Phone: "0904560264",
            Service: "Online",
            Date: "10-11-2023",
            Slot: "1",
            Request: "Consulting",
            AssignTo: "Pham Nhat An",
        },
        {
            TicketId: 2,
            Name: "Nguyen Thanh Trung",
            Address: "17 Pasteur",
            Phone: "0904560264",
            Service: "In-Home",
            Date: "10-11-2023",
            Slot: "2",
            Request: "Consulting",
            AssignTo: "Pham Nhat An",
        },
        {
            TicketId: 3,
            Name: "Nguyen Tho Thai Bao",
            Address: "17 Pasteur",
            Phone: "0904560264",
            Service: "In-Home",
            Date: "10-11-2023",
            Slot: "3",
            Request: "Consulting",
            AssignTo: "Pham Nhat An",
        },
        // Add more data as needed
    ];

    const assignedConsultingTicketTableData = [
        {
            TicketId: 1,
            Name: "Pham Nhat An",
            Address: "17 Pasteur",
            Phone: "0904560264",
            Service: "Online",
            Date: "10-11-2023",
            Slot: "1",
            Request: "Consulting",
            AssignTo: "Pham Nhat An",
        },
        {
            TicketId: 2,
            Name: "Nguyen Thanh Trung",
            Address: "17 Pasteur",
            Phone: "0904560264",
            Service: "In-Home",
            Date: "10-11-2023",
            Slot: "2",
            Request: "Consulting",
            AssignTo: "Pham Nhat An",
        },
        {
            TicketId: 3,
            Name: "Nguyen Tho Thai Bao",
            Address: "17 Pasteur",
            Phone: "0904560264",
            Service: "In-Home",
            Date: "10-11-2023",
            Slot: "3",
            Request: "Consulting",
            AssignTo: "Pham Nhat An",
        },
        // Add more data as needed
    ];

    const handledConsultingTicketTableData = [
        {
            TicketId: 4,
            Name: "Nguyen Van A",
            Address: "17 Pasteur",
            Phone: "090011001",
            Service: "Online",
            Date: "09-11-2023",
            Slot: "4",
            Request: "Consulting",
            AssignTo: "Pham Nhat An",
            Status: "Confirmed",
        },
        {
            TicketId: 5,
            Name: "Tran Thi B",
            Address: "19 Pasteur",
            Phone: "090011002",
            Service: "In-Home",
            Date: "09-11-2023",
            Slot: "5",
            Request: "Consulting",
            AssignTo: "Pham Nhat An",
            Status: "Canceled",
        },
        {
            TicketId: 6,
            Name: "Nguyen Hoang C",
            Address: "21 Pasteur",
            Phone: "090011003",
            Service: "In-Home",
            Date: "09-11-2023",
            Slot: "6",
            Request: "Consulting",
            AssignTo: "Pham Nhat An",
            Status: "Confirmed",
        },
        // Add more data as needed
    ];

    const availableTrainer = {
        first: "Other",
        second: "Thanh Trung",
        third: "Dinh Thong",        
    }

    return (
      <div className="workshop-container">
          <ThemeProvider theme={ochreTheme}>
          <ReworkSidebar selectTab={1} />
          <Grid container spacing={1} sx={{ margin: "15px" }}>
            <Grid container item xs={5} justifyContent="flex-start">
              {renderedIndex === 0 ? (
                <Button variant="contained" color="ochre" onClick={() => setRenderedIndex(1)}>
                  View UnAssigned Ticket
                </Button>
              ) : (
                <Button variant="contained" color="ochre" onClick={() => setRenderedIndex(0)}>
                  View Assigned Ticket
                </Button>
              )}
            </Grid>
    
            <Grid container item spacing={0} xs={5} justifyContent="flex-end">
              {renderedIndex === 2 ? (
                <></>
              ) : (
                <Button variant="contained" color="ochre" onClick={() => setRenderedIndex(2)}>
                  View Handled Ticket
                </Button>
              )}
            </Grid>
    
            <Grid item xs={12}>
              {renderedIndex === 0 ? (
                <div>
                  <h3>Requests that have assigned trainers</h3>
                  { <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Address</TableCell>
                                        <TableCell>Phone</TableCell>
                                        <TableCell>Service</TableCell>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Slot</TableCell>
                                        <TableCell>Request</TableCell>
                                        <TableCell>Assign To</TableCell>
                                        <TableCell>Confirm</TableCell>
                                        <TableCell>Cancel</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {assignedConsultingTicketTableData.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{row.Name}</TableCell>
                                            <TableCell>{row.Address}</TableCell>
                                            <TableCell>{row.Phone}</TableCell>
                                            <TableCell>{row.Service}</TableCell>
                                            <TableCell>{row.Date}</TableCell>
                                            <TableCell>{row.Slot}</TableCell>
                                            <TableCell>{row.Request}</TableCell>
                                            <TableCell>{row.AssignTo}</TableCell>
                                            <TableCell>
                                                <Button>
                                                    Confirm
                                                </Button>
                                            </TableCell>
                                            <TableCell>
                                                <Button>
                                                    Cancel
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>}
                </div>
              ) : renderedIndex === 1 ? (
                <div>
                  <h3>Requests that have not assigned trainers</h3>
                  {<TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Address</TableCell>
                                        <TableCell>Phone</TableCell>
                                        <TableCell>Service</TableCell>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Slot</TableCell>
                                        <TableCell>Request</TableCell>
                                        <TableCell>Assign To</TableCell>
                                        <TableCell>Assign</TableCell>
                                        <TableCell>Cancel</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {notAssignedConsultingTicketTableData.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{row.Name}</TableCell>
                                            <TableCell>{row.Address}</TableCell>
                                            <TableCell>{row.Phone}</TableCell>
                                            <TableCell>{row.Service}</TableCell>
                                            <TableCell>{row.Date}</TableCell>
                                            <TableCell>{row.Slot}</TableCell>
                                            <TableCell>{row.Request}</TableCell>
                                            <TableCell>
                                                <select>
                                                    <option>{availableTrainer.first}</option>
                                                    <option>{availableTrainer.second}</option>
                                                    <option>{availableTrainer.third}</option>
                                                </select>
                                            </TableCell>
                                            <TableCell>
                                                <Button>
                                                    Assign
                                                </Button>
                                            </TableCell>
                                            <TableCell>
                                                <Button>
                                                    Cancel
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>}
                </div>
              ) : renderedIndex === 2 ? (
                <div>
                  <h3>Requests that have been handled</h3>
                  { <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Address</TableCell>
                                        <TableCell>Phone</TableCell>
                                        <TableCell>Service</TableCell>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Slot</TableCell>
                                        <TableCell>Request</TableCell>
                                        <TableCell>Assign To</TableCell>
                                        <TableCell>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {handledConsultingTicketTableData.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{row.Name}</TableCell>
                                            <TableCell>{row.Address}</TableCell>
                                            <TableCell>{row.Phone}</TableCell>
                                            <TableCell>{row.Service}</TableCell>
                                            <TableCell>{row.Date}</TableCell>
                                            <TableCell>{row.Slot}</TableCell>
                                            <TableCell>{row.Request}</TableCell>
                                            <TableCell>{row.AssignTo}</TableCell>
                                            <TableCell>{row.Status}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>}
                </div>
              ) : null}
            </Grid>
          </Grid>
        </ThemeProvider>
      </div>
      );
}
import React, { useEffect, useState } from 'react'
import ReworkSidebar from "../component/sidebar/ReworkSidebar";
import { ochreTheme } from "../themes/Theme";
import { Table, TableContainer, TableHead, TableBody, TableCell, TableRow, Paper, ThemeProvider, Grid, Button} from "@mui/material";
import './customerReq.scss'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import ConsultantService from '../../services/consultant.service';

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

    const [listOfFreeTrainer, setListOfFreeTrainer] = useState([]);
    
    useEffect(() => {
        ConsultantService
            .getFreeTrainerOnSlotDate({dateValue: "1-1-2001", slotId: "1"})
            .then((res) => {
                console.log("success Free Trainer list test", res.data);
                setListOfFreeTrainer(res.data);
            })
            .catch((e) => console.log("fail Free Trainer list test", e));
    }, []);

    const [listNotAssignedConsultingTicket, setlistNotAssignedConsultingTicket] = useState([]);
    
    useEffect(() => {
        ConsultantService
            .viewListNotAssignedConsultingTicket()
            .then((res) => {
                console.log("success Not Assigned Consulting Ticket list test", res.data);
                setlistNotAssignedConsultingTicket(res.data);
            })
            .catch((e) => console.log("fail Not Assigned Consulting Ticket list test", e));
    }, []); 

    const [listAssignedConsultingTicket, setListAssignedConsultingTicket] = useState([]);

    useEffect(() => {
        ConsultantService
        .viewListAssignedConsultingTicket()
        .then((res) => {
            console.log("success Assigned Consulting Ticket list test", res.data);
            setListAssignedConsultingTicket(res.data);
        })
        .catch((e) => console.log("fail Assigned Consulting Ticket list test", e));
    }, []);

    const [listHandledConsultingTicket, setListHandledConsultingTicket] = useState([]);

    useEffect(() => {
        ConsultantService
        .listHandledConsultingTicket()
        .then((res) => {
            console.log("success Handled Consulting Ticket list test", res.data);
            setListHandledConsultingTicket(res.data);
        })
        .catch((e) => console.log("fail Handled Consulting Ticket list test", e));
    }, []);

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
                                        <TableCell>Date</TableCell>
                                        <TableCell>Slot</TableCell>
                                        <TableCell>Assign To</TableCell>
                                        <TableCell>Confirm</TableCell>
                                        <TableCell>Cancel</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {listAssignedConsultingTicket.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{row.name}</TableCell>
                                            <TableCell>{row.address}</TableCell>
                                            <TableCell>{row.phone}</TableCell>
                                            <TableCell>{row.date}</TableCell>
                                            <TableCell>{row.slot}</TableCell>
                                            <TableCell>{row.trainer}</TableCell>
                                            <TableCell>
                                                <Button type="button">
                                                    Confirm
                                                </Button>
                                            </TableCell>
                                            <TableCell>
                                                <Button type="button">
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
                                        <TableCell>Date</TableCell>
                                        <TableCell>Slot</TableCell>
                                        <TableCell>Assign To</TableCell>
                                        <TableCell>Assign</TableCell>
                                        <TableCell>Cancel</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {listNotAssignedConsultingTicket.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{row.name}</TableCell>
                                            <TableCell>{row.address}</TableCell>
                                            <TableCell>{row.phone}</TableCell>
                                            <TableCell>{row.date}</TableCell>
                                            <TableCell>{row.slot}</TableCell>
                                            <TableCell>
                                                <select>
                                                {listOfFreeTrainer.map((trainer, idx) => (
                                                    <option key={idx}>{trainer.name}</option>
                                                ))}
                                                </select>
                                            </TableCell>
                                            <TableCell>
                                                <Button type="button">
                                                    Assign
                                                </Button>
                                            </TableCell>
                                            <TableCell>
                                                <Button type="button">
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
                                        <TableCell>Date</TableCell>
                                        <TableCell>Slot</TableCell>
                                        <TableCell>Assign To</TableCell>
                                        <TableCell>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {listHandledConsultingTicket.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{row.name}</TableCell>
                                            <TableCell>{row.address}</TableCell>
                                            <TableCell>{row.phone}</TableCell>
                                            <TableCell>{row.date}</TableCell>
                                            <TableCell>{row.slot}</TableCell>
                                            <TableCell>{row.trainer}</TableCell>
                                            <TableCell>{row.status}</TableCell>
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
import React, { useState } from 'react'
import Sidebar from '../component/sidebar/Sidebar'
import { Table, TableContainer, TableHead, TableBody, TableCell, TableRow, Paper } from "@mui/material";
import './customerReq.scss'
import { Link } from 'react-router-dom';
    
const CustomerReq = () => {
    const tableData = [
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

    const faketrainer = {
        first: "Other",
        second: "Thanh Trung",
        third: "Dinh Thong",        
    }

    return (
        <>
            <div className='customerreq-container'>
                <Sidebar />
                <div className='customerreq-wrapper'>
                    <h1>Customer Request</h1>
                    <h2><Link to="/management/customerhandledreq"><span>Handled Request</span></Link></h2>
                    <div className='customerreq_section customerreq_section-notdone'>
                        <h3>Requests that haven't assigned trainer </h3>
                        <TableContainer component={Paper}>
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
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tableData.map((row, index) => (
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
                                                    <option>{faketrainer.first}</option>
                                                    <option>{faketrainer.second}</option>
                                                    <option>{faketrainer.third}</option>
                                                </select>
                                            </TableCell>
                                            <TableCell><div className='customerreq_update_button'>
                                                    <button>Assign</button>
                                                </div></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        {/* <div className='customerreq_section_notdone-button'>
                            <button>Cancel</button>
                            <button>Accept Changes</button>
                        </div> */}
                    </div>
                    <div className='customerreq_section customerreq_section-done'>
                        <h3>Requests that have assigned trainer </h3>
                        <TableContainer component={Paper}>
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
                                    {tableData.map((row, index) => (
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
                                                <div className='customerreq_confirm_button'>
                                                    <button>Confirm</button>
                                                </div>
                                                </TableCell>
                                            <TableCell>
                                            <div className='customerreq_confirm_button'>
                                                <button>Cancel</button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        {/* <div className='customerreq_section_done-button'>
                            <button>Cancel</button>
                            <button>Accept Changes</button>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default CustomerReq
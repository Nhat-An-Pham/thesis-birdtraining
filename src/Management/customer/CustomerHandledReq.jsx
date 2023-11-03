import React, { useState } from 'react'
import Sidebar from '../component/sidebar/Sidebar'
import { Table, TableContainer, TableHead, TableBody, TableCell, TableRow, Paper } from "@mui/material";
import './CustomerHandledReq.scss'

const CustomerHandledReq = () => {
    const tableData = [
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

    return (
        <>
            <div className='customerhandledreq-container'>
                <Sidebar />
                <div className='customerhandledreq-wrapper'>
                    <h1>Customer Handled Request</h1>
                    <div className='customerhandledreq_section customerhandledreq_section-notdone'>
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
                                        <TableCell>Status</TableCell>
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
                                            <TableCell>{row.Status}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CustomerHandledReq
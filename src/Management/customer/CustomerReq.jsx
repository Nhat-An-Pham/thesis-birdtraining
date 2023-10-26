import React from 'react'
import Sidebar from '../component/sidebar/Sidebar'
import { Table, TableContainer, TableHead, TableBody, TableCell, TableRow, Paper } from "@mui/material";
import './customerReq.scss'

const CustomerReq = () => {
    const tableData = [
        {
            Name: "Pham Nhat An",
            Address: "17 Pasteur",
            Phone: "0904560264",
            Service: "Online",
            Request: "Urgent",
            AssignTo: "Pham Nhat An",
        },
        {
            Name: "Nguyen Thanh Trung",
            Address: "17 Pasteur",
            Phone: "0904560264",
            Service: "In-Home",
            Request: "Normal",
            AssignTo: "Pham Nhat An",
        },
        {
            Name: "Nguyen Thanh Trung",
            Address: "17 Pasteur",
            Phone: "0904560264",
            Service: "In-Home",
            Request: "Normal",
            AssignTo: "Pham Nhat An",
        },
        // Add more data as needed
    ];

    const faketrainer = {
        first: "Nhat An",
        second: "Thanh Trung",
        third: "Dinh Thong"
    }
    return (
        <>
            <div className='customerreq-container'>
                <Sidebar />
                <div className='customerreq-wrapper'>
                    <h1>Customer Request</h1>
                    <div className='customerreq_section customerreq_section-notdone'>
                        <p>Requests that haven't handled </p>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Address</TableCell>
                                        <TableCell>Phone</TableCell>
                                        <TableCell>Service</TableCell>
                                        <TableCell>Request</TableCell>
                                        <TableCell>Assign To</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tableData.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{row.Name}</TableCell>
                                            <TableCell>{row.Address}</TableCell>
                                            <TableCell>{row.Phone}</TableCell>
                                            <TableCell>{row.Service}</TableCell>
                                            <TableCell>{row.Request}</TableCell>
                                            <TableCell>
                                                <select>
                                                    <option>{faketrainer.first}</option>
                                                    <option>{faketrainer.second}</option>
                                                    <option>{faketrainer.third}</option>
                                                </select>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <div className='customerreq_section_notdone-button'>
                            <button>Cancel</button>
                            <button>Accept Changes</button>
                        </div>
                    </div>
                    <div className='customerreq_section customerreq_section-done'>
                        <p>Requests that had handled </p>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Address</TableCell>
                                        <TableCell>Phone</TableCell>
                                        <TableCell>Service</TableCell>
                                        <TableCell>Request</TableCell>
                                        <TableCell>Assign To</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tableData.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{row.Name}</TableCell>
                                            <TableCell>{row.Address}</TableCell>
                                            <TableCell>{row.Phone}</TableCell>
                                            <TableCell>{row.Service}</TableCell>
                                            <TableCell>{row.Request}</TableCell>
                                            <TableCell>{row.AssignTo}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <div className='customerreq_section_done-button'>
                            <button>Cancel</button>
                            <button>Accept Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CustomerReq
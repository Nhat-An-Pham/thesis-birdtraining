import React, { useState } from 'react'
import Sidebar from '../component/sidebar/Sidebar'
import "./birdacademymng.scss"
import { Table, TableContainer, TableHead, TableBody, TableCell, TableRow, Paper, } from "@mui/material";

const BirdAcademyMng = () => {

    const [selectedUser, setSelectedUser] = useState(null);

    const handleUserClick = (userId) => {
        setSelectedUser(userId);
    };

    const users = [
        { id: 1, name: "Pham Nhat An", address: "17 Pasteur", phoneNumber: "0904560264"},
        { id: 2, name: "Hoang Dinh Thong", address: "17 Pasteur", phoneNumber: "0904560264"},
        { id: 3, name: "Nguyen Thanh Trung", address: "17 Pasteur", phoneNumber: "0904560264"},
        
    ];

    const birds = [
        { id: 1, name: "Class 1", trainer: "Trainer A", currentClass: "Talking", classTaken: "Talking", userId: 1 },
        { id: 2, name: "Class 2", trainer: "Trainer B", currentClass: "Talking",classTaken: "Talking", userId: 1 },
        { id: 3, name: "Class 3", trainer: "Trainer C", currentClass: "Talking",classTaken: "Talking", userId: 2 },
        { id: 4, name: "Class 4", trainer: "Trainer D", currentClass: "Talking",classTaken: "Talking", userId: 2 },
    ];

    return (
        <div className='workshop-container'>
            <Sidebar />
            <div className='workshop_section-wrapper'>
                <div className='workshop_section_table workshop_section_table-workshop'>
                    <h2>Customers</h2>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Customer Name</TableCell>
                                    <TableCell>Address</TableCell>
                                    <TableCell>Phone Number</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users && users.length > 0 ? (
                                    users.map((user) => (
                                        <TableRow
                                            key={user.id}
                                            onClick={() => handleUserClick(user.id)}
                                            style={{ cursor: "pointer", background: selectedUser === user.id ? "#f0f0f0" : "white" }}
                                        >
                                            <TableCell>{user.name}</TableCell>
                                            <TableCell>{user.address}</TableCell>
                                            <TableCell>{user.phoneNumber}</TableCell>
                                        </TableRow>
                                    ))
                                ) : null}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div className='workshop_section_table workshop_section_table-classes'>
                    <h2>Birds</h2>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Bird Name</TableCell>
                                    <TableCell>Instructor</TableCell>
                                    <TableCell>Current Class</TableCell>
                                    <TableCell>Class Taken</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {selectedUser !== null && birds && birds.length > 0
                                    ? birds
                                        .filter((cls) => cls.userId === selectedUser)
                                        .map((cls) => (
                                            <TableRow key={cls.id}>
                                                <TableCell>{cls.name}</TableCell>
                                                <TableCell>{cls.trainer}</TableCell>
                                                <TableCell>{cls.currentClass}</TableCell>
                                                <TableCell>{cls.classTaken}</TableCell>
                                                <TableCell><button>Update</button></TableCell>
                                            </TableRow>
                                        ))
                                    : null}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
    )
}

export default BirdAcademyMng
import React, { useState, useEffect } from 'react'
import userService from '../../../services/user.service';
import {
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableCell,
    TableRow,
    Paper,
    Checkbox,
    Alert,
    Grid,
    CircularProgress,
    Drawer,
    Typography,
    Box,
} from "@mui/material";
import UserDetail from './UserDetail';

const ViewUsers = ({ renderIndex, tablabel, role }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [userList, setUserList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [openDiv, setOpenDiv] = useState(0);
    useEffect(() => {
        userService
            .getUserList()
            .then((res) => {
                // console.log("success user list test", res.data);

                //set vào userlist theo tablabel (chưa làm)
                const filteredUsers = res.data.filter(user => user.role === tablabel.label);
                setUserList(filteredUsers);
                setFilteredList(filteredUsers);
            })
            .catch((e) => console.log("fail user list test", e));
    }, [renderIndex, openDiv, tablabel.label]);

    const handleSearch = (query) => {
        const filteredResults = userList.filter((user) =>
            (user.email.includes(query) || user.name.includes(query) || user.phoneNumber.includes(query))
        );
        setFilteredList(filteredResults);

    };
    const handleSearchInputChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        handleSearch(query);
    };



    const [selectedUser, setSelectedUser] = useState()
    const handleCloseDiv = () => {
        setOpenDiv(0)
    }
    const handleUserClick = (e) => {
        setOpenDiv(1)
        setSelectedUser(e)
    }

    return (
        <>
            {selectedUser ? <UserDetail selectedUser={selectedUser} openDiv={openDiv} handleCloseDiv={handleCloseDiv} role={tablabel}></UserDetail> : null}
            <h1 style={{ borderBottom: "0.5px grey solid" }}> Users</h1>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <div>
                        <input placeholder='Search for user (Email)' value={searchQuery} onChange={handleSearchInputChange}
                            style={{ padding: "10px", width: "300px", borderRadius: "10px", border: "0.2px grey solid", marginBottom: "20px" }}></input>
                    </div>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Phone Number</TableCell>
                                    <TableCell>Password</TableCell>
                                    <TableCell>Role</TableCell>
                                    {tablabel.label === "Customer" ?
                                        <TableCell>MemberShip</TableCell>
                                        : null}
                                    <TableCell>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredList.map((row, index) => (
                                    <TableRow key={index}
                                        hover style={{ cursor: "pointer" }} onClick={() => handleUserClick(row)}>
                                        <TableCell>{row.id}</TableCell>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.email}</TableCell>
                                        <TableCell>{row.phoneNumber}</TableCell>
                                        <TableCell>{row.password}</TableCell>
                                        <TableCell>{row.role}</TableCell>
                                        {tablabel.label === "Customer" ?
                                            <TableCell>{row.membership}</TableCell>
                                            : null}
                                        <TableCell>{row.status}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid >
            </Grid >
        </>
    )
}

export default ViewUsers
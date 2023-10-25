import React from 'react'
import Sidebar from '../component/sidebar/Sidebar'
import './userdata.scss'
import users from '../../assets/fakedb/users'
import { Table, TableContainer, TableHead, TableBody, TableCell, TableRow, Paper } from "@mui/material";

const UserData = () => {


    return (
        <>
            <div className='userdata-container'>
                <Sidebar />
                <div className='userdata-wrapper'>
                    <h1>User Data</h1>
                    ----------------------------------------------------------
                    <div className='userdata_section userdata_section-search'>
                        <input placeholder='Search for user'></input>
                        <button className=''>Search</button>
                    </div>
                    <div className='userdata_section userdata_section-table'>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Phone</TableCell>
                                        <TableCell>Address</TableCell>
                                        <TableCell>Role</TableCell>
                                        <TableCell>Thumbnail</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{row.id}</TableCell>
                                            <TableCell>{row.name}</TableCell>
                                            <TableCell>{row.phone}</TableCell>
                                            <TableCell>{row.address}</TableCell>
                                            <TableCell>{row.role}</TableCell>
                                            <TableCell>{row.thumbnail}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    ------------------------------
                    <div className='userdata_section userdata_section-addnew'>
                        <h3>Create New User</h3>
                        <div className='userdata_section_addnew-wrapper'>
                            <input placeholder='Id'></input>
                            <input placeholder='Name'></input>
                            <input placeholder='Phone Number'></input>
                            <input placeholder='Address'></input>
                            <label for="roles">Choose a Role:</label>
                            <select id="roles">
                                <option value="admin">Admin</option>
                                <option value="staff">Staff</option>
                                <option value="trainer">Trainer</option>
                                <option value="customer">Customer</option>
                            </select>
                            <button className=''>Add New User</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserData


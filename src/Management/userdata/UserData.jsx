import { React, useState, useEffect } from 'react'
import Sidebar from '../component/sidebar/Sidebar'
import './userdata.scss'
import users from '../../assets/fakedb/users'
import { Table, TableContainer, TableHead, TableBody, TableCell, TableRow, Paper } from "@mui/material";
import userService from '../../services/user.service';

const UserData = () => {
    //xử lý phần user
    const [searchQuery, setSearchQuery] = useState('');
    const [userList, setUserList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);

    useEffect(() => {
        userService
            .getUserList()
            .then((res) => {
                // console.log("success user list test", res.data);
                setUserList(res.data);
                setFilteredList(res.data);
            })
            .catch((e) => console.log("fail user list test", e));
    }, []);
    const handleSearch = (query) => {
        const filteredResults = userList.filter((user) =>
            user.email.includes(query) || user.name.includes(query) || user.phoneNumber.includes(query) || user.role.includes(query)
        );
        setFilteredList(filteredResults);
    };
    const handleSearchInputChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        handleSearch(query);
    };



    // xử lý phần create user
    const [isDivVisible, setIsDivVisible] = useState(false);

    const handleButtonClickVisible = () => {
        setIsDivVisible(true);
    };

    const handleCloseDiv = () => {
        setIsDivVisible(false);
    };



    return (
        <>
            <div className='userdata-container'>
                <Sidebar />
                <div className='userdata-wrapper'>
                    <h1>User Data</h1>
                    ----------------------------------------------------------
                    <div className='userdata_section userdata_section-search'>
                        <input placeholder='Search for user (Email)' value={searchQuery} onChange={handleSearchInputChange}></input>
                    </div>
                    <button onClick={handleButtonClickVisible}>Create More User</button>
                    {isDivVisible && (
                        <div className='userdatacreate-background'>
                            <div className='userdatacreate-container'>
                                <button onClick={handleCloseDiv}>Close</button>
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
                    )}
                    <div className='userdata_section userdata_section-table'>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow className='userdata_section_table_section userdata_section_table_section-head'>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Phone Number</TableCell>
                                        <TableCell>Role</TableCell>
                                        <TableCell>MemberShip</TableCell>
                                        <TableCell>Avatar</TableCell>
                                        <TableCell>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredList.map((row, index) => (
                                        <TableRow key={index} className='userdata_section_table_section userdata_section_table_section-bottom'>
                                            <TableCell>{row.id}</TableCell>
                                            <TableCell>{row.name}</TableCell>
                                            <TableCell>{row.email}</TableCell>
                                            <TableCell>{row.phoneNumber}</TableCell>
                                            <TableCell>{row.role}</TableCell>
                                            <TableCell>{row.membership}</TableCell>
                                            <TableCell>""</TableCell>
                                            <TableCell>{row.status}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    ------------------------------

                </div>
            </div>
        </>
    )
}

export default UserData


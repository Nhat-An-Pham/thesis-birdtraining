import { Dialog, DialogTitle, DialogContent, Grid, Select, MenuItem } from '@mui/material'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Box } from '@mui/material';
import { Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import userService from '../../../services/user.service';
import { jwtDecode } from 'jwt-decode';
import '../userdata.scss'

const UserDetail = ({ selectedUser, openDiv, handleCloseDiv }) => {

    const [errMessage, setErrMessage] = useState(null);

    const [roleChange, setRoleChange] = useState(selectedUser.role)
    const [statusChange, setStatusChange] = useState(selectedUser.status)
    const [rolesData, setRolesData] = useState([]);
    const [customerStatuses, setCustomerStatuses] = useState([])
    const [trainerStatuses, setTrainerStatuses] = useState([])


    // onChangeHandler
    const roleChangeHandler = (e) => {
        setRoleChange(e)
    }
    const statusChangeHandler = (e) => {
        setStatusChange(e)
    }
    const updateRoleClick = () => {
        userService.putChangeRole({ id: selectedUser.id, role: roleChange })
            .then((res) => {
                toast.success("Successfully Change Role")
            })
            .catch((e) => {
                toast.error("Cannot Change Role")
            })
    }
    const updateStatusClick = () => {

    }

    //API Handler
    useEffect(() => {
        userService.getRoles()
            .then((res) => {
                // console.log(res.data)
                setRolesData(res.data)
            })
            .catch((e) => {
                console.log("Cannot Get Roles Data")
            })
        userService.getCustomerStatuses()
            .then((res) => {
                // console.log(res.data)
                setCustomerStatuses(res.data)
            })
            .catch((e) => {
                console.log("Cannot Get Customer Statuses")
            })
        userService.getTrainerStatuses()
            .then((res) => {
                // console.log(res.data)
                setTrainerStatuses(res.data)
            })
            .catch((e) => {
                console.log("Cannot Get Trainer Statuses")
            })
    }, [openDiv])



    return (
        <Dialog open={openDiv} onClose={handleCloseDiv} >
            <ToastContainer />
            <DialogTitle style={{ margin: "0px" }}>
                <h3>{selectedUser.name}</h3>
            </DialogTitle>
            <DialogContent>
                <section className='userdetail_dialogcontent_section userdetail_dialogcontent_section-info'>

                    <table class="userdetail_dialogcontent_info-table">
                        <tbody>
                            <tr>
                                <td>Name</td><td>{selectedUser.name}</td></tr>
                            <tr>
                                <td>Email</td><td>{selectedUser.email}</td></tr>
                            <tr>
                                <td>Phone Number</td><td>(+84){selectedUser.phoneNumber}</td></tr>
                            <tr>
                                <td>Address</td><td>{selectedUser.address}</td></tr>
                            <tr>
                                <td>Password</td><td>{selectedUser.password}</td></tr>
                            <tr>
                                <td>Membership</td><td>{selectedUser.membership}</td></tr>
                            <tr>
                                <td>Role</td>
                                <td><Select value={roleChange} onChange={(e) => roleChangeHandler(e.target.value)}>
                                    {rolesData.map((roles) => (
                                        <MenuItem value={roles}>{roles}</MenuItem>
                                    ))}
                                </Select>
                                </td>
                            </tr>
                            <tr>
                                <td>Status</td>
                                <td>{selectedUser.role === "Trainer" ?
                                    <Select value={statusChange} onChange={(e) => statusChangeHandler(e.target.value)}>
                                        {trainerStatuses.map((status) => (
                                            <MenuItem value={status}>{status}</MenuItem>
                                        ))}
                                    </Select>
                                    : null}
                                    {selectedUser.role === "Customer" ?
                                        <Select value={statusChange} onChange={(e) => statusChangeHandler(e.target.value)}>
                                            {customerStatuses.map((status) => (
                                                <MenuItem value={status}>{status}</MenuItem>
                                            ))}
                                        </Select>
                                        : null}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </section>
                <section className='userdetail_dialogcontent_section' >
                    <p >{errMessage}</p>
                    <Button
                        sx={{ float: "right", marginBottom: "20px", marginLeft: "10px" }}
                        variant="contained"
                        color="ochre"
                        onClick={updateStatusClick}
                    >
                        Update Status
                    </Button>
                    <Button
                        sx={{ float: "right", marginBottom: "20px" }}
                        variant="contained"
                        color="ochre"
                        onClick={updateRoleClick}
                    >
                        Update Roles
                    </Button>
                    <Button color="ochre" variant="contained" onClick={handleCloseDiv}>
                        Cancel
                    </Button>
                </section>
            </DialogContent>
        </Dialog >
    )
}

export default UserDetail
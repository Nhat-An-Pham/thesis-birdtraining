import { Dialog, DialogTitle, DialogContent, Grid, Select, MenuItem } from '@mui/material'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Box } from '@mui/material';
import { Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import userService from '../../../services/user.service';
import { jwtDecode } from 'jwt-decode';

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
        <Dialog open={openDiv} onClose={handleCloseDiv}>
            <ToastContainer />
            <DialogTitle>
                <h3 style={{ textAlign: "center", margin: "0px" }}>{selectedUser.name}</h3>
            </DialogTitle>
            <DialogContent style={{ width: "100%", padding: 0 }}>
                <section className='userdetail-box-container' style={{ marginBottom: "20px" }}>
                    <div>Name</div>
                    <div>{selectedUser.name}</div>
                    <div>Email</div>
                    <div>{selectedUser.email}</div>
                    <div>Phone Number</div>
                    <div>(+84){selectedUser.phoneNumber}</div>
                    <div>Address</div>
                    <div>{selectedUser.address}</div>
                    <div>Password</div>
                    <div>{selectedUser.password}</div>
                    <div>Membership</div>
                    <div>{selectedUser.membership}</div>
                    <div>Role</div>
                    <div>
                        <Select style={{ width: "130px" }} value={roleChange} onChange={(e) => roleChangeHandler(e.target.value)}>
                            {rolesData.map((roles) => (
                                <MenuItem value={roles}>{roles}</MenuItem>
                            ))}
                        </Select>
                    </div>
                    <div>Status</div>
                    <div>
                        {selectedUser.role === "Trainer" ?
                            <Select style={{ width: "130px" }} value={statusChange} onChange={(e) => statusChangeHandler(e.target.value)}>
                                {trainerStatuses.map((status) => (
                                    <MenuItem value={status}>{status}</MenuItem>
                                ))}
                            </Select>
                            : null}
                        {selectedUser.role === "Customer" ?
                            <Select style={{ width: "130px" }} value={statusChange} onChange={(e) => statusChangeHandler(e.target.value)}>
                                {customerStatuses.map((status) => (
                                    <MenuItem value={status}>{status}</MenuItem>
                                ))}
                            </Select>
                            : null}
                    </div>
                </section>
                <div style={{ marginTop: "20px" }}>
                    <p style={{ color: "red" }}>{errMessage}</p>
                    <Button
                        sx={{ float: "right", marginBottom: "20px" , marginLeft:"10px" }}
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
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default UserDetail
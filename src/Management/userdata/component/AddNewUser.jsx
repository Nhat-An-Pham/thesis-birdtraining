import React, { useState, useEffect } from 'react'
import { Button, Drawer, Grid, MenuItem, Select, ThemeProvider } from "@mui/material";
import { FormControl, Input, InputLabel, Stack, Typography, } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import userService from '../../../services/user.service';

const AddNewUser = () => {

    const [errMessage, setErrMessage] = useState(null);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [password, setPassword] = useState()


    const handleSubmit = (e) => {
        e.preventDefault();
        userService.postCreateUser({ name: name, email: email, phoneNumber: phoneNumber, password: password })
            .then((res) => {
                toast.success("Create user successfully")
            })
            .catch((e) => {
                toast.error("Cannot Create User")
                if (e.response.data) {
                    setErrMessage(e.response.data)
                }

            })
    }

    return (
        <>
            <Grid item xs={12}>
                <h3 style={{ borderBottom: "0.5px grey solid" }}>Create New User</h3>
                <div className="form-container">
                    <form
                        onSubmit={handleSubmit}
                        className="form"
                        encType="multipart/form-data"
                    >
                        <ToastContainer />
                        <Typography variant="h6" gutterBottom style={{ marginBottom: "20px" }}>
                            General information
                        </Typography>
                        <Stack spacing={3} direction="column" sx={{ marginBottom: 4 }}>
                            <FormControl fullWidth required style={{ marginBottom: 10 }}>
                                <InputLabel htmlFor="name">Name</InputLabel>
                                <Input type="text"
                                    onChange={(e) => { setName(e.target.value); setErrMessage(null) }}
                                />
                            </FormControl>
                            <FormControl fullWidth required style={{ marginBottom: 10 }}>
                                <InputLabel htmlFor="name">Email</InputLabel>
                                <Input type="text"
                                    onChange={(e) => { setEmail(e.target.value); setErrMessage(null) }}
                                />
                            </FormControl>
                            <FormControl fullWidth required style={{ marginBottom: 10 }}>
                                <InputLabel>Phone Number</InputLabel>
                                <Input
                                    type="text"
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    required
                                />
                            </FormControl>
                            <FormControl fullWidth required style={{ marginBottom: 10 }}>
                                <InputLabel>Password</InputLabel>
                                <Input
                                    type="text"
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </FormControl>
                            {/* <FormControl fullWidth required variant="outlined">
                                <InputLabel>Address</InputLabel>
                                <Input
                                    type="text"
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </FormControl> */}
                        </Stack>
                        {/* <InputLabel for="roles">Choose a Role:</InputLabel>
                        <br />
                        <Select id="roles" style={{ width: "200px" }} onChange={(e) => setRole(e)}>
                            <MenuItem value="Customer">Customer</MenuItem>
                            <MenuItem value="Staff">Staff</MenuItem>
                            <MenuItem value="Trainer">Trainer</MenuItem>
                            <MenuItem value="Manager">Manager</MenuItem>
                            <MenuItem value="Administrator">Adminstrator</MenuItem>
                        </Select> */}
                        {errMessage}
                        <br />
                        <Button
                            sx={{ float: "right", marginBottom: "20px" }}
                            variant="contained"
                            color="ochre"
                            type="submit"
                        >
                            Create User
                        </Button>
                    </form>
                </div>
            </Grid >
        </>
    )
}

export default AddNewUser
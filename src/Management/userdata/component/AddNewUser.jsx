import React, { useState, useEffect } from 'react'
import { Box, Button, Drawer, Grid, MenuItem, Select, ThemeProvider } from "@mui/material";
import { FormControl, Input, InputLabel, Stack, Typography, } from "@mui/material";
import { UploadComponent } from '../../component/upload/Upload';
import { ToastContainer, toast } from 'react-toastify';
import userService from '../../../services/user.service';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import UserData from '../UserData';

const AddNewUser = () => {

    const [errMessage, setErrMessage] = useState(null);

    const roles = ["Trainer", "Staff", "Manager"];
    const genders = [{ boo: true, label: "Male", }, { boo: false, label: "Female" }]
    const consultantables = [{ boo: true, label: "Yes", }, { boo: false, label: "No" }]
    const isFulltimes = [{ boo: true, label: "Yes", }, { boo: false, label: "No" }]

    const [currentAvatar, setCurrentAvatar] = useState();

    const [user, setUser] = useState({
        Name: "",
        Email: "",
        PhoneNumber: "",
        Avatar: null,
        Password: "",
        Role: "",
        Birthday: null,
        GgMeetLink: "",
        Gender: "",
        Consultantable: false,
        IsFulltime: true,
    });

    const handleAvatarChange = (event) => {
        ;

        const files = Array.from(event.target.files[0]);
        setUser({ ...user, Avatar: files })
        // Create an array of image names from the selected files
        const imageNames = files.map((file) => file.name);
        setCurrentAvatar(imageNames)
    };

    const handleInputChange = (field, value) => {
        setUser({ ...user, [field]: value });
    };


    const handleSubmit = () => {
        const formData = new FormData();
        formData.append("Name", user.Name);
        formData.append("Email", user.Email);
        formData.append("PhoneNumber", user.PhoneNumber);
        formData.append("Avatar", user.Avatar);
        formData.append("Password", user.Password);
        formData.append("Role", user.Role);
        formData.append("Birthday", user.Birthday);
        formData.append("GgMeetLink", user.GgMeetLink);
        formData.append("Gender", user.Gender);
        formData.append("Consultantable", user.Consultantable)
        formData.append("IsFulltime", user.IsFulltime);
        userService.postCreateUser(formData)
            .then((res) => {
                toast.success("Create user successfully")
            })
            .catch((e) => {
                toast.error("Cannot Create User:")
                console.log("Cannot Create User", e)
            })
    }

    return (
        <>
            <Grid item xs={12}>
                <h3 style={{ borderBottom: "0.5px grey solid" }}>Create New User</h3>
                <div className="form-container-addnewuser">
                    <div className="form_section form_section-left">
                        <ToastContainer />
                        <Typography variant="h6" gutterBottom style={{ marginBottom: "20px", fontWeight: "bold" }}>
                            General information
                        </Typography>
                        <Box spacing={3} direction="column"
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '25ch' },
                                display: "flex",
                                flexWrap: "wrap",
                                justifyContent: "flex-start"
                            }}
                            noValidate
                            autoComplete="off">

                            <TextField
                                label="Name"
                                size="small"
                                onChange={(e) => handleInputChange('Name', e.target.value)}
                            />
                            <TextField
                                label="Email"
                                size="small"
                                onChange={(e) => handleInputChange('Email', e.target.value)}
                            />
                            <TextField
                                label="Phone Number"
                                size="small"
                                onChange={(e) => handleInputChange('PhoneNumber', e.target.value)}
                            />
                            <TextField
                                label="Password"
                                size="small"
                                onChange={(e) => handleInputChange('Password', e.target.value)}
                            />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Birthday"
                                    value={user.Birthday}
                                    onChange={(date) => handleInputChange('Birthday', date)}
                                    renderInput={(params) => <TextField {...params} margin="normal" fullWidth />}
                                />
                            </LocalizationProvider>
                            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                <InputLabel id="demo-select-small-label">Role</InputLabel>
                                <Select
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    label="Role"
                                    onChange={(e) => handleInputChange('Role', e.target.value)}
                                >
                                    {roles.map((role) => (
                                        <MenuItem key={role} value={role}>
                                            {role}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <br />

                            {/* Role = Trainer */}
                            {user.Role === "Trainer" ?
                                <>
                                    <Typography style={{ color: "red", width:"90%", margin:"10px 0px", padding:"10px" }}>* Please fill these information for Trainer</Typography>
                                    <TextField
                                        label="Google Meet Link"
                                        size="small"
                                        onChange={(e) => handleInputChange('GgMeetLink', e.target.value)}
                                    />
                                    <br />
                                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                        <InputLabel id="demo-select-small-label">Gender</InputLabel>
                                        <Select
                                            labelId="demo-select-small-label"
                                            id="demo-select-small"
                                            label="Gender"
                                            onChange={(e) => handleInputChange('Gender', e.target.value)}
                                        >
                                            {genders.map((gender) => (
                                                <MenuItem key={gender.label} value={gender.boo}>
                                                    {gender.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                        <InputLabel id="demo-select-small-label">Consultantable</InputLabel>
                                        <Select
                                            labelId="demo-select-small-label"
                                            id="demo-select-small"
                                            label="Consultantable"
                                            onChange={(e) => handleInputChange('Consultantable', e.target.value)}
                                        >
                                            {consultantables.map((consultantable) => (
                                                <MenuItem key={consultantable.label} value={consultantable.boo}>
                                                    {consultantable.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                        <InputLabel id="demo-select-small-label">Full-Time</InputLabel>
                                        <Select
                                            labelId="demo-select-small-label"
                                            id="demo-select-small"
                                            label="Full-Time"
                                            onChange={(e) => handleInputChange('IsFulltime', e.target.value)}
                                        >
                                            {isFulltimes.map((isFulltime) => (
                                                <MenuItem key={isFulltime.label} value={isFulltime.boo}>
                                                    {isFulltime.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </>
                                : null}
                        </Box>
                        {errMessage}
                        <br />

                    </div>

                    <div className='form_section form_section-right'>
                        <UploadComponent
                            onChange={handleAvatarChange}
                            accept="image/*">
                            Upload image
                        </UploadComponent>
                        {/* Display submitted files here */}
                        <div style={{ objectFit: "contain" }}>
                            {currentAvatar}
                        </div>
                    </div>
                </div>
            </Grid >
            <Button
                sx={{ float: "right", marginBottom: "20px" }}
                variant="contained"
                color="ochre"
                onClick={handleSubmit}
            >
                Create User
            </Button>
        </>
    )
}

export default AddNewUser
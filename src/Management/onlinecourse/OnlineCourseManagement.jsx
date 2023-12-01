import React from 'react'
import "./onlinecoursemanagement.scss"
import { ToastContainer } from 'react-toastify'
import { Button, Drawer, Grid, ThemeProvider } from "@mui/material";
import { ochreTheme } from "../themes/Theme";
import ReworkSidebar from '../component/sidebar/ReworkSidebar';
import { jwtDecode } from 'jwt-decode';
import OCStaff from './onlinecourserole/OCStaff';
import OCManager from './onlinecourserole/OCManager';

const OnlineCourseManagement = () => {
    const accessToken = JSON.parse(localStorage.getItem('user-token'));
    const userRole = jwtDecode(accessToken).role;

    return (
        <div className='workshop-container'>
            <ToastContainer />
            <ThemeProvider theme={ochreTheme}>
                <ReworkSidebar selectTab={2} />
                <Grid container spacing={1} sx={{ margin: "15px" }}>
                    {userRole === "Manager" ?
                        <OCManager /> : <OCStaff />}
                </Grid>
            </ThemeProvider>
        </div>
    )
}

export default OnlineCourseManagement
import { React, useState, useEffect } from 'react'
import ReworkSidebar from "../component/sidebar/ReworkSidebar";
import './userdata.scss'
import users from '../../assets/fakedb/users'
import { ochreTheme } from "../themes/Theme";
import { Button, Drawer, Grid, ThemeProvider } from "@mui/material";

import { Table, TableContainer, TableHead, TableBody, TableCell, TableRow, Paper } from "@mui/material";
import userService from '../../services/user.service';
import { ToastContainer } from 'react-toastify';
import ViewUsers from './component/ViewUsers';
import UserDetail from './component/UserDetail';
import AddNewUser from './component/AddNewUser';

const UserData = () => {

    const [renderIndex, setRenderIndex] = useState(0);
    const [selectedUser, setSelectedUser] = useState(null);
    //Event Handler
    const SelectedUserIndex = (e) => {
        setSelectedUser(e);
        setRenderIndex(2);
    }

    let renderedComponents = [
        <ViewUsers setSelectedUserCallBack={SelectedUserIndex} renderIndex={renderIndex} />,
        <AddNewUser />,
    ]


    return (
        <>
            <div className='workshop-container'>
                <ToastContainer />
                <ThemeProvider theme={ochreTheme}>
                    <ReworkSidebar selectTab={6}/>
                    <Grid container spacing={1} sx={{ margin: "15px" }}>
                        
                        <Grid container item xs={6} justifyContent="flex-start">
                            {renderIndex === 0 ? (
                                <Button
                                    variant="contained"
                                    color="ochre"
                                    onClick={() => setRenderIndex(1)}
                                >
                                    Add new user
                                </Button>
                            ) : (
                                <Button
                                    color="ochre"
                                    variant="contained"
                                    onClick={() => setRenderIndex(0)}
                                >
                                    Back
                                </Button>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            {renderedComponents[renderIndex]}
                        </Grid>
                    </Grid>
                </ThemeProvider>
            </div >
        </>
    )
}

export default UserData


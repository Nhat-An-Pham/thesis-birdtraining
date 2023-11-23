import React, { useEffect, useState } from 'react'
import onlinecourseManagement from '../../../../services/onlinecourse-management';
import { Img } from "react-image";
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
import RawHTMLRenderer from "../../../component/htmlRender/htmlRender";

const ViewCourses = ({ setSelectedCourseCallBack }) => {

    const [onlineCourses, setOnlineCourses] = useState([]);
    const [selectedcourse, setSelectedCourse] = useState();


    const handleCourseClick = (course) => {
        setSelectedCourse(course);
        setSelectedCourseCallBack(course);
    }

    useEffect(() => {
        onlinecourseManagement.getAllOnlineCourse()
            .then((res) => {
                setOnlineCourses(res.data)
                console.log(res.data)
            })
            .catch((e) => {
                console.log("Can't Get Online Courses", e);
            })
    }, [])


    return (
        <>
            <h1> ALL COURSES</h1>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ width: 0.125 }} align="center">
                                        Image
                                    </TableCell>
                                    <TableCell style={{ width: 0.125 }}>Title</TableCell>
                                    <TableCell style={{ width: 0.25 }}> Short Description</TableCell>
                                    <TableCell style={{ width: 0.125 }} align="center">
                                        Price (USD)
                                    </TableCell>
                                    <TableCell style={{ width: 0.125 }} align="center">
                                        Status
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {onlineCourses && onlineCourses.length > 0 ? (
                                    onlineCourses.map((course) => (
                                        <TableRow
                                            hover
                                            // selected
                                            onClick={() => handleCourseClick(course)}
                                            key={course.id}
                                        >
                                            <TableCell className="image-cell">
                                                <Img
                                                    src={course.picture}
                                                    unloader={<CircularProgress />}
                                                />
                                            </TableCell>
                                            <TableCell style={{ width: 0.125 }}>
                                                {course.title}
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    width: 0.25,
                                                    flexGrow: 1,
                                                    overflow: "hidden",
                                                    px: 3,
                                                }}
                                            >
                                                <Typography><RawHTMLRenderer htmlContent={course.shortDescription} /></Typography>
                                            </TableCell>
                                            <TableCell style={{ width: 0.125 }} align="center">
                                                {course.price}$
                                            </TableCell>
                                            <TableCell style={{ width: 0.125 }} align="center">
                                                <Checkbox
                                                    checked={course.status === "ACTIVE"}
                                                    // onChange={() => switchcourseStatus(course)}
                                                    sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={7} align="center">
                                            No record!
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </>
    )
}

export default ViewCourses
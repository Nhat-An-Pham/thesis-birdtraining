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
    Button,
} from "@mui/material";
import RawHTMLRenderer from "../../../component/htmlRender/htmlRender";

const ViewCourses = ({ setSelectedCourseCallBack, renderIndex }) => {

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
                // console.log(res.data)
            })
            .catch((e) => {
                console.log("Can't Get Online Courses", e);
            })
    }, [renderIndex])



    return (
        <>
            <h1 style={{ borderBottom: "0.5px grey solid" }}> Courses</h1>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TableContainer>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow style={{ "height": '35px' }}>
                                    <TableCell style={{ width: 0.125 }} align="center">
                                        Image
                                    </TableCell>
                                    <TableCell style={{ width: 0.125 }}>Title</TableCell>
                                    <TableCell style={{ width: 0.25 }}> Short Description</TableCell>
                                    <TableCell style={{ width: 0.125 }} align="center">
                                        Price (vnd)
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
                                            style={{ maxHeight: "35px" }}
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
                                            <TableCell  >
                                                <Typography>
                                                    {/* <RawHTMLRenderer htmlContent={course.shortDescription} /> */}
                                                    <Button>View Detail</Button>
                                                </Typography>
                                            </TableCell>
                                            <TableCell style={{ width: 0.125 }} align="center">
                                                {course.price}(vnd)
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
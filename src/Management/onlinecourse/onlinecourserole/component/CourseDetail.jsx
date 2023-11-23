import React, { useEffect, useState } from 'react'
import {
    Button,
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
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import { Img } from 'react-image';
import RawHTMLRenderer from "../../../component/htmlRender/htmlRender";
import { AddCircleOutlineOutlined } from "@mui/icons-material";
import onlinecourseManagement from '../../../../services/onlinecourse-management';
import { FormControl, Input, InputLabel, Stack } from "@mui/material";
import Editor from "../../../component/text-editor/Editor";
import AddNewComponent from './AddNewComponent';

const CourseDetail = ({ selectedCourse }) => {

    const sections = selectedCourse.sections;

    // 0 is close, 1 is add new, 2 is update
    const [openDiv, setOpenDiv] = useState(0);
    // 0 is SECTION, 1 is LESSON
    const [renderIndex, setRenderIndex] = useState(0);


    const [selectedSection, setSelectedSection] = useState();

    const handleSectionClick = (section) => {
        setSelectedSection(section);
        setRenderIndex(1);
    }

    const handleOpenDiv = (e) => {
        setOpenDiv(e)
    }
    const handleCloseDiv = () => {
        setOpenDiv(0)
    }



    return (
        <>
            {/* Course Detail */}
            {selectedSection ?
                <AddNewComponent openDiv={openDiv} handleCloseDiv={handleCloseDiv} renderIndex={renderIndex} sectionId={selectedSection.id} courseId={selectedCourse.id} />
                : null}
            <h1> COURSE DETAIL: {selectedCourse.title}</h1>
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
                            <TableRow>
                                <TableCell className="image-cell">
                                    <Img
                                        src={selectedCourse.picture}
                                        unloader={<CircularProgress />}
                                    />
                                </TableCell>
                                <TableCell style={{ width: 0.125 }}>
                                    {selectedCourse.title}
                                </TableCell>
                                <TableCell
                                    style={{
                                        width: 0.25,
                                        flexGrow: 1,
                                        overflow: "hidden",
                                        px: 3,
                                    }}
                                >
                                    <Typography style={{ fontSize: "12px" }}><RawHTMLRenderer htmlContent={selectedCourse.shortDescription} /></Typography>
                                </TableCell>
                                <TableCell style={{ width: 0.125 }} align="center">
                                    {selectedCourse.price}$
                                </TableCell>
                                <TableCell style={{ width: 0.125 }} align="center">
                                    <Checkbox
                                        checked={selectedCourse.status === "ACTIVE"}
                                        // onChange={() => switchcourseStatus(course)}
                                        sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                                    />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>

            {/* Sections and Lessons */}
            {
                renderIndex === 0 ?
                    <>
                        <h3>Sections</h3>
                        <TableContainer component={Paper}>
                            <Table >
                                <TableHead >
                                    <TableRow >
                                        <TableCell >Title</TableCell>
                                        <TableCell >Description</TableCell>
                                        <TableCell >Resource File</TableCell>
                                        <TableCell ></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {sections.map((section) => (
                                        <TableRow
                                            hover
                                            // selected
                                            key={section.id}
                                            style={{ cursor: "pointer" }}
                                            onClick={() => handleSectionClick(section)}

                                        >
                                            <TableCell ><p style={{ width: "100%", fontWeight: "bold" }}>{section.title}</p> </TableCell>
                                            <TableCell ><p style={{ width: "100%" }}>{section.description}</p></TableCell>
                                            <TableCell><p style={{ width: "100%", wordBreak: "break-all" }}>{section.resourceFiles}</p></TableCell>
                                            <TableCell >
                                                <Button style={{ width: "100%", height: "100%" }}>Update </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow hover>
                                        <TableCell colSpan={12} align="center">
                                            <Button onClick={() => handleOpenDiv(1)}>
                                                <AddCircleOutlineOutlined scale={"150%"} /> Add New Section
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>
                    : null
            }
            {
                renderIndex === 1 && selectedSection ?
                    <>
                        <h3>Lesson: {selectedSection.title}</h3>
                        <Button onClick={() => setRenderIndex(0)}>Back</Button>
                        <Grid item xs={12}>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell >Title</TableCell>
                                            <TableCell >Description</TableCell>
                                            <TableCell >Video</TableCell>
                                            <TableCell ></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {selectedSection.lessons.map((lesson) =>
                                            <TableRow>
                                                <TableCell >
                                                    {lesson.title}
                                                </TableCell>
                                                <TableCell width="700px">
                                                    <Typography style={{ fontSize: "12px" }}><RawHTMLRenderer htmlContent={lesson.description} /></Typography>
                                                </TableCell>
                                                <TableCell >
                                                    <p style={{ width: "100px", overflow: "hidden" }}>{lesson.video}</p>
                                                </TableCell>
                                                <TableCell >
                                                    <Button>Update</Button>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                        <TableRow hover>
                                            <TableCell colSpan={12} align="center">
                                                <Button onClick={() => handleOpenDiv(1)}>
                                                    <AddCircleOutlineOutlined scale={"150%"} /> Add New Lesson
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </>
                    : null
            }
        </>

    )
}

export default CourseDetail
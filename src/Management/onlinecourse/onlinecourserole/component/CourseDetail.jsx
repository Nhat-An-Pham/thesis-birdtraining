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
import Editor from "../../../component/text-editor/Editor";
import AddNewComponent from './AddNewComponent';
import UpdateComponent from './UpdateComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DeleteComponent from './DeleteComponent';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';

const CourseDetail = ({ selectedCourse, renderChange }) => {

    //get UserRole for validation
    const accessToken = JSON.parse(localStorage.getItem("user-token"))
    const userRole = jwtDecode(accessToken).role
    const [status, setStatus] = useState(selectedCourse.status);
    const sections = selectedCourse.sections;

    // 0 is close, 1 is add new, 2 is update, 3 is delete
    const [openDiv, setOpenDiv] = useState(0);
    // 0 is SECTION, 1 is LESSON
    const [renderIndex, setRenderIndex] = useState(0);


    const [selectedSection, setSelectedSection] = useState();
    const [selectedLesson, setSelectedLesson] = useState();

    const handleSectionClick = (section) => {
        setSelectedSection(section);
        setRenderIndex(1);
    }

    const handleUpdateSectionClick = (event) => {
        setSelectedSection(event)
        setOpenDiv(2)
    }

    const handleUpdateLessonClick = (event) => {
        setSelectedLesson(event);
        setOpenDiv(2);
    }

    const handleDeleteSectionClick = (event) => {
        setSelectedSection(event)
        setOpenDiv(3);
    }

    const handleDeleteLessonClick = (event) => {
        setSelectedLesson(event)
        setOpenDiv(3);
    }

    const handleOpenDiv = (e) => {
        setOpenDiv(e);
    }
    const handleCloseDiv = () => {
        setOpenDiv(0);
    }

    const switchcourseStatus = (course) => {
        onlinecourseManagement.switchCourseStatus(course)
            .then((res) => {
                toast.success("Successfully changed status");
                let action = selectedCourse.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
                setStatus(action);
            })
            .catch((e) => {
                toast.error("Cannot change status")
                console.log("Cannot change status", e.response.data)
            })

    }


    return (
        <>
            {/* Course Detail */}
            {selectedSection && openDiv === 1 ?
                <AddNewComponent openDiv={openDiv} handleCloseDiv={handleCloseDiv} renderIndex={renderIndex} sectionId={selectedSection.id} courseId={selectedCourse.id} />
                :
                null
            }
            {!selectedSection && openDiv === 1 ?
                <AddNewComponent openDiv={openDiv} handleCloseDiv={handleCloseDiv} renderIndex={renderIndex} courseId={selectedCourse.id} />
                :
                null
            }

            {selectedSection && openDiv === 2 ?
                <UpdateComponent openDiv={openDiv} handleCloseDiv={handleCloseDiv} renderIndex={renderIndex} selectedSection={selectedSection} selectedLesson={selectedLesson} />
                :
                null
            }
            {selectedSection && openDiv === 3 ?
                <DeleteComponent openDiv={openDiv} handleCloseDiv={handleCloseDiv} renderIndex={renderIndex} selectedSection={selectedSection} selectedLesson={selectedLesson} />
                :
                null
            }

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
                                    {userRole === "Manager" ?
                                        <Checkbox
                                            checked={status === "ACTIVE"}
                                            onChange={() => switchcourseStatus(selectedCourse)}
                                            sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                                        />
                                        :
                                        <Checkbox
                                            checked={selectedCourse.status === "ACTIVE"}
                                            sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                                        />
                                    }
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
                                        <>
                                            <TableRow
                                                hover
                                                // selected
                                                key={section.id}
                                                style={{ cursor: "pointer" }}
                                                onClick={() => handleSectionClick(section)}
                                            >
                                                <TableCell ><p style={{ width: "100%", fontWeight: "bold" }}>{section.title}</p> </TableCell>
                                                <TableCell ><RawHTMLRenderer htmlContent={section.description} /></TableCell>
                                                <TableCell><p style={{ width: "100%", wordBreak: "break-all" }}>{section.resourceFiles}</p></TableCell>
                                            </TableRow>
                                            {userRole === "Manager" ?
                                                <TableRow>
                                                    <TableCell >
                                                        <Button
                                                            color="ochre"
                                                            variant="contained"
                                                            onClick={() => { handleUpdateSectionClick(section) }}>Update </Button>
                                                    </TableCell>
                                                    <TableCell >
                                                        <Button
                                                            color="ochre"
                                                            variant="contained"
                                                            onClick={() => { handleDeleteSectionClick(section) }}>Delete </Button>
                                                    </TableCell>
                                                </TableRow>
                                                : null}
                                        </>
                                    ))}
                                    <TableRow hover>
                                        {userRole === "Manager" ?
                                            <TableCell colSpan={12} align="center">
                                                <Button
                                                    color="ochre"
                                                    variant="contained"
                                                    onClick={() => handleOpenDiv(1)}>
                                                    <AddCircleOutlineOutlined scale={"150%"} /> Add New Section
                                                </Button>
                                            </TableCell>
                                            : null}
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>
                    : null
            }
            {/* LESSON  */}
            {
                renderIndex === 1 && selectedSection ?
                    <>
                        <h3>Lesson: {selectedSection.title}</h3>
                        <Button style={{ marginBottom: "20px" }} variant="contained" color="ochre" onClick={() => setRenderIndex(0)}>Back</Button>
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
                                            <>
                                                <TableRow>
                                                    <TableCell >
                                                        <p style={{ width: "100%", fontWeight: "bold" }}>{lesson.title}</p>
                                                    </TableCell>
                                                    <TableCell width="700px">
                                                        <Typography style={{ fontSize: "12px" }}><RawHTMLRenderer htmlContent={lesson.description} /></Typography>
                                                    </TableCell>
                                                    <TableCell >
                                                        <p style={{ width: "200px", overflow: "hidden" }}>{lesson.video}</p>
                                                    </TableCell>
                                                </TableRow>
                                                {userRole === "Manager" ?
                                                    <TableRow style={{ width: "100%" }}>
                                                        <TableCell >
                                                            <Button
                                                                color="ochre"
                                                                variant="contained"
                                                                onClick={() => { handleUpdateLessonClick(lesson) }}>
                                                                Update
                                                            </Button>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Button
                                                                color="ochre"
                                                                variant="contained"
                                                                onClick={() => { handleDeleteLessonClick(lesson) }}>
                                                                Delete
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                    : null}
                                            </>
                                        )}
                                        <TableRow hover>
                                            {userRole === "Manager" ?
                                                <TableCell colSpan={12} align="center">
                                                    <Button
                                                        color="ochre"
                                                        variant="contained"
                                                        onClick={() => handleOpenDiv(1)}>
                                                        <AddCircleOutlineOutlined scale={"150%"} /> Add New Lesson
                                                    </Button>
                                                </TableCell>
                                                : null}
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
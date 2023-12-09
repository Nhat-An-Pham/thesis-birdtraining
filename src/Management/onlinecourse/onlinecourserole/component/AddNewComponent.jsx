import React, { useState } from 'react'
import { Button, Typography, Dialog, DialogContent, DialogTitle, } from "@mui/material";
import { FormControl, Input, InputLabel, Stack } from "@mui/material";
import Editor from "../../../component/text-editor/Editor";
import { UploadComponent } from "../../../component/upload/Upload";
import onlinecourseManagement from '../../../../services/onlinecourse-management';
import { ToastContainer, toast } from 'react-toastify';


const AddNewComponent = ({ openDiv, handleCloseDiv, renderIndex, courseId, sectionId }) => {

    const [errMessage, setErrMessage] = useState(null);
    //SECTION
    const [sectionTitle, setSectionTitle] = useState();
    const [sectionDescription, setSectionDescription] = useState("");
    const [sectionResourceFiles, setSectionResourceFiles] = useState();
    const [submittedFile, setSubmittedFile] = useState("");

    //LESSON
    const [lessonTitle, setLessonTitle] = useState();
    const [lessonDescription, setLessonDescription] = useState("");
    const [video, setVideo] = useState()
    const [submittedVideo, setSubmittedVideo] = useState("");


    const [tempDescr, setTempDescr] = useState("");

    const handleEditorChange = (value) => {
        setTempDescr(value)
    };

    const handleSubmitSection = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("Title", sectionTitle)
        formData.append("CourseId", courseId)
        formData.append("Description", tempDescr)
        formData.append("ResourceFiles", sectionResourceFiles)
        onlinecourseManagement.postAddSection(formData)
            .then((res) => {
                toast.success("Submit Successfully")
                renderIndex(0);
            })
            .catch((e) => {
                toast.error("Fail To Submit")
                console.log("Fail To Submit", e)
            })
    }
    const handleSubmitLesson = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("Title", lessonTitle)
        formData.append("SectionId", sectionId)
        formData.append("Description", tempDescr)
        formData.append("ResourceFiles", video)
        onlinecourseManagement.postAddLesson(formData)
            .then((res) => {
                toast.success("Submit Successfully")
                renderIndex(0);
            })
            .catch((e) => {
                toast.error("Fail To Submit")
                console.log("Fail To Submit", e)
            })
    }



    const handleFileChange = (e) => {
        const files = Array.from(e.target.files)
        setSectionResourceFiles(files[0]);
        const fileName = files.map((title) => title.name)
        setSubmittedFile(fileName)
    }
    const handleVideoChange = (e) => {
        const files = Array.from(e.target.files)
        setVideo(files[0]);
        const fileName = files.map((title) => title.name)
        setSubmittedVideo(fileName)
    }


    return (
        <Dialog open={openDiv} onClose={handleCloseDiv} >
            <ToastContainer />
            {/* ADD NEW */}
            <DialogTitle>
                Add More {renderIndex === 0 ? <>Section</> : <>Lesson</>}:
            </DialogTitle>
            {/* SECTION */}
            {renderIndex === 0 ?
                <DialogContent style={{ width: "100%" }}>
                    <div className="form-container" style={{ width: "100%" }}>
                        <form onSubmit={handleSubmitSection} className="form" encType="multipart/form-data" style={{ width: "100%", paddingTop: "20px" }}>
                            <FormControl fullWidth required style={{ marginBottom: "30px" }}>
                                <InputLabel htmlFor="title">Section Title</InputLabel>
                                <Input type="text"
                                    onChange={(e) => { setSectionTitle(e.target.value); setErrMessage(null) }}
                                />
                            </FormControl>
                            <FormControl fullWidth required style={{ marginBottom: "20px" }}>
                                <Typography variant="p" gutterBottom>
                                    Description
                                </Typography>
                                <Editor
                                    onGetHtmlValue={handleEditorChange}
                                    htmlValue={sectionDescription}
                                    style={{ width: "100%" }}
                                />
                            </FormControl>
                            <FormControl required style={{ marginBottom: 15 }}>
                                <Button variant="contained" color="ochre">
                                    <UploadComponent
                                        onChange={handleFileChange}
                                        accept="/*">
                                        Upload Resource File
                                    </UploadComponent>
                                </Button>
                                {/* Display submitted files here */}
                                <div>
                                    {submittedFile}
                                </div>
                                <p style={{ color: "red" }}>{errMessage}</p>
                            </FormControl>
                            <br />
                            <Button
                                sx={{ float: "right", marginBottom: "20px" }}
                                variant="contained"
                                color="ochre"
                                type="submit"
                            >
                                Create NEW SECTION
                            </Button>
                            <Button color="ochre" variant="contained" onClick={handleCloseDiv}>
                                Cancel
                            </Button>
                        </form>
                    </div>
                </DialogContent>
                : null}
            {/* Lesson */}
            {renderIndex === 1 ?
                <DialogContent style={{ width: "100%" }}>
                    <div className="form-container" style={{ width: "100%" }}>
                        <form onSubmit={handleSubmitLesson} className="form" encType="multipart/form-data" style={{ width: "100%", paddingTop: "20px" }}>
                            <FormControl fullWidth required style={{ marginBottom: "30px" }}>
                                <InputLabel htmlFor="title">Section Title</InputLabel>
                                <Input type="text"
                                    onChange={(e) => { setLessonTitle(e.target.value); setErrMessage(null) }}
                                />
                            </FormControl>
                            <FormControl fullWidth required style={{ marginBottom: "20px" }}>
                                <Typography variant="p" gutterBottom>
                                    Description
                                </Typography>
                                <Editor
                                    onGetHtmlValue={handleEditorChange}
                                    htmlValue={lessonDescription}
                                    style={{ width: "100%" }}
                                />
                            </FormControl>
                            <FormControl required style={{ marginBottom: 15 }}>
                                <Button variant="contained" color="ochre">
                                    <UploadComponent
                                        onChange={handleVideoChange}
                                        accept="video/*">
                                        Upload Video
                                    </UploadComponent>
                                </Button>
                                {/* Display submitted files here */}
                                <div>
                                    {submittedVideo}
                                </div>
                                <p style={{ color: "red" }}>{errMessage}</p>
                            </FormControl>
                            <br />
                            <Button
                                sx={{ float: "right", marginBottom: "20px" }}
                                variant="contained"
                                color="ochre"
                                type="submit"
                            >
                                Create NEW LESSON
                            </Button>
                            <Button color="ochre" variant="contained" onClick={handleCloseDiv}>
                                Cancel
                            </Button>
                        </form>
                    </div>
                </DialogContent>
                : null}
        </Dialog >
    )
}

export default AddNewComponent
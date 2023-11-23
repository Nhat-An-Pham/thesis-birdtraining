import React, { useState } from 'react'
import { Button, Typography, Dialog, DialogContent, DialogTitle, } from "@mui/material";
import { FormControl, Input, InputLabel, Stack } from "@mui/material";
import Editor from "../../../component/text-editor/Editor";
import { UploadComponent } from "../../../component/upload/Upload";


const AddNewComponent = ({ openDiv, handleCloseDiv, renderIndex, courseId, sectionId }) => {

    const [errMessage, setErrMessage] = useState(null);
    //SECTION
    const CourseId = courseId
    const [sectionTitle, setSectionTitle] = useState();
    const [sectionDescription, setSectionDescription] = useState();
    const [sectionResourceFiles, setSectionResourceFiles] = useState();
    const [submittedFile, setSubmittedFile] = useState();

    //LESSON
    if (sectionId){
        const SectionId = sectionId
    }
    const [lessonTitle, setLessonTitle] = useState();
    const [lessonDescription, setLessonDescription] = useState();
    const [video, setVideo] = useState()


    const handleEditorChange = (value) => {
        setSectionDescription(value)
        setLessonDescription(value)
    };

    const handleSubmitSection = () => {

    }

    const handleFileChange = (e) => {
        setSubmittedFile(e);
    }

    return (
        <Dialog open={openDiv} onClose={handleCloseDiv} >
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
                                        accept="image/*">
                                        Upload Resource File
                                    </UploadComponent>
                                </Button>
                                {/* Display submitted files here */}
                                <div>
                                    {submittedFile}
                                </div>
                                {/* <p style={{ color: "red" }}>{errMessage}</p> */}
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
        </Dialog >
    )
}

export default AddNewComponent
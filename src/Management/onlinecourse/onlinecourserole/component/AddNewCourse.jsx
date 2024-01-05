import React, { useEffect } from 'react'
import { Button, Drawer, Grid, ThemeProvider } from "@mui/material";
import { FormControl, Input, InputLabel, Stack, Typography, } from "@mui/material";
import Editor from "../../../component/text-editor/Editor";
import { UploadComponent } from "../../../component/upload/Upload";
import { useState } from 'react';
import OnlinecourseManagement from '../../../../services/onlinecourse-management';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify'

export const AddNewCourse = ({ callbackCreateOnlineCourse, renderIndex }) => {
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState(0)
    const [shortDescr, setShortDescr] = useState("")
    const [tempDescr, setTempDescr] = useState('');
    const [picture, setPicture] = useState()
    const [submittedImages, setSubmittedImages] = useState();

    const [errMessage, setErrMessage] = useState(null);

    //handler
    const handleEditorChange = (value) => {
        setTempDescr(value);
    };
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setPicture(files[0]);

        // Create an array of image names from the selected files
        const imageNames = files.map((file) => file.name);
        setSubmittedImages(imageNames);
    };

    //Function
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("Title", title);
        formData.append("ShortDescription", tempDescr);
        formData.append("Price", price)
        formData.append(`Picture`, picture)

        OnlinecourseManagement.postAddCourse(formData)
            .then((res) => {
                // console.log("Submit Successfully", res.data);
                toast.success("Submit Successfully");
                renderIndex(0);
            })
            .catch((e) => {
                // setErrMessage(e.response)
                toast.error("Fail to Submit")
            })
    }


    return (
        <Grid item xs={12}>
            <h2 style={{ textAlign: "center" }}>Create New Online Course</h2>
            <div className="form-container">
                <form
                    onSubmit={handleSubmit}
                    className="form"
                    encType="multipart/form-data"
                >
                    <ToastContainer />
                    <Typography variant="h6" gutterBottom>
                        General information
                    </Typography>
                    <Stack spacing={3} direction="row" sx={{ marginBottom: 4 }}>
                        <FormControl fullWidth required style={{ marginBottom: 10 }}>
                            <InputLabel htmlFor="title">Title</InputLabel>
                            <Input type="text"
                                onChange={(e) => { setTitle(e.target.value); setErrMessage(null) }}
                            />
                        </FormControl>
                        <FormControl fullWidth required variant="outlined">
                            <InputLabel>Price</InputLabel>
                            <Input
                                type="number"
                                step="0.01"
                                onChange={(e) => setPrice(e.target.value)}
                                required
                            />
                        </FormControl>
                    </Stack>
                    <FormControl fullWidth required style={{ marginBottom: 10 }}>
                        <Typography variant="h6" gutterBottom>
                            Short Description
                        </Typography>
                        <Editor
                            onGetHtmlValue={handleEditorChange}
                            htmlValue={shortDescr}
                        />
                    </FormControl>
                    <FormControl required style={{ marginBottom: 15 }}>
                        <Typography variant="h6" gutterBottom>
                            Pictures
                        </Typography>
                            <UploadComponent
                                onChange={handleFileChange}
                                accept="image/*">
                                Upload image
                            </UploadComponent>
                        {/* Display submitted files here */}
                        {/* <div>
                            {submittedImages}
                        </div> */}
                        <p style={{ color: "red" }}>{errMessage}</p>
                    </FormControl>
                    <br />
                    <Button
                        sx={{ float: "right", marginBottom: "20px" }}
                        variant="contained"
                        color="ochre"
                        type="submit"
                    >
                        Create Online Course
                    </Button>
                </form>
            </div>
        </Grid>
    )
}

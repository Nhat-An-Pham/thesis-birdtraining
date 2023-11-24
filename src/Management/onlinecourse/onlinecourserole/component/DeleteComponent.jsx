import React from 'react'
import { Button, Typography, Dialog, DialogContent, DialogTitle, } from "@mui/material";
import { FormControl, Input, InputLabel, Stack } from "@mui/material";
import Editor from "../../../component/text-editor/Editor";
import { UploadComponent } from "../../../component/upload/Upload";
import onlinecourseManagement from '../../../../services/onlinecourse-management';
import { toast } from 'react-toastify';


const DeleteComponent = ({ openDiv, handleCloseDiv, renderIndex, courseId, selectedSection, selectedLesson }) => {

    const handleDeleteSection = () => {
        onlinecourseManagement.deleteSection({ sectionId: selectedSection.id })
            .then((res) => {
                toast.success("Delete Successfully")
                renderIndex(0)
            })
            .catch((e) => {
                toast.error("Cannot Delete")
                console.log("Cannot Delete Section: ", e)
            })
    }

    const handleDeleteLesson = () => {
        onlinecourseManagement.deleteLesson({ lessonId: selectedLesson.id })
        .then((res) => {
            toast.success("Delete Successfully")
        })
        .catch((e) => {
            toast.error("Cannot Delete")
            console.log("Cannot Delete Section: ", e)
        })
    }

    return (
        <Dialog open={openDiv} onClose={handleCloseDiv} >
            {/* ADD NEW */}
            <DialogTitle>
                Do you want to delete this {renderIndex === 0 ? <>section</> : <>lesson</>}:
            </DialogTitle>
            {/* SECTION */}
            {renderIndex === 0 ?
                <DialogContent style={{ width: "100%" }}>
                    <Button color="ochre" variant="contained" onClick={handleCloseDiv}>
                        Cancel
                    </Button>
                    <Button
                        sx={{ float: "right", marginBottom: "20px" }}
                        variant="contained"
                        color="ochre"
                        onClick={handleDeleteSection}
                    >
                        Delete
                    </Button>
                </DialogContent>
                : null}

            {/* LESSON  */}
            {renderIndex === 1 ?
                <DialogContent style={{ width: "100%" }}>
                    <Button color="ochre" variant="contained" onClick={handleCloseDiv}>
                        Cancel
                    </Button>
                    <Button
                        sx={{ float: "right", marginBottom: "20px" }}
                        variant="contained"
                        color="ochre"
                        onClick={handleDeleteLesson}
                    >
                        Delete
                    </Button>
                </DialogContent>
                : null}
        </Dialog >
    )
}

export default DeleteComponent
import React, { useState } from "react";
import {
  Button,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { FormControl, Input, InputLabel, Stack } from "@mui/material";
import Editor from "../../../component/text-editor/Editor";
import { UploadComponent } from "../../../component/upload/Upload";
import onlinecourseManagement from "../../../../services/onlinecourse-management";
import { toast } from "react-toastify";

const UpdateComponent = ({
  openDiv,
  handleCloseDiv,
  renderIndex,
  courseId,
  selectedSection,
  selectedLesson,
  backToIndex,
}) => {
  const [errMessage, setErrMessage] = useState(null);
  const [tempDescription, setTempDescription] = useState("");

  //SECTION
  const handleSubmitSection = (e) => {
    e.preventDefault();
    console.log(sectionTitle);
    const formData = new FormData();
    formData.append("Id", selectedSection.id);
    formData.append("Title", sectionTitle);
    formData.append("Description", tempDescription);
    formData.append("resourceFiles", sectionFile);
    onlinecourseManagement
      .putModifySection(formData)
      .then((res) => {
        console.log("UPDATE SUCCESSFULLY");
        toast.success("Update Successfully");
        backToIndex(0);
      })
      .catch((e) => {
        console.log("Fail to Update", e);
        toast.error("Fail To Update");
      });
  };
  const [sectionTitle, setSectionTitle] = useState();
  const [sectionDescription, setSectionDescription] = useState("");
  const [sectionFile, setSectionFile] = useState();
  const [submittedFile, setSubmittedFile] = useState();

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSectionFile(files[0]);
    const fileName = files.map((title) => title.name);
    setSubmittedFile(fileName);
  };
  const handleEditorChange = (value) => {
    setTempDescription(value);
  };

  //LESSON
  const handleSubmitLesson = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Id", selectedLesson.id);
    formData.append("Title", lessonTitle);
    formData.append("Description", tempDescription);
    formData.append("Video", lessonVideo);
    onlinecourseManagement
      .putModifyLesson(formData)
      .then((res) => {
        console.log("UPDATE SUCCESSFULLY");
        toast.success("Update Successfully");
        backToIndex(0);
      })
      .catch((e) => {
        console.log("Fail to Update", e);
        toast.error("Fail To Update");
      });
  };
  const [lessonTitle, setLessonTitle] = useState();
  const [lessonDescription, setLessonDescription] = useState("");
  const [lessonVideo, setLessonVideo] = useState();
  const [submittedVideo, setSubmittedVideo] = useState();

  const handleVideoChange = (e) => {
    const files = Array.from(e.target.files);
    setLessonVideo(files[0]);
    const fileName = files.map((title) => title.name);
    setSubmittedVideo(fileName);
  };

  return (
    <Dialog open={openDiv} onClose={handleCloseDiv}>
      {/* ADD NEW */}
      <DialogTitle>
        Update {renderIndex === 0 ? <>Section</> : <>Lesson</>}:
      </DialogTitle>
      {/* SECTION */}
      {renderIndex === 0 ? (
        <DialogContent style={{ width: "100%" }}>
          <div className="form-container" style={{ width: "100%" }}>
            <form
              onSubmit={handleSubmitSection}
              className="form"
              encType="multipart/form-data"
              style={{ width: "100%", paddingTop: "20px" }}
            >
              <FormControl fullWidth required style={{ marginBottom: "30px" }}>
                <InputLabel htmlFor="title">Section Title</InputLabel>
                <Input
                  type="text"
                  placeholder={selectedSection.title}
                  onChange={(e) => {
                    setSectionTitle(e.target.value);
                    setErrMessage(null);
                  }}
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
                {/* <Button variant="contained" color="ochre">
                                    <UploadComponent
                                        onChange={handleFileChange}
                                        accept="/*">
                                        Upload Resource File
                                    </UploadComponent>
                                </Button> */}
                {/* <div>
                                    {submittedFile}
                                </div> */}
                <UploadComponent onChange={handleFileChange} accept="/*" multiple={false}>
                  Upload Resource File
                </UploadComponent>
                <p style={{ color: "red" }}>{errMessage}</p>
              </FormControl>
              <br />
              <Button
                sx={{ float: "right", marginBottom: "20px" }}
                variant="contained"
                color="ochre"
                type="submit"
              >
                Update
              </Button>
              <Button
                color="ochre"
                variant="contained"
                onClick={handleCloseDiv}
              >
                Cancel
              </Button>
            </form>
          </div>
        </DialogContent>
      ) : null}

      {/* LESSON  */}
      {renderIndex === 1 ? (
        <DialogContent style={{ width: "100%" }}>
          <div className="form-container" style={{ width: "100%" }}>
            <form
              onSubmit={handleSubmitLesson}
              className="form"
              encType="multipart/form-data"
              style={{ width: "100%", paddingTop: "20px" }}
            >
              <FormControl fullWidth required style={{ marginBottom: "30px" }}>
                <InputLabel htmlFor="title">Lesson Title</InputLabel>
                <Input
                  type="text"
                  placeholder={selectedLesson.title}
                  onChange={(e) => {
                    setLessonTitle(e.target.value);
                    setErrMessage(null);
                  }}
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
                {/* <Button variant="contained" color="ochre">
                  <UploadComponent
                    onChange={handleVideoChange}
                    accept="video/*"
                    multiple={false}
                  >
                    Upload Video
                  </UploadComponent>
                </Button>
                
                <div>{submittedVideo}</div> */}
                <UploadComponent
                    onChange={handleVideoChange}
                    accept="video/*"
                    multiple={false}
                  >
                    Upload Video
                  </UploadComponent>
                <p style={{ color: "red" }}>{errMessage}</p>
              </FormControl>
              <br />
              <Button
                sx={{ float: "right", marginBottom: "20px" }}
                variant="contained"
                color="ochre"
                type="submit"
              >
                Update
              </Button>
              <Button
                color="ochre"
                variant="contained"
                onClick={handleCloseDiv}
              >
                Cancel
              </Button>
            </form>
          </div>
        </DialogContent>
      ) : null}
    </Dialog>
  );
};

export default UpdateComponent;

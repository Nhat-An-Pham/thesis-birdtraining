import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import OnlinecourseService from "../services/onlinecourse.service";
import RawHTMLRenderer from "../Management/component/htmlRender/htmlRender";
import ReactPlayer from "react-player";
import fileIcon from "../assets/icons/file-regular.svg";
import { Button } from "@mui/material";
import { jwtDecode } from "jwt-decode";

const OnlineCourseStudyPage = () => {
  const { courseid } = useParams();
  const [selectedCourse, setSelectedCourse] = useState();
  const [courseSection, setCourseSection] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [checkLesson, setCheckLesson] = useState(null);
  const [lessonStatus, setLessonStatus] = useState(null);

  const navigate = useNavigate();

  //FUNCTION
  const handleSectionClick = (sectionId) => {
    if (sectionId) {
      const foundItem = selectedCourse.sections.find(
        (item) => item.id === sectionId
      );
      setSelectedSection(foundItem);
    }
  };

  const handleLessonClick = (lessonId) => {
    if (lessonId) {
      const foundItem = selectedSection.lessons.find(
        (item) => item.id === lessonId
      );
      // console.log('Lesson: ', foundItem);
      // console.log('Lesson Status: ', foundItem.status);
      setSelectedLesson(foundItem);
      setLessonStatus(foundItem.status);
    }
  };

  const FinishLesson = () => {
    setCheckLesson(selectedLesson.id);
  };

  const FinishSectionWithResourceFile = () => {
    if (selectedSection.resourceFiles) {
      OnlinecourseService.putCheckSection({
        sectionId: selectedSection.id,
      }).then(() => {
        setSelectedSection({ ...selectedSection, status: "Completed" });
        console.log("Finish Section");
      });
    }
  };

  //API Handler
  useEffect(() => {
    if (courseid) {
      OnlinecourseService.getOnlineCourseById({ id: courseid })
        .then((res) => {
          // console.log("Success get Course By Id: ", res.data);
          setSelectedCourse(res.data);
          setCourseSection(res.data.sections);
          if (res.data.status !== "Enrolled") {
            navigate("/courseslist");
          }
        })
        .catch((e) => {
          console.log("Fail Get Course By Id: ", e);
        });
    }
  }, [checkLesson, selectedLesson]);

  useEffect(() => {
    if (checkLesson) {
      OnlinecourseService.putCheckLesson({ lessonId: checkLesson })
        .then(() => {
          console.log(`FINISHED LESSON ${checkLesson}`);
        })
        .catch((e) => {
          console.log(`CANNOT FINISH LESSON ${checkLesson}`, e);
        });
    }
  }, [selectedLesson]);

  return (
    <div className="ocsppage">
      {selectedCourse && courseSection ? (
        <>
          <div className="ocsp-sidebar">
            <h3>{selectedCourse.title}</h3>
            <div className="ocsp-sidebar-box">
              {courseSection.map((section) => (
                <div
                  key={section.id}
                  className="ocsp-sidebar-section"
                  onClick={() => handleSectionClick(section.id)}
                >
                  <h4>{section.title}</h4>
                  {selectedSection ? (
                    <>
                      {selectedSection.id === section.id ? (
                        <div className="ocsp-sidebar-lesson">
                          {section.lessons.map((lesson) => (
                            <p onClick={() => handleLessonClick(lesson.id)}>
                              {lesson.title}
                              {lesson.status === "Completed" ? (
                                <span style={{ color: "#4CAF50" }}>
                                  (Completed)
                                </span>
                              ) : null}
                            </p>
                          ))}
                        </div>
                      ) : null}
                    </>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
          <div className="ocsp-content">
            {selectedSection && selectedSection.resourceFiles ? (
              <>
                <div className="ocsp-content-files">
                  <img src={fileIcon} alt="" />
                  <h4>{selectedSection.resourceFiles.split('/').slice(-1)}</h4>
                </div>
                <Link
                  style={{
                    marginLeft: "20px",
                    padding: "10px",
                    color: "white",
                    textDecoration: "none",
                    backgroundColor: "#C8AE7D",
                  }}
                  to={selectedSection.resourceFiles}
                  target="_blank"
                  download
                >
                  Download
                </Link>
                {/* <Button onClick={FinishSectionWithResourceFile}>Check complete resource files</Button>
                {jwtDecode(JSON.parse(localStorage.getItem('user-token'))).id}  
                {selectedSection.id} */}
              </>
            ) : null}
            {selectedLesson && !selectedSection.resourceFiles ? (
              <>
                {selectedLesson.video ? (
                  <ReactPlayer
                    controls={true}
                    url={selectedLesson.video}
                    width="100%"
                    height="600px"
                  />
                ) : null}
              </>
            ) : null}
            {selectedLesson && !selectedSection.resourceFiles ? (
              <div className="ocsp-content-description">
                {selectedLesson.description ? (
                  <RawHTMLRenderer htmlContent={selectedLesson.description} />
                ) : null}
              </div>
            ) : null}
            <div className="ocsp-content-button">
              {selectedSection && !selectedSection.resourceFiles ? (
                <>
                  {selectedLesson && lessonStatus === "Studying" ? (
                    <button
                      onClick={FinishLesson}
                      style={{ backgroundColor: "#C8AE7D" }}
                    >
                      FINISH
                    </button>
                  ) : null}
                  {selectedLesson && lessonStatus === "Completed" ? (
                    <button>Completed</button>
                  ) : null}
                </>
              ) : (
                <>
                  {selectedSection && selectedSection.status !== "Completed" ? (
                    <button
                      onClick={FinishSectionWithResourceFile}
                      style={{ backgroundColor: "#C8AE7D" }}
                    >
                      FINISH
                      {/*{selectedSection.status} */}
                    </button>
                  ) : (
                    // <button style={{ backgroundColor: "#C8AE7D" }}>
                    //   FINISH
                    // </button>
                    <button>Completed</button>
                  )}
                </>
              )}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default OnlineCourseStudyPage;

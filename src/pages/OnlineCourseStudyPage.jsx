import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import OnlinecourseService from '../services/onlinecourse.service';
import RawHTMLRenderer from '../Management/component/htmlRender/htmlRender';
import ReactPlayer from 'react-player'

const OnlineCourseStudyPage = () => {
  const { courseid } = useParams();
  const [selectedCourse, setSelectedCourse] = useState()
  const [courseSection, setCourseSection] = useState([])
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null)

  const navigate = useNavigate();

  //FUNCTION
  const handleSectionClick = (sectionId) => {
    if (sectionId) {
      const foundItem = selectedCourse.sections.find(item => item.id === sectionId);
      setSelectedSection(foundItem);
    }
  }

  const handleLessonClick = (lessonId) => {
    if (lessonId) {
      const foundItem = selectedSection.lessons.find(item => item.id === lessonId);
      console.log('Lesson: ', foundItem)
      setSelectedLesson(foundItem)
    }
  }

  //API Handler
  useEffect(() => {
    if (courseid) {
      OnlinecourseService.getOnlineCourseById({ id: courseid })
        .then((res) => {
          console.log("Success get Course By Id: ", res.data);
          setSelectedCourse(res.data)
          setCourseSection(res.data.sections)
          if (res.data.status !== "Enrolled") {
            navigate("/courseslist")
          }
        })
        .catch((e) => {
          console.log("Fail Get Course By Id: ", e)
        })
    }
  }, [])

  useEffect(() => {
    OnlinecourseService.putCheckLesson({})
  })



  return (
    <div className='ocsppage'>
      {(selectedCourse && courseSection) ?
        <>
          <div className='ocsp-sidebar'>
            <h3>{selectedCourse.title}</h3>
            <div className='ocsp-sidebar-box'>
              {courseSection.map((section) => (
                <div key={section.id} className='ocsp-sidebar-section' onClick={() => handleSectionClick(section.id)}>
                  <h4>{section.title}</h4>
                  {selectedSection ?
                    <>
                      {(selectedSection.id === section.id) ?
                        <div className='ocsp-sidebar-lesson'>
                          {section.lessons.map((lesson) => (
                            <p onClick={() => handleLessonClick(lesson.id)}>{lesson.title}</p>
                          ))}
                        </div>
                        : null}
                    </>
                    : null}
                </div>
              ))}
            </div>
          </div>
          <div className='ocsp-content'>
            {selectedLesson ?
              <>
                {selectedLesson.video ?
                  <ReactPlayer controls={true} url={selectedLesson.video} width="100%" height="600px" />
                  : null}
              </>
              : null}
            {selectedLesson ?
              <div className='ocsp-content-description'>
                {selectedLesson.description ?
                  <RawHTMLRenderer htmlContent={selectedLesson.description} />
                  : null}
              </div>
              : null}
            <div className='ocsp-content-button'>
              <button>Complete</button>
            </div>
          </div>
        </>
        : null}
    </div>
  )
}

export default OnlineCourseStudyPage
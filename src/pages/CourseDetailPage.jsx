import React, { useState } from 'react';

function CourseDetailPage() {
  const [course, setCourse] = useState({
    title: 'Course Number 1',
    sessions: [
      {
        title: 'Session 1',
        completed: false,
        lessons: [
          { title: 'Lesson 1', completed: false, content: 'Content of lesson 1' },
          { title: 'Lesson 2', completed: false, content: 'Content of lesson 2' },
        ],
      },
      {
        title: 'Session 2',
        completed: false,
        lessons: [
          { title: 'Lesson 3', completed: false, content: 'Content of lesson 3' },
          { title: 'Lesson 4', completed: false, content: 'Content of lesson 4' },
        ],
      },
    ],
  });

  const [selectedSession, setSelectedSession] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [showLessonDetail, setShowLessonDetail] = useState(false);

  const handleSessionClick = (sessionIndex) => {
    setSelectedSession(sessionIndex);
    setSelectedLesson(null);
    setShowLessonDetail(false);
  };

  const handleLessonClick = (lessonIndex) => {
    setSelectedLesson(lessonIndex);
    setShowLessonDetail(true);
  };

  const handleCompleteLesson = () => {
    // Đánh dấu bài học hoàn thành
    const session = course.sessions[selectedSession];
    const lesson = session.lessons[selectedLesson];
    lesson.completed = true;

    // Kiểm tra xem tất cả bài học trong session đã hoàn thành chưa
    const allLessonsCompleted = session.lessons.every((lesson) => lesson.completed);

    if (allLessonsCompleted) {
      // Nếu tất cả bài học trong session đã hoàn thành, đánh dấu session hoàn thành
      session.completed = true;
    }
  };

  const getSessionContent = () => {
    if (selectedSession !== null) {
      const session = course.sessions[selectedSession];
      return (
        <div className='cdtp_sidebar_lesson'>
          <h2>{session.title}</h2>
          <ul>
            {session.lessons.map((lesson, index) => (
              <li key={index} onClick={() => handleLessonClick(index)}>
                <p>{lesson.title} </p>
                {lesson.completed ? (
                  <span style={{ color: 'green' }}>  ✔</span>
                ) : ""}
              </li>
            ))}
          </ul>
          {showLessonDetail === true ? (
            <button onClick={handleCompleteLesson} style={{backgroundColor: 'green'}}>
              {session.completed ? (
                <span style={{ color: 'white' }}>  ✔</span>
              ) : (
                'Complete'
              )}
            </button>
          ) : ""
          }
        </div>
      );
    }
    return null;
  };

  const getLessonContent = () => {
    if (selectedLesson !== null) {
      const lesson = course.sessions[selectedSession].lessons[selectedLesson];
      return (
        <div className='cdtp_content-wrapper'>
          <h2>{lesson.title}</h2>
          <p>{lesson.content}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className='coursedetailpage'>
      <h1>{course.title}</h1>
      <div className='cdtp_container'>
        <div className='cdtp_sidebar'>
          <h2>Sessions</h2>
          <ul>
            {course.sessions.map((session, index) => (
              <li key={index} onClick={() => handleSessionClick(index)} >
                <span>{session.title} </span>
                {session.completed ? (
                  <span style={{ color: 'green' }}> ✔</span>
                ) : ""}
              </li>
            ))}
          </ul>
          {selectedSession !== null && getSessionContent()}
        </div>
        <div className='cdtp_content'>
          {showLessonDetail && getLessonContent()}
        </div>
      </div>
    </div>
  );
}

export default CourseDetailPage;

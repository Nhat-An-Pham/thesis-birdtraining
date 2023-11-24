import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import OnlinecourseService from '../services/onlinecourse.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { jwtDecode } from 'jwt-decode';
import RawHTMLRenderer from '../Management/component/htmlRender/htmlRender';

function CourseDetailPage() {

  const { courseid } = useParams();
  const [selectedCourse, setSelectedCourse] = useState();
  const navigate = useNavigate();


  const accessToken = JSON.parse(localStorage.getItem('user-token'))
  let userRole = null;
  if (accessToken) {
    userRole = jwtDecode(accessToken).role;
  }


  if (userRole === "Customer" || userRole === null) {
  } else {
    navigate('/courses')
  }

  //API Handler
  useEffect(() => {
    OnlinecourseService.getOnlineCourseById({ id: courseid })
      .then((res) => {
        console.log("Success get Course By Id: ", res.data);
        setSelectedCourse(res.data)
      })
      .catch((e) => {
        console.log("Fail Get Course By Id: ", e)
      })
  }, [])


  // Content NAVBAR
  const [contentButton, setContentButton] = useState("1");

  const contentNav = [
    {
      id: "1",
      name: "Overview"
    }, {
      id: "2",
      name: "Course Content"
    }, {
      id: 3,
      name: "Instructor"
    }
  ]

  //FUNCTION
  const handleBuyButton = () => {
    if (selectedCourse && accessToken) {
      const oclassid = selectedCourse.id;
      navigate(`/payment/online/${oclassid}`);
    } else {
      navigate("/login")
    }
  }

  const handleStudyButton = () => {
    navigate(`/onlinecourse/study/${courseid}`)
  }


  return (

    <div className='coursedetailpage'>
      {selectedCourse ?
        <div className='cdtp_container'>
          <div className='cdtp_wrapper'>
            <div className='cdtp_sidebar'>
              <h3 className='cdtp_sidebar-title'>{selectedCourse.title} </h3>
              <p className='cdtp_sidebar-price'>Price: {selectedCourse.price}$</p>
              {selectedCourse.status === "Unenrolled" ? <button onClick={handleBuyButton}>Enroll Now</button>
                : null}
              {selectedCourse.status === "Enrolled" ? <button onClick={handleStudyButton}>Study</button> : null}
              <div className='cdtp_sidebar-skill'>
                <div className='cdtp_sidebar-skill-skillbox'>
                  <p className='cdtp_sidebar-skill-skillbox-first'>Skill level</p>
                  <p className='cdtp_sidebar-skill-skillbox-second'>Basic</p>
                </div>
                <div className='cdtp_sidebar-skill-skillbox'>
                  <p className='cdtp_sidebar-skill-skillbox-first'>Enrolled</p>
                  <p className='cdtp_sidebar-skill-skillbox-second'>100</p>
                </div>

              </div>
              <div className='cdtp_sidebar-footer'>
                <p>For Details About The Course</p>
                <button>Call Us: (+84) 90 456 0264</button>
              </div>
            </div>
            <div className='cdtp_content'>
              <div className='cdtp_content-descr'>
                <section className='cdpt_content_descr-box'>
                  <h4>What You'll Learn</h4>
                  <p><RawHTMLRenderer htmlContent={selectedCourse.shortDescription} /></p>
                </section>
                <section className='cdpt_content_descr-box'>
                  <h4>Some Images Of The Course</h4>
                  <img alt='Course Picture' src={selectedCourse.picture}></img>
                </section>
                <section className='cdpt_content_descr-box'>
                  <h4>Requirements</h4>
                  <div className='cdpt_content_descr_box-req-body'>
                    <FontAwesomeIcon icon="fa-solid fa-check" style={{ color: "#2fda3a", }} />
                    <p>Become an advanced, confident, and modern JavaScript developer from scratch.</p>
                    <FontAwesomeIcon icon="fa-solid fa-check" style={{ color: "#2fda3a", }} />
                    <p> Have an intermediate skill level of Python programming.</p>
                    <FontAwesomeIcon icon="fa-solid fa-check" style={{ color: "#2fda3a", }} />
                    <p> Have a portfolio of various data analysis projects.</p>
                    <FontAwesomeIcon icon="fa-solid fa-check" style={{ color: "#2fda3a", }} />
                    <p> Use the numpy library to create and manipulate arrays.</p>
                  </div>
                </section>
              </div>
            </div>

          </div>
        </div> : null
      }
    </div>
  );
}

export default CourseDetailPage;

import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import OnlinecourseService from "../services/onlinecourse.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { jwtDecode } from "jwt-decode";
import RawHTMLRenderer from "../Management/component/htmlRender/htmlRender";
import addonService from "../services/addon.service";

function CourseDetailPage() {
  const { courseid } = useParams();
  const [selectedCourse, setSelectedCourse] = useState();
  const navigate = useNavigate();

  const accessToken = JSON.parse(localStorage.getItem("user-token"));
  let userRole = null;
  if (accessToken) {
    userRole = jwtDecode(accessToken).role;
  }

  if (userRole === "Customer" || userRole === null) {
  } else {
    navigate("/courses");
  }

  //API Handler
  useEffect(() => {
    OnlinecourseService.getOnlineCourseById({ id: courseid })
      .then((res) => {
        console.log("Success get Course By Id: ", res.data);
        setSelectedCourse(res.data);
      })
      .catch((e) => {
        console.log("Fail Get Course By Id: ", e);
      });
  }, []);

  // Content NAVBAR
  const [contentButton, setContentButton] = useState("1");

  const contentNav = [
    {
      id: "1",
      name: "Overview",
    },
    {
      id: "2",
      name: "Course Content",
    },
    {
      id: 3,
      name: "Instructor",
    },
  ];

  //FUNCTION
  const handleBuyButton = () => {
    if (selectedCourse && accessToken) {
      const oclassid = selectedCourse.id;
      navigate(`/payment/online/${oclassid}`);
    } else {
      navigate("/login");
    }
  };

  const handleStudyButton = () => {
    navigate(`/onlinecourse/study/${courseid}`);
  };

  return (
    <div
      style={{
        // minHeight: "76.5vh",
        // display: "flex",
      }}
    >
      <div className="coursedetailpage">
        {selectedCourse ? (
          <div className="cdtp_container">
            <div className="cdtp_wrapper">
              <div className="cdtp_sidebar">
                <h3 className="cdtp_sidebar-title">{selectedCourse.title} </h3>
                {selectedCourse.status === "Completed" ? (
                  <p style={{ color: "green", margin: 0 }}>(Completed)</p>
                ) : null}
                <p className="cdtp_sidebar-price">
                  Price: {addonService.formatCurrency(selectedCourse.price)} VND
                </p>
                {selectedCourse.status === "Unenrolled" ? (
                  <button onClick={handleBuyButton}>Enroll Now</button>
                ) : null}
                {selectedCourse.status === "Enrolled" ||
                selectedCourse.status === "Completed" ? (
                  <button onClick={handleStudyButton}>Study</button>
                ) : null}
                {selectedCourse.status === "Completed" ? (
                  <>
                    <Link
                      to={`/onlinecourse/certificate/${selectedCourse.id}`}
                      style={{ color: "black" }}
                    >
                      View Certificate
                    </Link>
                  </>
                ) : null}

                <div className="cdtp_sidebar-skill">
                  <div className="cdtp_sidebar-skill-skillbox">
                    <p className="cdtp_sidebar-skill-skillbox-first">
                      Skill level
                    </p>
                    <p className="cdtp_sidebar-skill-skillbox-second">Basic</p>
                  </div>
                  <div className="cdtp_sidebar-skill-skillbox">
                    <p className="cdtp_sidebar-skill-skillbox-first">
                      Enrolled
                    </p>
                    <p className="cdtp_sidebar-skill-skillbox-second">100</p>
                  </div>
                </div>
                <div className="cdtp_sidebar-footer">
                  <p>For Details About The Course</p>
                  <button>Call Us: (+84) 904 560 264</button>
                </div>
              </div>
              <div className="cdtp_content">
                <div className="cdtp_content-descr">
                  <section className="cdpt_content_descr-box">
                    <h4>About course</h4>
                    <p>
                      <RawHTMLRenderer
                        htmlContent={selectedCourse.shortDescription}
                      />
                    </p>
                  </section>
                  <section className="cdpt_content_descr-box">
                    <h4>Some Images Of The Course</h4>
                    <img
                      alt="course"
                      src={selectedCourse.picture}
                    ></img>
                  </section>                  
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default CourseDetailPage;

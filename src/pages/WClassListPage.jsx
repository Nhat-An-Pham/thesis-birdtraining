import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import dateFormat from "dateformat";
// import workshopsData from '../assets/fakedb/workshops'
import { Link } from "react-router-dom";
import WorkshopService from "../services/workshop.service";
import { useNavigate } from "react-router-dom";
import RawHTMLRenderer from "../Management/component/htmlRender/htmlRender";
import { Divider, Typography } from "@mui/material";
import StopIcon from "@mui/icons-material/Stop";

const WClassListPage = () => {
  //param
  const { workshopid } = useParams();
  const [workshopList, setWorkshopList] = useState([]);
  const [classData, setClassData] = useState([]);
  const [classId, setClassId] = useState([]);

  const accessToken = localStorage.getItem("user-token");

  // API
  useEffect(() => {
    //get classes by WorkshopId

    const apiFunction = async () => {
      const apiorderhandler = await // get class Data
      WorkshopService.getClasses({ id: workshopid });
      console.log("Get class by workshopId: ", apiorderhandler.data);
      setClassData(apiorderhandler.data);

      //get workshop by WorkshopID
      WorkshopService.getWorkshopById({ id: workshopid })
        .then((res) => {
          // console.log("Success WorkShopByID Test:", res.data);
          setWorkshopList(res.data);
        })
        .catch((e) => console.log("Fail WorkShopByID Test:", e));
    };

    //make the call
    apiFunction();
  }, []);

  //Handler
  //OPEN DIV
  const [isDivVisible, setIsDivVisible] = useState(false);
  const handleButtonOpenDivClick = () => {
    setIsDivVisible(true);
  };
  const handleCloseDiv = () => {
    setIsDivVisible(false);
  };

  //Set Enroll
  const navigate = useNavigate();
  const handleEnroll = (event) => {
    // console.log(event);
    if (accessToken) {
      navigate(`/payment/workshop/${event}`);
    } else {
      navigate("/login");
    }
  };

  //Select Class
  const [selectedClass, setSelectedClass] = useState(null);

  const handleWorkshopClick = (classesssss) => {
    setSelectedClass(classesssss);
    // console.log(selectedClass)
  };

  const twoFunctionOnClick = (classesssss) => {
    handleWorkshopClick(classesssss);
    handleButtonOpenDivClick();
  };

  return (
    <div
      style={{
        minHeight: "76.5vh",
        display: "flex",
      }}
    >
      {workshopList ? (
        <div className="wclasslistpage">
          {isDivVisible && (
            // Popup
            <div className="wclpdiv-background">
              <div className="wclpdiv-container">
                <h2
                  className="wclpdiv_section wclpdiv_section-title"
                  style={{ fontSize: "25px" }}
                >
                  {workshopList.title}
                </h2>
                {/* <p className='wclpdiv_section wclpdiv_section-title' style={{ fontSize: "20px" }}>Date: <span style={{ color: "red", fontSize: "20px" }}>{dateFormat(selectedClass.date, "mmmm dS, yyyy")}</span></p> */}
                <div className="wclpdiv_section wclpdiv_section-mapping">
                  {selectedClass.classSlots.map((workshopClass) => (
                    <>
                      <div className="wclpdiv_section_mapping-container">
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            padding: "15px",
                            marginTop: '15px'
                          }}
                          key={workshopClass.id}
                        >
                          {/* trainer image and name */}
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                            }}
                          >
                            {workshopClass.trainer.avatar ? (
                              <img
                                src={workshopClass.trainer.avatar}
                                alt=""
                                style={{
                                  width: "200px",
                                  height: "200px",
                                  borderRadius: 9999,
                                }}
                              />
                            ) : null}
                            <p>
                              <span
                                style={{
                                  fontWeight: 600,
                                  fontSize: 18,
                                  marginRight: 5,
                                }}
                              >
                                Trainer:
                              </span>
                              {workshopClass.trainer.name}
                            </p>
                          </div>

                          {/* description and start time slot  */}
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              marginLeft: "20px",
                              maxWidth: '660px',
                              width: '660px'
                            }}
                          >
                            <div className="wclpdiv_content wclpdiv_content-detail ">
                              <span style={{ fontWeight: 700, fontSize: 18 }}>
                                Description:
                              </span>
                              <RawHTMLRenderer
                                htmlContent={workshopClass.detail}
                              />
                            </div>

                            <div
                              className="wclpdiv_content wclpdiv_content-registered"
                              style={{
                                marginTop: "20px",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-end",
                                alignItems: "center",
                              }}
                            >
                              <span
                                style={{
                                  fontWeight: 700,
                                  fontSize: 18,
                                  marginRight: "10px",
                                  color: "green",
                                }}
                              >
                                Start-Time:
                              </span>
                              <span
                                style={{
                                  fontWeight: 500,
                                  fontSize: 18,
                                }}
                              >
                                {workshopClass.startTime} /
                              </span>
                              <span
                                style={{
                                  fontWeight: 700,
                                  fontSize: 18,
                                  marginRight: "10px",
                                  color: "red",
                                }}
                              >
                                End-Time:
                              </span>
                              <span
                                style={{
                                  fontWeight: 500,
                                  fontSize: 18,
                                }}
                              >
                                {workshopClass.endTime}
                              </span>
                            </div>

                            <div
                              style={{
                                marginTop: "15px",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-end",
                                alignItems: "center",
                              }}
                            >
                              <span
                                style={{
                                  fontWeight: 700,
                                  fontSize: 18,
                                  marginRight: "10px",
                                }}
                              >
                                Date:
                              </span>
                              <span
                                style={{
                                  fontWeight: 500,
                                  fontSize: 18,
                                }}
                              >
                                {dateFormat(
                                  workshopClass.date,
                                  "mmmm dS, yyyy"
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Divider />
                    </>
                  ))}
                </div>
                <div className="wclpdiv_section wclpdiv_section-button">
                  <button
                    className="wclpdiv_section_button-close"
                    onClick={handleCloseDiv}
                  >
                    Close
                  </button>
                  {!selectedClass.status ? (
                    <button
                      className="wclpdiv_section_button-enroll"
                      onClick={() => handleEnroll(selectedClass.id)}
                    >
                      ENROLL NOW
                    </button>
                  ) : (
                    <p style={{ color: "red" }}>You Have Enrolled This Class</p>
                  )}
                </div>
              </div>
            </div>
          )}

          <h1 className="wclp_section wclp_section-title">
            {" "}
            {workshopList.title}{" "}
          </h1>
          {classData ? (
            <div className="wclp_section wclp_section-cards">
              {classData.map((classeses, index) => (
                <Link
                  key={index}
                  className="wclp_card-container"
                  onClick={() => twoFunctionOnClick(classeses)}
                >
                  <div className="wclp_card_section wclp_card_section-bottom">
                    <h2>Location: {classeses.location}</h2>
                    {/* <h5>Register Start Date: {dateFormat(classeses.startTime, "mmmm dS, yyyy")}</h5><br /> */}
                    <div style={{ marginTop: 10 }}>
                      <p>
                        Register End Date:{" "}
                        <span>
                          {" "}
                          {dateFormat(
                            classeses.registerEndDate,
                            "mmmm dS, yyyy"
                          )}
                        </span>
                      </p>
                      <p>
                        Registered: {classeses.registered.registered}/
                        {classeses.registered.maximum}
                      </p>
                    </div>
                    {/* Hỏi về cái class status có bao nhiêu status  */}
                    {classeses.classStatus === "OpenRegistration" ? (
                      <p
                        style={{
                          color: "green",
                          marginTop: "30px",
                          fontSize: 18,
                        }}
                      >
                        <StopIcon /> Open For Registration
                      </p>
                    ) : null}
                    {classeses.classStatus === "CloseRegistration" ? (
                      <p style={{ color: "red", marginTop: "30px" }}>
                        <StopIcon /> Registration closed
                      </p>
                    ) : null}
                  </div>
                  <div className="wclp_card_section wclp_card_section-top">
                    <div className="wclp_card_section_top wclp_card_section_top-button">
                      <button onClick={() => twoFunctionOnClick(classeses)}>
                        Enroll now
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <>
              <Typography>This Workshop has no class yet</Typography>
            </>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default WClassListPage;

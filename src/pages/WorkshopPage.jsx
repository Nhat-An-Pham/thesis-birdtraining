import React from "react";
import Cards from "../components/cards/WorkshopClassListCards";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import WorkshopService from "../services/workshop.service";
// import workshops from '../assets/fakedb/workshops'
import dateFormat from "dateformat";
import { Typography } from "@mui/material";
import StopIcon from "@mui/icons-material/Stop";
import RawHTMLRenderer from "../Management/component/htmlRender/htmlRender";

const Workshop = () => {
  const accessToken = JSON.parse(localStorage.getItem("user-token"));

  const [workshopList, setWorkshopList] = useState([]);
  const [registeredClasses, setRegisteredClasses] = useState([]);
  //take first 4 workshops
  const sliceWorkshop = workshopList.slice(0, 4);
  const token = JSON.parse(localStorage.getItem("user-token"));
  useEffect(() => {
    WorkshopService.getWorkshopList()
      .then((res) => {
        // console.log("success workshop list test", res.data);
        setWorkshopList(res.data.slice(0, 4));
      })
      .catch((e) => console.log("fail workshop list test", e));
    WorkshopService.getRegisterdClasses()
      .then((res) => {
        console.log("egister classed", res.data);
        setRegisteredClasses(res.data);
      })
      .catch((e) => {
        console.log("Cannot Get Registered Classes", e);
      });
  }, []);

  const [isDivVisible, setIsDivVisible] = useState(false);
  const handleButtonOpenDivClick = () => {
    setIsDivVisible(true);
  };
  const handleCloseDiv = () => {
    setIsDivVisible(false);
  };
  const [selectedClass, setSelectedClass] = useState(null);
  const handleWorkshopClick = (classesssss) => {
    setSelectedClass(classesssss);
    // console.log(selectedClass)
  };

  const twoFunctionOnClick = (classesssss) => {
    handleWorkshopClick(classesssss);
    handleButtonOpenDivClick();
  };

  console.log("workshop.description", sliceWorkshop);

  const getOnGoingClass = registeredClasses.filter(
    (val) => val.classStatus === "OnGoing"
  );

  const getCloseRegistrationClass = registeredClasses.filter(
    (val) => val.classStatus === "CloseRegistration"
  );

  const getOpenRegistrationClass = registeredClasses.filter(
    (val) => val.classStatus === "OpenRegistration"
  );

  const getCompletedClass = registeredClasses.filter(
    (val) => val.classStatus === "Completed"
  );

  const getCancelledClass = registeredClasses.filter(
    (val) => val.classStatus === "Cancelled"
  );

  return (
    <div className="workshopspage">
      {/* carousel */}
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
            <p
              className="wclpdiv_section wclpdiv_section-title"
              style={{ fontSize: "20px" }}
            >
              Date:{" "}
              <span style={{ color: "red", fontSize: "20px" }}>
                {dateFormat(selectedClass.date, "mmmm dS, yyyy")}
              </span>
            </p>

            <div className="wclpdiv_section wclpdiv_section-mapping">
              {selectedClass.classSlots.map((workshopClass) => (
                <div className="wclpdiv_section_mapping-container">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      padding: "15px",
                      marginTop: "15px",
                    }}
                    key={workshopClass.id}
                  >
                    {/* trainer name and image */}
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
                        maxWidth: "660px",
                        width: "630px",
                      }}
                    >
                      <div className="wclpdiv_content wclpdiv_content-detail ">
                        <span style={{ fontWeight: 700, fontSize: 18 }}>
                          Description:
                        </span>
                        <RawHTMLRenderer htmlContent={workshopClass.detail} />
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
                          {dateFormat(workshopClass.date, "mmmm dS, yyyy")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div
              className="wclpdiv_section wclpdiv_section-button"
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <button
                className="wclpdiv_section_button-close"
                onClick={handleCloseDiv}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="workshoppage_section workshoppage_section-carousel">
        <div className="workshoppage_carousel">
          <div className="workshoppage_carousel_section workshoppage_carousel_section-text">
            <h1>COME TO OUR WORKSHOP</h1>
            <h5>Event every weekend</h5>
          </div>
          <div class="workshoppage_carousel_section-curve"></div>

          <div className="workshoppage_carousel_section workshoppage_carousel_section-button">
            {!token && (
              <Link to="/signup">
                <button>Join for free</button>
              </Link>
            )}
          </div>
          <div className="workshoppage_carousel_section ocp_carousel_section-video">
            <img src={require("../assets/pages/ocp/ocp_carousel.jpg")} alt="" />
          </div>
        </div>
      </div>
      {/* events */}
      <div className="workshoppage_section workshoppage_section-events">
        <div className="workshoppageevents_elements workshoppageevents_elements-title ">
          <p>Top of our categories</p>
          <h2>Explore our popular Workshops</h2>
        </div>
        <div className="workshoppageevents_elements workshoppageevents_elements-cards">
          {sliceWorkshop.map((workshop) => (
            <Cards
              id={workshop.id}
              title={workshop.title}
              key={workshop.id}
              thumbnail={workshop.picture.split(",")[0]}
              shortdescr={workshop.description}
              price={workshop.price}
            ></Cards>
          ))}
        </div>
        {accessToken ? (
          <Link to="/setting" style={{ color: "grey" }}>
            Click Here To View Your Workshop
          </Link>
        ) : null}
        <div className="workshoppageevents_elements-button">
          <Link to="/workshopslist">VIEW MORE</Link>
        </div>
      </div>
      {/* registerd class */}
      <div className="workshoppage_section workshoppage_section-registered">
        <div
          className="workshoppageevents_elements workshoppageevents_elements-title "
          style={{ width: "100%" }}
        >
          <h2>Your Registered Workshop Classes</h2>
        </div>
        <div
          className="workshoppageevents_elements workshoppageevents_elements-cards"
          style={{ width: "100%" }}
        >
          {/* on-going class */}
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              backgroundColor: "#F7F7F7",
              padding: "10px 25px",
              marginBottom: "50px",
            }}
          >
            <h2>On going</h2>
            {getOnGoingClass.length > 0 ? (
              <div
                className="wclp_section wclp_section-cards"
                style={{
                  width: "100%",
                  backgroundColor: " #F7F7F7",
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  margin: 0,
                  padding: 0,
                }}
              >
                {getOnGoingClass.map((classeses, index) => (
                  <Link
                    key={index}
                    className="wclp_card-container"
                    onClick={() => twoFunctionOnClick(classeses)}
                  >
                    <div className="wclp_card_section wclp_card_section-bottom">
                      <h2>Location: {classeses.location}</h2>
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
                      <br />
                      <div>
                        Status:{" "}
                        {classeses.classStatus === "Completed" && (
                          <span
                            style={{
                              fontSize: 15,
                              fontWeight: 600,
                              color: "green",
                            }}
                          >
                            {classeses.classStatus}
                          </span>
                        )}
                        {classeses.classStatus === "Cancelled" && (
                          <span
                            style={{
                              fontSize: 15,
                              fontWeight: 600,
                              color: "red",
                            }}
                          >
                            {classeses.classStatus}
                          </span>
                        )}
                        {(classeses.classStatus === "OnGoing" ||
                          classeses.classStatus === "CloseRegistration" ||
                          classeses.classStatus === "OpenRegistration") && (
                          <span style={{ fontSize: 15, fontWeight: 600 }}>
                            {classeses.classStatus}
                          </span>
                        )}
                      </div>
                      {/* <p>Registered: {classeses.registered.registered}/{classeses.registered.maximum}</p> */}
                      {/* Hỏi về cái class status có bao nhiêu status  */}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div
                style={{
                  width: "100%",
                  marginBottom: "50px",
                  display: "flex",
                  justifyContent: "center",
                  fontSize: 16,
                  fontWeight: 600,
                }}
              >
                This Workshop has no class yet
              </div>
            )}
          </div>
          {/* getCloseRegistrationClass */}
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              marginBottom: "50px",
              backgroundColor: "#F7F7F7",
              padding: "10px 25px",
            }}
          >
            <h2>Close Registration</h2>
            {getCloseRegistrationClass.length > 0 ? (
              <>
                <div
                  className="wclp_section wclp_section-cards"
                  style={{
                    width: "100%",
                    backgroundColor: " #F7F7F7",
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    margin: 0,
                    padding: 0,
                  }}
                >
                  {getCloseRegistrationClass.map((classeses, index) => (
                    <Link
                      key={index}
                      className="wclp_card-container"
                      onClick={() => twoFunctionOnClick(classeses)}
                    >
                      <div className="wclp_card_section wclp_card_section-bottom">
                        <h2>Location: {classeses.location}</h2>
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
                        <br />
                        <div>
                          Status:{" "}
                          {classeses.classStatus === "Completed" && (
                            <span
                              style={{
                                fontSize: 15,
                                fontWeight: 600,
                                color: "green",
                              }}
                            >
                              {classeses.classStatus}
                            </span>
                          )}
                          {classeses.classStatus === "Cancelled" && (
                            <span
                              style={{
                                fontSize: 15,
                                fontWeight: 600,
                                color: "red",
                              }}
                            >
                              {classeses.classStatus}
                            </span>
                          )}
                          {(classeses.classStatus === "OnGoing" ||
                            classeses.classStatus === "CloseRegistration" ||
                            classeses.classStatus === "OpenRegistration") && (
                            <span style={{ fontSize: 15, fontWeight: 600 }}>
                              {classeses.classStatus}
                            </span>
                          )}
                        </div>
                        {/* <p>Registered: {classeses.registered.registered}/{classeses.registered.maximum}</p> */}
                        {/* Hỏi về cái class status có bao nhiêu status  */}
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "50px",
                  fontSize: 16,
                  fontWeight: 600,
                }}
              >
                This Workshop has no class yet
              </div>
            )}
          </div>
          {/* getOpenRegistrationClass */}
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              backgroundColor: "#F7F7F7",
              marginBottom: "50px",
              padding: "10px 25px",
            }}
          >
            <h2>Open Registration</h2>
            {getOpenRegistrationClass.length > 0 ? (
              <div
                className="wclp_section wclp_section-cards"
                style={{
                  width: "100%",
                  backgroundColor: " #F7F7F7",
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  margin: 0,
                  padding: 0,
                }}
              >
                {getOpenRegistrationClass.map((classeses, index) => (
                  <Link
                    key={index}
                    className="wclp_card-container"
                    onClick={() => twoFunctionOnClick(classeses)}
                  >
                    <div className="wclp_card_section wclp_card_section-bottom">
                      <h2>Location: {classeses.location}</h2>
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
                      <br />
                      <div>
                        Status:{" "}
                        {classeses.classStatus === "Completed" && (
                          <span
                            style={{
                              fontSize: 15,
                              fontWeight: 600,
                              color: "green",
                            }}
                          >
                            {classeses.classStatus}
                          </span>
                        )}
                        {classeses.classStatus === "Cancelled" && (
                          <span
                            style={{
                              fontSize: 15,
                              fontWeight: 600,
                              color: "red",
                            }}
                          >
                            {classeses.classStatus}
                          </span>
                        )}
                        {(classeses.classStatus === "OnGoing" ||
                          classeses.classStatus === "CloseRegistration" ||
                          classeses.classStatus === "OpenRegistration") && (
                          <span style={{ fontSize: 15, fontWeight: 600 }}>
                            {classeses.classStatus}
                          </span>
                        )}
                      </div>
                      {/* <p>Registered: {classeses.registered.registered}/{classeses.registered.maximum}</p> */}
                      {/* Hỏi về cái class status có bao nhiêu status  */}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  marginBottom: "50px",
                  justifyContent: "center",
                  fontSize: 16,
                  fontWeight: 600,
                }}
              >
                This Workshop has no class yet
              </div>
            )}
          </div>
          {/* getCompletedClass */}
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              backgroundColor: "#F7F7F7",
              marginBottom: "50px",
              padding: "10px 25px",
            }}
          >
            <h2>Completed</h2>
            {getCompletedClass.length > 0 ? (
              <div
                className="wclp_section wclp_section-cards"
                style={{
                  width: "100%",
                  backgroundColor: " #F7F7F7",
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  margin: 0,
                  padding: 0,
                }}
              >
                {getCompletedClass.map((classeses, index) => (
                  <Link
                    key={index}
                    className="wclp_card-container"
                    onClick={() => twoFunctionOnClick(classeses)}
                  >
                    <div className="wclp_card_section wclp_card_section-bottom">
                      <h2>Location: {classeses.location}</h2>
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
                      <br />
                      <div>
                        Status:{" "}
                        {classeses.classStatus === "Completed" && (
                          <span
                            style={{
                              fontSize: 15,
                              fontWeight: 600,
                              color: "green",
                            }}
                          >
                            {classeses.classStatus}
                          </span>
                        )}
                        {classeses.classStatus === "Cancelled" && (
                          <span
                            style={{
                              fontSize: 15,
                              fontWeight: 600,
                              color: "red",
                            }}
                          >
                            {classeses.classStatus}
                          </span>
                        )}
                        {(classeses.classStatus === "OnGoing" ||
                          classeses.classStatus === "CloseRegistration" ||
                          classeses.classStatus === "OpenRegistration") && (
                          <span style={{ fontSize: 15, fontWeight: 600 }}>
                            {classeses.classStatus}
                          </span>
                        )}
                      </div>
                      {/* <p>Registered: {classeses.registered.registered}/{classeses.registered.maximum}</p> */}
                      {/* Hỏi về cái class status có bao nhiêu status  */}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  marginBottom: "50px",
                  justifyContent: "center",
                  fontSize: 16,
                  fontWeight: 600,
                }}
              >
                This Workshop has no class yet
              </div>
            )}
          </div>
          {/* getCancelledClass */}
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              backgroundColor: "#F7F7F7",
              marginBottom: "50px",
              padding: "10px 25px",
            }}
          >
            <h2>Cancelled</h2>
            {getCancelledClass.length > 0 ? (
              <div
                className="wclp_section wclp_section-cards"
                style={{
                  width: "100%",
                  backgroundColor: " #F7F7F7",
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  margin: 0,
                  padding: 0,
                }}
              >
                {getCancelledClass.map((classeses, index) => (
                  <Link
                    key={index}
                    className="wclp_card-container"
                    onClick={() => twoFunctionOnClick(classeses)}
                  >
                    <div className="wclp_card_section wclp_card_section-bottom">
                      <h2>Location: {classeses.location}</h2>
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
                      <br />
                      <div>
                        Status:{" "}
                        {classeses.classStatus === "Completed" && (
                          <span
                            style={{
                              fontSize: 15,
                              fontWeight: 600,
                              color: "green",
                            }}
                          >
                            {classeses.classStatus}
                          </span>
                        )}
                        {classeses.classStatus === "Cancelled" && (
                          <span
                            style={{
                              fontSize: 15,
                              fontWeight: 600,
                              color: "red",
                            }}
                          >
                            {classeses.classStatus}
                          </span>
                        )}
                        {(classeses.classStatus === "OnGoing" ||
                          classeses.classStatus === "CloseRegistration" ||
                          classeses.classStatus === "OpenRegistration") && (
                          <span style={{ fontSize: 15, fontWeight: 600 }}>
                            {classeses.classStatus}
                          </span>
                        )}
                      </div>
                      {/* <p>Registered: {classeses.registered.registered}/{classeses.registered.maximum}</p> */}
                      {/* Hỏi về cái class status có bao nhiêu status  */}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  marginBottom: "50px",
                  justifyContent: "center",
                  fontSize: 16,
                  fontWeight: 600,
                }}
              >
                This Workshop has no class yet
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workshop;

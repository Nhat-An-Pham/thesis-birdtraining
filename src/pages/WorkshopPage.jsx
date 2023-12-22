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
        console.log(res.data);
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
                    className="wclpdiv_section_mapping-content"
                    key={workshopClass.id}
                  >
                    <p className="wclpdiv_content wclpdiv_content-detail ">
                      Description:{" "}
                      <span>
                        <RawHTMLRenderer htmlContent={workshopClass.detail} />
                      </span>
                    </p>
                    <p className="wclpdiv_content wclpdiv_content-trainer">
                      Trainer: {workshopClass.trainer.name}
                    </p>
                    <p className="wclpdiv_content wclpdiv_content-registered">
                      Start-Time: {workshopClass.startTime}/End-Time:{" "}
                      {workshopClass.endTime}
                    </p>
                    -----------------------
                  </div>
                  {workshopClass.trainer.avatar ? (
                    <img src={workshopClass.trainer.avatar}></img>
                  ) : null}
                </div>
              ))}
            </div>
            <div className="wclpdiv_section wclpdiv_section-button">
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
          {registeredClasses ? (
            <div className="wclp_section wclp_section-cards">
              {registeredClasses.map((classeses, index) => (
                <Link
                  key={index}
                  className="wclp_card-container"
                  onClick={() => twoFunctionOnClick(classeses)}
                >
                  <div className="wclp_card_section wclp_card_section-bottom">
                    <h2>Location: {classeses.location}</h2>
                    <h5>
                      Register Start Date:{" "}
                      {dateFormat(classeses.startTime, "mmmm dS, yyyy")}
                    </h5>
                    <br />
                    <p>
                      Register End Date:{" "}
                      <span>
                        {" "}
                        {dateFormat(classeses.registerEndDate, "mmmm dS, yyyy")}
                      </span>
                    </p>
                    {/* <p>Registered: {classeses.registered.registered}/{classeses.registered.maximum}</p> */}
                    {/* Hỏi về cái class status có bao nhiêu status  */}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <Typography>This Workshop has no class yet</Typography>
          )}
        </div>
      </div>
    </div>
  );
};

export default Workshop;

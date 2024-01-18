import React from "react";
import { useState } from "react";
import appleicon from "../assets/icons/apple.svg";
import chplayicon from "../assets/icons/chplay.svg";
import urlQr from "../assets/icons/frame.png";

const TrainingAcademyPage = () => {
  const [isDivVisible, setIsDivVisible] = useState(false);

  const handleButtonClick = () => {
    setIsDivVisible(true);
  };

  const handleCloseDiv = () => {
    setIsDivVisible(false);
  };

  return (
    <div className="trainingacademypage">
      {isDivVisible && (
        <div className="tacmy-background">
          <div className="tacmy-container">
            <img
              className="tacmy_section-backgroundimg"
              src={require("../assets/pages/trainingacademy/backgroundimage.jpeg")}
              alt=""
            />
            <div className="tacmy_section-content">
              <h1 className="tacmy_section-title">
                Please Download Our App For Your Bird Care
              </h1>
              <div className="tacmy_section-img">
                <img alt="" src={urlQr}></img>
              </div>
              <button className="tacmy_section-button" onClick={handleCloseDiv}>
                Close the Tab
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="tap_section tap_section-title">
        <h1>TRAINING ACADEMY</h1>
      </div>
      <div className="tap_section tap_section-service">
        <div className="tapsecservice_elements tapsecservice_elements-img">
          <img
            src={require("../assets/pages/trainingacademy/homepage.jpeg")}
            alt=""
          ></img>
        </div>
        <div className="tapsecservice_elements tapsecservice_elements-content">
          <h2>Our Training Academy</h2>
          <p>
            Unlock the world of avian intelligence with our specialized training
            courses for pet birds! Our bird training program is designed to
            enhance the bond between you and your feathered friend. Learn
            effective communication techniques and commands, tailored
            specifically for trained pet birds. Whether you have a parrot,
            canary, or finch, our courses cover a range of skills to engage and
            stimulate your avian companion. Elevate the interaction with your
            bird as you delve into the fascinating world of avian cognition.
            Join our community of bird enthusiasts and embark on a journey of
            learning and fun. Enroll in our bird training courses today, and
            watch as your feathered friend spreads its wings of knowledge!
          </p>
          <div style={{ marginTop: 30 }}>
            <button onClick={handleButtonClick}>
              <span style={{ fontSize: 20 }}>Contact Us To Book Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingAcademyPage;

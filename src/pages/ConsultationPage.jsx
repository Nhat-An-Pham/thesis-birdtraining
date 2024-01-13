import React from "react";
import { useState } from "react";
import BookingComponent from "../components/booking/BookingComponent";

const Consultation = () => {
  return (
    <div className="consultationpage">
      <div className="cons_section cons_section-title">
        <h1>CONSULTATION SERVICE</h1>
      </div>
      <div className="cons_section cons_section-service">
        <div className="secservice_elements secservice_elements-img">
          <img
            src={require("../assets/pages/consultation/inhome-consultation.jpeg")}
            alt=""
          ></img>
        </div>
        <div className="secservice_elements secservice_elements-content">
          <h2>In-Home Consultation</h2>
          <p>
            Available for clients within Vietnam only. If you are unsure
            if your area is covered please get in touch.
          </p>
          <p>
            Regarding payments, details will be finalized when our staff
            contacts you after submitting your consultation ticket. All prices
            are transparently listed in VND. Additionally, inquire about our
            membership plans for potential discounts on this service. We look
            forward to assisting you virtually, ensuring a seamless and valuable
            experience.
          </p>
          <p>
            As our staff reaches out to you, they'll provide details on distance
            fees if applicable, ensuring transparency in your consultation
            experience. We're committed to making your virtual consultation
            seamless and beneficial.
          </p>
          <p>*Prices are in local currency</p>
        </div>
      </div>
      <div className="cons_section cons_section-service">
        <div className="secservice_elements secservice_elements-content">
          <h2>Online Consultation</h2>
          <p>
            Run via Google Meet, our Online Video Consultations are fantastic
            for clients outside of our locations, including interstate and
            international. Our team of Consultants are experienced at providing
            virtual consultations to clients all over the world, we can assist
            you just as effectively via Video call as in person.
          </p>
          <p>
            Regarding payments, details will be finalized when our staff
            contacts you after submitting your consultation ticket. All prices
            are transparently listed in VND. Additionally, inquire about our
            membership plans for potential discounts on this service. We look
            forward to assisting you virtually, ensuring a seamless and valuable
            experience.{" "}
          </p>
          <p>**All prices are in VND.</p>
        </div>
        <div className="secservice_elements secservice_elements-img">
          <img
            src={require("../assets/pages/consultation/online-consultation.jpeg")}
            alt=""
          ></img>
        </div>
      </div>
      <div className="cons_section cons_section-booking">
        <h1>BOOKING ONLINE</h1>
        <BookingComponent />
      </div>
    </div>
  );
};

export default Consultation;

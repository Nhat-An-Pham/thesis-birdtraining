import React from 'react'
import { useState } from 'react';
import BookingComponent from '../components/booking/BookingComponent';

const Consultation = () => {


  return (
    <div className='consultationpage'>
      <div className='cons_section cons_section-title'>
        <h1>CONSULTATION SERVICE</h1>
      </div>
      <div className='cons_section cons_section-service'>
        <div className='secservice_elements secservice_elements-img'>
          <img src={require("../assets/pages/consultation/inhome-consultation.jpeg")} alt=''></img>
        </div>
        <div className='secservice_elements secservice_elements-content'>
          <h2>In-Home Consultation</h2>
          <p>Available for clients within the Perth, South East Queensland and Hawkes Bay (New Zealand) and surrounding regions. If you are unsure if your area is covered please get in touch.
            Initial 1.5hour in-home consultation is <span> $210* </span>. You have the option to include a written Parrot Life Training Plan specific to your parrot for an additional $65.00 (recommended).
            Any optional follow up or regular consultations for existing clients are discounted to $155.00 per session, these normally last 1hour. Parrot Life Training Plans for follow up sessions are optional and are an extra $65.00.
            For Western Australia, Queensland and New Zealand, a distance fee of 50c/km applies over 20km from your consultant's location. If the distance from our offices is greater than 100km, you will be given a direct quote from your consultant.
            *Prices are in local currency</p>
        </div>
      </div>
      <div className='cons_section cons_section-service'>
        <div className='secservice_elements secservice_elements-content'>
          <h2>Online Consultation</h2>
          <p>Run via Zoom or Skype, our Online Video Consultations are fantastic for clients outside of our locations, including interstate and international. Our team of Consultants are experienced at providing virtual consultations to clients all over the world, we can assist you just as effectively via Video call as in person.
            Initial 1.5 hour online consultation is $190.00**. You have the option to include a written Parrot Life® ​ Training Plan specific to your parrot for an additional $65.00 (recommended). International customers have all GST components discounted.
            Any optional follow up or regular consultations for existing clients are discounted to $145.00 per session lasting 1 hour. Parrot Life® Training Plans for follow up sessions are optional at $65.00.
            **All prices are in AUD.</p>
        </div>
        <div className='secservice_elements secservice_elements-img'>
          <img src={require("../assets/pages/consultation/online-consultation.jpeg")} alt=''></img>
        </div>
      </div>
      <div className='cons_section cons_section-booking'>
        <h1>BOOKING ONLINE</h1>
        <BookingComponent />
      </div>
    </div>
  )
}

export default Consultation;
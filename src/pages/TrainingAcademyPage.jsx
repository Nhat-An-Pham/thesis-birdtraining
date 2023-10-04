import React from 'react'

const TrainingAcademyPage = () => {
  return (
    <div className='trainingacademypage'>
      <div className='tap_section tap_section-title'>
        <h1>TRAINING ACADEMY</h1>
      </div>
      <div className='tap_section tap_section-service'>
        <div className='tapsecservice_elements tapsecservice_elements-img'>
          <img src={require("../assets/pages/trainingacademy/homepage.jpeg")} alt=''></img>
        </div>
        <div className='tapsecservice_elements tapsecservice_elements-content'>
          <h2>Our Training Academy</h2>
          <p>Parrot Training Academy is our series of three comprehensive workshops focusing on parrot behaviour and training.
            This series allows you to choose the level you would like to start, and the level you want to advance to. Designed to suit busy schedules, workshops can be completed all at once or at different times. They are designed to suit a range of different skill levels—from first time companion parrot owners, to those who work with animals professionally such as behaviour consultants, zoo keepers, shelter workers and those that work in the veterinary professions. If you want to broaden your understanding of parrot behaviour, learn how to train and correct problem behaviours, and get hands on training time with a variety of parrots, then this academy is for you!
            Each workshop in our PTA series is run over one day (usually on a weekend) with each successive workshop  3 - 4 weeks apart. </p>
          <button>Contact Us To Book Now</button>
        </div>
      </div>
    </div>
  )
}

export default TrainingAcademyPage
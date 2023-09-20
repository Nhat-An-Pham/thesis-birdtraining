import React from 'react'

const HomeCarousel = () => {
  return (
    <div className='home_carousel'>
        <div className='home_carousel_section home_carousel_section-text'>
            <h1>Want to teach your parrot how to speak?</h1>
            <h5>We have the perfect formula</h5>
        </div>
        <div class="home_carousel_section-curve"></div>

        <div className='home_carousel_section home_carousel_section-button'>
            <button>Join for free</button>
        </div>
        <div className='home_carousel_section home_carousel_section-video'>
            <img src={require("../assets/pages/home/home_carousel.jpg")}/>
        </div>
    </div>
  )
}

export default HomeCarousel
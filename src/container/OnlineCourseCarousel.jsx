import React from 'react'
import { Link } from 'react-router-dom'

const OnlineCoursesCarousel = () => {
  const token = localStorage.getItem('user-token');
  return (
    <div className='ocp_carousel'>
      <div className='ocp_carousel_section ocp_carousel_section-text'>
        <h1>Want to teach your parrot how to speak?</h1>
        <h5>We have the perfect formula</h5>
      </div>
      <div class="ocp_carousel_section-curve"></div>

      <div className='ocp_carousel_section ocp_carousel_section-button'>
        {!token &&
          <Link to='/signup'><button>Join for free</button></Link>
        }
        </div>
      <div className='ocp_carousel_section ocp_carousel_section-video'>
        <img src={require("../assets/pages/ocp/ocp_carousel.jpg")} alt='' />
      </div>
    </div>
  )
}

export default OnlineCoursesCarousel
import React from 'react'

const HomePage = () => {
    return (
        <div className='homepage'>
            <div className='home_section'>
                <div className='home_carousel'>
                    <h1 class="home_carousel_section-title">
                        Want To Train Your Bird
                        or Solve a Problem Behavior
                    </h1>
                    <div class="home_carousel_section-curve"></div>
                    <button class="home_carousel_section-button">Contact Us</button>
                    <div class="home_carousel_section-achievement">
                        <div className='achievements_section achievements_section-icon'>
                            <img src={require("../assets/icons/achievements.png")}></img>
                            <h5>Experienced Instructors</h5>
                        </div>
                        <div className='achievements_section achievements_section-icon'>
                            <img src={require("../assets/icons/achievements.png")}></img>
                            <h5>Quality Videos</h5>
                        </div>
                        <div className='achievements_section achievements_section-icon'>
                            <img src={require("../assets/icons/achievements.png")}></img>
                            <h5>Affordable Prices</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage
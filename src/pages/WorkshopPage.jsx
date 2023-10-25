import React, { useState } from 'react'
import Cards from '../components/cards/WorkshopClassListCards'
import { Link } from 'react-router-dom'
import workshops from '../assets/fakedb/workshops'


const Workshop = () => {


    return (
        <div className='workshopspage'>
            {/* carousel */}
            <div className='workshoppage_section workshoppage_section-carousel'>
                <div className='workshoppage_carousel'>
                    <div className='workshoppage_carousel_section workshoppage_carousel_section-text'>
                        <h1>COME TO OUR WORKSHOP</h1>
                        <h5>Event every weekend</h5>
                    </div>
                    <div class="workshoppage_carousel_section-curve"></div>

                    <div className='workshoppage_carousel_section workshoppage_carousel_section-button'>
                        <button>Join for free</button>
                    </div>
                    <div className='workshoppage_carousel_section ocp_carousel_section-video'>
                        <img src={require("../assets/pages/ocp/ocp_carousel.jpg")} alt='' />
                    </div>
                </div>
            </div>
            {/* events */}
            <div className='workshoppage_section workshoppage_section-events'>
                <div className='workshoppageevents_elements workshoppageevents_elements-title '>
                    <p>
                        Top of our categories
                    </p>
                    <h2>
                        Explore our popular courses
                    </h2>
                </div>
                <div className='workshoppageevents_elements workshoppageevents_elements-cards'>
                    {workshops.map((workshop) => (
                        <Cards id={workshop.workshopId} title={workshop.title} key={workshop.workshopId}
                            thumbnail={workshop.backgroundimage} shortdescr={workshop.shortdescr}
                            price={workshop.price} >
                        </Cards>
                    ))}
                </div>
                <div className='workshoppageevents_elements-button'>
                    <Link to="/workshopslist">VIEW MORE</Link>
                </div>
            </div>
        </div>
    )
}

export default Workshop
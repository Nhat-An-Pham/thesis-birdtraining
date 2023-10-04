import React, { useState } from 'react'
import Cards from '../components/cards/Cards'
import { Link } from 'react-router-dom'


const Workshop = () => {
    const [event, setEvent] = useState([
        {
            id: "1",
            title: "Event 1",
            shortdescr: "This is the first Event",
            backgroundimage: (require("../assets/pages/ocp/ocp_carousel.jpg")),
            status: "available"
        }, {
            id: "2",
            title: "Event 2",
            backgroundimage: (require("../assets/pages/ocp/ocp_carousel.jpg")),
            shortdescr: "This is the second Event",
            status: "available"
        }, {
            id: "3",
            title: "Event 3",
            backgroundimage: (require("../assets/pages/ocp/ocp_carousel.jpg")),
            shortdescr: "This is the third Event",
            price: "10",
            status: "available"
        }, {
            id: "4",
            title: "Event 4",
            backgroundimage: (require("../assets/pages/ocp/ocp_carousel.jpg")),
            shortdescr: "This is the fournth Event",
            price: "10",
            status: "available"
        }
    ])


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
                    {event.map((events) => (
                        <Cards id={events.id} title={events.title} key={events.id}
                            thumbnail={events.backgroundimage} shortdescr={events.shortdescr}
                            price={events.price} >
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
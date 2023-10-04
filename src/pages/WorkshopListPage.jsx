import React, { useState } from 'react'
import Cards from '../components/cards/Cards'


const WorkshopListPage = () => {
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
        <div className='workshoplistpage'>
            <div className='workshoplistpage_section workshoplistpage_section-search'>
                <input type="text" required placeholder='Search For Events' />
            </div>
            <div className='workshoplistpage_section workshoplistpage_section-title'>
                <h3>Explore our Workshops</h3>
            </div>
            <div className='workshoplistpage_section workshoplistpage_section-list'>
                <div className='workshoplistpagelist_elements workshoplistpagelist_elements-cards'>
                    {event.map((events) => (
                        <Cards id={events.id} title={events.title} key={events.id}
                            thumbnail={events.backgroundimage} shortdescr={events.shortdescr}
                            price={events.price} >
                        </Cards>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default WorkshopListPage
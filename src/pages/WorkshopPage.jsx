import React from 'react'
import Cards from '../components/cards/WorkshopClassListCards'
import { Link } from 'react-router-dom'
import { useState, useEffect } from "react"
import WorkshopService from '../services/workshop.service'
// import workshops from '../assets/fakedb/workshops'


const Workshop = () => {

    const [workshopList, setWorkshopList] = useState([]);
    //take first 4 workshops
    const sliceWorkshop = workshopList.slice(0, 4)
    const token = JSON.parse(localStorage.getItem("user-token")
)
    useEffect(() => {
        WorkshopService
            .getWorkshopList()
            .then((res) => {
                // console.log("success workshop list test", res.data);
                setWorkshopList(res.data);
            })
            .catch((e) => console.log("fail workshop list test", e));
    }, []);

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
                        {!token &&
                            <Link to='/signup'><button>Join for free</button></Link>
                        }
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
                    {sliceWorkshop.map((workshop) => (
                        <Cards id={workshop.id} title={workshop.title} key={workshop.id}
                            thumbnail={workshop.picture.split(",")[0]} shortdescr={workshop.description}
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
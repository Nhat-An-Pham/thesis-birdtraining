import React from 'react'
import Cards from '../components/cards/WorkshopClassListCards'
// import workshops from "../assets/fakedb/workshops"
import WorkshopService from '../services/workshop.service'
import {useState, useEffect} from "react"

const WorkshopListPage = () => {

    const [workshopList, setWorkshopList] = useState([]);

    useEffect(() => {
        WorkshopService
            .getWorkshopList()
            .then((res) => {
                console.log("success workshop list test", res.data);
                setWorkshopList(res.data);
            })
            .catch((e) => console.log("fail workshop list test", e));
    }, []);

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
                    {workshopList.map((workshop) => (
                        <Cards id={workshop.id} title={workshop.title} key={workshop.id}
                            thumbnail={workshop.picture.split(",")[0]} shortdescr={workshop.description}
                            price={workshop.price} >
                        </Cards>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default WorkshopListPage
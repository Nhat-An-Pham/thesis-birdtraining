import React from 'react'
import Cards from '../components/cards/WorkshopClassListCards'
import workshops from "../assets/fakedb/workshops"


const WorkshopListPage = () => {


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
                    {workshops.map((workshop) => (
                        <Cards id={workshop.workshopId} title={workshop.title} key={workshop.workshopId}
                            thumbnail={workshop.backgroundimage} shortdescr={workshop.shortdescr}
                            price={workshop.price} >
                        </Cards>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default WorkshopListPage
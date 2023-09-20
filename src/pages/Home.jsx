import React from 'react'
import HomeCarousel from '../container/HomeCarousel';
import HomeCourses from '../container/HomeCourses';
import NavbarMain from '../container/NavbarMain';

const Home = () => {
    return (
        <div className='homepage'>
            <div className='home_section'>
                <HomeCarousel />
            </div>
            <div className='home_section'>
                <HomeCourses />
            </div>
        </div>
    )
}

export default Home;
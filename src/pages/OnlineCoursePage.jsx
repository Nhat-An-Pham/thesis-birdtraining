import React from 'react'
import OnlineCourseCarousel from '../container/OnlineCourseCarousel';
import OnlineCourseCourses from '../container/OnlineCourseCourses';
import { Link } from 'react-router-dom';

const OnlineCourse = () => {
    return (
        <div className='onlinecoursepage'>
            <div className='ocp_section'>
                <OnlineCourseCarousel />
            </div>
            <div className='ocp_section'>
                <OnlineCourseCourses />
                <div className='ocpsectioncourselist_button'>
                    <Link to="/courseslist">VIEW MORE</Link>
                </div>
            </div>
        </div>
    )
}

export default OnlineCourse;
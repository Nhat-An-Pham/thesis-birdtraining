import React from 'react'
import OnlineCourseCarousel from '../container/OnlineCourseCarousel';
import OnlineCourseCourses from '../container/OnlineCourseCourses';

const OnlineCourse = () => {
    return (
        <div className='onlinecoursepage'>
            <div className='ocp_section'>
                <OnlineCourseCarousel />
            </div>
            <div className='ocp_section'>
                <OnlineCourseCourses />
            </div>
        </div>
    )
}

export default OnlineCourse;
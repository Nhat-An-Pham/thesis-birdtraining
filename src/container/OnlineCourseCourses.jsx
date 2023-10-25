import React, { useState } from 'react'
import Cards from '../components/cards/CoursesListCards'
import { Link } from 'react-router-dom'
import courses from '../assets/fakedb/courses'

const OnlineCoursesCourses = () => {


  return (
    <div className='ocp_courses'>
      <div className='ocpcourse_elements ocpcourse_elements-title '>
        <p>
          Top of our categories
        </p>
        <h2>
          Explore our popular courses
        </h2>
      </div>
      <div className='ocpcourse_elements ocpcourse_elements-cards'>
        {courses.map((course) => (
            <Cards id={course.id} title={course.title} key={course.id}
              thumbnail={course.coursethumbnail} shortdescr={course.shortdescr}
              price={course.price} />
        ))}
      </div>
    </div>
  )
}

export default OnlineCoursesCourses;
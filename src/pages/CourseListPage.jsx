import React from 'react'
import Cards from '../components/cards/Cards';
import { useState } from 'react';

const CourseListPage = () => {

  const [courses, setCourses] = useState([
    {
      id: "1",
      title: "First Course",
      shortdescr: "Hello this is the first course",
      coursethumbnail: (require("../assets/pages/ocp/ocp_carousel.jpg")),
      price: "10",
      status: "available"
    }, {
      id: "2",
      title: "Second Course",
      coursethumbnail: (require("../assets/pages/ocp/ocp_carousel.jpg")),
      shortdescr: "Hello this is the second course",
      price: "10",
      status: "available"
    }, {
      id: "3",
      title: "Third Course",
      coursethumbnail: (require("../assets/pages/ocp/ocp_carousel.jpg")),
      shortdescr: "Hello this is the third course",
      price: "10",
      status: "available"
    }, {
      id: "4",
      title: "Fourth Course",
      coursethumbnail: (require("../assets/pages/ocp/ocp_carousel.jpg")),
      shortdescr: "Hello this is the fourth course",
      price: "10",
      status: "available"
    }
  ])


  return (
    <div className='courselistpage'>
      <div className='courselistpage_section courselistpage_section-search'>
        <input type="text" required placeholder='Search For Courses' />
      </div>
      <div className='courselistpage_section courselistpage_section-title'>
        <h3>Explore our Courses</h3>
      </div>
      <div className='courselistpage_section courselistpage_section-list'>
        <div className='courselistpagelist_elements courselistpagelist_elements-cards'>
          {courses.map((course) => (
            <Cards id={course.id} title={course.title} key={course.id}
              thumbnail={course.coursethumbnail} shortdescr={course.shortdescr}
              price={course.price} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default CourseListPage;
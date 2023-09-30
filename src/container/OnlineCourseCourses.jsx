import React, { useState } from 'react'
import Cards from '../components/cards/Cards'


const OnlineCoursesCourses = () => {

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
    }
  ])


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
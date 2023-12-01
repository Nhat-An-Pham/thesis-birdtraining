import React, { useEffect } from 'react'
import Cards from '../components/cards/CoursesListCards'
import { useState } from 'react'
import OnlinecourseService from '../services/onlinecourse.service'

const OnlineCoursesCourses = () => {

  const [onlineCourse, setOnlineCourse] = useState([]);

  useEffect(()=>{
    OnlinecourseService.getAllOnlineCourse()
    .then((res)=>{
      // console.log("All Online Courses: ", res.data)
      setOnlineCourse(res.data);
    })
    .catch((e)=>{
      console.log("fail get all courses: ", e)
    })
  },[])


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
        {onlineCourse.map((course) => (
            <Cards id={course.id} title={course.title} key={course.id}
              thumbnail={course.picture} shortdescr={course.shortDescription}
              price={course.price} />
        ))}
      </div>
    </div>
  )
}

export default OnlineCoursesCourses;
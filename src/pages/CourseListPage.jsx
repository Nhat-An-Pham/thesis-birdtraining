import React from 'react'
import Cards from '../components/cards/CoursesListCards';
import courses from '../assets/fakedb/courses';
import { useState, useEffect } from 'react';
import OnlinecourseService from '../services/onlinecourse.service'

const CourseListPage = () => {


  const [onlineCourse, setOnlineCourse] = useState([]);

  useEffect(() => {
    OnlinecourseService.getAllOnlineCourse()
      .then((res) => {
        console.log("All Online Courses: ", res.data)
        setOnlineCourse(res.data);
      })
      .catch((e) => {
        console.log("fail get all courses: ", e)
      })
  }, [])

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
          {onlineCourse.map((course) => (
            <Cards id={course.id} title={course.title} key={course.id}
              thumbnail={course.picture} shortdescr={course.shortDescription}
              price={course.price} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default CourseListPage;
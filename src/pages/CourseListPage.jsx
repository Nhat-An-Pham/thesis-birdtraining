import React from 'react'
import Cards from '../components/cards/CoursesListCards';
import courses from '../assets/fakedb/courses';

const CourseListPage = () => {


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
              price={course.price}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CourseListPage;
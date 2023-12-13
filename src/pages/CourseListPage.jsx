import React from 'react'
import Cards from '../components/cards/CoursesListCards';
import courses from '../assets/fakedb/courses';
import { useState, useEffect } from 'react';
import OnlinecourseService from '../services/onlinecourse.service'
import { Link } from 'react-router-dom';

const CourseListPage = () => {


  const accessToken = JSON.parse(localStorage.getItem("user-token"))



  const [onlineCourse, setOnlineCourse] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchQuery, setSearchQuery] = useState();

  useEffect(() => {
    OnlinecourseService.getAllOnlineCourse()
      .then((res) => {
        // console.log("All Online Courses: ", res.data)
        setOnlineCourse(res.data);
        setFilteredList(res.data)
      })
      .catch((e) => {
        console.log("fail get all courses: ", e)
      })
  }, [])

  const handleSearch = (query) => {
    const filteredResults = onlineCourse.filter((course) =>
      course.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredList(filteredResults);
  };
  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    handleSearch(query);
  };

  return (
    <div className='courselistpage'>
      <div className='courselistpage_section courselistpage_section-search'>
        <input type='text' placeholder='Search For Courses'
        value={searchQuery} onChange={handleSearchInputChange} 
        />
      </div>
      <div className='courselistpage_section courselistpage_section-title'>
        <h3>Explore our Courses</h3>
      </div>
      <div className='courselistpage_section courselistpage_section-list'>
        <div className='courselistpagelist_elements courselistpagelist_elements-cards'>
          {filteredList.map((course, index) => (
            <Cards id={course.id} title={course.title} key={index}
              thumbnail={course.picture} shortdescr={course.shortDescription}
              price={course.price} />
          ))}
        </div>
      </div>
      {accessToken ?
        <Link to='/setting' style={{ color: "grey", marginBottom: "40px" }}>Click Here To View Your Finished Courses</Link>
        : null}
    </div>
  )
}

export default CourseListPage;
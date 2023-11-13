import React, { useState } from 'react';

function CourseDetailPage() {

  const [contentButton, setContentButton] = useState("1");
  
  const contentNav = [
    {
      id: "1",
      name: "Overview"
    }, {
      id: "2",
      name: "Course Content"
    },{
      id: 3,
      name: "Instructor"
    } 
  ]

  return (
    <div className='coursedetailpage'>
      <div className='cdtp_container'>
        <div className='cdtp_wrapper'>
          <div className='cdtp_sidebar'>
            <h3>Price</h3>
            <button>Buy Now</button>
            <button>Study</button>
            <div className='cdtp_sidebar-footer'>
              <h3>For Details About The Course</h3>
              <button>Call Us: (+84) 90 456 0264</button>
            </div>
          </div>
          <div className='cdtp_content'>
            <div className='cdtp_content-navbar'>
            </div>
            <div className='cdtp_content-descr'>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default CourseDetailPage;

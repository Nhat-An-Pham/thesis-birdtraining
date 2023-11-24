import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import dateFormat from 'dateformat';
// import workshopsData from '../assets/fakedb/workshops'
import { Link } from 'react-router-dom';
import WorkshopService from '../services/workshop.service';
import { useNavigate } from 'react-router-dom';
import RawHTMLRenderer from '../Management/component/htmlRender/htmlRender';


const WClassListPage = () => {
  //param
  const { workshopid } = useParams();
  const [workshopList, setWorkshopList] = useState([])
  const [classData, setClassData] = useState([]);
  const [classId, setClassId] = useState([]);
  const [classNumberRegistered, setClassNumberRegistered] = useState([]);



  // API
  useEffect(() => {
    //get classes by WorkshopId

    const apiFunction = async () => {
      const apiorderhandler = await
        // get class Data
        WorkshopService
          .getClasses({ id: workshopid })
      // console.log("Get class by workshopId: ", apiorderhandler.data)
      setClassData(apiorderhandler.data)

      //get workshop by WorkshopID
      WorkshopService
        .getWorkshopById({ id: workshopid })
        .then((res) => {
          // console.log("Success WorkShopByID Test:", res.data);
          setWorkshopList(res.data);
        })
        .catch((e) => console.log("Fail WorkShopByID Test:", e));


      // get class number registered
      WorkshopService
        .getClassNumberRegistered({ id: apiorderhandler?.data?.[0]?.id })
        .then((res) => {
          // console.log("Success Get Class Number Registered Test:", res.data);
          setClassNumberRegistered(res.data);
        })
        .catch((e) => console.log("Fail Get Class Number Registered Test:", e));
    }

    //make the call
    apiFunction();

  }, []);


  //Handler
  //OPEN DIV
  const [isDivVisible, setIsDivVisible] = useState(false);
  const handleButtonOpenDivClick = () => {
    setIsDivVisible(true);
  };
  const handleCloseDiv = () => {
    setIsDivVisible(false);
  };


  //Set Enroll
  const navigate = useNavigate();
  const handleEnroll = (event) => {
    // console.log(event);
    navigate(`/payment/workshop/${event}`)
  }

  //Select Class
  const [selectedClass, setSelectedClass] = useState(null);

  const handleWorkshopClick = (classesssss) => {
    setSelectedClass(classesssss);
    // console.log(selectedClass)
  };

  const twoFunctionOnClick = (classesssss) => {
    handleWorkshopClick(classesssss);
    handleButtonOpenDivClick();
  }

  return (
    <>
      {workshopList ?
        <div className='wclasslistpage'>
          {isDivVisible && (
            <div className='wclpdiv-background'>
              <div className='wclpdiv-container'>
                <h2 className='wclpdiv_section wclpdiv_section-title' style={{fontSize:"25px"}}>{workshopList.title}</h2>
                <p className='wclpdiv_section wclpdiv_section-title' style={{ fontSize: "20px" }}>Date: <span style={{ color: "red", fontSize: "20px" }}>{dateFormat(selectedClass.startTime, "mmmm dS, yyyy")}</span></p>
                <div className='wclpdiv_section wclpdiv_section-mapping'>
                  {selectedClass.classSlots.map((workshopClass) => (
                    <div className='wclpdiv_section_mapping-content' key={workshopClass.id}>
                      <p className='wclpdiv_content wclpdiv_content-detail '>Description: <span><RawHTMLRenderer htmlContent={workshopClass.detail} /></span></p>
                      <p className='wclpdiv_content wclpdiv_content-registered'>Start-Time: {workshopClass.startTime}/End-Time: {workshopClass.endTime}</p>
                      -----------------------
                    </div>
                  ))}
                </div>
                <div className='wclpdiv_section wclpdiv_section-button'>
                  <button className='wclpdiv_section_button-close' onClick={handleCloseDiv}>Close</button>
                  {!selectedClass.status ?
                    <button className='wclpdiv_section_button-enroll' onClick={() => handleEnroll(selectedClass.id)}>ENROLL NOW</button>
                    : <p style={{ color: "red" }}>You Have Enrolled This Class</p>}
                </div>
              </div>
            </div>
          )}
          <h1 className='wclp_section wclp_section-title'> {workshopList.title}  </h1>
          <div className='wclp_section wclp_section-cards'>
            {classData.map((classeses, index) => (
              <Link key={index} className='wclp_card-container' onClick={() => twoFunctionOnClick(classeses)}>
                <div className='wclp_card_section wclp_card_section-bottom'>
                  <h2>{dateFormat(classeses.startTime, "mmmm dS, yyyy")}</h2><br />
                  <p>Register End Date: <span> {dateFormat(classeses.registerEndDate, "mmmm dS, yyyy")}</span></p>
                  {classeses.id === classNumberRegistered.classId ?
                    <p>Registered: {classNumberRegistered.registered}/{classNumberRegistered.maximum}</p> : <></>}
                </div>
                <div className='wclp_card_section wclp_card_section-top'>
                  <div className='wclp_card_section_top wclp_card_section_top-button'>
                    <button onClick={() => twoFunctionOnClick(classeses)} >Click to Enroll</button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        : null}
    </>
  )
}

export default WClassListPage;
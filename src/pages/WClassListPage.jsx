import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import dateFormat from 'dateformat';
// import workshopsData from '../assets/fakedb/workshops'
import { Link } from 'react-router-dom';
import WorkshopService from '../services/workshop.service';


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

  //Select Class
  const [selectedClass, setSelectedClass] = useState(null);

  const handleWorkshopClick = (classesssss) => {
    setSelectedClass(classesssss);
    console.log(selectedClass)
  };

  const twoFunctionOnClick = (classesssss) => {
    handleWorkshopClick(classesssss);
    handleButtonOpenDivClick();
  }

  return (
    <>
      <div className='wclasslistpage'>
        {isDivVisible && (
          <div className='wclpdiv-background'>
            <div className='wclpdiv-container'>
              <h2>Class Detail: <span style={{color: "red", fontSize: "35px"}}>{dateFormat(selectedClass.startTime, "mmmm dS, yyyy")}</span></h2>
              <ul>
                {selectedClass.classSlots.map((workshopClass) => (
                  <div>
                    <li key={workshopClass.id}>{workshopClass.detail}</li>
                    <li >{workshopClass.startTime}/{workshopClass.endTime}</li>
                  </div>
                ))}
              </ul>
              <button onClick={handleCloseDiv}>Close</button>
              <button onClick={handleCloseDiv}>ENROLL NOW</button>
            </div>
          </div>
        )}
        <h1 className='wclp_section wclp_section-title'>Classes for: {workshopList.title}  </h1>
        <div className='wclp_section wclp_section-cards'>
          {classData.map((classeses, index) => (
            <Link key={index} className='wclp_card-container' to="">
              <div className='wclp_card_section wclp_card_section-top'>
                <div className='wclp_card_section_top wclp_card_section_top-button'>
                  <button onClick={() => twoFunctionOnClick(classeses)} >Check For Class Here</button>
                </div>
              </div>
              <div className='wclp_card_section wclp_card_section-bottom'>
                <h2>{dateFormat(classeses.startTime, "mmmm dS, yyyy")}</h2>
                <p>Register End Date: <span> {dateFormat(classeses.registerEndDate, "mmmm dS, yyyy")}</span></p><br />
                {classeses.id === classNumberRegistered.classId ?
                  <p>Registered: {classNumberRegistered.registered}/{classNumberRegistered.maximum}</p> : <></>}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default WClassListPage;
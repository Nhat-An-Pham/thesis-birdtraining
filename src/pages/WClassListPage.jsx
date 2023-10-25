import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router'
import workshopsData from '../assets/fakedb/workshops'
import { Link } from 'react-router-dom';

function getClassesForWorkshop(workshopid) {
  const workshop = workshopsData.find((workshop) => workshop.workshopId === workshopid);
  if (!workshop) {
    return [];
  }
  return { name: workshop.title, classes: workshop.classes };
}



const WClassListPage = () => {
  //param
  const { workshopid } = useParams();
  const { name, classes } = getClassesForWorkshop(workshopid);

  //set open div
  const [isDivVisible, setIsDivVisible] = useState(false);
  const handleButtonClick = () => {
    setIsDivVisible(true);
  };
  const handleCloseDiv = () => {
    setIsDivVisible(false);
  };

  //set data
  const [inputValues, setInputValues] = useState({
    name: '',
    phonenumber: '',
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    setIsDivVisible(false);
    setInputValues({
      name: '',
      phonenumber: '',
    });
    alert('Data Has been sended');
  };

  return (
    <>
      <div className='wclasslistpage'>
        {isDivVisible && (
          <div className='wclpdiv-background'>
            <div className='wclpdiv-container'>
              <img className='wclpdiv_section-backgroundimg' src={require("../assets/pages/trainingacademy/backgroundimage.jpeg")} alt='' />
              <p>Sign Up for class of Workshop: {name}</p>
              <div className='wclpdiv_section-content'>
                  <div className='wclpdiv_section_input'>
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={inputValues.name}
                      onChange={handleInputChange}
                      required
                    />
                    <input
                      type="text"
                      name="phonenumber"
                      placeholder="Phone Number"
                      value={inputValues.phonenumber}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                <button onClick={handleSubmit} className='wclpdiv_section_button-submit'>Submit</button>
                <button className='wclpdiv_section_button-close' onClick={handleCloseDiv} >Close the Tab</button>
              </div>
            </div>
          </div>
        )}
        <h1 className='wclp_section wclp_section-title'>Classes for: {name} </h1>
        <div className='wclp_section wclp_section-cards'>
          {classes.map((classeses) => (
            <Link key={classeses.classId} className='wclp_card-container' to="">
              <div className='wclp_card_section wclp_card_section-top'>
                <img alt='' src={classeses.backgroundimage} className='wclp_card_section_top wclp_card_section_top-img' />
                <div className='wclp_card_section_top wclp_card_section_top-button'>
                  <button onClick={handleButtonClick} >ENROLL NOW</button>
                </div>
              </div>
              <div className='wclp_card_section wclp_card_section-bottom'>
                <h2>{classeses.name}</h2>
                <p>{classeses.descr}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default WClassListPage;
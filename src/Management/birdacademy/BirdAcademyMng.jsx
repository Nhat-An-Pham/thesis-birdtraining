import React, { useState, useEffect } from "react";
import "./birdacademymng.scss";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Paper,
} from "@mui/material";
import TrainingSkillComponent from "./TrainingSkillComponent";
import ReworkSidebar from "../component/sidebar/ReworkSidebar";
import CustomerBirdComponent from "./CustomerBirdComponent";
import trainingCourseManagementService from "../../../src/services/trainingcourse-management.service";
import ReceivedBirdComponent from "./ReceivedBirdComponent";
//const ACCESS_TOKEN = JSON.parse(localStorage.getItem("user-token"));

export default function BirdAcademyMng() {
  const [renderCustomer, setRenderCustomer] = useState(true);
  const [renderCustomerRequest, setRenderCustomerRequest] = useState(true);
  const [renderTrainingSkill, setRenderTrainingSkill] = useState(false);
  const [renderReceiveBirdForm, setRenderReceiveBirdForm] = useState(false);

  const [birdTrainingCourseId, setBirdTrainingCourseId] = useState(null); //birdTrainingCourseId

  const handleConfirmButtonClick = async (key) => {
    setBirdTrainingCourseId(key); //setBirdTrainingCourseId
    let params = {
      birdTrainingCourseId: key,
    };
    trainingCourseManagementService
      .confirmBirdTrainingCourse(params)
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data
        console.log("Success:", data);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });
    console.log(birdTrainingCourseId); //birdTrainingCourseId
    // fetch(`http://13.214.85.41/api/trainingcourse-staff/birdtrainingcourse-confirm?birdTrainingCourseId=${key}`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${ACCESS_TOKEN}`,
    //       // You may need to include additional headers depending on your API requirements
    //     },
    //     params: null,
    //   })
    //     .then(response => response.json())
    //     .then(data => {
    //       // Handle the response data
    //       console.log('Success:', data);
    //     })
    //     .catch(error => {
    //       // Handle errors
    //       console.error('Error:', error);
    //     });

    setRenderTrainingSkill(true);
    setRenderCustomer(false);
    setRenderCustomerRequest(false);
  };
  const handleButtonClick = (key) => {
    setBirdTrainingCourseId(key); //setBirdTrainingCourseId
    setRenderTrainingSkill(true);
    setRenderCustomer(false);
    setRenderCustomerRequest(false);
    setRenderReceiveBirdForm(false);
  };
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserClick = (userId) => {
    setSelectedUser(userId);
    setBirdTrainingCourseId(null); //setBirdTrainingCourseId
  };

  const [showBirdList, setShowBirdList] = useState(false);
  const handleShowBirdList = (userid) => {
    setSelectedUser(userid);
    setShowBirdList(true);
    setRenderCustomer(false);
    setRenderCustomerRequest(false);
  };
  const [users, setUsers] = useState([]);
  const [birdTrainingCourse, setBirdTrainingCourse] = useState([]);
  // Simulate fetching bird information based on customerId
  // Replace this with your actual API call or data fetching logic
  const fetchBirdTrainingCourseData = async () => {
    try {
      // Replace this URL with your actual API endpoint
      const response = await fetch(
        `http://13.214.85.41/api/trainingcourse-staff/birdtrainingcourse`
      );
      const data = await response.json();
      //console.log(data);
      setBirdTrainingCourse(data); // Assuming data is an array of bird information
    } catch (error) {
      console.error("Error fetching bird data:", error);
    }
  }; // Simulate fetching bird information based on customerId
  // Replace this with your actual API call or data fetching logic
  const fetchCustomerData = async () => {
    try {
      // Replace this URL with your actual API endpoint
      const response = await fetch(
        `http://13.214.85.41/api/trainingcourse/all-requested-users`
      );
      const data = await response.json();
      setUsers(data); // Assuming data is an array of bird information
    } catch (error) {
      console.error("Error fetching bird data:", error);
    }
  };
  useEffect(() => {
    fetchCustomerData();
    fetchBirdTrainingCourseData();
  }, []);
  const handleCheckInButtonClick = (requestedId) => {
    setBirdTrainingCourseId(requestedId); //setBirdTrainingCourseId
    setRenderReceiveBirdForm(true);
  };
  const onCallBackMainManagement = async () => {
    fetchCustomerData();
    fetchBirdTrainingCourseData();
    setRenderCustomer(true);
    setRenderCustomerRequest(true);
    setRenderTrainingSkill(false);
    setShowBirdList(false);
  };
  return (
    <div className="workshop-container">
      <ReworkSidebar />
      <div className="workshop_section-wrapper">
        {renderCustomer && (
          <div className="workshop_section_table workshop_section_table-workshop">
            <h2>Customers</h2>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Customer Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone Number</TableCell>
                    <TableCell>Avatar</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users && users.length > 0
                    ? users.map((user) => (
                        <TableRow
                          key={user.id}
                          style={{
                            cursor: "pointer",
                            background:
                              selectedUser === user.id ? "#f0f0f0" : "white",
                          }}
                        >
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.phoneNumber}</TableCell>
                          <TableCell>
                            <a
                              href={user.avatar}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                src={user.avatar}
                                alt="Description of the image"
                                style={{ width: "200px", height: "150px" }}
                              />
                            </a>
                          </TableCell>
                          <TableCell>
                            <button onClick={() => handleUserClick(user.id)}>
                              View Request
                            </button>
                          </TableCell>
                          <TableCell>
                            <button onClick={() => handleShowBirdList(user.id)}>
                              Show Bird List
                            </button>
                          </TableCell>
                        </TableRow>
                      ))
                    : null}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
        {renderCustomerRequest && (
          <div className="workshop_section_table workshop_section_table-classes">
            <h2>Registered TrainingCourse</h2>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Bird Name</TableCell>
                    <TableCell>Owner Name</TableCell>
                    <TableCell>Course Title</TableCell>
                    <TableCell>Date registered</TableCell>
                    <TableCell>Training start date</TableCell>
                    <TableCell>Training done date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedUser !== null &&
                  birdTrainingCourse &&
                  birdTrainingCourse.length > 0
                    ? birdTrainingCourse
                        .filter((cls) => cls.customerId === selectedUser)
                        .map((cls) => (
                          <>
                            <TableRow key={cls.id}>
                              <TableCell
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  handleButtonClick(cls.id);
                                }}
                              >
                                {cls.birdName}
                              </TableCell>
                              <TableCell>{cls.customerName}</TableCell>
                              <TableCell>{cls.trainingCourseTitle}</TableCell>
                              <TableCell>{cls.registeredDate}</TableCell>
                              <TableCell>{cls.startTrainingDate}</TableCell>
                              <TableCell>{cls.trainingDoneDate}</TableCell>
                              <TableCell>{cls.status}</TableCell>
                              {cls.status === "Registered" && ( //Registered
                                <TableCell>
                                  <button
                                    style={{ marginRight: "18px" }}
                                    onClick={() => {
                                      handleConfirmButtonClick(cls.id);
                                      // setRenderCustomerRequest(false);
                                    }}
                                  >
                                    Confirm
                                  </button>
                                  <button>Cancel</button>
                                </TableCell>
                              )}
                              {cls.status === "Confirmed" && (
                                <TableCell>
                                  <button
                                    onClick={() => {
                                      handleCheckInButtonClick(cls.id);
                                    }}
                                  >
                                    Check In
                                  </button>
                                </TableCell>
                              )}
                              {cls.status === "CheckIn" && (
                                <TableCell>
                                  <button>Check Out</button>
                                </TableCell>
                              )}
                              {cls.status === "Training" && (
                                <TableCell>
                                  <button>Check Out</button>
                                </TableCell>
                              )}
                              {cls.status === "TrainingDone" && (
                                <TableCell>
                                  <button>Check Out</button>
                                </TableCell>
                              )}
                              {cls.status === "Checkout" && (
                                <TableCell>
                                  <button>Payment</button>
                                </TableCell>
                              )}
                              {cls.status === "Complete" && (
                                <TableCell>
                                  <button>Check Out</button>
                                </TableCell>
                              )}
                              {cls.status === "Cancel" && (
                                <TableCell></TableCell>
                              )}
                              {/* <TableCell><button>Cancel</button></TableCell> */}
                            </TableRow>
                          </>
                        ))
                    : null}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
        <Table>
          {/* <button onClick={handleShowBirdList()}>Show Bird List</button> */}

          {renderTrainingSkill && (
            <TrainingSkillComponent
              requestedId={birdTrainingCourseId} //birdTrainingCourseId
              callBackMainManagement={onCallBackMainManagement}
            />
          )}
          {showBirdList && (
            <CustomerBirdComponent
              customerId={selectedUser}
              callBackMainManagement={onCallBackMainManagement}
            />
          )}
          {renderReceiveBirdForm && (
            <ReceivedBirdComponent
              requestedId={birdTrainingCourseId} //birdTrainingCourseId
              callBackMainManagement={onCallBackMainManagement}
            />
          )}
        </Table>
      </div>
    </div>
  );
}

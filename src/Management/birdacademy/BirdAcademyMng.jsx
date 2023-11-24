import React, { useState, useEffect } from 'react'
import "./birdacademymng.scss"
import { Table, TableContainer, TableHead, TableBody, TableCell, TableRow, Paper, } from "@mui/material";
import TrainingSkillComponent from './TrainingSkillComponent';
import ReworkSidebar from '../component/sidebar/ReworkSidebar';
import CustomerBirdComponent from './CustomerBirdComponent';

export default function BirdAcademyMng () {

    const [renderCustomer, setRenderCustomer] = useState(true);
    const [renderCustomerRequest, setRenderCustomerRequest] = useState(true);

    const [keyParam, setKeyParam] = useState(null);
    const handleButtonClick = (key) => {
        setKeyParam(key);
      };
    const [selectedUser, setSelectedUser] = useState(null);

    const handleUserClick = (userId) => {
        setSelectedUser(userId);
        setKeyParam(null);
    };
    
    const [showBirdList, setShowBirdList] = useState(false);
    const handleShowBirdList = () => {
        setShowBirdList(true);
        setRenderCustomer(false);
        setRenderCustomerRequest(false);
      };
    const [users, setUsers] = useState([]);
    useEffect(() => {
        // Simulate fetching bird information based on customerId
        // Replace this with your actual API call or data fetching logic
        const fetchData = async () => {
          try {
            // Replace this URL with your actual API endpoint
            const response = await fetch(`https://localhost:7176/api/trainingcourse/all-requested-users`);
            const data = await response.json();
            setUsers(data); // Assuming data is an array of bird information
          } catch (error) {
            console.error('Error fetching bird data:', error);
          }
        };
    
        fetchData();
      }, []);
    
    const [birdTrainingCourse, setBirdTrainingCourse] = useState([]);
    useEffect(() => {
        // Simulate fetching bird information based on customerId
        // Replace this with your actual API call or data fetching logic
        const fetchData = async () => {
          try {
            // Replace this URL with your actual API endpoint
            const response = await fetch(`http://13.214.85.41/api/trainingcourse-staff/birdtrainingcourse`);
            const data = await response.json();
            //console.log(data);
            setBirdTrainingCourse(data); // Assuming data is an array of bird information
          } catch (error) {
            console.error('Error fetching bird data:', error);
          }
        };
    
        fetchData();
      }, []);

    return (
        <div className='workshop-container'>
            <ReworkSidebar />
            <div className='workshop_section-wrapper'>
                {renderCustomer && <div className='workshop_section_table workshop_section_table-workshop'>
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
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users && users.length > 0 ? (
                                    users.map((user) => (
                                        <TableRow
                                            key={user.id}
                                            style={{ cursor: "pointer", background: selectedUser === user.id ? "#f0f0f0" : "white" }}
                                        >
                                            <TableCell onClick={() => handleUserClick(user.id)}>{user.name}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>{user.phoneNumber}</TableCell>
                                            <TableCell>
                                                <a href={user.avatar} target="_blank" rel="noopener noreferrer">
                                                    <img src={user.avatar} alt="Description of the image" style={{ width: '200px', height: '150px' }}/>
                                                </a>
                                            </TableCell>
                                            <TableCell>
                                                {selectedUser != null && <button onClick={() => handleShowBirdList()}>Show Bird List</button>}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : null}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>}
                {renderCustomerRequest && <div className='workshop_section_table workshop_section_table-classes'>
                    <h2>Registered TrainingCourse</h2>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Bird Name</TableCell>
                                    <TableCell>Owner Name</TableCell>
                                    <TableCell>Course Title</TableCell>
                                    <TableCell>Date registered</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {selectedUser !== null && birdTrainingCourse && birdTrainingCourse.length > 0
                                    ? birdTrainingCourse
                                        .filter((cls) => cls.customerId === selectedUser)
                                        .map((cls) => (
                                            <><TableRow key={cls.id}>
                                                <TableCell>{cls.birdName}</TableCell>
                                                <TableCell>{cls.customerName}</TableCell>
                                                <TableCell>{cls.trainingCourseTitle}</TableCell>
                                                <TableCell>{cls.registeredDate}</TableCell>
                                                <TableCell>{cls.status}</TableCell>
                                                {cls.status === "Registered" &&  //Registered
                                                    <TableCell>
                                                        <button style={{marginRight:'18px'}} onClick={() => {
                                                            handleButtonClick(cls.id);
                                                            // setRenderCustomerRequest(false);
                                                            }}>
                                                            Confirm
                                                        </button>
                                                        <button>Cancel</button>
                                                    </TableCell>}
                                                {cls.status === "Confirmed" && (
                                                    <TableCell><button>Check In</button></TableCell>
                                                )}
                                                {cls.status === "CheckIn" && <TableCell><button>Check Out</button></TableCell>}
                                                {cls.status === "Training" && <TableCell><button>Check Out</button></TableCell>}
                                                {cls.status === "TrainingDone" && <TableCell><button>Check Out</button></TableCell>}
                                                {cls.status === "Checkout" && <TableCell><button>Payment</button></TableCell>}
                                                {cls.status === "Complete" && <TableCell><button>Check Out</button></TableCell>}
                                                {cls.status === "Cancel" && <TableCell></TableCell>}
                                                {/* <TableCell><button>Cancel</button></TableCell> */}
                                            </TableRow>
                                                    
                                            </>
                                        ))
                                    : null}
                            </TableBody>
                        </Table>
                        {keyParam !== null  && (
                            <TrainingSkillComponent keyParam={keyParam} />
                        )}
                    </TableContainer>
                </div>}
                <Table>
                    {/* <button onClick={handleShowBirdList()}>Show Bird List</button> */}

                    {showBirdList && <CustomerBirdComponent customerId={selectedUser}/>}
                </Table>
            </div>
        </div>
    )
}
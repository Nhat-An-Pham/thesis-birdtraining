import React, { useState } from 'react'
import Sidebar from '../component/sidebar/Sidebar'
import "./birdacademymng.scss"
import { Table, TableContainer, TableHead, TableBody, TableCell, TableRow, Paper, } from "@mui/material";
import TrainingSkillComponent from './TrainingSkillComponent';

const BirdAcademyMng = () => {

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

    const users = [
        { id: 1, name: "Pham Nhat An", address: "17 Pasteur", phoneNumber: "0904560264"},
        { id: 2, name: "Hoang Dinh Thong", address: "17 Pasteur", phoneNumber: "0904560264"},
        { id: 3, name: "Nguyen Thanh Trung", address: "17 Pasteur", phoneNumber: "0904560264"},
        
    ];

    const birds = [
        { id: 1, name: "Class 1", trainer: "Trainer A", currentClass: "Talking", classTaken: "Talking", userId: 1 },
        { id: 2, name: "Class 2", trainer: "Trainer B", currentClass: "Talking",classTaken: "Talking", userId: 1 },
        { id: 3, name: "Class 3", trainer: "Trainer C", currentClass: "Talking",classTaken: "Talking", userId: 2 },
        { id: 4, name: "Class 4", trainer: "Trainer D", currentClass: "Talking",classTaken: "Talking", userId: 2 },
    ];

    const birdTrainingCourse = [
        { id: 1, trainingCourseId: "1", birdName: "Bird 1", customerName: "Pham Nhat An", trainingCourseTitle: "Flying lv1", userId: 1, registeredDate:"registeredDate",status:"registered" },
        { id: 2, trainingCourseId: "2", birdName: "Bird B", customerName: "Pham Nhat An",trainingCourseTitle: "Flying lv2 ", userId: 1, registeredDate:"registeredDate",status:"confirmed" },
        { id: 3, trainingCourseId: "1", birdName: "Bird C", customerName: "Hoang Dinh Thong",trainingCourseTitle: "Talking English", userId: 2, registeredDate:"registeredDate",status:"training" },
        { id: 4, trainingCourseId: "4", birdName: "Bird D", customerName: "Hoang Dinh Thong",trainingCourseTitle: "Talking", userId: 2, registeredDate:"registeredDate",status:"checkin" },
        { id: 5, trainingCourseId: "1", birdName: "Bird E", customerName: "Nguyen Thanh Trung",trainingCourseTitle: "Talking Vietnamese", userId: 3, registeredDate:"registeredDate",status:"registered" },
        { id: 6, trainingCourseId: "1", birdName: "Bird E", customerName: "Nguyen Thanh Trung",trainingCourseTitle: "Flying circle", userId: 3, registeredDate:"registeredDate",status:"confirmed" },
        { id: 7, trainingCourseId: "1", birdName: "Bird E", customerName: "Nguyen Thanh Trung",trainingCourseTitle: "Fly-Racing", userId: 3, registeredDate:"registeredDate",status:"checkin" },
        { id: 8, trainingCourseId: "1", birdName: "Bird E", customerName: "Nguyen Thanh Trung",trainingCourseTitle: "Fly-Performing", userId: 3, registeredDate:"registeredDate",status:"checkout" },
        { id: 9, trainingCourseId: "1", birdName: "Bird E", customerName: "Nguyen Thanh Trung",trainingCourseTitle: "Talking Chinese", userId: 3, registeredDate:"registeredDate",status:"training" },
        { id: 10, trainingCourseId: "1", birdName: "Bird E", customerName: "Nguyen Thanh Trung",trainingCourseTitle: "Good behavior", userId: 3, registeredDate:"registeredDate",status:"trainingdone" },
        { id: 11, trainingCourseId: "1", birdName: "Bird E", customerName: "Nguyen Thanh Trung",trainingCourseTitle: "Singing", userId: 3, registeredDate:"registeredDate",status:"complete" },
    ];
    

    return (
        <div className='workshop-container'>
            <Sidebar />
            <div className='workshop_section-wrapper'>
                {renderCustomer && <div className='workshop_section_table workshop_section_table-workshop'>
                    <h2>Customers</h2>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Customer Name</TableCell>
                                    <TableCell>Address</TableCell>
                                    <TableCell>Phone Number</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users && users.length > 0 ? (
                                    users.map((user) => (
                                        <TableRow
                                            key={user.id}
                                            onClick={() => handleUserClick(user.id)}
                                            style={{ cursor: "pointer", background: selectedUser === user.id ? "#f0f0f0" : "white" }}
                                        >
                                            <TableCell>{user.name}</TableCell>
                                            <TableCell>{user.address}</TableCell>
                                            <TableCell>{user.phoneNumber}</TableCell>
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
                                        .filter((cls) => cls.userId === selectedUser)
                                        .map((cls) => (
                                            <><TableRow key={cls.id}>
                                                <TableCell>{cls.birdName}</TableCell>
                                                <TableCell>{cls.customerName}</TableCell>
                                                <TableCell>{cls.trainingCourseTitle}</TableCell>
                                                <TableCell>{cls.registeredDate}</TableCell>
                                                <TableCell>{cls.status}</TableCell>
                                                {cls.status === "registered" &&
                                                    <TableCell>
                                                        <button style={{marginRight:'18px'}} onClick={() => {
                                                            handleButtonClick(cls.id);
                                                            // setRenderCustomerRequest(false);
                                                            }}>
                                                            Confirm
                                                        </button>
                                                        <button>Cancel</button>
                                                    </TableCell>}
                                                {cls.status === "confirmed" && (
                                                    <TableCell><button>Check In</button></TableCell>
                                                )}
                                                {cls.status === "checkin" && <TableCell><button>Check Out</button></TableCell>}
                                                {cls.status === "training" && <TableCell><button>Check Out</button></TableCell>}
                                                {cls.status === "trainingdone" && <TableCell><button>Check Out</button></TableCell>}
                                                {cls.status === "checkout" && <TableCell><button>Payment</button></TableCell>}
                                                {cls.status === "complete" && <TableCell><button>Check Out</button></TableCell>}
                                                {/* <TableCell><button>Cancel</button></TableCell> */}
                                            </TableRow>
                                                    
                                            </>
                                        ))
                                    : null}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>}
                {keyParam !== null  && (
                    <TrainingSkillComponent keyParam={keyParam} />
                )}
            </div>
        </div>
    )
}

export default BirdAcademyMng
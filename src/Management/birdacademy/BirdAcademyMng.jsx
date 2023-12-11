import React, { useState, useEffect } from "react";
import "./birdacademymng.scss";
import "../workshoppane/workshoppane.scss";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  ThemeProvider,
  Button,
  Grid,
} from "@mui/material";
import TrainingSkillComponent from "./TrainingSkillComponent";
import ReworkSidebar from "../component/sidebar/ReworkSidebar";
import CustomerBirdComponent from "./CustomerBirdComponent";
import trainingCourseManagementService from "../../../src/services/trainingcourse-management.service";
import ReceivedBirdComponent from "./ReceivedBirdComponent";
import ReturnBirdComponent from "./ReturnBirdComponent";
import TrainingCourseMng from "./manager/TrainingCourseMng";
import { ToastContainer, toast } from "react-toastify";
import { ochreTheme } from "../themes/Theme";
import addonService from "../../services/addon.service";
import BirdAcademyTab from "./BirdAcademyTab";
//const ACCESS_TOKEN = JSON.parse(localStorage.getItem("user-token"));

export default function BirdAcademyMng() {
  const currentUser = trainingCourseManagementService.getCurrentUser();
  const [renderCustomer, setRenderCustomer] = useState(true);
  const [renderCustomerRequest, setRenderCustomerRequest] = useState(true);
  const [renderTrainingSkill, setRenderTrainingSkill] = useState(false);
  const [renderReceiveBirdForm, setRenderReceiveBirdForm] = useState(false);
  const [renderReturnBirdForm, setRenderReturnBirdForm] = useState(false);
  const [renderManager, setRenderManager] = useState(false);

  const [birdTrainingCourseId, setBirdTrainingCourseId] = useState(null); //birdTrainingCourseId
  const handleCancelButtonClick = async (key) => {
    setBirdTrainingCourseId(key); //setBirdTrainingCourseId
    console.log(key);
    let params = {
      birdTrainingCourseId: key,
    };
    trainingCourseManagementService
      .cancelBirdTrainingCourse(params)
      .then((response) => {
        // Handle the response data
        console.log("Success:", response);
        toast.success("Cancel success!");
        onCallBackMainManagement();
      })
      .catch((error) => {
        // Handle errors
        console.log("Error:" + error.response);
      });
  };
  const handleConfirmButtonClick = async (key) => {
    setBirdTrainingCourseId(key); //setBirdTrainingCourseId
    let params = {
      birdTrainingCourseId: key,
    };
    await trainingCourseManagementService
      .confirmBirdTrainingCourse(params)
      .then((response) => {
        // Handle the response data
        console.log("Success:", response.data);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });
    console.log(key); //birdTrainingCourseId
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
  const handleTrainingSkillViewClick = (key) => {
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
      let params = {
        $orderby: "registeredDate desc",
      };
      let response =
        await trainingCourseManagementService.getAllBirdTrainingCourse(params);
      console.log(response);
      setBirdTrainingCourse(response); // Assuming data is an array of bird information
    } catch (error) {
      console.error("Error fetching bird data:", error);
    }
  }; // Simulate fetching bird information based on customerId
  // Replace this with your actual API call or data fetching logic
  const fetchCustomerData = async () => {
    try {
      // Replace this URL with your actual API endpoint
      let response =
        await trainingCourseManagementService.getAllRequestedUser();
      setUsers(response); // Assuming data is an array of bird information
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
    setRenderCustomer(false);
    setRenderCustomerRequest(false);
    setRenderReceiveBirdForm(true);
  };
  const handleCheckOutButtonClick = (requestedId) => {
    setBirdTrainingCourseId(requestedId); //setBirdTrainingCourseId
    setRenderCustomer(false);
    setRenderCustomerRequest(false);
    setRenderReturnBirdForm(true);
  };
  const onCallBackMainManagement = async () => {
    fetchCustomerData();
    fetchBirdTrainingCourseData();
    setRenderCustomer(true);
    setRenderCustomerRequest(true);
    setRenderTrainingSkill(false);
    setShowBirdList(false);
    setRenderReceiveBirdForm(false);
    setRenderReturnBirdForm(false);
    setRenderManager(false);
  };
  const handleManagerClick = () => {
    setRenderCustomer(false);
    setRenderCustomerRequest(false);
    setRenderTrainingSkill(false);
    setShowBirdList(false);
    setRenderReceiveBirdForm(false);
    setRenderReturnBirdForm(false);
    setRenderManager(true);
  };
  return (
    <div className="workshop-container">
      {/* <BirdAcademyTab /> */}
      {/* <ToastContainer /> */}
      <ThemeProvider theme={ochreTheme}>
        {/* <ReworkSidebar selectTab={5} /> */}
        {/* <div style={{ margin: "20px" }} className="workshop_section-wrapper"> */}
        <Grid container>
          <Grid item xs={12}>
            {renderCustomer && (
              // <div className="workshop_section_table workshop_section_table-workshop">
              <div
                style={{
                  paddingLeft: 40,
                  paddingRight: 40,
                  paddingTop: 20,
                  paddingBottom: 20,
                }}
              >
                {/* {currentUser.role == "Manager" && (
                  <Button
                    sx={{ float: "right", marginBottom: "20px" }}
                    variant="contained"
                    color="ochre"
                    onClick={() => handleManagerClick()}
                  >
                    Training course management
                  </Button>
                )} */}
                <h2>Customers</h2>
                <TableContainer
                  component={Paper}
                  sx={{
                    boxShadow:
                      "0px 2px 4px 2px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
                    borderRadius: 3,
                  }}
                >
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 700 }}>
                          Customer Name
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>
                          Phone Number
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>Avatar</TableCell>
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
                                  selectedUser === user.id
                                    ? "#f0f0f0"
                                    : "white",
                              }}
                            >
                              <TableCell
                                sx={{
                                  wordBreak: "break-word",
                                  maxWidth: "50em",
                                }}
                              >
                                {user.name}
                              </TableCell>
                              <TableCell
                                sx={{
                                  wordBreak: "break-word",
                                  maxWidth: "50em",
                                }}
                              >
                                {user.email}
                              </TableCell>
                              <TableCell
                                sx={{
                                  wordBreak: "break-word",
                                  maxWidth: "50em",
                                }}
                              >
                                {user.phoneNumber}
                              </TableCell>
                              <TableCell
                                sx={{
                                  wordBreak: "break-word",
                                  maxWidth: "50em",
                                }}
                                className="image-cell"
                              >
                                <a
                                  href={user.avatar}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <img
                                    src={user.avatar}
                                    alt="Customer avatar"
                                  />
                                </a>
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant="contained"
                                  color="ochre"
                                  onClick={() => handleUserClick(user.id)}
                                >
                                  View Request
                                </Button>
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant="contained"
                                  color="ochre"
                                  onClick={() => handleShowBirdList(user.id)}
                                >
                                  Show Bird List
                                </Button>
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
              // <div className="workshop_section_table workshop_section_table-classes">
              <div style={{ padding: 40 }}>
                <h2>Registered TrainingCourse</h2>
                <TableContainer
                  component={Paper}
                  sx={{
                    boxShadow:
                      "0px 2px 4px 2px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
                    borderRadius: 3,
                  }}
                >
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 700 }}>
                          Bird Name
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>
                          Owner Name
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>
                          Course Title
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>
                          Registered
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>
                          Training start date
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>
                          Training done date
                        </TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
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
                                  <TableCell>{cls.birdName}</TableCell>
                                  <TableCell>{cls.customerName}</TableCell>
                                  <TableCell>
                                    {cls.trainingCourseTitle}
                                  </TableCell>
                                  <TableCell>{cls.registeredDate}</TableCell>
                                  <TableCell>
                                    {cls.startTrainingDate != null
                                      ? addonService.formatDate(
                                          cls.startTrainingDate
                                        )
                                      : ""}
                                  </TableCell>
                                  <TableCell>
                                    {cls.trainingDoneDate != null
                                      ? addonService.formatDate(
                                          cls.trainingDoneDate
                                        )
                                      : ""}
                                  </TableCell>
                                  <TableCell>{cls.status}</TableCell>
                                  {cls.status === "Registered" && ( //Registered
                                    <TableCell>
                                      <Button
                                        style={{ fontSize: 14 }}
                                        onClick={() => {
                                          handleConfirmButtonClick(cls.id);
                                          // setRenderCustomerRequest(false);
                                        }}
                                      >
                                        Confirm
                                      </Button>
                                      <Button
                                        style={{ fontSize: 14 }}
                                        onClick={() => {
                                          handleCancelButtonClick(cls.id);
                                          // setRenderCustomerRequest(false);
                                        }}
                                      >
                                        Cancel
                                      </Button>
                                    </TableCell>
                                  )}
                                  {cls.status === "Confirmed" && (
                                    <TableCell>
                                      <Button
                                        style={{ fontSize: 14 }}
                                        onClick={() => {
                                          handleCheckInButtonClick(cls.id);
                                        }}
                                      >
                                        Check In
                                      </Button>
                                      <Button
                                        style={{ fontSize: 14 }}
                                        onClick={() => {
                                          handleCancelButtonClick(cls.id);
                                          // setRenderCustomerRequest(false);
                                        }}
                                      >
                                        Cancel
                                      </Button>
                                    </TableCell>
                                  )}
                                  {cls.status === "CheckIn" && (
                                    <TableCell>
                                      <Button
                                        style={{ fontSize: 14 }}
                                        onClick={() => {
                                          handleCheckOutButtonClick(cls.id);
                                        }}
                                      >
                                        Check Out
                                      </Button>
                                    </TableCell>
                                  )}
                                  {cls.status === "Training" && (
                                    <TableCell>
                                      <Button
                                        style={{ fontSize: 14 }}
                                        onClick={() => {
                                          handleCheckOutButtonClick(cls.id);
                                        }}
                                      >
                                        Check Out
                                      </Button>
                                    </TableCell>
                                  )}
                                  {cls.status === "TrainingDone" && (
                                    <TableCell>
                                      <Button
                                        style={{ fontSize: 14 }}
                                        onClick={() => {
                                          handleCheckOutButtonClick(cls.id);
                                        }}
                                      >
                                        Check Out
                                      </Button>
                                    </TableCell>
                                  )}
                                  {cls.status === "CheckOut" && (
                                    <TableCell>
                                      <Button style={{ fontSize: 14 }}>
                                        Payment
                                      </Button>
                                    </TableCell>
                                  )}
                                  {cls.status === "Complete" && (
                                    <TableCell></TableCell>
                                  )}
                                  {cls.status === "Cancel" && (
                                    <TableCell>
                                      <Button
                                        style={{ fontSize: 14 }}
                                        onClick={() => {
                                          handleConfirmButtonClick(cls.id);
                                          // setRenderCustomerRequest(false);
                                        }}
                                      >
                                        Confirm
                                      </Button>
                                    </TableCell>
                                  )}
                                  {cls.status !== "Registered" &&
                                  cls.status !== "Cancel" ? (
                                    <TableCell>
                                      <Button
                                        style={{ fontSize: 14 }}
                                        onClick={() => {
                                          handleTrainingSkillViewClick(cls.id);
                                        }}
                                      >
                                        View Details
                                      </Button>
                                    </TableCell>
                                  ) : (
                                    <TableCell></TableCell>
                                  )}
                                </TableRow>
                              </>
                            ))
                        : null}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            )}
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
            {renderReturnBirdForm && (
              <ReturnBirdComponent
                requestedId={birdTrainingCourseId} //birdTrainingCourseId
                callBackMainManagement={onCallBackMainManagement}
              />
            )}
            {renderManager && (
              <TrainingCourseMng
                callBackMainManagement={onCallBackMainManagement}
              />
            )}
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
}

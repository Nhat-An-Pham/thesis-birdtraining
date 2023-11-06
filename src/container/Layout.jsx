import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import ScrollTop from "../components/ScrollTop"
import React from 'react';

import HomePage from '../pages/HomePage';
import NavbarMain from './NavbarMain';
import Footer from './Footer';

import Consultation from '../pages/ConsultationPage';
import Workshop from '../pages/WorkshopPage';
import OnlineCourse from '../pages/OnlineCoursePage';
import CourseListPage from '../pages/CourseListPage';
import CourseDetailPage from '../pages/CourseDetailPage';
import WorkshopListPage from '../pages/WorkshopListPage';
import TrainingAcademyPage from '../pages/TrainingAcademyPage';

import Login from '../pages/Login';

//component
import HideComponent from '../components/hidecomponent/HideComponent';
import Dashboard from '../Management/dashboard/Dashboard';
import UserData from '../Management/userdata/UserData';
import TimeTable from '../Management/timetable/Timetable';
import SignUp from '../pages/SignUp';
import Payment from '../pages/Payment';
import CustomerReq from '../Management/customer/CustomerReq';
import Certificate from '../components/certificate/Certificate';
import WClassListPage from '../pages/WClassListPage';
import WorkshopManagement from '../Management/workshop/Workshop'
import BirdAcademyMng from '../Management/birdacademy/BirdAcademyMng';
import PrivateRoutes from './PrivateRoutes';

function Layout() {

  return (
    <>
      <header>
        <HideComponent>
          <NavbarMain />
        </HideComponent>
      </header>
      <div className='body'>

        <ScrollTop />
        <Routes>
          {/* Catch All */}
          <Route path='/' exact element={<HomePage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/courses' element={<OnlineCourse />} />
          <Route path='/courseslist' element={<CourseListPage />} />
          <Route path='/courseslist/:courseid' element={<CourseDetailPage />} />
          <Route path="/consultation" element={<Consultation />} />
          <Route path="/workshops" element={<Workshop />} />
          <Route path="/workshopslist" element={<WorkshopListPage />} />
          <Route path="/workshopslist/:workshopid" element={<WClassListPage />} />
          <Route path="/workshopslist/:workshopid/classes/:wclassid" element={<WorkshopListPage />} />
          <Route path="/birdacademy" element={<TrainingAcademyPage />} />

          {/* Payment */}
          <Route path="/payment" element={<Payment />} />
          <Route path="/certificate" element={<Certificate />} />

          {/* login signup */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* private pages */}
          <Route element={<PrivateRoutes/>} >
            <Route path="/management" exact element={<Dashboard />} />
            <Route path="/management/customerreq" exact element={<CustomerReq />} />
            <Route path="/management/timetable" exact element={<TimeTable />} />
            <Route path="/management/birdacademy" exact element={<BirdAcademyMng />} />
            <Route path="/management/workshop" exact element={<WorkshopManagement />} />
            <Route path="/management/userdata" exact element={<UserData />} />
          </Route>
        </Routes>

      </div>
      <footer>
        <HideComponent>
          <Footer />
        </HideComponent>
      </footer>
    </>
  );
}

export default Layout;

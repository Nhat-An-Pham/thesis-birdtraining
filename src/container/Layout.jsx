import { BrowserRouter, Outlet, Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import ScrollTop from "../components/ScrollTop"

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


function Layout4Route() {
  return (
    <div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

function Layout() {
  return (
    <>
      <header>
        <NavbarMain />
      </header>
      <div className='body'>
        <BrowserRouter>
          <ScrollTop />
          <Routes>
            {/* Pages */}
            <Route path='/' exact element={<HomePage />} />
            <Route path='/home' element={<HomePage />} />
            <Route path='/courses' element={<OnlineCourse />} />
            <Route path='/courseslist' element={<CourseListPage />} />
            <Route path='/courseslist/:courseid' element={<CourseDetailPage />} />
            <Route path="/consultation" element={<Consultation />} />
            <Route path="/workshops" element={<Workshop />} />
            <Route path="/workshopslist" element={<WorkshopListPage />} />
            <Route path="/birdacademy" element={<TrainingAcademyPage />} />
          </Routes>
        </BrowserRouter>
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default Layout;

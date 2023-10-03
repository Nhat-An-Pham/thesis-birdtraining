import { BrowserRouter, Outlet, Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import NavbarMain from './NavbarMain';
import Footer from './Footer';

import Consultation from '../pages/ConsultationPage';
import Workshop from '../pages/WorkshopPage';
import OnlineCourse from '../pages/OnlineCoursePage';


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
          <Routes>
            {/* Pages */}
            <Route path='/' exact element={<HomePage />} />
            <Route path='/home'  element={<HomePage />} />
            <Route path='/courses'  element={<OnlineCourse />} />
            <Route path="/consultation"  element={<Consultation />} />
            <Route path="/workshops"  element={<Workshop />} />
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

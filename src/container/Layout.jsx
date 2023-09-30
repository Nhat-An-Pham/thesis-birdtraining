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
      <NavbarMain/>
    </header>
    <body className='body'>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout4Route />}>
          {/* Pages */}
          <Route path='/home' exact element={<HomePage />} />
          <Route path='/courses' exact element={<OnlineCourse />} />
          <Route path="*" exact element={<HomePage />} />
        </Route>
        <Route element={<Outlet />}>
          <Route path="/consultation" exact element={<Consultation />} />
          <Route path="/workshops" exact element={<Workshop />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </body>
    <footer>
      <Footer/>
    </footer>
    </>
  );
}

export default Layout;

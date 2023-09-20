import { BrowserRouter, Outlet, Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';

import Home from '../pages/Home';
import NavbarMain from './NavbarMain';
import Footer from './Footer';

import Consultation from '../pages/Consultation';
import Workshop from '../pages/Workshop';

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
          <Route path='/home' exact element={<Home />} />
          <Route path="*" exact element={<Home />} />
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

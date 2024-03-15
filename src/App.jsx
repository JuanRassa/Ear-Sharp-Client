import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import NavbarMaster from './modules/Navbar/NavbarMaster';
import NavbarLogged from './modules/Navbar/NavbarLogged';
import NavbarNotLogged from './modules/Navbar/NavbarNotLogged';
import Home from './pages/Home';
import IsLogged from './components/IsLogged';
import Authenticate from './pages/Authenticate';
import RoleGate from './components/RoleGate';
import SuperAdmin from './pages/portals/SuperAdmin/SuperAdmin';
import UserDetails from './pages/portals/SuperAdmin/UserDetails';
import OrganizationAdmin from './pages/portals/OrganizationAdmin';
import TeacherPortal from './pages/portals/TeacherPortal';
import StudentPortal  from './pages/portals/StudentPortal';
import MyProgress from './pages/portals/MyProgress';
import NotFound404 from './pages/NotFound404';

import { ThemeContext } from './context/theme.context';
import './App.css';

function App() {
  const { isDarkThemeOn } = useContext(ThemeContext);
  return (
    <div className={ `App ${ isDarkThemeOn ? "" : "light-theme" }` }>
        <NavbarMaster>
          <NavbarLogged/>
          <NavbarNotLogged />
        </NavbarMaster>
        
        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path='/authenticate' element={ <Authenticate /> } />
          <Route 
            path='/admin/' 
            element={
              <IsLogged>
                <RoleGate allowedRole="SuperAdmin">
                  <SuperAdmin />
                </RoleGate> 
              </IsLogged>
            } 
          />
          <Route 
            path='/admin/user/:userId' 
            element={
              <IsLogged>
                <RoleGate allowedRole="SuperAdmin">
                  <UserDetails />
                </RoleGate> 
              </IsLogged>
            } 
          />
          <Route 
            path='/organization-portal/:id' 
            element={
              <IsLogged>
                <RoleGate allowedRole="OrganizationAdmin">
                  <OrganizationAdmin />
                </RoleGate> 
              </IsLogged>
            } 
          />
          <Route 
            path='/teacher-portal' 
            element={ 
              <IsLogged>
                <RoleGate allowedRole="Teacher">
                  <TeacherPortal />
                </RoleGate> 
              </IsLogged>
            } 
          />
          <Route 
            path='/student-portal' 
            element={ 
              <IsLogged>
                <RoleGate allowedRole="Student">
                  <StudentPortal />
                </RoleGate> 
              </IsLogged>
            } 
          />
          <Route 
            path='/my-progress' 
            element={
              <IsLogged>
                <RoleGate allowedRole="Solo">
                  <MyProgress /> 
                </RoleGate> 
              </IsLogged>
            } 
          />
          <Route path='*' element={ <NotFound404 /> } />
        </Routes>

    </div>
  );
}

export default App;

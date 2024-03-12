import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import NavbarMaster from './modules/Navbar/NavbarMaster';
import NavbarLogged from './modules/Navbar/NavbarLogged';
import NavbarNotLogged from './modules/Navbar/NavbarNotLogged';
import Home from './pages/Home';
import IsLogged from './components/IsLogged';
import Authenticate from './pages/Authenticate';
import UserGate from './components/UserGate';
import SuperAdmin from './pages/portals/SuperAdmin';
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
                <UserGate allowedRole="SuperAdmin">
                  <SuperAdmin />
                </UserGate> 
              </IsLogged>
            } 
          />
          <Route 
            path='/organization-portal/:id' 
            element={
              <IsLogged>
                <UserGate allowedRole="OrganizationAdmin">
                  <OrganizationAdmin />
                </UserGate> 
              </IsLogged>
            } 
          />
          <Route 
            path='/teacher-portal' 
            element={ 
              <IsLogged>
                <UserGate allowedRole="Teacher">
                  <TeacherPortal />
                </UserGate> 
              </IsLogged>
            } 
          />
          <Route 
            path='/student-portal' 
            element={ 
              <IsLogged>
                <UserGate allowedRole="Student">
                  <StudentPortal />
                </UserGate> 
              </IsLogged>
            } 
          />
          <Route 
            path='/my-progress' 
            element={
              <IsLogged>
                <UserGate allowedRole="Solo">
                  <MyProgress /> 
                </UserGate> 
              </IsLogged>
            } 
          />
          <Route path='*' element={ <NotFound404 /> } />
        </Routes>

    </div>
  );
}

export default App;

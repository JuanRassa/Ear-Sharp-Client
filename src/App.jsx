import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavbarLogged from './components/NavbarLogged';
import Home from './pages/Home';
import Authenticate from './pages/Authenticate';
import Signup from './modules/auth/Signup';
import Login from './modules/auth/Login';
// import ProjectsList from './pages/ProjectsList';
// import CreateProject from './pages/CreateProject';
// import ProjectDetails from './pages/ProjectDetails';
// import EditProject from './pages/EditProject';
import { ThemeContext } from './context/theme.context';
import './App.css';

function App() {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`App ${theme}`}>
        <NavbarLogged />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/authenticate' element={<Authenticate />} />
        </Routes>

    </div>
  );
}

export default App;

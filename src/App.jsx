import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Signup from './modules/auth/Signup';
import Login from './modules/auth/Login';
// import ProjectsList from './pages/ProjectsList';
// import CreateProject from './pages/CreateProject';
// import ProjectDetails from './pages/ProjectDetails';
// import EditProject from './pages/EditProject';
import { ThemeContext } from './context/theme.context';
import IsPrivate from './components/IsPrivate';
import IsAnon from './components/IsAnon';
import './App.css';

function App() {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`App ${theme}`}>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;

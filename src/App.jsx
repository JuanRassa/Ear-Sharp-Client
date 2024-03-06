import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
// import Signup from './pages/Signup';
// import Login from './pages/Login';
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
      </Routes>
    </div>
  );
}

export default App;
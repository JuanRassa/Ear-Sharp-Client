import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import NavbarLogged from './modules/Navbar/NavbarLogged';
import Home from './pages/Home';
import Authenticate from './pages/Authenticate';

import { ThemeContext } from './context/theme.context';
import './App.css';

function App() {
  const { isDarkThemeOn } = useContext(ThemeContext);
  return (
    <div className={`App ${isDarkThemeOn ? "" : "light-theme"}`}>
        <NavbarLogged />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/authenticate' element={<Authenticate />} />
        </Routes>

    </div>
  );
}

export default App;

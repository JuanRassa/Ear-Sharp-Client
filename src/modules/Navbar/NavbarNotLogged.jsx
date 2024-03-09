import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../context/theme.context';
import { AuthContext } from '../../context/auth.context';


const NavbarNotLogged = () => {
  const { isDarkThemeOn, toggleTheme } = useContext(ThemeContext);
  const { loadingContext, loggedContext, userContext, logoutUser } = useContext(AuthContext);
  
  return (
    <nav className={`NavbarNotLogged ${isDarkThemeOn ? "" : "ligh-theme"}`}>
      <Link to='/'>
        <button>Home</button>
      </Link>
      <Link to='/'>
        <button>Join Us!</button>
      </Link>
      <Link to='/'>
        <button>About Us</button>
      </Link>
      {loggedContext.isLoggedIn && (
        <>
          <button
            onClick={() => {
              logoutUser();
            }}>
            Logout
          </button>
        </>
      )}
      <button onClick={toggleTheme}>{isDarkThemeOn ? 'dark' : 'light'}</button>
    </nav>
  );
}

export default NavbarNotLogged;

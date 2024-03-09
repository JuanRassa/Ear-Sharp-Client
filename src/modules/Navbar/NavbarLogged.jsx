import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../context/theme.context';
import { AuthContext } from '../../context/auth.context';


function NavbarLogged() {
  const { isDarkThemeOn, toggleTheme } = useContext(ThemeContext);
  const { loadingContext, loggedContext, userContext, logoutUser } = useContext(AuthContext);
  
  return (
    <nav className={`NavbarLogged ${isDarkThemeOn ? "" : "ligh-theme"}`}>
      <Link to='/'>
        <button>Home</button>
      </Link>
      <Link to='/'>
        <button>My Progress</button>
      </Link>
      <Link to='/'>
        <button>Teacher Portal</button>
      </Link>
      <Link to='/'>
        <button>Student Portal</button>
      </Link>
      <Link to='/'>
        <button>My Account</button>
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

export default NavbarLogged;

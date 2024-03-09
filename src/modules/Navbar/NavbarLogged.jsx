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
        <button>zzz</button>
      </Link>
      <Link to='/'>
        <button>yyy</button>
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

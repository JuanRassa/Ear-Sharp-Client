import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../context/theme.context';
import { AuthContext } from '../../context/auth.context';


function NavbarLogged() {
  const { isDarkThemeOn, toggleTheme } = useContext(ThemeContext);
  const { loadingContext, loggedContext, userContext, logoutUser } = useContext(AuthContext);
  console.log("userContext", userContext.user)

  const portalLinkButtonJSX = () => {
    if (userContext.user.is_super_admin) {
      return (
        <Link to='/'>
          <button>Super Admin Portal</button>
        </Link>
      )
    } else if (userContext.user.is_org_admin) {
      return (
        <Link to='/'>
          <button>Organization Portal</button>
        </Link>
      )
    } else if (userContext.user.is_teacher) {
      return (
        <Link to='/'>
          <button>Teacher Portal</button>
        </Link>
      )
    } else if (userContext.user.is_student) {
      return (
        <Link to='/'>
          <button>Student Portal</button>
        </Link>
      )
    } else {  
      return (
        <Link to='/'>
          <button>My Progress</button>
        </Link>
      )
    } 
  }

  return (
    <nav className={`NavbarLogged ${isDarkThemeOn ? "" : "ligh-theme"}`}>
      <Link to='/'>
        <button>Home</button>
      </Link>
      {portalLinkButtonJSX()}
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

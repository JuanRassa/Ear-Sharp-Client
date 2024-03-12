import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../context/theme.context';
import { AuthContext } from '../../context/auth.context';


function NavbarLogged() {
  const { isDarkThemeOn, toggleTheme } = useContext(ThemeContext);
  const { loadingContext, loggedContext, userContext, logoutUser } = useContext(AuthContext);
  console.log("userContext", userContext.user)

  const portalLinkButtonJSX = () => {
    if (userContext.user.role === "SuperAdmin") {
      return (
        <Link to='/admin'>
          <button>Super Admin Portal</button>
        </Link>
      )
    } else if (userContext.user.role === "OrganizationAdmin") {
      return (
        <Link to='/organization-portal/1'>
          <button>Organization Portal</button>
        </Link>
      )
    } else if (userContext.user.role === "Teacher") {
      return (
        <Link to='/teacher-portal'>
          <button>Teacher Portal</button>
        </Link>
      )
    } else if (userContext.user.role === "Student") {
      return (
        <Link to='/student-portal'>
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

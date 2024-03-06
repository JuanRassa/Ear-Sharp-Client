import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/theme.context';
import { AuthContext } from '../context/auth.context';

function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { loadingContext, loggedContext, userContext, logoutUser } = useContext(AuthContext);

  console.log('loggedContext', loggedContext.isLoggedIn);
  return (
    <nav className={`Navbar ${theme}`}>
      <Link to='/'>
        <button>Home</button>
      </Link>
      <Link to='/projects'>
        <button>Projects</button>
      </Link>
      <Link to='/projects/create'>
        <button>Create Project</button>
      </Link>
      {!loggedContext.isLoggedIn && (
        <>
          <Link to='/signup'>
            <button>Signup</button>
          </Link>
          <Link to='/login'>
            <button>Login</button>
          </Link>
        </>
      )}
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
      <button onClick={toggleTheme}>{theme === 'light' ? 'dark' : 'light'}</button>
    </nav>
  );
}

export default Navbar;

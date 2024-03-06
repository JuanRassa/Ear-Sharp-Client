import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
function Home() {
  const {
    userContext: { user },
  } = useContext(AuthContext);

  return (
    <div>
      <h1>{user && user.name + ','} Welcome to Project Manager!</h1>
    </div>
  );
}

export default Home;

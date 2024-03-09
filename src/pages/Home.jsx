import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import IsLogged from '../components/IsLogged';

function Home() {


  const {
    userContext: { user },
  } = useContext(AuthContext);

  return (
    <>
      <IsLogged>
        <div>
          <h1>Ear Sharp</h1>
        </div>
      </IsLogged>
    </>
  );
}

export default Home;

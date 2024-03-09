import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import IsAnon from '../components/IsAnon';
import SwitchLayout from '../modules/SwitchLayout/SwitchLayout';
import Login from '../modules/auth/Login';
import Signup from '../modules/auth/Signup';


function Home() {


  const {
    userContext: { user },
  } = useContext(AuthContext);

  return (
    <div>
      <h1>Ear Sharp</h1>
      <SwitchLayout>
        <Signup /> 
        <Login/>
      </SwitchLayout>
    </div>
  );
}

export default Home;

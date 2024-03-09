import React from 'react'
import IsNotLogged from '../components/IsNotLogged';
import SwitchLayout from '../modules/SwitchLayout/SwitchLayout';
import Login from '../modules/Authentication/Login';
import Signup from '../modules/Authentication/Signup';

const Authenticate = () => {
  return (
    <>
      <IsNotLogged>
        <SwitchLayout>
          <Signup /> 
          <Login/>
        </SwitchLayout>
      </IsNotLogged>
    </>
  )
}

export default Authenticate
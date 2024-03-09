import React from 'react'
import IsNotLogged from '../components/IsNotLogged';
import SwitchLayout from '../modules/SwitchLayout/SwitchLayout';
import Login from '../modules/auth/Login';
import Signup from '../modules/auth/Signup';

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
/*
String values associated to each type of role for the argument "allowedRole":
  - is_super_admin  = "role_superAdmin"
  - is_org_admin    = "role_orgAdmin"
  - is_teacher      = "role_teacher"
  - is_student      = "role_student"
  - is_solo         = "role_solo"

*/

import React, { useContext } from 'react'

import { AuthContext } from '../context/auth.context';

const UserGate = ({children, allowedRole}) => {

  const { userContext } = useContext(AuthContext);
  console.log("UserGate", userContext)
  console.log("allowedRole", allowedRole)

  return (
    <>
      <h1>UserGate</h1>
      {userContext.user.role === allowedRole ? children : <h3>NOT ALLOWED</h3>}
    </>
  )
}

export default UserGate
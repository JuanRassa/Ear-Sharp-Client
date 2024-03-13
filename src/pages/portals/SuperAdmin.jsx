import React, { useContext } from 'react'
import { AuthContext } from '../../context/auth.context';
import { retrieveAllUsers } from '../../api/users.api'


const SuperAdmin = () => {
  const { retrieveToken } = useContext(AuthContext);

  const getAllUsers = async () => {
    try {
      const request = await retrieveAllUsers(retrieveToken());
      const users = await request.data;

    } catch (error) {
      console.log(error)
    }
  }
  getAllUsers();
  return (
    <div>SuperAdmin</div>

  )
}

export default SuperAdmin
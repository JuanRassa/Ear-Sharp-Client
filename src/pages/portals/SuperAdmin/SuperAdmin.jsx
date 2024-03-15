import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../../../context/auth.context';
import { retrieveAllUsers, deleteUserById } from '../../../api/users.api'

import UsersTable from './UsersTable';

const SuperAdmin = () => {
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState()
  const { retrieveToken } = useContext(AuthContext);

  const triggerUserDelete = async (userId) => {
    const deleteResponse = await deleteUserById(retrieveToken(), userId);

    if(deleteResponse.status === 200) {
      getAllUsers()
    }
  }

  const getAllUsers = async () => {
    try {
      const request = await retrieveAllUsers(retrieveToken());
      const users = await request.data;
      setUsers(users)

    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    getAllUsers();
  }, [])

  useEffect(() => {
    let newUsers = users.map(({ email, username, role, _id }) => (Object.values({ email, username, role, _id })));
    setFilteredUsers(newUsers)
  }, [users])



  return (  
    <div>
      <h1>SuperAdmin</h1>
      <UsersTable 
        headings={["Email", "Username", "Role"]} 
        dynamicData={filteredUsers || []}
        triggerUserDelete={triggerUserDelete}
      />
    </div>
  )
}

export default SuperAdmin
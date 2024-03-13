import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../../context/auth.context';
import { retrieveAllUsers } from '../../api/users.api'

import Table from '../../modules/Table/Table';


const SuperAdmin = () => {
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState()
  const { retrieveToken } = useContext(AuthContext);
  console.log("filteredUsers!!!", filteredUsers)
  let arr = []
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
    let newUsers = users.map(({ email, username, role }) => (Object.values({ email, username, role })));
    console.log("NEW EUSER", newUsers)
    setFilteredUsers(newUsers)
  }, [users])



  return (  
    <div>
      <h1>SuperAdmin</h1>
      <Table 
        headings={["Email", "Username", "Role"]} 
        dynamicData={filteredUsers || []}
      />
    </div>
  )
}

export default SuperAdmin
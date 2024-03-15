import React, { useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../../context/auth.context'
import { retrieveUserInfoById } from '../../../api/users.api'

const UserDetails = () => {
  const [ userInfo, setUserInfo ] = useState(null)
  const { retrieveToken } = useContext(AuthContext)
  const { userId } = useParams()
  console.log("userInfo", userInfo)

  const getUserInfo = async () => {
    try {
      const request = await retrieveUserInfoById(retrieveToken(), userId);
      const user = await request.data;
      setUserInfo(user)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUserInfo()
  }, [])
  

  return (
    <div className='UserDetails'>
      {userInfo !== null && (
        <>
        <div>
          <span> name:</span> <span>{userInfo.name}</span>
        </div>
        <div>
          <span> last_name:</span> <span>{userInfo.last_name}</span>
        </div>
        <div>
        <div>
          <span> email:</span> <span>{userInfo.email}</span>
        </div>
          <span> createdAt:</span> <span>{userInfo.createdAt}</span>
        </div>
        <div>
          <span> Number of exercies (exercises_progress):</span> <span>{userInfo.exercises_progress.lenth}</span>
        </div>
        <div>
          <span> organization_admin_id:</span> <span>{userInfo.organization_admin_id}</span>
        </div>
        <div>
          <span> password:</span> <span>{userInfo.password}</span>
        </div>
        <div>
          <span> role:</span> <span>{userInfo.role}</span>
        </div>
        <div>
          <span> username:</span> <span>{userInfo.username}</span>
        </div>
        <div>
          <span> updatedAt:</span> <span>{userInfo.updatedAt}</span>
        </div>
        </>)
      }
    </div>
  )
}

export default UserDetails
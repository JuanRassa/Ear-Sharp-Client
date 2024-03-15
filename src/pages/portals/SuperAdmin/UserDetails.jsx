import React, { useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../../context/auth.context'
import { retrieveUserInfoById, editUserById } from '../../../api/users.api'

const UserDetails = () => {
  const [ isLoading, setIsLoading ] = useState(true)
  const { retrieveToken } = useContext(AuthContext)
  const { userId } = useParams()

  const [ userInfo, setUserInfo ] = useState(null)
  const [ isEditionOn, setIsEditionOn ] = useState(false)

  /*  ****************************** */
  /*  EDITION FORM STATES + HANDLERS */
  const [ editedUsername, setEditedUsername] = useState(userInfo?.username || "")
  const [ editedName, setEditedName ] = useState(userInfo?.name || "")
  const [ editedLastName, setEditedLastName ] = useState(userInfo?.last_name || "")
  const [ editedEmail, setEditedEmail ] = useState(userInfo?.email || "")
  const [ editedRole, setEditedRole ] = useState(userInfo?.role || "")
  const [ editedOrganizationId, setEditedOrganizationId ] = useState(userInfo?.organization_admin_id || "N/A")
  
  const handleInputOnChange = (e, stateSetter) => {
    stateSetter(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserInfo()
  }

  /*  ****************************** */

  const setEditStatesToInit = () => {
    setEditedName(userInfo?.name)
    setEditedLastName(userInfo?.last_name)
    setEditedEmail(userInfo?.email)
    setEditedOrganizationId(userInfo?.organization_admin_id || "N/A")
    setEditedUsername(userInfo?.username)
    setEditedRole(userInfo?.role)
  }

  const getUserInfo = async () => {
    try {
      const request = await retrieveUserInfoById(retrieveToken(), userId);
      const user = await request.data;
      setUserInfo(user)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const updateUserInfo = async () => {
    try {
      const request = await editUserById(retrieveToken(), userId, {
        username: editedUsername
      });
      const updatedUser = request.data;
      console.log(updatedUser)
    } catch (error) {
      
    }
  }

  useEffect(() => {
    getUserInfo()
  }, [])

  useEffect(() => {
    setEditStatesToInit()
  }, [userInfo])
  

  const ShowInfoJSX = () => {
    console.log("userinfo -->", userInfo)
    return (
    <div className='ShowInfoJSX'>
      <div>
        <span> Username:</span> <span>{userInfo.username}</span>
      </div>

      <div>
        <span> Name:</span> <span>{userInfo.name}</span>
      </div>

      <div>
        <span> Last Name:</span> <span>{userInfo.last_name}</span>
      </div>

      <div>
        <span> Email:</span> <span>{userInfo.email}</span>
      </div>
      
      <div>
        <span> Role:</span> <span>{userInfo.role}</span>
      </div>

      <div>
        <span> Organization ID:</span> <span>{userInfo.organization_admin_id || "N/A"}</span>
      </div>


    </div>
  )}
  const EditInfoJSX = () => {
    return (
    <form 
      className='EditInfoJSX'
      onSubmit={(e) => {
        handleSubmit(e)
      }}
    >
      <div>
        <label htmlFor='editedUsername'> Username:</label> 
        <input type='text' id="editedUsername" value={ editedUsername } onChange={ (e) => { handleInputOnChange(e, setEditedUsername) } }/>
      </div>

      <div>
        <label htmlFor='editedName'> name:</label> 
        <input type='text' id="editedName" value={ editedName } onChange={(e) => { handleInputOnChange(e, setEditedName) }}/>
      </div>

      <div>
        <label htmlFor='editedLastName'> Last Name:</label> 
        <input type='text' id="editedLastName" value={ editedLastName } onChange={(e) => { handleInputOnChange(e, setEditedLastName) }}/>
      </div>
      
      <div>
        <label htmlFor='editedEmail'> Email:</label> 
        <input type='text' id="editedEmail" value={ editedEmail } onChange={(e) => { handleInputOnChange(e, setEditedEmail) }}/>
      </div>
      
      <div>
        <label htmlFor='editedRole'> Role:</label> 
        <select id="editedRole" value={ editedRole } onChange={(e) => { handleInputOnChange(e, setEditedRole) }}>
          <option value="Select one role" disabled>Select One Role</option>
          <option value="SuperAdmin" >SuperAdmin</option>
          <option value="OrganizationAdmin" >OrganizationAdmin</option>
          <option value="Teacher" >Teacher</option>
          <option value="Student" >Student</option>
          <option value="Solo" >Solo</option>
        </select>
      </div>

      <div>
        <label htmlFor='editedOrganizationId'> Organization ID:</label> 
        <input type='text' id="editedOrganizationId" value={ editedOrganizationId } onChange={(e) => { handleInputOnChange(e, setEditedOrganizationId) }} />
      </div>
      
      {SaveCancelEditionJSX()}
    </form>
  )}

  const StartEdtionJSX = () => {
    return (
      <button 
        className='StartEdtionJSX'
        onClick={() => {
          setIsEditionOn(true)
        }}
      >
        Edit User Information
      </button>
    )
  }
  const SaveCancelEditionJSX = () => {
    return (
      <div className='SaveCancelEditionJSX'>
        <button type='submit'>Save info</button>
        <button
          onClick={() => {
            setIsEditionOn(false)
            setEditStatesToInit()
          }}
        >
          Discard edition
        </button>
      </div>
    )
  }

  return (
    <div className='UserDetails'>
      {isLoading && (<h2>Is loading...</h2>)}
      {!isLoading && (
        <>
          <div>
            <span> createdAt:</span> <span>{userInfo.createdAt}</span>
          </div>
          <div>
            <span> updatedAt:</span> <span>{userInfo.updatedAt}</span>
          </div>
          {userInfo !== null && (
            isEditionOn ? EditInfoJSX() : ShowInfoJSX()  
          )}

          {!isEditionOn && StartEdtionJSX()}
        </>
      )}
    </div>
  )
}

export default UserDetails
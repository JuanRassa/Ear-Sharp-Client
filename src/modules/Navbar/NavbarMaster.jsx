import React, {useContext} from 'react'
import { AuthContext } from '../../context/auth.context';


const NavbarMaster = ({children}) => {

  const { loggedContext } = useContext(AuthContext);

  return (
    <>
      {loggedContext.isLoggedIn ? children[0] : children[1] }
    </>
  )
}

export default NavbarMaster
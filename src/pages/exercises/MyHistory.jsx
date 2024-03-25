import React, { useContext, useState, useEffect} from 'react'
import { AuthContext } from '../../context/auth.context'
import { retrieveExerciseProgressByEmail } from '../../api/exercises_progress.api';

const MyHistory = () => {
  const { retrieveToken, userContext: { user } } = useContext(AuthContext);
  const [progressData, setProgressData] = useState([])
  console.log("progressData", progressData)
  const getProgressByEmail = async () => {
    try {
      const progress = await retrieveExerciseProgressByEmail(retrieveToken(), user.email)
      setProgressData(progress.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getProgressByEmail()
  }, [])

  return (
    <div>MyHistory</div>
  )
}

export default MyHistory
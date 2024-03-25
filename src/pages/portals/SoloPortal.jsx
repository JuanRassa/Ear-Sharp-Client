import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { retrieveAllExercisesInfo } from '../../api/exercises_info.api'
import { AuthContext } from '../../context/auth.context'

const SoloPortal = () => {
  const { retrieveToken } = useContext(AuthContext);
  const [exercisesInfo, setExercisesInfo] = useState([])

  const getAllExercisesInfo = async () => {
    try {
      const request = await retrieveAllExercisesInfo(retrieveToken());
      const users = await request.data;
      setExercisesInfo(users)

    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(() => {
    getAllExercisesInfo();
  }, [])

  const DisplayExercisesJSX = () => {
    return (
      <div>
        <Link to="/my-history">My History</Link>
        {exercisesInfo.map(exercise => { return (
          <Link key={exercise.code} to={`/exercises/${exercise.code}`} className='ExerciseCard'>
            <h4>{exercise.name}</h4>
            <p>Category: {exercise.category}</p>
            <p>N° of Questions: {exercise.questions_quantity}</p>
            <p>Approvement Percentage: {exercise.approvement_percentage}%</p>
          </Link>  
        )})}
      </div>
    )
  }

  return (
    <div className='SoloPortal'>
      <section className=''>
        <h2>Available Exercises</h2>
        {exercisesInfo.length !== 0 && DisplayExercisesJSX()}
      </section>
    </div>
  )
}

export default SoloPortal
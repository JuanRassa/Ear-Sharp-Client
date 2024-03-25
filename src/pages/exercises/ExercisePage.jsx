// https://codepen.io/Rumyra/pen/oPxvYB/
import React, { useContext, useEffect, useState } from 'react'
import { retrieveExerciseInfoByCode } from '../../api/exercises_info.api';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import { Link } from 'react-router-dom';
import E_AudioAndPeakBoost from './E_AudioAndPeakBoost';
import P_AudioAndPeakBoost from '../practice/P_AudioAndPeakBoost';

import Himalaya from "../../assets/audio/4.Himalaya.mp3"
import Alpes from "../../assets/audio/8.Alpes.mp3"
import Paramo from "../../assets/audio/9.Paramo.mp3"
import Aconcagua_Cocuy from "../../assets/audio/10.Aconcagua-Cocuy.mp3"

const ExercisePage = () => {
	const [exerciseInfo, setExerciseInfo] = useState(null)
	const [setupAudio, setSetupAudio] = useState(false)
	const [audioTrack, setAudioTrack] = useState("")
	const { retrieveToken } = useContext(AuthContext);
	const { code } = useParams()


	const getExerciseInfoByCode = async () => {
    try {
      const request = await retrieveExerciseInfoByCode(retrieveToken(), code);
      const users = await request.data;
      setExerciseInfo(users)

    } catch (error) {
      console.log(error)
    }
  }
	
	useEffect(() => {
    getExerciseInfoByCode();
  }, [])
  return (
    <>
			{!setupAudio && <>
			
			<button onClick={() => {
				setAudioTrack(Himalaya)
			}}>
				Himalaya
			</button>
			<button onClick={() => {
				setAudioTrack(Alpes)
			}}>
				Alpes
			</button>
			<button onClick={() => {
				setAudioTrack(Paramo)
			}}>
				Paramo
			</button>
			<button onClick={() => {
				setAudioTrack(Aconcagua_Cocuy)
			}}>
				Aconcagua_Cocuy
			</button>
			<button onClick={() => {
				setSetupAudio(true)
			}}>
				Continue
			</button>
			</>}

			{setupAudio &&	<E_AudioAndPeakBoost audioTrack={audioTrack}/>}			
		</>
  )
}

export default ExercisePage
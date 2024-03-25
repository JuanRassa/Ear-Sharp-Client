// https://codepen.io/Rumyra/pen/oPxvYB/
import React from 'react'
import { Link } from 'react-router-dom';
import AudioAndEQ from './AudioAndEQ';
import E_AudioAndPeakBoost from './E_AudioAndPeakBoost';
import P_AudioAndPeakBoost from '../practice/P_AudioAndPeakBoost';
// import AudioVisualizer from './analyser';

// import AudioVisualizer from './analyser';

const ExercisePage = () => {
  

  return (
    <>
			{/* <AudioAndEQ></AudioAndEQ> */}
			{/* <AudioVisualizer/> */}
			<E_AudioAndPeakBoost/>
			{/* <P_AudioAndPeakBoost/> */}
		</>
  )
}

export default ExercisePage
import React, { useState, useEffect } from 'react'

// const testAudioFile = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/858/outfoxing.mp3"
// const testAudioFile = "https://cdn.freesound.org/previews/263/263860_3162775-hq.mp3"
const testAudioFile = "https://cdn.freesound.org/previews/129/129652_1105584-hq.mp3" // cool drums
fetch(testAudioFile)
const E_AudioAndPeakBoost = () => {
  //  ↓↓  GAME'S LOGIC  ↓↓
  const [isExerciseRunning, setIsExerciseRunning] = useState(false)
  const [isExerciseDone, setIsExerciseDone] = useState(false)
  const [rounds, setRounds] = useState(5)
  const [currentRound, setCurrentRound] = useState(0)
  const [score, setScore] = useState(0)
  const [chosenFrequency, setChosenFrequency] = useState(null)
  const [randomIndex, setRandomIndex] = useState(0)

  const incrementRound = () => {
    setCurrentRound((prev) => prev + 1)
  }
  const incrementScore = () => {
    setScore((prev) => prev + 1)
  }
  const randomFreqIndex = () => {
    return Math.floor(Math.random() * 8) + 1
  }
  const handleBeginExercise = () => {
    setCurrentRound(0)
    if (currentRound === 0) incrementRound()
    setIsExerciseRunning(!isExerciseRunning)
    setRandomIndex(randomFreqIndex())
    source.connect(audioContext.destination);
  }
  const handleNextRound = () => {
    // handleStop();
    setIsFilterActive(false)
    if(chosenFrequency === frequencyGuess) incrementScore()
    incrementRound();

    setRandomIndex(randomFreqIndex())
    handleFrequencyChange()
  }
  const handleEndExercise = () => {
    setIsExerciseDone(true)
    setIsExerciseRunning(false)
  }

  //  ↓↓ Handle the End of the Exercise ↓↓
  useEffect(() => {
    if (currentRound > rounds) {
      handleEndExercise()
    }
  }, [currentRound])
  //  ↓↓ Reset status for a new Exercise ↓↓
  useEffect(() => {
    if (isExerciseDone) {
      setScore(0)
      setCurrentRound(0)
      setIsExerciseDone(false)
    }
  }, [isExerciseDone])
  //  ↑↑  GAME'S LOGIC  ↑↑
  // ****************************************************************************
  // ----------------------------------------------------------------------------
  // ****************************************************************************
  //  ↓↓  AUDIO'S LOGIC  ↓↓
  const arrOfFrequencies = [
    125,
    250,
    500,
    1000,
    2000,
    4000,
    8000,
    16000
  ]
  const [audioContext, setAudioContext] = useState(null);
  const [source, setSource] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [frequencyGuess, setFrequencyGuess] = useState(arrOfFrequencies[5]); // Default frequency = 1000
  const [filter, setFilter] = useState(null)
  const [gain, setGain] = useState(0); // Default gain in dB
  const [qValue, setQValue] = useState(3); // Default Q value
  const [isFilterActive, setIsFilterActive] = useState(true);

  const buildUpAudioSource = () => {
    fetch(testAudioFile)
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => {
        audioContext.decodeAudioData(arrayBuffer, buffer => {
          const audioSource = audioContext.createBufferSource();
          audioSource.buffer = buffer;
          audioSource.loop = true
          setSource(audioSource);
        });
      })
      .catch(error => console.error('Error loading audio file:', error));
  }
  const buildUpFilter = () => {
    if(filter) return;
    let newFilter = audioContext.createBiquadFilter();
    newFilter.type = 'peaking'; // Bell-shaped filter
    newFilter.frequency.value = frequencyGuess;
    newFilter.Q.value = qValue;
    newFilter.gain.value = gain; // Convert gain to dB
    setFilter(newFilter)
  }
  
  const connectFilter = () => {
    source.connect(filter);
    filter.connect(audioContext.destination);
  }

  console.log("source", source)
  console.log("audioContext", audioContext)

  console.log("filter whole", filter)
  console.log("filter freqency", filter?.frequency.value)
  console.log("filter gain", filter?.gain.value)
  console.log("FREQ", frequencyGuess)

  const handlePlay = () => {
    if (!audioContext) return;
    audioContext.resume()
  };
  // Function to convert gain to decibels
  const handleStop = () => {
    if (source) {
      audioContext.suspend()
      setIsPlaying(false);
    }
  };
  const handleFrequencyChange = event => {
    setFrequencyGuess(parseInt(arrOfFrequencies[randomIndex - 1], 10));
    filter.frequency.value = parseInt( arrOfFrequencies[randomIndex - 1], 10);
  };
  const handleGainChange = event => {
    setGain(event.target.value);
    if (filter) {
      filter.gain.value = event.target.value;
    }
  };
  const handleQValueChange = event => {
    setQValue(event.target.value);
    if (filter) {
      filter.Q.value = event.target.value;
    }
  };
  const toggleFilter = () => {
    setIsFilterActive(!isFilterActive);
  };


  const changeFreq = (indexOfFreq) => {
    if(filter) {
      console.log(filter.frequency)
      setFrequencyGuess(parseInt(arrOfFrequencies[indexOfFreq], 10));
      filter.frequency.value = parseInt(arrOfFrequencies[indexOfFreq], 10)
    }
  }

  //  ↓↓ Set Audio Context and Clean Up Audio Context when unmounting ↓↓
  useEffect(() => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    setAudioContext(audioCtx);
    return () => {
      audioCtx.close(); // Clean up audio context when component unmounts
    };
  }, []);

  //  ↓↓ Execute the Audio Source Build Up once the Audio Context exists ↓↓
  useEffect(() => {
    if(audioContext) buildUpAudioSource();
  }, [audioContext])

  useEffect(() => {
    console.log("filterUSE EFFECT", filter)
    if(filter) {
      connectFilter()
    }
  }, [filter])

  useEffect(() => {
    if(isFilterActive) {
      source?.connect(filter);
      filter?.connect(audioContext.destination);
    } else {
      source?.disconnect(filter);
      filter?.disconnect(audioContext.destination);
    }
  }, [isFilterActive])
  //  ↑↑  AUDIO'S LOGIC  ↑↑

  return (
    <div>
      <button onClick={() => {
        handleBeginExercise()
      }}>{isExerciseRunning ? "Stop" : "Begin"}</button>
      <p>Score: {score}</p>
      {isExerciseDone ? <p>Completed</p> : <p>Round {currentRound} of {rounds}</p>}
      {isExerciseRunning ? 
        <div className='E_AudioAndPeakBoost__exercise'>
          <div>
          <div className='E_AudioAndPeakBoost__exercise__options w-100 flex justify-center'>
            <button onClick={() => {
              changeFreq(0);
            }}>
              125
            </button>
            <button onClick={() => {
              changeFreq(1);
            }}>
              250
            </button>
            <button onClick={() => {
              changeFreq(2);
            }}>
              500
            </button>
            <button onClick={() => {
              changeFreq(3);
            }}>
              1000
            </button>
            <button onClick={() => {
              changeFreq(4);
            }}>
              2000
            </button>
            <button onClick={() => {
              changeFreq(5);
            }}>
              4000
            </button>
            <button onClick={() => {
              changeFreq(6);
            }}>
              8000
            </button>
            <button onClick={() => {
              changeFreq(7);
            }}>
              16000
            </button>
          </div>
          </div>
          <div>
            <label htmlFor="gainInput">Gain (dB):</label>
            <input
              type="number"
              id="gainInput"
              value={gain}
              onChange={handleGainChange}
              min={-40}
              max={40}
              step={0.1}
            />
          </div>
          <div>
            <label htmlFor="qValueInput">Q Value:</label>
            <input
              type="number"
              id="qValueInput"
              value={qValue}
              onChange={handleQValueChange}
              min={0.1}
              max={100}
              step={0.1}
            />
          </div>
          <div>
            <button onClick={()=>{source.start()}}>Start</button>
            <button onClick={handlePlay} disabled={isPlaying}>
              Resume
            </button>
            <button onClick={handleStop} >
              Suspend
            </button>
            <button onClick={toggleFilter}>
              {isFilterActive ? 'Deactivate Filter' : 'Activate Filter'}
            </button>
            <button onClick={()=>{buildUpFilter()}}>SET UP FILTER</button>
            {/* <button onClick={() => {connectFilter()}}>CONNECT FILTER</button> */}
          </div>
          <div className='E_AudioAndPeakBoost__exercise__options w-100 flex justify-center'>
            <button onClick={() => {
              setChosenFrequency(125);
            }}>
              125
            </button>
            <button onClick={() => {
              setChosenFrequency(250);
            }}>
              250
            </button>
            <button onClick={() => {
              setChosenFrequency(500);
            }}>
              500
            </button>
            <button onClick={() => {
              setChosenFrequency(1000);
            }}>
              1000
            </button>
            <button onClick={() => {
              setChosenFrequency(2000);
            }}>
              2000
            </button>
            <button onClick={() => {
              setChosenFrequency(4000);
            }}>
              4000
            </button>
            <button onClick={() => {
              setChosenFrequency(8000);
            }}>
              8000
            </button>
            <button onClick={() => {
              setChosenFrequency(16000);
            }}>
              16000
            </button>
          </div>
          <div className=' w-100 flex justify-center'>
            <button 
              onClick={() => {
                handleNextRound()
              }}
            >
              Check answer
            </button>
          </div>
        </div>
        :   
        <></>
      }
    </div>
  );
}

export default E_AudioAndPeakBoost
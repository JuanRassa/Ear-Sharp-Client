import React, { useState, useEffect } from 'react'

const testAudioFile = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/858/outfoxing.mp3"
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
    if(chosenFrequency === frequency) incrementScore()
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
  const [filterNode, setFilterNode] = useState(null);
  const [frequency, setFrequency] = useState(arrOfFrequencies[5]); // Default frequency = 1000
  const [filter, setFilter] = useState(null)
  const [gain, setGain] = useState(6); // Default gain in dB
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
    newFilter.frequency.value = frequency;
    newFilter.Q.value = qValue;
    newFilter.gain.value = convertGainToDecibels(gain); // Convert gain to dB
    setFilter(newFilter)
  }
  
  const connectFilter = () => {
    source.connect(filter);
    filter.connect(audioContext.destination);
  }

  console.log("source", source)
  console.log("audioContext", audioContext)
  console.log("filter", filter)

  const handlePlay = () => {
    if (!audioContext) return;
    audioContext.resume()
    // Fetch audio file
    // fetch(testAudioFile)
    //   .then(response => response.arrayBuffer())
    //   .then(arrayBuffer => {
    //     audioContext.decodeAudioData(arrayBuffer, buffer => {
    //       const audioSource = audioContext.createBufferSource();
    //       audioSource.buffer = buffer;
    //       if (isFilterActive) {
    //         const filter = audioContext.createBiquadFilter();
    //         filter.type = 'peaking'; // Bell-shaped filter
    //         filter.frequency.value = frequency;
    //         filter.Q.value = qValue;
    //         filter.gain.value = convertGainToDecibels(gain); // Convert gain to dB

    //         audioSource.connect(filter);
    //         filter.connect(audioContext.destination);
    //       } else {
    //         audioSource.connect(audioContext.destination);
    //       }

    //       audioSource.start();
    //       setSource(audioSource);
    //       setIsPlaying(true);
    //     });
    //   })
    //   .catch(error => console.error('Error loading audio file:', error));
  };
  // Function to convert gain to decibels
  const convertGainToDecibels = gain => {
    return 20 * Math.log10(gain); // 20 * log10(gain)
  };
  const handleStop = () => {
    if (source) {
      audioContext.suspend()
      setIsPlaying(false);
    }
  };
  const handleFrequencyChange = event => {
    setFrequency(parseInt(arrOfFrequencies[randomIndex - 1], 10));
    if (filterNode) {
      filterNode.frequency.value = parseInt(arrOfFrequencies[randomIndex - 1], 10);
    }
  };
  const handleGainChange = event => {
    setGain(parseFloat(event.target.value));
    if (filterNode) {
      filterNode.gain.value = convertGainToDecibels(parseFloat(event.target.value));
    }
  };
  const handleQValueChange = event => {
    setQValue(parseFloat(event.target.value));
    if (filterNode) {
      filterNode.Q.value = parseFloat(event.target.value);
    }
  };
  const toggleFilter = () => {
    setIsFilterActive(!isFilterActive);
  };


  const changeFreq = () => {
    if(filter) {
      console.log(filter.frequency)
      filter.frequency.value = 500
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




  // useEffect(() => {

  //   if (audioContext) {
  //   // if (audioContext && isFilterActive) {
  //     const filter = audioContext.createBiquadFilter();
  //     filter.type = 'peaking'; // Bell-shaped filter
  //     filter.frequency.value = frequency;
  //     filter.Q.value = qValue;
  //     filter.gain.value = convertGainToDecibels(gain); // Convert gain to dB

  //     setFilterNode(filter);
  //   }
  // }, [audioContext, frequency, gain, qValue, ]);
  // }, [audioContext, frequency, gain, qValue, isFilterActive]);
  useEffect(() => {
    if (filterNode) {
      filterNode.frequency.value = frequency;
    }
  }, [filterNode, frequency]);

  useEffect(() => {
    if (filterNode) {
      filterNode.Q.value = qValue;
    }
  }, [filterNode, qValue]);

  useEffect(() => {
    if (filterNode) {
      filterNode.gain.value = convertGainToDecibels(gain);
    }
  }, [filterNode, gain]);

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
            <button onClick={() => { changeFreq() }}>500</button>
            <button onClick={() => {
              setRandomIndex(randomFreqIndex())
              handleFrequencyChange()
            }} >
              Choosen Freq: {frequency} Hz
            </button>
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
          </div>
          <div className='E_AudioAndPeakBoost__exercise__options'>
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
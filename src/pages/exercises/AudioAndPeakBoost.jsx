import React, { useState, useEffect } from 'react'

const testAudioFile = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/858/outfoxing.mp3"
fetch(testAudioFile)
const AudioAndPeakBoost = () => {
  const [isExerciseRunning, setIsExerciseRunning] = useState(false)
  const [isExerciseDone, setIsExerciseDone] = useState(false)
  const [rounds, setRounds] = useState(4)
  const [currentRound, setCurrentRound] = useState(0)
  const [score, setScore] = useState(0)
  const [chosenFrequency, setChosenFrequency] = useState(null)
  const [randomIndex, setRandomIndex] = useState(0)

  console.log("exerciseRunning", isExerciseRunning)
  console.log("currentRound", currentRound)
  console.log("score", score)
  console.log("randomIndex", randomIndex)

  const incrementRound = () => {
    setCurrentRound((prev) => prev + 1)
  }
  
  const incrementScore = () => {
    setScore((prev) => prev + 1)
  }

  const handleBeginExercise = () => {
    if (currentRound === 0) incrementRound()
    setIsExerciseRunning(!isExerciseRunning)
    setRandomIndex(Math.floor(Math.random() * 8) + 1)
  }
  const handleEndExercise = () => {
    setIsExerciseDone(true)
    setIsExerciseRunning(false)
  }

  const randomFreqIndex = () => {
    return Math.floor(Math.random() * 8) + 1
  }

  const handleNextRound = () => {
    handleStop();
    incrementRound();
    setRandomIndex(randomFreqIndex);
    setRandomIndex(Math.floor(Math.random() * 8) + 1)
    handleFrequencyChange()
  }

  useEffect(() => {
    if (currentRound > rounds) {
      handleEndExercise()
    }
  }, [currentRound])
  
  useEffect(() => {
    console.log("-------")
    console.log("chosenFrequency", chosenFrequency)
    console.log("typeof chosenFrequency", typeof chosenFrequency)
    console.log("frequency", frequency)
    console.log("typeof frequency", typeof frequency)
    console.log("-------")
    if(chosenFrequency === frequency) incrementScore()

  }, [chosenFrequency])

  useEffect(() => {
    if (isExerciseDone) alert(`Done. Your score is: ${score}`)
    setScore(0)
    setCurrentRound(0)
  }, [isExerciseDone])
  
  // ----------------------------------------------------------------------------
  // ----------------------------------------------------------------------------

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
  const [frequency, setFrequency] = useState(arrOfFrequencies[1]); // Default frequency
  const [gain, setGain] = useState(9); // Default gain in dB
  const [qValue, setQValue] = useState(2); // Default Q value
  const [isFilterActive, setIsFilterActive] = useState(false);
  console.log("FREQ -->>", frequency)
  

  useEffect(() => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    setAudioContext(audioCtx);

    return () => {
      audioCtx.close(); // Clean up audio context when component unmounts
    };
  }, []);

  useEffect(() => {
    if (audioContext && isFilterActive) {
      const filter = audioContext.createBiquadFilter();
      filter.type = 'peaking'; // Bell-shaped filter
      filter.frequency.value = frequency;
      filter.Q.value = qValue;
      filter.gain.value = convertGainToDecibels(gain); // Convert gain to dB

      setFilterNode(filter);
    }
  }, [audioContext, frequency, gain, qValue, isFilterActive]);

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

  const handlePlay = () => {
    if (!audioContext) return;

    // Fetch audio file
    fetch(testAudioFile)
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => {
        audioContext.decodeAudioData(arrayBuffer, buffer => {
          const audioSource = audioContext.createBufferSource();
          audioSource.buffer = buffer;

          let finalNode = audioSource;
          if (isFilterActive) {
            const filter = audioContext.createBiquadFilter();
            filter.type = 'peaking'; // Bell-shaped filter
            filter.frequency.value = frequency;
            filter.Q.value = qValue;
            filter.gain.value = convertGainToDecibels(gain); // Convert gain to dB

            audioSource.connect(filter);
            filter.connect(audioContext.destination);
            finalNode = filter;
          } else {
            audioSource.connect(audioContext.destination);
          }

          audioSource.start();
          setSource(audioSource);
          setIsPlaying(true);
        });
      })
      .catch(error => console.error('Error loading audio file:', error));
  };

  const handleStop = () => {
    if (source) {
      source.stop();
      setSource(null);
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

  // Function to convert gain to decibels
  const convertGainToDecibels = gain => {
    return 20 * Math.log10(gain); // 20 * log10(gain)
  };

  return (
    <div>
      <button onClick={() => {
        handleBeginExercise()
      }}>{isExerciseRunning ? "Stop" : "Begin"}</button>
      <p>Score: {score}</p>
      <p>Round {currentRound} of {rounds}</p>
      {isExerciseRunning ? 
        <div className='AudioAndPeakBoost__exercise'>
          <div>
            
            <button onClick={() => {
              setRandomIndex(Math.floor(Math.random() * 8) + 1)
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
            <button onClick={handlePlay} disabled={isPlaying}>
              Play
            </button>
            <button onClick={handleStop} >
              Stop
            </button>
            <button onClick={toggleFilter}>
              {isFilterActive ? 'Deactivate Filter' : 'Activate Filter'}
            </button>
          </div>
          <div className='AudioAndPeakBoost__exercise__options'>
            <button onClick={() => {
              setChosenFrequency(125);
              handleNextRound()
            }}>
              125
            </button>
            <button onClick={() => {
              setChosenFrequency(250);
              handleNextRound()
            }}>
              250
            </button>
            <button onClick={() => {
              setChosenFrequency(500);
              handleNextRound()
            }}>
              500
            </button>
            <button onClick={() => {
              setChosenFrequency(1000);
              handleNextRound()
            }}>
              1000
            </button>
            <button onClick={() => {
              setChosenFrequency(2000);
              handleNextRound()
            }}>
              2000
            </button>
            <button onClick={() => {
              setChosenFrequency(4000);
              handleNextRound()
            }}>
              4000
            </button>
            <button onClick={() => {
              setChosenFrequency(8000);
              handleNextRound()
            }}>
              8000
            </button>
            <button onClick={() => {
              setChosenFrequency(16000);
              handleNextRound()
            }}>
              16000
            </button>
          </div>
        </div>
        :   
        <></>
      }
    </div>
  );
}

export default AudioAndPeakBoost
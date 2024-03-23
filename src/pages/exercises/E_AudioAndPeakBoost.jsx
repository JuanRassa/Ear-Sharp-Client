import React, { useState, useEffect, useRef } from 'react'
import Himalaya from "../../assets/audio/4.Himalaya.mp3"
import Alpes from "../../assets/audio/8.Alpes.mp3"
import Paramo from "../../assets/audio/9.Paramo.mp3"
import Aconcagua_Cocuy from "../../assets/audio/10.Aconcagua-Cocuy.mp3"

// const testAudioFile = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/858/outfoxing.mp3"
// const testAudioFile = "https://cdn.freesound.org/previews/263/263860_3162775-hq.mp3"
// const testAudioFile = "https://cdn.freesound.org/previews/129/129652_1105584-hq.mp3" // cool drums
// const testAudioFile = "https://cdn.freesound.org/previews/725/725677_4409240-hq.mp3" // "jazz"
// const testAudioFile = Himalaya
// const testAudioFile = Alpes
const testAudioFile = Paramo
// const testAudioFile = Aconcagua_Cocuy

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
    return Math.floor(Math.random() * 9) + 1
  }
  const handleBeginExercise = () => {
    setCurrentRound(0)
    if (currentRound === 0) incrementRound()
    setIsExerciseRunning(!isExerciseRunning)
    setRandomIndex(randomFreqIndex())
  }
  const handleNextRound = () => {
    setIsFilterActive(false)
    if(chosenFrequency === frequencyGuess) incrementScore()
    incrementRound();
    setIsFilterActive(false)
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
    63,
    125,
    250,
    500,
    1000,
    2000,
    4000,
    8000,
    16000
  ]
  const [isLoadingAudio, setIsLoadingAudio] = useState(true)
  const [audioContext, setAudioContext] = useState(null);
  const [source, setSource] = useState(null);
  const [isFilterSet, setIsFilterSet] = useState(false)
  const [isFilterConnected, setIsFilterConnected] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false);
  const [frequencyGuess, setFrequencyGuess] = useState(arrOfFrequencies[5]); // Default frequency = 1000
  const [filter, setFilter] = useState(null)
  const [gain, setGain] = useState(0); // Default gain in dB
  const [qValue, setQValue] = useState(3); // Default Q value
  const [isFilterActive, setIsFilterActive] = useState(false);

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
    setIsFilterConnected(true)
  }
  console.log("audioContext", audioContext)
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
  const handleFrequencyChange = () => {
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

  //  ↓↓ When audioContext ✓ Build Up Audio Source ↓↓
  useEffect(() => {
    if(audioContext) buildUpAudioSource();
  }, [audioContext])
  
  //  ↓↓ When audio source ✓ Build Up BiQud Peak Filter ↓↓
  useEffect(() => {
    if(source) buildUpFilter();
  }, [source])
  
  //  ↓↓ When filter ✓ Connect Filter to the Audio Context ↓↓
  useEffect(() => {
    if(filter) connectFilter()
  }, [filter])

//  ↓↓ When filter connection ✓ start audio and end loading stauts ↓↓
const canvasRef = useRef(null);
useEffect(() => {
  if (isFilterConnected) {
    source.start()
    setIsLoadingAudio(false)
  }

  if (isFilterConnected) {
    const canvas = canvasRef.current;
    //config canvas
    canvas.width = window.innerWidth * 0.7;
    canvas.height = 600;
    const ctx = canvas.getContext("2d");

    const analyser = audioContext.createAnalyser();
    // source.connect(analyser);
    // analyser.connect(audioContext.destination);
    source.connect(filter).connect(audioContext.destination); // Connect filter to both destination and AnalyserNode
    filter.connect(analyser); // Connect filter to AnalyserNode
    analyser.connect(audioContext.destination); // Connect AnalyserNode to destination


    // Define the desired frequency range (20Hz to 20000Hz)
    const minFrequency = 20;
    const maxFrequency = 20000;
    const fftSize = Math.pow(2, Math.ceil(Math.log2(maxFrequency / minFrequency)));
    analyser.fftSize = fftSize;

    const bufferLength = analyser.frequencyBinCount,
      dataArray = new Uint8Array(bufferLength),
      WIDTH = canvas.width,
      HEIGHT = canvas.height,
      barWidth = (WIDTH / bufferLength) * 2.5;
    let barHeight = null,
      x = null;
  
    //core logic for the visualizer
    const timeouts = [];
    const renderFrame = () => {
      // ctx.fillStyle = "rgba(0,0,0,0)";
      // requestAnimationFrame(renderFrame);
      // x = 0;
      
      // analyser.getByteFrequencyData(dataArray);
      
      // ctx.fillRect(0, 0, WIDTH, HEIGHT);
      
      // for (let i = 0; i < bufferLength; i++) {
      //   //color based upon frequency
      //   barHeight = dataArray[i];
      //   let 
      //     r = barHeight + 22 * (i / bufferLength),
      //     g = 333 * (i / bufferLength),
      //     b = 47;
      //   ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
      //   ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
      //   x += barWidth + 1;



      ctx.fillStyle = "rgba(0,0,0,0)";
      requestAnimationFrame(renderFrame);
      x = 0;
      
      analyser.getByteFrequencyData(dataArray);
      
      ctx.fillRect(0, 0, WIDTH, HEIGHT);
      
      const minFrequency = 20; // Minimum frequency (Hz)
      const maxFrequency = 20000; // Maximum frequency (Hz)
      const logMin = Math.log(minFrequency);
      const logMax = Math.log(maxFrequency);
    
      for (let i = 0; i < bufferLength; i++) {
        // Calculate the logarithmic index for the current frequency bin
        const logIndex = (Math.log(i + 1) / Math.log(bufferLength)) * bufferLength;
    
        // Calculate the corresponding frequency for the current index
        const frequency = Math.exp(logIndex * (logMax - logMin) / bufferLength + logMin);
    
        // Use the frequency to find the closest bin in the dataArray
        const closestIndex = Math.floor(frequency / (audioContext.sampleRate / bufferLength));
    
        // Use the closest bin to get the corresponding frequency data
        const logFrequencyData = dataArray[closestIndex];
    
        // Color based upon frequency
        barHeight = logFrequencyData;
        let 
          r = barHeight + 60 * (i / bufferLength),
          g = 333 * (i / bufferLength),
          b = 47;
        ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
    
        // Draw the bar
        ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
        x += barWidth + 1;

        
        //Allows visualizer to overlay on a background/video by clearing the rects after painting.
        let timer = setTimeout(() => {
          ctx.clearRect(0, 0, WIDTH, HEIGHT);
        }, 50);
        timeouts.push(timer);
      }


    }
    //Clears the accumulating timeouts.
  setTimeout(() => {
    for (let i = 0; i < timeouts.length; i++) {
      return clearTimeout(timeouts[i]);
    }
  }, 51);

  renderFrame();
  };

}, [isFilterConnected])

  //  ↓↓ Handle on/off of the filter by toggling gain between 0 and 12 ↓↓
  useEffect(() => {
    if(!filter) return;
    if(isFilterActive) {
      setGain(12);
      filter.gain.value = 12;
      // source?.connect(filter);
      // filter?.connect(audioContext.destination);
    } else {
      setGain(0);
      filter.gain.value = 0;
      // source?.disconnect(filter);
      // filter?.disconnect(audioContext.destination);
    }
  }, [isFilterActive])
  //  ↑↑  AUDIO'S LOGIC  ↑↑



  return (
    <div>
      {isLoadingAudio ? <h1>LOADING...</h1> : <button onClick={handleBeginExercise}>I am ready!</button>}
      <canvas ref={canvasRef} className="canvas"></canvas>
      <p>Score: {score}</p>
      {isExerciseDone ? <p>Completed</p> : <p>Round {currentRound} of {rounds}</p>}
      {isExerciseRunning ? 
        <div className='E_AudioAndPeakBoost__exercise'>
          <div>
          <div className='E_AudioAndPeakBoost__exercise__options w-100 flex justify-center'>
            <button onClick={() => {
              changeFreq(0);
            }}>
              63
            </button>
            <button onClick={() => {
              changeFreq(1);
            }}>
              125
            </button>
            <button onClick={() => {
              changeFreq(2);
            }}>
              250
            </button>
            <button onClick={() => {
              changeFreq(3);
            }}>
              500
            </button>
            <button onClick={() => {
              changeFreq(4);
            }}>
              1000
            </button>
            <button onClick={() => {
              changeFreq(5);
            }}>
              2000
            </button>
            <button onClick={() => {
              changeFreq(6);
            }}>
              4000
            </button>
            <button onClick={() => {
              changeFreq(7);
            }}>
              8000
            </button>
            <button onClick={() => {
              changeFreq(8);
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
            {/* <button onClick={()=>{source.start()}}>Start</button> */}
            <button onClick={handlePlay} disabled={isPlaying}>
              Resume
            </button>
            <button onClick={handleStop} >
              Suspend
            </button>
            <button onClick={toggleFilter}>
              {isFilterActive ? 'Deactivate Filter' : 'Activate Filter'}
            </button>
          </div>
          <div className='E_AudioAndPeakBoost__exercise__options w-100 flex justify-center'>
            <button onClick={() => {
              setChosenFrequency(63);
            }}>
              63
            </button>
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
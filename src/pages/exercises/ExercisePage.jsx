// https://codepen.io/Rumyra/pen/oPxvYB/
import React, { useState, useEffect } from 'react'

const ExercisePage = () => {
  const [sampleState, setSampleState] = useState()
  // const [srcNodeState, setSrcNodeState] = useState()
  const [iirfilterState, setIirfilter] = useState()
  
  const [togglePlay, setTogglePlay] = useState(false)
  const [isFilterOn, setIsFilterOn] = useState(false)
  
  let srcNodeState;
  console.log("srcNodeState:", srcNodeState)


  // instigate our audio context ~~~~~~~~~~~~~~~ 1
  const AudioContext = window.AudioContext;
  const audioCtx = new AudioContext();
  console.log("audioCtx!1", audioCtx)
  // fetch the audio file and decode the data
  const getFile = async (audioContext, filepath) => {
    const response = await fetch(filepath);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    return audioBuffer;
  }
  const setupSample = async () => {
    const filePath = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/858/outfoxing.mp3';
    // Here we're `await`ing the async/promise that is `getFile`.
    // To be able to use this keyword we need to be within an `async` function
    setSampleState(await getFile(audioCtx, filePath))
    let sample = await getFile(audioCtx, filePath);
    return sample;
  }

  // create a buffer, plop in data, connect and play -> modify graph here if required

  const playSourceNode = (audioContext, audioBuffer) => {
    const soundSource = audioContext.createBufferSource();
    soundSource.buffer = audioBuffer;
    soundSource.connect(audioContext.destination);
    soundSource.start();
    return soundSource;
  }


  // change this to change the filter - can be 0-3 and will reference the values in the array below
  const filterNumber = 1;

  let lowPassCoefs = [
    {
      frequency: 200,
      feedforward: [0.00020298, 0.0004059599, 0.00020298],
      feedback: [1.0126964558, -1.9991880801, 0.9873035442]
    },
    {
      frequency: 500,
      feedforward: [0.0012681742, 0.0025363483, 0.0012681742],
      feedback: [1.0317185917, -1.9949273033, 0.9682814083]
    },
    {
      frequency: 1000,
      feedforward: [0.0050662636, 0.0101325272, 0.0050662636],
      feedback: [1.0632762845, -1.9797349456, 0.9367237155]
    },
    {
      frequency: 5000,
      feedforward: [0.1215955842, 0.2431911684, 0.1215955842],
      feedback: [1.2912769759, -1.5136176632, 0.7087230241]
    }
  ]

  let feedForward = lowPassCoefs[filterNumber].feedforward,
    feedBack = lowPassCoefs[filterNumber].feedback;


  // arrays for our frequency response
  const totalArrayItems = 30;
  // Here we want to create an array of frequency values that we would like to get data about. We could go for a linear approach, but it's far better when working with frequencies to take a log approach, so let's fill our array with frequencies that get larger as array item goes up.
  let myFrequencyArray = new Float32Array(totalArrayItems);
  myFrequencyArray = myFrequencyArray.map(function(item, index) {
      return Math.pow(1.4, index);
  });
  // We need to create arrays that return the data, these need to be the same size as the origianl frequency array
  let magResponseOutput = new Float32Array(totalArrayItems);
  let phaseResponseOutput = new Float32Array(totalArrayItems);

  // let the magic happen! When the file has loaded...

  const handlePlayStopToggle = () => {
    if (!togglePlay) {
      srcNodeState = playSourceNode(audioCtx, sampleState)
    } else {
      srcNodeState.stop()
    }
    setTogglePlay(!togglePlay)
  }

  const handleFilterOnOffToggle = () => {
    iirfilterState.getFrequencyResponse(myFrequencyArray, magResponseOutput, phaseResponseOutput);
    if(!isFilterOn) {
      srcNodeState.disconnect(audioCtx.destination);
      srcNodeState.connect(iirfilterState).connect(audioCtx.destination);
    } else {
      srcNodeState.disconnect(iirfilterState);
      srcNodeState.connect(audioCtx.destination);
    }
    setIsFilterOn(!isFilterOn)
  }

  const setSampleJS = () => {
    setupSample()
      .then((sample) => {

        const playButton = document.querySelector('.button-play');
        const filterButton = document.querySelector('.button-filter');

      // create out iir filter
      const iirfilter = audioCtx.createIIRFilter(feedForward, feedBack);
      
      let srcNode;
      // play/pause our track
      
      playButton.addEventListener('click', function() {
        if (this.dataset.playing === 'false') {

          // check if context is in suspended state (autoplay policy)
          if (audioCtx.state === 'suspended') {
            audioCtx.resume();
          }

          srcNode = playSourceNode(audioCtx, sample);
          this.setAttribute('data-playing', 'true');
          this.setAttribute('aria-pressed', 'true');
          this.innerText = 'Pause';
          filterButton.removeAttribute('disabled');
        } else {
          srcNode.stop();
          this.setAttribute('data-playing', 'false');
          this.setAttribute('aria-pressed', 'false');
          this.innerText = 'Play';
          filterButton.disabled = 'true';
        }
      
      }, false);
    
      // on turn on filter connect iir
      filterButton.addEventListener('click', function() {
        if (this.dataset.filteron === 'false') {
          srcNode.disconnect(audioCtx.destination);
          srcNode.connect(iirfilter).connect(audioCtx.destination);
          this.setAttribute('data-filteron', 'true');
          this.setAttribute('aria-pressed', 'true');
        } else {
          srcNode.disconnect(iirfilter);
          srcNode.connect(audioCtx.destination);
          this.setAttribute('data-filteron', 'false');
          this.setAttribute('aria-pressed', 'false');
        }

      }, false);

      // get our frequency response
      iirfilter.getFrequencyResponse(myFrequencyArray, magResponseOutput, phaseResponseOutput);
    
    });
  }

  useEffect(() => {
    setSampleJS()

    // setupSample()
    // setIirfilter(audioCtx.createIIRFilter(feedForward, feedBack));
  }, [])




  return (
    <div className='ExercisePage'>
      <h2>Exercise Page</h2>
      <div class="wrapper">
        <div class="loading">
          <p>Loading...</p>
        </div>
        <div class="iir-demo">
          <button 
            class="button-play" 
            role="switch" 
            data-playing="false" 
            aria-pressed="false" 
            // onClick={() => { handlePlayStopToggle() } } 
          >
            Play
          </button>

          <section class="filter-toggle">
            <span id="label" aria-live="assertive" aria-atomic="true">Filter</span>
            <button 
              class="button-filter" 
              role="switch" 
              data-filteron="false" 
              aria-pressed="false" 
              aria-describedby="label"
              // onClick={() => { handleFilterOnOffToggle() } }
            >
              toggle
            </button>
          </section>
          <section class="filter-graph" />
        </div>
      </div>
    </div>
  )
}

export default ExercisePage
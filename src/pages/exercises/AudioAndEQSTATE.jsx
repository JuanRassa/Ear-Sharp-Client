import React, { useState, useEffect } from 'react'

const testAudioFile = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/858/outfoxing.mp3"
fetch(testAudioFile)
const AudioAndEQSTATE = () => {
  const [audioContext, setAudioContext] = useState(null);
  const [source, setSource] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [filterNode, setFilterNode] = useState(null);
  const [frequency, setFrequency] = useState(4000); // Default frequency
  const [gain, setGain] = useState(9); // Default gain in dB
  const [qValue, setQValue] = useState(2); // Default Q value
  const [isFilterActive, setIsFilterActive] = useState(false);

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
    setFrequency(parseInt(event.target.value, 10));
    if (filterNode) {
      filterNode.frequency.value = parseInt(event.target.value, 10);
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
      <div>
        <label htmlFor="frequencyInput">Frequency (Hz):</label>
        <input
          type="number"
          id="frequencyInput"
          value={frequency}
          onChange={handleFrequencyChange}
          min={100}
          max={15000}
        />
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
        <button onClick={handleStop} disabled={!isPlaying}>
          Stop
        </button>
        <button onClick={toggleFilter}>
          {isFilterActive ? 'Deactivate Filter' : 'Activate Filter'}
        </button>
      </div>
    </div>
  );
}

export default AudioAndEQSTATE
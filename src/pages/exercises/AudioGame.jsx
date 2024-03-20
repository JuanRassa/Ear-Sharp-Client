import React, { useState, useEffect } from 'react';

const testAudioFile = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/858/outfoxing.mp3"
fetch(testAudioFile)

function AudioGame() {
  const [audioContext, setAudioContext] = useState(null);
  const [source, setSource] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [filterNode, setFilterNode] = useState(null);
  const [frequency, setFrequency] = useState(null);
  const [gain, setGain] = useState(6); // Default gain in dB
  const [qValue, setQValue] = useState(2); // Fixed Q value
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [rounds, setRounds] = useState(4); // Number of rounds
  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState(0);
  const [options, setOptions] = useState([]);

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
      filter.Q.value = qValue;
      filter.gain.value = convertGainToDecibels(gain); // Convert gain to dB

      setFilterNode(filter);
    }
  }, [audioContext, gain, qValue, isFilterActive]);

  useEffect(() => {
    if (isPlaying && currentRound < rounds) {
      generateRandomFrequency();
      setCurrentRound(currentRound + 1);
    }
  }, [isPlaying, currentRound, rounds]);

  const generateRandomFrequency = () => {
    const randomFrequency = Math.floor(Math.random() * (15000 - 100 + 1)) + 100;
    setFrequency(randomFrequency);
    const options = [randomFrequency, randomFrequency - 100, randomFrequency + 100];
    setOptions(shuffle(options));
  };

  const shuffle = array => {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

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

  const handleOptionClick = selectedFrequency => {
    if (selectedFrequency === frequency) {
      setScore(score + 1);
    }
    setCurrentRound(currentRound + 1);
    if (currentRound === rounds) {
      setIsPlaying(false);
    }
  };

  const handleRoundsChange = event => {
    setRounds(parseInt(event.target.value));
  };

  const handleGainChange = event => {
    setGain(parseFloat(event.target.value));
  };

  // Function to convert gain to decibels
  const convertGainToDecibels = gain => {
    return 20 * Math.log10(gain); // 20 * log10(gain)
  };

  return (
    <div>
      <div>
        <p>Score: {score}</p>
        <p>Round: {currentRound}/{rounds}</p>
        {isPlaying && currentRound < rounds ? (
          <div>
            <p>Guess the frequency:</p>
            {options.map((option, index) => (
              <button key={index} onClick={() => handleOptionClick(option)}>{option} Hz</button>
            ))}
            {/* Add button with the correct frequency */}
            <button onClick={() => handleOptionClick(frequency)}>{frequency} Hz (Correct)</button>
          </div>
        ) : null}
        <div>
          <label htmlFor="roundsInput">Number of Rounds:</label>
          <input
            type="number"
            id="roundsInput"
            value={rounds}
            onChange={handleRoundsChange}
            min={1}
            max={10}
          />
        </div>
        <div>
          <label htmlFor="gainInput">Fixed Gain (dB):</label>
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
        {!isPlaying ? (
          <button onClick={handlePlay}>Start Game</button>
        ) : (
          <button onClick={handleStop}>Stop</button>
        )}
      </div>
    </div>
  );
}

export default AudioGame;

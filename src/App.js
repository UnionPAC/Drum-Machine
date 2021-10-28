import './App.scss';
import React, {useState, useEffect} from 'react';

const audioClips= [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Chord-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Chord-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Chord-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Shaker',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: 'Punchy-Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Side-Stick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Snare',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
  }
];


function App() {

const [volume, setVolume] = useState(0.5)

  return (
    <div id="drum-machine">
      <div id="display">
        <div className="pad-container">
          {audioClips.map(clip => (
            <Pad clip={clip} key={clip.id} />
          ))}
        </div>
        <div className="control-container">
          <div className="power">
            <h4 className="title">Power</h4>
          </div>
          <div className="description">
          </div>
          <div className="volume">
            <h4 className="title">Volume</h4>
            <input
             type="range"
             step="0.01"
             value={volume}
             max="1"
             min="0"
             onChange={(e) => setVolume(e.target.value)}
             >
             </input>
          </div>
        </div>
      </div>
    </div>
  );
  }

  function Pad({clip}) {

  const [active, setActive] = useState(false)

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [] )

  const handleKeyPress = (e) => {
    if (e.keyCode === clip.keyCode) {
      playSound();
    }
  }


  const playSound = () => {
    const audioTag = document.getElementById(clip.keyTrigger)
    setActive(true);
    setTimeout(() => setActive(false), 200)
    
    audioTag.currentTime = 0;
    audioTag.play();
  }

    return (
      <div onClick={playSound} className={`btn btn-secondary drum-pad ${active && 'btn-warning'}`}>
        <audio className="clip" id={clip.keyTrigger} src={clip.url} />
        <div class="keyTrigger">
          {clip.keyTrigger}
        </div>
      </div>
    )
  }


export default App;

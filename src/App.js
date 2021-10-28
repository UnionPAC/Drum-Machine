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

const [audioId, setAudioId] = useState('')

  return (
    <div id="drum-machine">
      <div id="display">
        <div className="pad-container">
          {audioClips.map(clip => (
            <Pad clip={clip} key={clip.id} volume={volume} setAudioId={setAudioId} />
          ))}
        </div>
        <div className="control-container">
          <div className="description">
            {audioId}
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
          <div id="logo-container">
            <img id="logo" className="pt-4 mt-4"  src="https://www.pngkey.com/png/full/303-3036579_free-code-camp-logo-transparent.png" width="80px"></img>
          </div>
        </div>
      </div>
    </div>
  );
  }

  function Pad({clip, volume, setAudioId}) {

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
    audioTag.volume = volume;
    audioTag.currentTime = 0;
    audioTag.play();
    setAudioId(() => clip.id);
    setTimeout(() => setAudioId(), 500)
  }


    return (
      <div onClick={() => {
        playSound();

      }} id={clip.id} className={`btn btn-secondary drum-pad ${active && 'btn-warning'}`}>
        <audio className="clip" id={clip.keyTrigger} src={clip.url} />
        <div class="keyTrigger">
          {clip.keyTrigger}
        </div>
      </div>
    )
  }


export default App;

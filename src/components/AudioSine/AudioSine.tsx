import * as React from 'react';
import { TweenLite } from 'gsap';

// Style
import './AudioSine.css';

// Interfaces
import * as I from './interfaces';

// Utilities
import { range } from './utils';

const SineWaves = require('sine-waves');

class AudioSine extends React.Component<I.Props, I.State> {
  wrapper: any;
  audio: any;
  waves: any;
  analyser: any;
  dataArrayanalyser: any;
  bufferLength: any;
  dataArray: any;
  vars: I.Vars = {
    amplitude: 0.5
  };

  state: I.State = {
    sourceIndex: 0
  };

  componentDidMount() {

    this.waves = new SineWaves({
      el: this.wrapper,
      // General speed of entire wave system
      speed: 8,
      // Ease function from left to right
      ease: 'SineInOut',
      // Specific how much the width of the canvas the waves should be
      // This can either be a number or a percent
      waveWidth: '70%',
      // An array of wave options
      waves: [
        {
          timeModifier: 6, // This is multiplied againse `speed`
          lineWidth: 3, // Stroke width
          amplitude: 70, // How tall is the wave
          wavelength: 20, // How long is the wave
          strokeStyle: 'rgba(30, 30, 30, 0.3)',
        },
        {
          timeModifier: 1,
          lineWidth: 2,
          amplitude: 100,
          wavelength: 30,
          strokeStyle: 'rgba(255, 255, 255, 0.5)',
        }
      ],
    });

    const context = new AudioContext();
    const video = context.createMediaElementSource(this.audio);
    this.analyser = context.createAnalyser(); // we create an analyser
    this.analyser.smoothingTimeConstant = 0.9;
    this.analyser.fftSize = 512; // the total samples are half the fft size.
    video.connect(this.analyser);
    this.analyser.connect(context.destination);

    this.move();
  }

  componentWillUpdate(nextProps: I.Props, nextState: I.State) {
    if (nextState.sourceIndex !== this.state.sourceIndex) {
      this.audio.pause();
      this.audio.src = nextProps.sources[nextState.sourceIndex];
      this.audio.load();
      this.audio.play();
    }
  }

  render() {
    const {sources} = this.props;
    return (
      <React.Fragment>
        <canvas
          className="AudioSine"
          ref={c => this.wrapper = c}
        />
        <audio
          controls={true}
          autoPlay={true}
          crossOrigin="anonymous"
          ref={c => this.audio = c}
        >
          <source
            type="audio/mpeg"
            src={sources[this.state.sourceIndex]}
          />
          Your browser does not supporto the audio element.
        </audio>
        <div>
          <button
            className="Nav"
            onClick={this.prevSound}
          >
            Prev
          </button>
          <button
            className="Nav"
            onClick={this.nextSound}
          >
            Next
          </button>
        </div>
      </React.Fragment>
    );
  }

  prevSound = () => {
    this.setState({
      sourceIndex: this.state.sourceIndex + 1 >= this.props.sources.length ? 0 : this.state.sourceIndex + 1
    });
  }

  nextSound = () => {
    this.setState({
      sourceIndex: this.state.sourceIndex - 1 < 0 ? this.props.sources.length - 1 : this.state.sourceIndex - 1
    });
  }

  move = () => {
    var array = new Uint8Array(this.analyser.fftSize);
    this.analyser.getByteTimeDomainData(array);
    let average = 0;
    let max = 0;
    for (let i = 0; i < array.length; i++) {
        const a = Math.abs(array[i] - 128);
        average += a;
        max = Math.max(max, a);
    }

    average /= array.length;

    TweenLite.to(this.waves.waves[0], 0.3, {
      amplitude: range(average * 10, 0, 100),
    });
    TweenLite.to(this.waves.waves[1], 0.3, {
      amplitude: range(max * 2, 0, 100),
    });

    requestAnimationFrame(this.move);
  }

}

export default AudioSine;
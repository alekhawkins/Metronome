import React, { Component } from 'react';
import './Metronome.css';
import click1 from './click1.wav';
import click2 from './click2.wav';

class Metronome extends Component {
    constructor(props) {
        super(props);
        // Create Audio objects with the files Webpack loaded
        this.click1 = new Audio(click1);
        this.click2 = new Audio(click2);

        this.state = {
            playing: false,
            count: 0,
            bpm: 100,
            beatsPerMeasure: 4
        };
    }

    handleBpmChange = event => {
        const bpm = event.target.value;

        if (this.state.playing) {
            // Stops the old timer and starts a new one
            clearInterval(this.timer);
            this.timer = setInterval(this.playClick, (60 / bpm) * 1000);

            // Set the new bpm, and reset the beat counter
            this.setState({
                count: 0,
                bpm
            });
        } else {
            // Otherwise just update the bpm
            this.setState({ bpm });
        }
    };

    playClick = () => {
        const { count, beatsPerMeasure } = this.state;

        // The first beat will have a different sound that the others
        if (count % beatsPerMeasure === 0) {
            this.click2.play();
        } else {
            this.click1.play();
        }

        // Keep track of what beat we're on
        this.setState(state => ({
            count: (state.count + 1) % state.beatsPerMeasure
        }));
    }

    startStop = () => {
        if (this.state.playing) {
            //Stop the timer
            clearInterval(this.timer);
            this.setState({
                playing: false
            });
        } else {
            // Start a timer with the current BPM
            this.timer = setInterval(
                this.playClick,
                (60 / this.state.bpm) * 1000
            );
            this.setState(
                {
                    count: 0,
                    playing: true
                    // Play a click "immediately (after setState finishes)
                },
                this.playClick
            );
        }
    };

    render() {
        const { playing, bpm } = this.state;

        return (
            <div className="metronome">
                <div className="bpm-slider">
                    <div>{bpm} BPM</div>
                    <input type="range" min="60" max="240" value={bpm} onChange={this.handleBpmChange} />
                </div>
                <button onClick={this.startStop}>{playing ? 'Stop' : 'Start'}</button>
            </div>
        );
    }
}

export default Metronome;
import React from 'react';
import ReactDOM from 'react-dom';
import { getWordData } from './lmsDocResponseService';
export class InkstoneCanvas extends React.Component {
    state = {
        capturedInkstone: false,
        userResponse: {
            mistakes: 0,
            charPeeks: 0,
            strokePeeks: 0
        },
        isCompleted: false
    }
    kOptions = {
        display: {
            animation_color: '#00c0ff',
            animation_speed: 1,
            drawing_color: '#888888',
            hint_color: '#00c0ff',
            font_color: '#00c0ff',
            font_size: '48px',
            result_colors: ['#88c874', '#c0c080', '#e87878'],
            stroke_color: '#000000',
            watermark_color: '#cccccc',
        },
        listener: (eventData) => {
            if (eventData.characterCompleted) {
                this.setState({
                    userResponse: {
                        mistakes: this.state.userResponse.mistakes += eventData.mistakes,
                        charPeeks: this.state.userResponse.charPeeks += eventData.charPeeks,
                        strokePeeks: this.state.userResponse.strokePeeks += eventData.strokePeeks - eventData.charPeeks
                    }
                });
            }
            if (eventData.entryCompleted) {
                this.kOptions.messages.again;

                if (this.totalRepeats != this.entriesCompleted) {
                    this.entriesCompleted++;
                    this.element.innerHTML = '';
                    new inkstone.Teach(this.charactersData, this.element, this.kOptions);
                } else {
                    this.setState({
                        isCompleted: true
                    });
                    this.props.onClose();

                    swal({
                        title: "Good job!",
                        text: "Mistakes: " + this.state.userResponse.mistakes +
                            " Stroke Peeks: " + this.state.userResponse.strokePeeks +
                            " Character Peeks: " + this.state.userResponse.charPeeks,
                        icon: "success",
                        button: "Ok"
                    });
                }
            }
        },
        messages: {
            again: 'Again!',
            should_hook: 'Should hook.',
            stroke_backward: 'Stroke backward.',
        },
        modes: [{
            repeat: 1,
            watermark: 0,
            demo: 0,
            single_tap: Infinity,
            double_tap: Infinity,
            max_mistakes: Infinity
        }]
    };

    entriesCompleted = 1;
    totalRepeats = null;
    element = null;
    charactersData = [];

    captureInkstone = (elem) => {
        this.setState({ capturedInkstone: true });
        this.element = elem;
        if (!this.element)
            return;
        if (!this.state.capturedInkstone) {
            const wordRules = this.props.spandata;
            this.totalRepeats = parseInt(wordRules.repeatCount);
            const word = wordRules.word;
            if (wordRules.allowedPeeks !== "1") {
                this.kOptions.modes[0].single_tap = 0;
                this.kOptions.modes[0].double_tap = 0;
            }
            for (let i = 0; i < word.length; i++) {
                getWordData(word[i]).then(response => {
                    const characterData = JSON.parse(response.data.item);
                    this.charactersData.push(characterData);

                    if (i == word.length - 1) {
                        new inkstone.Teach(this.charactersData, this.element, this.kOptions);
                    }
                });
            }
        }
    }

    render() {
        return <div ref={this.captureInkstone}></div>;
    }

}
import React from 'react';
import ReactDOM from 'react-dom';
import { InkstoneCanvas } from './inkstone-canvas';
import { Modal, Fade, utils } from 'react-bootstrap';


class InkstoneResponse extends React.Component {

    state = {
        responseType: "InkstoneResponse",
        modalIsOpen: false,
        inkstoneData: null,
        isCompleted: false,
        totalSeconds: 0
    }

    currentResponse = "";
    studentResponse = value => this.currentResponse = value;

    timer = () => {
        if (!this.state.modalIsOpen) {
            const endTime = new Date();
            this.setState({
                totalSeconds: this.state.totalSeconds + (endTime - this.state.startTime) / 1000,
                startTime: null
            });

        } else {
            const startTime = new Date();
            this.setState({
                startTime: startTime
            });
        }
    }

    userResponse = {
        mistakes: null,
        charPeeks: 0,
        strokePeeks: 0
    }

    changeModalState = () => {
        let currentModalState = !this.state.modalIsOpen;
        this.setState({ modalIsOpen: currentModalState }, this.timer);
    }

    handleInkstoneCanvasRef = elem => {
        if (elem) {
            this.inkstoneCanvas = elem;
        } else {
            this.userResponse = this.inkstoneCanvas.state.userResponse;
            if (this.inkstoneCanvas.state.isCompleted) {
                this.setState({
                    isCompleted: true
                });
            }
            this.inkstoneCanvas = null;
        }
    }

    handleSavedDataRef = span => {
        $(span).removeClass('lms-editor');
        if (this.props.worddata.savedContent != null && this.props.worddata.savedContent.totalSeconds > 0) {
            const savedContent = this.props.worddata.savedContent;
            this.userResponse = {
                mistakes: savedContent.mistakes,
                charPeeks: savedContent.charPeeks,
                strokePeeks: savedContent.strokePeeks
            }
            this.setState({
                totalSeconds: savedContent.totalSeconds,
                isCompleted: true
            });
        }
    }

    render() {

        return (
            <span ref={this.handleSavedDataRef}>
                <span>
                    {
                        !this.state.isCompleted && !this.props.worddata.savedContent
                        ?
                        <a href="javascript:;" onClick={this.changeModalState}>
                            <i style={{ verticalAlign: "middle", color: "#007aff" }} className="fa fa-2x fa-edit icon"></i>
                        </a>
                        :
                        <h4 style={{ color: "green" }}>{this.props.worddata.word}</h4>
                    }

                </span>
                <Modal show={this.state.modalIsOpen} onHide={this.changeModalState}>
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>
                        {
                            this.state.modalIsOpen
                            ?
                            <InkstoneCanvas
                                spandata={this.props.worddata}
                                onComplete={this.studentResponse}
                                onClose={this.changeModalState}
                                ref={this.handleInkstoneCanvasRef}
                            />
                            :
                            <div></div>
                        }
                    </Modal.Body>
                </Modal>
            </span>
        )

    }

}
export default InkstoneResponse;
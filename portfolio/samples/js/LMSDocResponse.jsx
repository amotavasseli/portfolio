import React from 'react';
import ReactDOM from 'react-dom';
import HanziResponse from './hanziResponse';
import InkstoneResponse from './inkstoneResponse';
import { createStudentResponse, getFileContent, updateStudentResponse } from './lmsDocResponseService';

class LMSDocResponse extends React.Component {
    state = {
        studentData: null,
        html: null
    }
    $stateParams = angular.element(document.body).injector().get('$stateParams');
    docId = this.$stateParams.docId;

    componentDidMount = () => {
        getFileContent(this.docId).then(
            response => {
                const file = response.data.item;
                this.setState({
                    html: { __html: file.content },
                    savedResponse: file.studentSavedResponse ? file.studentSavedResponse : null,
                    previouslySavedId: file.studentSavedResponse ? file.studentSavedResponse.id : null,
                    wasSubmitted: file.dateSubmitted != null ? true : false
                })
            }
        );
    }

    findAllInput = div => {
        const inputs = $(div).find("[data-lms-input]");
        this.inputs = [];
        let savedContent = null;
        if (this.state.savedResponse != null) {
            savedContent = JSON.parse(JSON.parse(this.state.savedResponse.content));
        }
        inputs.each((i, span) => {
            if (inputs[i].dataset.lmsInput == "hanzicraft") {
                ReactDOM.render(<HanziResponse worddata={savedContent != null ? savedContent[i] : null} ref={elem => this.inputs[i] = elem} />, span);
            } else {
                const spanData = {
                    word: $(span).attr("data-word"),
                    repeatCount: $(span).attr("data-repeat-count"),
                    allowedPeeks: $(span).attr("data-allow-peek"),
                    savedContent: !savedContent ? savedContent : savedContent[i]
                }
                const inkResponse = <InkstoneResponse worddata={spanData} ref={elem => this.inputs[i] = elem} />
                ReactDOM.render(inkResponse, span);
            }
        });
    }

    studentResponse = [];
    saveHomework = () => {
        let submittedData = this.collectData();
        this.sendData(submittedData);
    }

    submitHomework = () => {
        swal(
            {
                title: "Are you sure?",
                text: "Once submitted, you will no longer be able to submit any changes.",
                icon: "warning",
                showCancelButton: true
            }, (isConfirm) => {
                if (isConfirm) {
                    let submittedData = this.collectData();
                    submittedData.dateSubmitted = new Date();
                    this.sendData(submittedData);
                }

            }
        )
    }

    sendData = submittedData => {
        const successSwal = () => {
            if (submittedData.dateSubmitted != null) {
                swal({
                    title: "Success!",
                    text: "Your homework assignment has been successfully submitted.",
                    icon: "success",
                    button: "Ok"
                });
                this.setState({
                    wasSubmitted: true
                });
            } else {
                swal({
                    title: "Saved!",
                    text: "Your homework assignment has been successfully saved.",
                    icon: "success",
                    button: "Ok"
                });
            }
        }
        const errorSwal = () => {
            if (submittedData.dateSubmitted != null) {
                swal({
                    title: "Error!",
                    text: "Your homework assignment could not be submitted.",
                    icon: "danger",
                    button: "Ok"
                });
            } else {
                swal({
                    title: "Saved!",
                    text: "Your homework assignment could not be saved.",
                    icon: "danger",
                    button: "Ok"
                });
            }

        }
        if (!this.state.previouslySavedId) {
            createStudentResponse(submittedData).then(response => {
                this.setState({
                    previouslySavedId: response.data.item
                });
                successSwal();
            }, error => errorSwal());
        } else {
            submittedData.id = this.state.previouslySavedId;
            updateStudentResponse(submittedData).then(response => successSwal(), error => errorSwal());
        }
    }

    collectData = () => {
        const userInputs = [];
        const inputs = this.inputs;
        let totalTime = 0;
        for (let i = 0; i < inputs.length; i++) {
            totalTime += inputs[i].state.totalSeconds;
            if (inputs[i].state.responseType == "HanziResponse") {
                let hanzi = {
                    answer: inputs[i].currentResponse,
                    totalSeconds: inputs[i].state.totalSeconds
                }
                userInputs.push(hanzi);
            } else {
                let inkstone = null;
                if (inputs[i].state.isCompleted)
                    inkstone = {
                        totalSeconds: inputs[i].state.totalSeconds,
                        mistakes: inputs[i].userResponse.mistakes,
                        charPeeks: inputs[i].userResponse.charPeeks,
                        strokePeeks: inputs[i].userResponse.strokePeeks
                    }
                userInputs.push(inkstone);
            }
        }
        const submittedData = {
            timeSpentInSec: Math.round(totalTime),
            content: JSON.stringify(userInputs),
            docId: parseInt(this.docId)
        }
        return submittedData;
    }

    render() {
        return (
            <div className="panel panel-inverse shadow-the-back-sm">
                <div className="panel-heading">
                    <h3 className='panel-title'>LMS Response</h3>
                </div>
                <div className='panel-body'>
                    {
                        this.state.html &&
                        <div ref={this.findAllInput} dangerouslySetInnerHTML={this.state.html} />
                    }
                    <br />
                    <br />
                    {
                        !this.state.wasSubmitted ?
                            <div>
                                <button className="btn btn-primary" onClick={this.saveHomework}>Save</button> &nbsp; &nbsp; &nbsp;
                            <button className="btn btn-success" onClick={this.submitHomework}>Submit</button>
                            </div>
                            : <div></div>

                    }
                </div>
            </div>
        )
    }
}

export default LMSDocResponse;
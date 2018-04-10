import React from 'react';
import ReactDOM from 'react-dom';
import AngularC1 from './AngularC1';
import AngularC2 from './AngularC2';
import AngularService from './AngularService';
import AngularState from './AngularState';
import AngularHTML1 from './AngularHTML1';
import AngularHTML2 from './AngularHTML2';

class AngularSamples extends React.Component {

    handleController1 = () => {
        ReactDOM.render(
            <AngularC1 />,
            document.getElementById("selectedSample")
        )
    }
    handleController2 = () => {
        ReactDOM.render(
            <AngularC2 />,
            document.getElementById("selectedSample")
        )
    }
    handleService = () => {
        ReactDOM.render(
            <AngularService />,
            document.getElementById("selectedSample")
        )
    }
    handleState = () => {
        ReactDOM.render(
            <AngularState />,
            document.getElementById("selectedSample")
        )
    }
    handleHTML1 = () => {
        ReactDOM.render(
            <AngularHTML1 />,
            document.getElementById("selectedSample")
        )
    }
    handleHTML2 = () => {
        ReactDOM.render(
            <AngularHTML2 />,
            document.getElementById("selectedSample")
        )
    }
    render(){
        return (
            <React.Fragment>
                <a onClick={() => this.handleController1()}>Controller 1</a>
                <a onClick={() => this.handleController2()}>Controller 2</a>
                <a onClick={() => this.handleService()}>Service</a>
                <a onClick={() => this.handleState()}>State</a>
                <a onClick={() => this.handleHTML1()}>HTML 1</a>
                <a onClick={() => this.handleHTML2()}>HTML 2</a>
            </React.Fragment>
        )
    }
}
export default AngularSamples;
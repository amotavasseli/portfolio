import React from 'react';
import ReactDOM from 'react-dom';
import WebAPI from './WebAPI';
import Services from './Services';
import Hub from './Hub';
import Algorithm from './Algorithm';


class CSharpSamples extends React.Component {

    handleController = () => {
        ReactDOM.render(
            <WebAPI />,
            document.getElementById("selectedSample")
        )
    }

    handleServices = () => {
        ReactDOM.render(
            <Services />,
            document.getElementById("selectedSample")
        )
    }

    handleHub = () => {
        ReactDOM.render(
            <Hub />,
            document.getElementById("selectedSample")
        )
    }

    handleAlgorithm = () => {
        ReactDOM.render(
            <Algorithm />,
            document.getElementById("selectedSample")
        )
    }

    render(){
        return (
            <React.Fragment>
                <a onClick={() => this.handleController()}>WebAPI Controller</a>
                <a onClick={() => this.handleServices()}>Services</a>
                <a onClick={() => this.handleHub()}>SignalR Hub</a>
                <a onClick={() => this.handleAlgorithm()}>Scoring Algorithm</a>
            </React.Fragment>
        )
    }
}
export default CSharpSamples; 
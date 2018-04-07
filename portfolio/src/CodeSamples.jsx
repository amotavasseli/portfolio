import React from 'react';
import ReactDOM from 'react-dom';
import ReactSamples from './ReactSamples';
import CSharpSamples from './CSharpSamples';
import SQLSamples from './SQLSamples';

class CodeSamples extends React.Component{

    handleReact = () => {
        ReactDOM.render(
            <ReactSamples />,
            document.getElementById("sampleOptions")
        )
    }

    handleCS = () => {
        ReactDOM.render(
            <CSharpSamples />,
            document.getElementById("sampleOptions")
        )
    }

    handleSQL = () => {
        ReactDOM.render(
            <SQLSamples />,
            document.getElementById("sampleOptions")
        )
    }

    render(){
        return (
            <div className="samples">
                <div className="codeSideBar" style={{"flexGrow": 1}}>
                    <a onClick={() => this.handleReact()}>React</a>
                    <a onClick={() => this.handleAngular()}>AngularJS</a>
                    <a onClick={() => this.handleCS()}>C#</a>
                    <a onClick={() => this.handleSQL()}>T-SQL</a>
                </div>
                <div id="sampleOptions" style={{"flexGrow": 2}}>

                </div>
                <div id="selectedSample" style={{"flexGrow": 9}}>
                </div>
            </div>
        )
    }
}

export default CodeSamples;
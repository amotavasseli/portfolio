import React from 'react';
import ReactDOM from 'react-dom';
import ReactSamples from './ReactSamples';
import CSharpSamples from './CSharpSamples';
import SQLSamples from './SQLSamples';
import reactLogo from './logos/react.svg';
import angularLogo from './logos/angular.svg';
import cLogo from './logos/csharp.png';
import tsqlLogo from './logos/tsql.jpg';

class CodeSamples extends React.Component{

    handleReact = () => {
        this.clearCode();
        ReactDOM.render(
            <ReactSamples />,
            document.getElementById("sampleOptions")
        )
    }

    handleCS = () => {
        this.clearCode();
        ReactDOM.render(
            <CSharpSamples />,
            document.getElementById("sampleOptions")
        )
    }

    handleSQL = () => {
        this.clearCode();
        ReactDOM.render(
            <SQLSamples />,
            document.getElementById("sampleOptions")
        )
    }

    clearCode = () => {
        ReactDOM.render(
            null, 
            document.getElementById("selectedSample")
        )
    }

    render(){
        return (
            <div className="samples">
                <div className="codeSideBar" style={{"flexGrow": 1}}>
                    <img src={reactLogo} onClick={() => this.handleReact()} className="sampLogo" alt="React"/>
                    <img src={angularLogo} onClick={() => this.handleAngular()} className="sampLogo" alt="AngularJS"/>
                    <img src={cLogo} onClick={() => this.handleCS()} className="sampLogo" alt="C#"/>
                    <img src={tsqlLogo} onClick={() => this.handleSQL()} className="sampLogo" alt="T-SQL"/>
                </div>
                <div id="sampleOptions" style={{"flexGrow": 2}}>

                </div>
                <div id="selectedSample" style={{"flexGrow": 9, "overflow": "auto", "height": "100em"}}>
                </div>
            </div>
        )
    }
}

export default CodeSamples;
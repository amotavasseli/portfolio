import React from 'react';
import CodeSamples from './CodeSamples';
import ReactDOM from 'react-dom';
import Home from './Home';
import Resume from './Resume';

class NavBar extends React.Component {

    componentDidMount(){
        this.handleHome();
    }

    handleHome = () => {
        ReactDOM.render(<Home />, document.getElementById("activeComponent"));

    }

    handleSamples = () => {
        ReactDOM.render(<CodeSamples />, document.getElementById("activeComponent"));
        
    }

    handleResume = () => {
        ReactDOM.render(<Resume />, document.getElementById("activeComponent"));
    }

    render() {
        return (
            <div>
                <header className="navbar">
                    <h1 className="title">Arian's Portfolio</h1>
                    <span className="nav-options">
                        <a onClick={() => this.handleHome()}>Home</a>
                        <a onClick={() => this.handleSamples()}>Code Samples</a>
                        <a onClick={() => this.handleResume()}>Résumé</a>
                    </span>
                </header>
            </div>
        )
    }
}

export default NavBar;
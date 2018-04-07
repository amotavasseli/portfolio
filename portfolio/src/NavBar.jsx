import React from 'react';
import CodeSamples from './CodeSamples';
import ReactDOM from 'react-dom';
import Home from './Home';



class NavBar extends React.Component {

    // state = {
    // }
    componentDidMount(){
        this.handleHome();
    }

    handleHome = () => {
        ReactDOM.render(<Home />, document.getElementById("activeComponent"));

    }

    handleSamples = () => {
        ReactDOM.render(<CodeSamples />, document.getElementById("activeComponent"));
        
    }

    handleAbout = () => {
        
    }

    render() {
        return (
            <div>
                <header className="navbar">
                    <h1 className="title">Welcome to my Portfolio Page</h1>
                    <span className="nav-options">
                        <a onClick={() => this.handleHome()}>Home</a>
                        <a onClick={() => this.handleSamples()}>Code Samples</a>
                        <a onClick={() => this.handleAbout()}>About</a>
                    </span>
                </header>
            </div>
        )
    }
}

export default NavBar;
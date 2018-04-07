import React from 'react'; 
import NavBar from './NavBar';
import './App.css';


class Portfolio extends React.Component{

    render(){
        return (
            <div className="container">
                <NavBar />
                <div id="activeComponent">
                </div>
            </div>
        )
    }
}

export default Portfolio; 
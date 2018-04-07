import React from 'react'; 
import ReactDOM from 'react-dom';
import ReactTier1 from './ReactTier1';
import ReactTier2 from './ReactTier2';
import ReactTier3 from './ReactTier3';


class ReactSamples extends React.Component {

    handleTier1 = () => {
        ReactDOM.render(
            <ReactTier1 />,
            document.getElementById("selectedSample")
        )
    }

    handleTier2 = () => {
        ReactDOM.render(
            <ReactTier2 />,
            document.getElementById("selectedSample")
        )
    }

    handleTier3 = () => {
        ReactDOM.render(
            <ReactTier3 />,
            document.getElementById("selectedSample")
        )
    }

    render(){
        return (
            <div>
                <h3 onClick={() => this.handleTier1()}>React Component - 1st Tier</h3>
                <h3 onClick={() => this.handleTier2()}>React Component - 2nd Tier</h3>
                <h3 onClick={() => this.handleTier3()}>React Component - 3rd Tier</h3>
            </div>
        )
    }
}
export default ReactSamples; 
import React from 'react'; 
import ReactDOM from 'react-dom';
import SQLselect from './SQLselect'; 
import SQLjoin from './SQLjoin';
import SQLinsert from './SQLinsert';
import SQLupdate from './SQLupdate';

class SQLSamples extends React.Component {

    handleSelect = () => {
        ReactDOM.render(
            <SQLselect />,
            document.getElementById("selectedSample")
        )
    }

    handleJoin = () => {
        ReactDOM.render(
            <SQLjoin />,
            document.getElementById("selectedSample")
        )
    }

    handleInsert = () => {
        ReactDOM.render(
            <SQLinsert />,
            document.getElementById("selectedSample")
        )
    }

    handleUpdate = () => {
        ReactDOM.render(
            <SQLupdate />,
            document.getElementById("selectedSample")
        )
    }

    render(){
        return (
            <React.Fragment>
                <a onClick={() => this.handleSelect()}>SQL Select</a>
                <a onClick={() => this.handleJoin()}>SQL Select (Join)</a>
                <a onClick={() => this.handleInsert()}>SQL Insert</a>
                <a onClick={() => this.handleUpdate()}>SQL Update</a>
            </React.Fragment>
        )
    }
}
export default SQLSamples;
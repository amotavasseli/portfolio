import React from 'react';
import { Document, Page } from 'react-pdf';
import pdf from './Resume.pdf';

class Resume extends React.Component {

    state = {
        numPages: null,
        pageNumber: 1
    }

    render() {
        return (
            <div className="resume-block">
                <div className="resume">
                    <Document
                        file={pdf}
                    >
                        <Page pageNumber={this.state.pageNumber} />

                    </Document>
                </div>

            </div>
        )
    }
}
export default Resume;
import React from 'react';
import Highlight from 'react-highlight';

class AngularHTML1 extends React.Component {

    render() {
        return (
            <Highlight className="html">
                {
                    `
                    <div ng-controller='FaqsController as f'>
                        <h1 class="page-header">
                            FAQs
                        </h1>
                        <div class="row">
                            <div class="col-md-10">
                                <div class="panel panel-inverse">
                                    <div class="panel-heading">
                                        <h4 class="panel-title">FAQs
                                            <button 
                                                type="button" 
                                                class="btn btn-primary btn-xs pull-right" 
                                                ng-click="f.create()"
                                            >
                                                    Create FAQ
                                            </button>
                                        </h4>
                                    </div>
                                    <div class="panel-body">
                                        <table id="data-table" class="table table-striped table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>Question</th>
                                                    <th>Answer</th>
                                                    <th>Tags</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr ng-repeat="faq in f.allFaqs" class="odd gradeX">
                                                    <td>{{faq.question}}</td>
                                                    <td>{{faq.answer}}</td>
                                                    <td>
                                                        <ul>
                                                            <li ng-repeat="tag in faq.tags">{{tag}}</li>
                                                        </ul>
                                                    </td>
                                                    <td>
                                                        <a 
                                                            href="javascript:;" 
                                                            class="btn btn-warning btn-sm m-l-5 m-t-3 m-b-2 edit-list"
                                                            ng-click="f.edit(faq.id)"
                                                        >
                                                            <i class='ion-edit'></i>&nbsp;Edit</a>
                                                        <a 
                                                            href="javascript:;" 
                                                            class="btn btn-danger btn-sm m-l-5 m-t-3 m-b-2 remove-list" 
                                                            ng-click="f.deleteFaq(faq.id, $index)"
                                                        >
                                                            <i class='ion-ios-trash-outline'></i>&nbsp;Delete
                                                        </a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
    
                    `
                }
            </Highlight>
        )
    }
}
export default AngularHTML1;
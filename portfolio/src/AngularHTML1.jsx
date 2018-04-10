import React from 'react';
import Highlight from 'react-highlight';

class AngularHTML1 extends React.Component {

    render() {
        return (
            <Highlight className="html">
                {
                    `
                    <div ng-controller="FaqController as fc">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="panel panel-inverse" data-sortable-id="form-plugins-15">
                                    <div class="panel-heading">
                                        <h4 class="panel-title text-center">FAQ Setup</h4>
                                    </div>
                                    <div class="panel-body panel-form">
                                        <form class="form-horizontal form-bordered">
                                            <div class="form-group">
                                                <label class="col-md-2 control-label">Question</label>
                                                <div class="col-md-10">
                                                    <input 
                                                        type="text" 
                                                        class="form-control" 
                                                        ng-model="fc.formData.question" 
                                                        placeholder="Question?" 
                                                        required 
                                                    />
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-md-2 control-label">Answer</label>
                                                <div class="col-md-10">
                                                    <input 
                                                        type="text" 
                                                        class="form-control" 
                                                        ng-model="fc.formData.answer" 
                                                        placeholder="Answer" 
                                                        required 
                                                    />
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-md-2 control-label">Tags</label>
                                                <div class="col-md-10">
                                                    <ul capture-list="fc.grabTags" available-tags="fc.availableTags">
                                                        <li 
                                                            class="tagit-choice ui-widget-content ui-state-default ui-corner-all tagit-choice-editable" 
                                                            ng-repeat="tag in fc.formData.tags"
                                                        >
                                                            <span class="tagit-label">{{tag}}</span>
                                                            <a class="tagit-close">
                                                                <span class="text-icon">x</span>
                                                                <span class="ui-icon ui-icon-close" ng-click="fc.deleteTag($index)"></span>
                                                            </a>
                                                            <input type="hidden" value={{tag}} name="tags" class="tagit-hidden-field">
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <div class="col-md-12 text-center">
                                                    <button 
                                                        type="button" 
                                                        class="btn btn-sm btn-success" 
                                                        ng-model="fc.submitButton" 
                                                        ng-click="fc.submitFaq()"
                                                    >
                                                        {{fc.submitButton}}
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
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
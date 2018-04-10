import React from 'react';
import Highlight from 'react-highlight';

class AngularState extends React.Component {

    render() {
        return (
            <Highlight className="js">
                {
                    `
                    (function () {
                        'use strict';
                        angular.module("StrokeWarsAdmin")
                            .config(FaqsState);
                    
                        FaqsState.$inject = ['$stateProvider'];
                    
                        function FaqsState($stateProvider) {
                            $stateProvider.state({
                                name: 'app.faqs',
                                url: '/faqs',
                                templateUrl: 'faqs.html',
                                controller: 'FaqsController'
                            });
                    
                            $stateProvider.state({
                                name: 'app.faq_create',
                                url: '/faq',
                                templateUrl: 'faqs_create_edit.html',
                                controller: 'FaqController'
                            });
                            
                            $stateProvider.state({
                                name: 'app.faq_edit',
                                url: '/faq/{id}',
                                templateUrl: 'faqs_create_edit.html',
                                controller: 'FaqController'
                            });
                        }
                    })();
                    `
                }
            </Highlight>
        )
    }
}

export default AngularState;
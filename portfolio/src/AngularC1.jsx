import React from 'react';
import Highlight from 'react-highlight';

class AngularC1 extends React.Component {

    render() {
        return (
            <Highlight className="js">
                {
                    `
                    (function () {
                        'use strict';
                        angular.module('StrokeWarsAdmin')
                            .controller('FaqController', FaqController);
                    
                        FaqController.$inject = ['FaqsService', '$stateParams', '$state']
                    
                        function FaqController(FaqsService, $stateParams, $state) {
                            this.previousTags = [];
                            this.availableTags = [];
                            this.formData = {
                                tags: null
                            };
                            this.submitButton = "Create";
                    
                            FaqsService.getAllTags().then(
                                response => {
                                    const tags = response.data.items;
                                    for (let i = 0; i < tags.length; i++) {
                                        this.availableTags.push(tags[i].tagEntry);
                                    }
                                },
                                error => console.log(error)
                            );
                    
                            if ($stateParams.id) {
                                this.submitButton = "Update";
                                FaqsService.getFaqById($stateParams.id).then(
                                    response => {
                                        const faq = response.data.item;
                                        this.formData = {
                                            question: faq.question,
                                            answer: faq.answer,
                                            tags: faq.tags,
                                            id: $stateParams.id
                                        }
                                        this.previousTags = faq.tags;
                                    }
                                )
                            }
                            
                            this.submitFaq = () => {
                    
                                const currentTags = this.grabTags();
                                const dataToSend = {
                                    ...this.formData,
                                    tags: currentTags
                                };
                                
                                if (!$stateParams.id) {
                                    FaqsService.postFaq(dataToSend).then(
                                        response => {
                                            console.log(response);
                                            $state.go('app.faqs');
                                        },
                                        error => console.log(error)
                                    )
                                } else {
                                    FaqsService.putFaq(dataToSend).then(
                                        response => {
                                            $state.go('app.faqs');
                                        },
                                        error => console.log(error)
                                    )
                                }
                            }
                    
                            this.deleteTag = ($index) => {
                                this.formData.tags.splice($index, 1);
                            }
                        }
                    })();

                    `
                }
            </Highlight>
        )
    }
}
export default AngularC1;
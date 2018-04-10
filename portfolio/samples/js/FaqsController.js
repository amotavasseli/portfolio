(function () {
    'use strict';
    angular.module('StrokeWarsAdmin')
        .controller('FaqsController', FaqsController);

    FaqsController.$inject = ['FaqsService', '$state'];

    function FaqsController(FaqsService, $state) {
        this.allFaqs = null;

        FaqsService.getAllFaqs().then(
            response => {
                this.allFaqs = response.data.items;
            },
            error => console.log(error)
        )

        this.create = () => $state.go('app.faq_create');

        this.deleteFaq = (id, $index) => {
            if (!confirm('Do you want to delete this FAQ?')) {
                return;
            }
            FaqsService.deleteFaq(id).then(
                response => {
                    this.allFaqs.splice($index, 1);
                },
                error => console.log(error)
            )
        }
        
        this.edit = id => {
            $state.go('app.faq_edit', { id: id });
        }
    }
})();
(function () {
    'use strict';
    angular.module('StrokeWarsAdmin')
        .directive('captureList', captureList);
    function captureList() {
        return {
            restrict: 'A',
            scope: {
                captureList: '=',
                availableTags: '='
            },
            link: function (scope, element, attrs) {
                scope.captureList = () => element.tagit("assignedTags");
                element.tagit(
                    {
                        availableTags: scope.availableTags
                    }
                );
            }
        }
    }
})();
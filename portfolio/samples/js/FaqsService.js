(function () {
    'use strict';

    angular.module('StrokeWarsAdmin')
        .service('FaqsService', FaqsService);

    FaqsService.$inject = ["$http"];

    function FaqsService($http) {

        const url = "/api/faqs/";

        this.getAllFaqs = () => {
            return $http({
                method: "GET",
                url: url,
                withCredentials: true
            });
        }

        this.postFaq = data => {
            return $http({
                method: "POST",
                url: url,
                data: data,
                withCredentials: true
            });
        }

        this.getFaqById = id => {
            return $http({
                method: "GET",
                url: url + id,
                withCredentials: true
            });
        }

        this.putFaq = data => {
            return $http({
                method: "PUT",
                url: url + data.id,
                data: data,
                withCredentials: true
            });
        }

        this.deleteFaq = id => {
            return $http({
                method: "DELETE",
                url: url + id,
                withCredentials: true
            });
        }

        this.getAllTags = () => {
            return $http({
                method: "GET",
                url: "/api/tags",
                withCredentials: true
            });
        }
    }
})();
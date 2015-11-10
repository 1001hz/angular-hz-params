(function () {

    'use strict';

    angular.module('app', []);

    angular
        .module('app')
        .controller('testController', testController);

    function testController() {

        this.speak = "Lookin' good";
    }

})();
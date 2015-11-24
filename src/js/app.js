(function () {

    'use strict';

    angular.module('app', ['angular-hz-params']);

    angular
        .module('app')
        .config(['ParamsProvider', function (ParamsProvider) {
            ParamsProvider.setHosts(
                {
                    prod: 'prd.example.com',
                    qas: 'qas.example.com',
                    dev: 'dev.example.com',
                    local: 'localhost'
                }
            );
            ParamsProvider.setParams(
                {
                    prod: {
                        googleApiKey: 'prodABCDEFGabcdefg'
                    },
                    qas: {
                        googleApiKey: 'qasABCDEFGabcdefg'
                    },
                    dev: {
                        googleApiKey: 'devABCDEFGabcdefg'
                    },
                    local: {
                        googleApiKey: 'localABCDEFGabcdefg'
                    }
                }
            );
        }]);


    angular
        .module('app')
        .controller('testController', testController);

    testController.$inject = ['Params'];

    function testController(Params) {

        this.speakPriest = Params.get("googleApiKey");

    }

})();
# angular-hz-params
Config settings for different environments

## Usage
```javascript
    // include angular-hz-params module in your app
    angular.module('app', ['angular-hz-params']);

    angular
        .module('app')
        .config(['ParamsProvider', function (ParamsProvider) {
            // define whatever hosts your app might run on
            ParamsProvider.setHosts(
                {
                    prod: 'prd.example.com',
                    qas: 'qas.example.com',
                    dev: 'dev.example.com',
                    local: 'localhost'
                }
            );

            // define whatever variables need to change from environment to environment
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
        // variable value will be environment dependant
        this.speakPriest = Params.get("googleApiKey");

    }
```

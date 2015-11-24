(function() {

    "use strict";

    angular.module('angular-hz-params',[]);


})();
(function() {

    "use strict";

    angular
        .module('angular-hz-params')
        .provider("Params", function () {
            var environment = 'default', params;
            return {
                setHosts: function (hosts) {
                    for (var property in hosts) {
                        if (hosts.hasOwnProperty(property)) {
                            if(hosts[property] === window.location.hostname){
                                environment = property;
                            }
                        }
                    }
                },
                setParams: function (paramValues) {
                    params = paramValues;
                },
                $get: function () {
                    return {
                        get: function(paramName){
                            if(params[environment] === undefined){
                                return '';
                            }
                            if(!(paramName in params[environment])){
                                return '';
                            }
                            return params[environment][paramName];
                        }
                    };
                }
            };
        });
})();
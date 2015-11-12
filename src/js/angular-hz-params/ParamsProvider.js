(function() {

    "use strict";

    angular
        .module('angular-hz-param')
        .provider("Params", function () {
            var environment, params;
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
                            return params[environment][paramName];
                        }
                    };
                }
            };
        });
})();
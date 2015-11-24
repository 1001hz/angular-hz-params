describe('Params Service Provider: ', function () {
    var theParamsProvider;

    beforeEach(module('angular-hz-params', function( ParamsProvider ) {
        theParamsProvider = ParamsProvider;
    }));

    describe('with custom configuration', function () {
        it('should return the default value if the current host is not defined', inject(function () {
            // check sanity
            expect(theParamsProvider).not.toBeUndefined();

            // configure the provider
            theParamsProvider.setHosts({
                    prod: 'prd.example.com',
                    dev: 'dev.example.com'
                }
            );

            theParamsProvider.setParams({
                    prod: {
                        googleApiKey: 'abcdef'
                    },
                    dev: {
                        googleApiKey: '123456'
                    },
                    default: {
                        googleApiKey: 'default value'
                    }
                }
            );

            expect(theParamsProvider.$get().get('googleApiKey')).toBe('default value');
        }));

        it('should return the correct value for current host (localhost)', inject(function () {
            // check sanity
            expect(theParamsProvider).not.toBeUndefined();

            // configure the provider
            theParamsProvider.setHosts({
                    prod: 'prd.example.com',
                    local: 'localhost'
                }
            );

            theParamsProvider.setParams({
                    prod: {
                        googleApiKey: 'abcdef'
                    },
                    local: {
                        googleApiKey: '123456'
                    },
                    default: {
                        googleApiKey: 'default value'
                    }
                }
            );

            expect(theParamsProvider.$get().get('googleApiKey')).toBe('123456');
        }));
    });

})
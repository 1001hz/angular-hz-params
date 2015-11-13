describe('Params Service Provider: ', function () {

    var theParamsProvider;

    beforeEach(function () {
        // Initialize the service provider
        // by injecting it to a fake module's config block
        var fakeModule = angular.module('test.app.config', function () {});
        fakeModule.config( function (ParamsProvider) {
            theParamsProvider = ParamsProvider;
        });
        // Initialize test.app injector
        module('app', 'test.app.config');

        // Kickstart the injectors previously registered
        // with calls to angular.mock.module
        inject(function () {});
    });

    describe('with custom configuration', function () {
        it('should return the default value if the current host is not defined', function () {
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
        });

        it('should return the correct value for current host (localhost)', function () {
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
        });
    });

})
define([], function () {
    return function (dependencies) {
        var definition =
        {
            resolver: ['$q', '$rootScope', function ($q, $rootScope) {
                var deferred = $q.defer();
                window.setTimeout(function () {
                    require(dependencies, function () {
                    $rootScope.$apply(function () {
                        deferred.resolve();
                    });
                });
                }, 1000);


                return deferred.promise;
            }]
        }

        return definition;
    }
});
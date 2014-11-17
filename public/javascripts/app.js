/**
 * loads sub modules and wraps them up into the main module
 * this should be used for top-level module definitions only
 */
define(['angular',
    'angularRoute',
    'routes',
    'services/dependencyResolver',
    'angularAnimate',
    'angularUiBootstrap'], function (angular, angularRoute, routeConfig, dependencyResolver) {
    var app = angular.module('mainApp', ['ngRoute', 'ngAnimate', 'ui.bootstrap']);
    //var app = angular.module('mainApp', ['ngRoute']);
    app.config(
    [
        '$routeProvider',
        '$locationProvider',
        '$controllerProvider',
        '$compileProvider',
        '$filterProvider',
        '$provide',

        function ($routeProvider, $locationProvider, $controllerProvider, $compileProvider, $filterProvider, $provide) {
            app.lazy =
            {
                controller: $controllerProvider.register,
                directive: $compileProvider.directive,
                filter: $filterProvider.register,
                factory: $provide.factory,
                service: $provide.service
            };

            $locationProvider.html5Mode(true);

            if (routeConfig.routes !== undefined) {
                angular.forEach(routeConfig.routes, function (route, path) {
                    $routeProvider.when(path, { templateUrl: route.templateUrl, resolve: dependencyResolver(route.dependencies) });
                });
            }

            if (routeConfig.defaultRoutePath !== undefined) {
                $routeProvider.otherwise({ redirectTo: routeConfig.defaultRoutePath });
            }

        }
    ]);

    return app;
});
/**
 * Defines the main routes in the application.
 * The routes you see here will be anchors '#/' unless specifically configured otherwise.
 */

define('routes',[], function () {
    return {
        defaultRoutePath: '/404',
        routes: {
            '/':{
                templateUrl: function(routeParameters){
                    return "/partials/home";
                },
                dependencies: [
                    'controllers/HomeController'
                ]
            },
            '/home': {
                templateUrl: function(routeParameters){
                    return "/partials/home";
                },
                dependencies: [
                    'controllers/HomeController'
                ]
            },
            '/contact': {
                templateUrl: function(routeParameters){
                    return "/partials/contact";
                },
                dependencies: [
                    'controllers/ContactController'
                ]
            }
        }
    };
});
/**
 * configure RequireJS
 * prefer named modules to long paths, especially for version mgt
 * or 3rd party libraries
 */
require.config({

    paths: {
        'domReady': 'vendor/requirejs.domReady',
        'angular': 'vendor/angular.min',
        'angularAnimate': 'vendor/angular-animate.min',
        'angularRoute': 'vendor/angular-route.min',
        'angularUiBootstrap': 'vendor/ui-bootstrap-custom-tpls-0.10.0.min'
    },

    /**
     * for libs that either do not support AMD out of the box, or
     * require some fine tuning to dependency mgt'
     */
    shim: {
        'angular': {
            exports: 'angular'
        },
        'angularAnimate': {
        	deps: ['angular'],
        	exports: 'angularAnimate'
        },
        'angularRoute':{
            deps: ['angular'],
            exports: 'angularRoute'
        },
        'angularUiBootstrap': {
           deps:['angular']
        }
    },

    deps: [
        // kick start application... see bootstrap.js
        'bootstrap'
    ]
});
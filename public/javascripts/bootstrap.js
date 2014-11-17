/**
 * bootstraps angular onto the window.document node
 * NOTE: the ng-app attribute should not be on the index.html when using ng.bootstrap
 */
define([
    'require',
    'angular',
    'app',
    'routes',
    'services/loadingAnimationService',
    'controllers/BodyController',
    'directives/lazyCarousel'
], function (require, ng) {
    'use strict';

    /*
     * place operations that need to initialize prior to app start here
     * using the `run` function on the top-level module
     */

    require(['domReady!'], function (document) {
        window.setTimeout(function () { ng.bootstrap(document, ['mainApp']); }, 1000);
        //ng.bootstrap(document, ['mainApp']);
    });
});
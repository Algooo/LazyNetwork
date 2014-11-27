define(['app'], function (app) {
    app.lazy.controller('HomeController',
    [
        '$scope',
        function ($scope) {
            $scope.ControllerName = "Home";
            $scope.WebDevelopmentCollapsed = false;
            $scope.SinglePageAppCollapsed = false;
            $scope.WebDevelopmentCarouselUrls = ['templates/home/webdevelopmentCarousel.html']
        }
    ]);
});
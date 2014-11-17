define(['app'], function (app) {
    app.lazy.controller('HomeController',
    [
        '$scope',
        function ($scope) {
            $scope.ControllerName = "Home";
            $scope.WebDevelopmentCollapsed = true;
            $scope.WebDevelopmentCarouselUrls = ['templates/home/webdevelopmentCarousel.html']
        }
    ]);
});
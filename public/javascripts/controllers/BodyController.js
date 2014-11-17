define(['app',
    'controllers/RootLoadingAnimationController',
    'controllers/NavbarController'], function (app) {
    app.controller('BodyController', ['$scope', 'loadingAnimationService',
        function BodyController($scope, loadingAnimationService) {
            $scope.loadingAnimationServiceData = loadingAnimationService;

            $scope.$on('$routeChangeStart', function (event, routeData) {
                $scope.loadingAnimationServiceData.setRootLoading(true);
            });
            $scope.$on('$routeChangeSuccess', function (event, routeData) {
                console.log("$routeChangeSuccess")
                $scope.loadingAnimationServiceData.setRootLoading(false);
            });
            $scope.$on('$viewContentLoaded', function()
            {
                console.log("$viewContentLoaded")
            });
        }]);
});

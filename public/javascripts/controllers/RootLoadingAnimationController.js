define(['app'], function (app) {
    app.controller('RootLoadingAnimationController', ['$scope', 'loadingAnimationService',
        function RootLoadingAnimationController($scope, loadingAnimationService) {
            $scope.loadingAnimationServiceData = loadingAnimationService;
        }]);
});


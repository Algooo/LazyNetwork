define(['app', 'directives/lazyNavbar'], function (app) {
    app.controller('NavbarController', ['$scope', '$http', 'loadingAnimationService',
        function NavbarController($scope, $http, loadingAnimationService) {

            $scope.navbarModel = null;

            $http.get('partials/navigation/load').success(function (data) {
                if(data == "undefined"){
                    return;
                }
                $scope.navbarModel = data;
                loadingAnimationService.setRootLoading(false);
            });

            $scope.navbarMenuItemClicked = function (menuItems, _id) {
                var result = $scope.toggleMenuItems(menuItems, _id);
                if(!result){
                    $scope.navbarModel.navbarCollapsed = true;
                }
            };

            $scope.toggleMenuItems = function (menuItems, _id) {
                var result = false;
                if (menuItems != undefined) {
                    for (var i = 0; i < menuItems.length; i++) {
                        var recResult = arguments.callee(menuItems[i].childMenuItems, _id);
                        if (menuItems[i]._id == _id &&
                            menuItems[i].childMenuItems != undefined &&
                            menuItems[i].childMenuItems.length > 0) {
                            menuItems[i].showChildItems = !menuItems[i].showChildItems;
                            result = true;
                        }
                        else if(!recResult) {
                            menuItems[i].showChildItems = false;
                        }
                        else {
                            result = recResult;
                        }
                    }
                }
                return result;
            };

            $scope.navbarButtonClicked = function (route) {
                $scope.toggleNavbarCollapse();
            };

            $scope.toggleNavbarCollapse = function(){
                $scope.navbarModel.navbarCollapsed = !$scope.navbarModel.navbarCollapsed;
            };
        }]);
});
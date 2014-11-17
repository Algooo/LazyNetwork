define(['app'], function (app) {
    app.directive('lazyCarousel', ['$transition', function ($transition){
        return {
            restrict: 'E',
            transclude: true,
            scope: {

            },
            replace: true,

            controller: function($scope) {
                $scope.contentCount = 4;
                $scope.currentIndex = 0;

                $scope.slideToIndex = function(newIndex){
                    if(newIndex >= $scope.contentCount || newIndex < 0){
                        return;
                    }
                    $scope.currentIndex = newIndex;
                }
            },
            templateUrl: 'templates/home/WebdevelopmentCarousel.html'
        };
    }])
    .directive('lazySlide', [function(){
        return{
          restrict: 'E',
          require: 'lazyCarousel',
          transclude: true,
          scope: {

          },
          link: function(scope, elem, attrs, controllerCarousel){

          }
        };
    }]);
});

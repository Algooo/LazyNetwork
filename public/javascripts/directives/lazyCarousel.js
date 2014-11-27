define(['app'], function (app) {
    app.directive('lazyCarousel', ['$transition', '$q', function ($transition, $q){
        return {
            restrict: 'E',
            transclude: true,
            scope: {

            },
            replace: true,

            controller: function($scope) {
                self = this;
                $scope.currentIndex = 0;
                $scope.blockActive = false;
                $scope.slideArray = new Array();
                var leftTransition;
                var rightTransition;

                function doTransition(currentTransition, element, change) {
                    var newTransition = $transition(element, change);
                    if (currentTransition) {
                        currentTransition.cancel();
                    }
                    currentTransition = newTransition;
                    newTransition.then(newTransitionDone, newTransitionDone);
                    return newTransition;

                    function newTransitionDone() {
                        // Make sure it's this transition, otherwise, leave it alone.
                        if (currentTransition === newTransition) {
                            currentTransition = undefined;
                        }
                    }
                }

                self.addSlide = function(element){
                    var isActive = false;
                    if($scope.slideArray.length == 0){
                        isActive = true;
                    }
                    $scope.slideArray.push(
                        {slideElement: element});
                }

                self.removeBlock = function(){
                    if(!leftTransition && !rightTransition){
                        $scope.blockActive = false;
                    }
                }

                self.checkCurrentIndex = function(newIndex){
                    if(!leftTransition && !rightTransition){
                        if($scope.currentIndex != newIndex){
                        $scope.slideToIndex(newIndex);
                        }
                        else{
                            self.removeBlock();
                        }
                    }
                }

                $scope.slideRight = function(newIndex){
                    var slideRightScope = new Object();
                    slideRightScope.transitionComplete = false;
                    slideRightScope.previousIndex = $scope.currentIndex;
                    slideRightScope.nextIndex = $scope.currentIndex - 1;

                    function leavingRightDone(){
                        $scope.slideArray[slideRightScope.previousIndex].slideElement.removeClass("right-leaving").removeClass("active");
                    }
                    function enteringLeftDone(){
                        $scope.slideArray[slideRightScope.nextIndex].slideElement.removeClass("left-entering");
                    }

                    $scope.slideArray[slideRightScope.previousIndex].slideElement.addClass("right-leaving");
                    $scope.slideArray[slideRightScope.nextIndex].slideElement.addClass("active").addClass("left-entering");

                    doTransition(leftTransition, $scope.slideArray[slideRightScope.nextIndex].slideElement,
                        {left: 0}).then(enteringLeftDone).then(checkTransitionComplete);
                    doTransition(rightTransition, $scope.slideArray[slideRightScope.previousIndex].slideElement,
                        {left: 100 +'%'}).then(leavingRightDone).then(checkTransitionComplete);

                    function checkTransitionComplete(){
                        if(slideRightScope.transitionComplete){
                            $scope.currentIndex  = $scope.currentIndex - 1;
                            self.checkCurrentIndex(newIndex);
                            slideRightScope.transitionComplete = false;
                        }
                        slideRightScope.transitionComplete = true;
                    }
                };

                $scope.slideLeft = function(newIndex){
                    var slideLeftScope = new Object();
                    slideLeftScope.transitionComplete = false;
                    slideLeftScope.previousIndex = $scope.currentIndex;
                    slideLeftScope.nextIndex = $scope.currentIndex + 1;

                    function leavingLeftDone(){
                        $scope.slideArray[slideLeftScope.previousIndex].slideElement.removeClass("left-leaving").removeClass("active");
                    }
                    function enteringRightDone(){
                        $scope.slideArray[slideLeftScope.nextIndex].slideElement.removeClass("right-entering");
                    }

                    $scope.slideArray[slideLeftScope.previousIndex].slideElement.addClass("left-leaving");
                    $scope.slideArray[slideLeftScope.nextIndex].slideElement.addClass("active").addClass("right-entering");

                    doTransition(leftTransition, $scope.slideArray[slideLeftScope.previousIndex].slideElement,
                        {left: -100 +'%'}).then(leavingLeftDone).then(checkTransitionComplete);
                    doTransition(rightTransition, $scope.slideArray[slideLeftScope.nextIndex].slideElement,
                        {left: 0}).then(enteringRightDone).then(checkTransitionComplete);

                    function checkTransitionComplete(){
                        if(slideLeftScope.transitionComplete){
                            $scope.currentIndex  = $scope.currentIndex + 1;
                            self.checkCurrentIndex(newIndex);
                            slideLeftScope.transitionComplete = false;
                        }
                        slideLeftScope.transitionComplete = true;
                    }
                  };



                $scope.slideToIndex = function(newIndex){
                    if(newIndex >= $scope.slideArray.length || newIndex < 0 || newIndex == $scope.currentIndex){
                        return;
                    }
                    $scope.blockActive = true;
                    if($scope.currentIndex < newIndex){
                        $scope.slideLeft(newIndex);
                    }
                    if($scope.currentIndex > newIndex){
                        $scope.slideRight(newIndex);
                    }

                };
            },
            templateUrl: 'templates/home/WebdevelopmentCarousel.html'
        };
    }])
    .directive('lazySlide', [function(){
        return{
          restrict: 'E',
          require: '^lazyCarousel',
          transclude: true,
          replace: true,
          scope: {

          },
          link: function(scope, elem, attrs, controllerCarousel){
              controllerCarousel.addSlide(elem);
          },
          template: '<div ng-transclude></div>'
        };
    }]);
});

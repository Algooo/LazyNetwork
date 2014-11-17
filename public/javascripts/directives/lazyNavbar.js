define(['app'], function (app) {
    app.directive('lazyNavbar', ['$compile',
        function ($compile) {
            return {
                restrict: 'E',
                scope: {
                    parentItem: '=parentItem',
                    menuItems: '=menuItems',
                    navbarCtrlScope: '=navbarCtrlScope'
                },
                replace: true,
                link: function (scope, element, attrs) {
                    if (angular.isArray(scope.menuItems) && scope.menuItems.length > 0) {
                        var template = '';
                        if(scope.parentItem != undefined){
                            template += '<div class="navbarSubContainer"';
                            template += ' collapse="!parentItem.showChildItems">\n'
                            template += '   <ul>\n';
                        }
                        else{
                            template += '<ul class="nav navbar-nav lazy-navbar-nav">\n';
                        }
                        template += '   <li ng-repeat="menuItem in menuItems" ng-class="{\'lazy-active\': menuItem.active,';
                        template += ' \'subItemsOpened\': menuItem.showChildItems}">\n';
                        template += '	    <a ';
                        template += '       ng-href="{{menuItem.link}}" ';
                        template += '       ng-class="{paddingBottom0: (menuItem.childMenuItems.length > 0)}"\n';
                        template += ' ng-click="navbarCtrlScope.navbarMenuItemClicked(navbarCtrlScope.navbarModel.navbarMenuItems, menuItem._id)">\n';

                        if(scope.parentItem != undefined){
                            template += '		    <i class="subItemIconLevel fa fa-level-up fa-rotate-90"></i>\n';
                        }

                        template += '           <i ng-if="menuItem.icon != \'\'" ng-class="menuItem.icon"></i>\n';
                        template += '		        {{menuItem.name}}\n';
                        template += '		    <i ng-if="menuItem.childMenuItems.length > 0" class="subItemIconDown fa fa-chevron-down"></i>\n';
                        template += '		    <i ng-if="menuItem.childMenuItems.length > 0" class="subItemIconRight fa fa-chevron-right"></i>\n';
                        template += '	    </a>\n';

                        template += '       <lazy-Navbar ng-if="menuItem.childMenuItems.length > 0" parent-Item="menuItem" menu-Items="menuItem.childMenuItems" navbar-Ctrl-Scope="navbarCtrlScope">\n';
                        template += '       </lazy-Navbar>\n';

                        template += '   </li>\n';
                        template += '</ul>\n';

                        if(scope.parentItem != undefined){
                            template += '</div>\n';
                        }

                        var newElement = angular.element(template);
                        $compile(newElement)(scope);
                        element.replaceWith(newElement);
                    }
                }
            };
        }]);
});

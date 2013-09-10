/*var directives = angular.module('guthub.directives', []);

directives.directive('butterbar', ['$rootScope', function($rootScope)
{
    return
    {
      link: function(scope, element, attrs)
            {
              element.addClass('hide');
              $rootScope.$on('$routeChangeStart', function()
              {
                element.removeClass('hide');
              });
              $rootScope.$on('$routeChangeSuccess', function()
              {
                element.addClass('hide');
              });
            }
    };
}]);
*/

var directives = angular.module('guthub.directives', []);

directives.directive('butterbar', ['$rootScope', function($rootScope)
{
  return {
            link: function(scope, element, attrs)
            {
              element.addClass('hide');
              $rootScope.$on('$routeChangeStart', function() { element.removeClass('hide');
              });
              $rootScope.$on('$routeChangeSuccess', function() { element.addClass('hide');
              });
            }
    };
}]);


directives.directive('focus', function()
{
  return {
    link: function(scope, element, attrs) {
          element[0].focus();
        }
  };
});


/*
directives.directive('focus', function()
{
  return
  {
    link: function(scope, element, attrs) {
          element[0].focus();
        }
  };
});

*/
/*





angular.module('btnbar.directive', []).
directive("btnBar", function(){
  return {
    restrict: 'E',
    scope :{ buttons: '='},
    controller: function($scope, $element,$rootScope) {
    },
    template:'<div class="btn-toolbar">' +
      '<a class="btn" ng-repeat="b in buttons" href={{b.href}}>' +
      '<i class={{b.icon}}></i>button</a></div>',
    replace:true
  };
});

var app = angular.module('angularjs-starter', ['btnbar.directive']);

app.run(function($rootScope){
  $rootScope.buttons = [{href: '#/students', icon:'icon-ok'},
                        {href: '#/students', icon:'icon-remove'},
                        {href: '#/students/new', icon:'icon-plus'}];
});
app.controller('MainCtrl', function($scope) {
});


var appModule = angular.module('app', []);
appModule.directive('ngbkFocus', function() { return {
link: function(scope, element, attrs, controller) { element[0].focus();
} };
});


 angular.module('app', [])


angular.module('btnbar.directive', []).
  directive("btnBar", function()
  {
    return
    {
      restrict: 'E',
      scope :{ buttons: '='},
      controller: function($scope, $element,$rootScope) {
      },
      template:'<div class="btn-toolbar">' +
        '<a class="btn" ng-repeat="b in buttons" href={{b.href}}>' +
        '<i class={{b.icon}}></i>button</a></div>',
      replace:true
    };
});

*/
( function() {
  'use strict';

  angular.module('fbauthdevise')
  .controller('AuthCtrl', ['$scope', '$location', 'Auth', 'CurrentUser',
    function($scope, $location, Auth, CurrentUser) {
      $scope.logout = function() {
        Auth.logout();
        $location.path("/");
      }

      $scope.fblogin = function() {
        Auth.fblogin("/welcome");
      }

    }
  ]);
})();
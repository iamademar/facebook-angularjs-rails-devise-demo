( function() {
  'use strict';

  angular.module('fbauthdevise')
  .controller('WelcomeCtrl', ['$scope', 'CurrentUser',
    function($scope, CurrentUser) {
      CurrentUser.get();
      $scope.user = CurrentUser;
    }
  ]);
})();
( function() {
  'use strict';

  angular.module('fbauthdevise')
  .controller('AccessCtrl', ['$rootScope', '$location', 'Auth', 'localStorageService',
    function($rootScope, $location, Auth, localStorageService) {
      $rootScope.$on('$routeChangeStart', function(e, curr, prev) {
        console.info('----------- check auth on route change start ------------');
        console.info(localStorageService.get('logged_in'));
        if (curr.access.isPublic == false && localStorageService.get('logged_in') == null) {
          $location.path("/");
          alert('You need to login to access page!');
        }
      });
    }

  ]);
})();
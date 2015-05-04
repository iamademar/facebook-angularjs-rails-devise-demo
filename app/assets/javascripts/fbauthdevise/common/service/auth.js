( function() {
  'use strict';

  angular.module('fbauthdevise')
  .factory("Auth", ['$rootScope', '$http', '$location', 'Session', 'CurrentUser',
    function($rootScope, $http, $location, Session, CurrentUser) {
      var srvAuth = {};

      srvAuth.fblogin = function(url) {
        FB.login(function (response) {
          if (response.status === 'connected') {
            FB.api('/me', function(res) {
              $rootScope.$apply(function() {
                var newSession = new Session({ email: res.email,
                                               first_name: res.first_name,
                                               last_name: res.last_name,
                                               uid: res.id,
                                               gender: res.gender,
                                               provider: 'facebook'
                                            });
                newSession.$save(newSession, function(data) {
                  if(data.success == false) {
                    alert('Error in authenticating user!');
                  } else {
                    CurrentUser.set(data);
                    $location.path(url);
                  }
                });
              });
            });
          }
        });

      }

      srvAuth.watchFBStatus = function() {
        var _self = this;
        FB.Event.subscribe('auth.authResponseChange', function(res) {
          if (res.status === 'connected') {
            FB.api('/me', function(res) {
              $rootScope.$apply(function() {
                $rootScope.user = _self.user = res;
              });
            });
          }
        });
      }

      srvAuth.logout = function() {
        CurrentUser.logout();
        $http.delete('/users/sign_out.json')
          .success(function(data, status, headers, config) {
            alert('Successfully logged out!');
          }).
          error(function(data, status, headers, config) {
            alert('Error in logging out!');
          });
      }

      return srvAuth;
    }

  ]);


})();
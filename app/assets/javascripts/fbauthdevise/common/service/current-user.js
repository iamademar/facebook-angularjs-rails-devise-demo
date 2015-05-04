( function() {
  'use strict';

  angular.module('fbauthdevise')
  .factory("CurrentUser", ['Session', 'localStorageService',
    function(Session, localStorageService) {
      var currentUser = {};
      currentUser.id = null;

      currentUser.logout = function() {
        currentUser = {};
        if(localStorageService.isSupported) {
          localStorageService.clearAll();
        } else {
          localStorageService.cookie.clearAll();
        }
      }

      currentUser.set = function(session) {
        this.current_user_id = session.id;
        this.email = session.email;
        this.first_name = session.first_name;
        this.last_name = session.last_name;
        // Save on local storage
        if(localStorageService.isSupported) {
          console.info('-------- set as true --------');
          localStorageService.set('current_user_id', session.id);
          localStorageService.set('logged_in', true);
        } else {
          localStorageService.cookie.set('current_user_id', session.current_user_id);
          localStorageService.cookie.set('logged_in', true);
        }
      }

      currentUser.get = function() {
        var _this = this;
        if(_this.current_user_id == null) {
          if(localStorageService.isSupported) {
            if(localStorageService.get('logged_in') == null) {
              // No user signed-in
            } else {
              Session.get({ id: 'me'}).$promise.then( function(session) {
                _this.current_user_id = session.id;
                _this.email = session.email;
                _this.first_name = session.first_name;
                _this.last_name = session.last_name;
              });
            }
          } else {
            if(localStorageService.cookie.get('logged_in') == null) {
              // No user signed-in
            } else {
              Session.get({ id: 'me'}).$promise.then( function(session) {
                _this.current_user_id = session.id;
                _this.email = session.email;
                _this.first_name = session.first_name;
                _this.last_name = session.last_name;
              });
            }
          }
        }
      }

      return currentUser;
    }
  ])
})();
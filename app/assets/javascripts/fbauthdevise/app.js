( function() {
  'use strict';

  angular.module('fbauthdevise', [
    // Libraries
    'templates',
    'ngRoute',
    'LocalStorageModule',
    // Resource
    'common.resource.session'
  ])
  .run(['$rootScope', '$window', 'Auth',
    function($rootScope, $window, Auth) {
      // FB sync
      $window.fbAsyncInit = function() {
        // Executed when the SDK is loaded
        FB.init({ 
          /* 
           The app id of the web app;
           To register a new app visit Facebook App Dashboard
           ( https://developers.facebook.com/apps/ ) 
          */
          appId: '********************', 
          /* 
           Adding a Channel File improves the performance 
           of the javascript SDK, by addressing issues 
           with cross-domain communication in certain browsers. 
          */
          channelUrl: 'fbauth/channel.html', 
          /* 
           Set if you want to check the authentication status
           at the start up of the app 
          */
          status: true, 
          /* 
           Enable cookies to allow the server to access 
           the session 
          */
          cookie: true,
          /* Parse XFBML */
          xfbml: true 
        });

        Auth.watchFBStatus();
      };

      (function(d){
        // load the Facebook javascript SDK

        var js, 
        id = 'facebook-jssdk', 
        ref = d.getElementsByTagName('script')[0];

        if (d.getElementById(id)) {
          return;
        }

        js = d.createElement('script'); 
        js.id = id; 
        js.async = true;
        js.src = "//connect.facebook.net/en_US/all.js";

        ref.parentNode.insertBefore(js, ref);

      }(document));

    }
  ])
  .config(['$routeProvider', 
    function($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'fbauthdevise/public/login/login.html',
          access: { isPublic: true }
        })
        .when('/welcome', {
          templateUrl: 'fbauthdevise/user/welcome/welcome.html',
          access: { isPublic: false }
        });
    }
  ]);
  
})();
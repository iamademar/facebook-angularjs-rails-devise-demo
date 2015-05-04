(function() {
  'use strict';
  
  angular.module('common.resource.session', ['ngResource'])
  .factory("Session", [ '$resource',
    function($resource) {
      return $resource("/api/public/sessions/:id.json", {
        id: "@id"
      });
    }
  ]);
  
})();
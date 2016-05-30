define([
  'backbone'
], function() {

    var Subdivision = Backbone.Model.extend({
        defaults : {
            authenticated: false,
            groups: null
        },
        url : function() {
            return '/subdivision';
        }
    });

  return Subdivision;

});

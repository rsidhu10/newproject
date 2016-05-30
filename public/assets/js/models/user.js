define([
  'backbone'
], function() {

    var User = Backbone.Model.extend({
        defaults : {
            authenticated: false,
            groups: null
        },
        url : function() {
            return '/user';
        }
    });

  return User;

});
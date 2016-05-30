define([
  'backbone'
], function() {

    var Division = Backbone.Model.extend({
        defaults : {
            authenticated: false,
            groups: null
        },
        url : function() {
            return '/division';
        }
    });

  return Division;

});

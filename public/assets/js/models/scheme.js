define([
  'backbone'
], function() {

    var Scheme = Backbone.Model.extend({
        defaults : {},
        url : function() {
            return '/scheme';
        }
    });

  return Scheme;

});
